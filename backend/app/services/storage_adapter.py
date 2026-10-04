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
        
        # 1. If Supabase credentials are configured, upload to Supabase Storage Bucket
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
                    # Public URL for the uploaded object
                    public_url = f"{self.supabase_url}/storage/v1/object/public/{self.bucket_name}/{unique_name}"
                    return public_url
                else:
                    print(f"[Supabase Storage Warning] Upload failed with status {response.status_code}: {response.text}. Falling back to local.")
            except Exception as e:
                print(f"[Supabase Storage Error] {e}. Falling back to local storage.")

        # 2. Local fallback
        file_path = os.path.join(self.upload_dir, unique_name)
        with open(file_path, "wb") as f:
            f.write(contents)
        return file_path

storage_adapter = StorageAdapter()

