import os
import uuid
from backend.app.core.config import settings

class LocalStorageAdapter:
    def __init__(self, upload_dir: str = settings.UPLOAD_DIR):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    def save_file(self, filename: str, contents: bytes) -> str:
        unique_name = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(self.upload_dir, unique_name)
        with open(file_path, "wb") as f:
            f.write(contents)
        return file_path

storage_adapter = LocalStorageAdapter()
