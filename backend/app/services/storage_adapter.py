import os
import uuid
import httpx
from backend.app.core.config import settings

class StorageAdapter:
    def __init__(self):
        self.upload_dir = settings.UPLOAD_DIR
        os.makedirs(self.upload_dir, exist_ok=True)
        self.supabase_url = settings.SUPABASE_URL.rstrip("/") if settings.SUPABASE_URL else ""
        self.supabase_key = settings.SUPABASE_KEY
        self.bucket_name = settings.SUPABASE_BUCKET_NAME

    def save_file(self, filename: str, contents: bytes) -> str:
        unique_name = f"{uuid.uuid4()}_{filename}"
        
        # 1. If Supabase credentials are configured, upload to private Supabase Storage Bucket
        if self.supabase_url and self.supabase_key:
            try:
                upload_endpoint = f"{self.supabase_url}/storage/v1/object/{self.bucket_name}/{unique_name}"
                headers = {
                    "Authorization": f"Bearer {self.supabase_key}",
                    "apiKey": self.supabase_key,
                    "Content-Type": "application/pdf" if filename.endswith(".pdf") else "application/octet-stream"
                }
                response = httpx.post(upload_endpoint, content=contents, headers=headers, timeout=15.0)
                if response.status_code in (200, 201):
                    # Store object path in private bucket (NOT a public URL)
                    return f"supabase://{self.bucket_name}/{unique_name}"
                else:
                    print(f"[Supabase Storage Warning] Upload failed with status {response.status_code}: {response.text}. Falling back to local.")
            except Exception as e:
                print(f"[Supabase Storage Error] {e}. Falling back to local storage.")

        # 2. Local fallback inside secured upload directory
        file_path = os.path.join(self.upload_dir, unique_name)
        with open(file_path, "wb") as f:
            f.write(contents)
        return file_path

    def create_signed_url(self, file_path_or_uri: str, expires_in_seconds: int = 900) -> str:
        """Generate a short-lived access URL for authenticated users (default 15 minutes)"""
        if file_path_or_uri.startswith("supabase://") and self.supabase_url and self.supabase_key:
            parts = file_path_or_uri.replace("supabase://", "").split("/", 1)
            if len(parts) == 2:
                bucket, path = parts
                endpoint = f"{self.supabase_url}/storage/v1/object/sign/{bucket}/{path}"
                headers = {
                    "Authorization": f"Bearer {self.supabase_key}",
                    "apiKey": self.supabase_key,
                    "Content-Type": "application/json"
                }
                try:
                    res = httpx.post(endpoint, json={"expiresIn": expires_in_seconds}, headers=headers, timeout=10.0)
                    if res.status_code == 200:
                        signed_path = res.json().get("signedURL", "")
                        return f"{self.supabase_url}/storage/v1{signed_path}"
                except Exception as e:
                    print(f"[StorageAdapter sign error] {e}")

        # Fallback or local file path
        return file_path_or_uri

    def delete_file(self, file_path_or_uri: str) -> bool:
        """Safely delete a stored resume from Supabase or local storage"""
        if not file_path_or_uri:
            return True

        # Supabase deletion
        if file_path_or_uri.startswith("supabase://") and self.supabase_url and self.supabase_key:
            parts = file_path_or_uri.replace("supabase://", "").split("/", 1)
            if len(parts) == 2:
                bucket, path = parts
                endpoint = f"{self.supabase_url}/storage/v1/object/{bucket}"
                headers = {
                    "Authorization": f"Bearer {self.supabase_key}",
                    "apiKey": self.supabase_key,
                    "Content-Type": "application/json"
                }
                try:
                    res = httpx.request("DELETE", endpoint, json={"prefixes": [path]}, headers=headers, timeout=10.0)
                    return res.status_code in (200, 204)
                except Exception as e:
                    print(f"[StorageAdapter delete error] {e}")
                    return False

        # Local file deletion
        if os.path.exists(file_path_or_uri):
            try:
                os.remove(file_path_or_uri)
                return True
            except Exception as e:
                print(f"[StorageAdapter local remove error] {e}")
                return False

        return True

storage_adapter = StorageAdapter()

