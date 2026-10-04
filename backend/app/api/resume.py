from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile
from backend.app.api.deps import get_current_user
from backend.app.services.file_extractor import extract_text_from_file, sanitize_filename
from backend.app.services.storage_adapter import storage_adapter

router = APIRouter(prefix="/resume", tags=["Resume Ingestion"])

@router.post("/upload")
async def upload_resume(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    extracted_text = ""
    saved_path = None

    if file:
        filename = sanitize_filename(file.filename or "resume.pdf")
        contents = await file.read()
        extracted_text = extract_text_from_file(file, contents)
        saved_path = storage_adapter.save_file(filename, contents)
    elif raw_text and raw_text.strip():
        extracted_text = raw_text.strip()
    else:
        raise HTTPException(
            status_code=400,
            detail="Please provide either a resume file (PDF, DOCX, TXT) or raw resume text."
        )

    # Fetch or create student profile
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)
    
    profile.raw_resume_text = extracted_text
    if saved_path:
        profile.resume_file_url = saved_path
    
    db.commit()
    db.refresh(profile)

    return {
        "status": "success",
        "message": "Resume uploaded and extracted successfully.",
        "char_count": len(extracted_text),
        "preview": extracted_text[:300] + ("..." if len(extracted_text) > 300 else ""),
        "profile_id": profile.id
    }
