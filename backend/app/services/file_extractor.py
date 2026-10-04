import io
import os
import re
from fastapi import UploadFile, HTTPException, status
from pypdf import PdfReader
import docx

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt"}
MAX_FILE_SIZE = 5 * 1024 * 1024 # 5 MB

def sanitize_filename(filename: str) -> str:
    # Remove path traversal and invalid chars
    clean = os.path.basename(filename)
    clean = re.sub(r"[^a-zA-Z0-9_.-]", "_", clean)
    return clean

def extract_text_from_file(file: UploadFile, contents: bytes) -> str:
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum allowed size of 5MB."
        )

    filename = file.filename or "resume.txt"
    ext = os.path.splitext(filename)[1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Allowed: .pdf, .docx, .txt"
        )

    text = ""
    try:
        if ext == ".pdf":
            reader = PdfReader(io.BytesIO(contents))
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        elif ext == ".docx":
            doc = docx.Document(io.BytesIO(contents))
            for para in doc.paragraphs:
                if para.text:
                    text += para.text + "\n"
        elif ext == ".txt":
            try:
                text = contents.decode("utf-8")
            except UnicodeDecodeError:
                text = contents.decode("latin-1", errors="ignore")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Failed to parse document content: {str(e)}"
        )

    text = text.strip()
    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty or contains no readable text."
        )

    return text
