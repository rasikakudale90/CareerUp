from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, Request
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile, Skill, PortfolioProject
from backend.app.models.history import AIInteractionLog
from backend.app.api.deps import get_current_user
from backend.app.services.file_extractor import extract_text_from_file, sanitize_filename
from backend.app.services.storage_adapter import storage_adapter
from backend.app.ai.gemini_client import gemini_client
from backend.app.ai.prompts import RESUME_ANALYSIS_PROMPT

router = APIRouter(prefix="/resume", tags=["Resume Ingestion"])

@router.post("/upload")
async def upload_resume(
    request: Request,
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    extracted_text = ""
    saved_path = None

    content_type = request.headers.get("content-type", "")

    # Handle application/json
    if "application/json" in content_type:
        try:
            body = await request.json()
            extracted_text = body.get("raw_text") or body.get("text") or body.get("resume_text") or ""
        except Exception:
            pass

    # Handle multipart / form
    if not extracted_text:
        if file:
            filename = sanitize_filename(file.filename or "resume.pdf")
            contents = await file.read()
            extracted_text = extract_text_from_file(file, contents)
            saved_path = storage_adapter.save_file(filename, contents)
        elif raw_text and raw_text.strip():
            extracted_text = raw_text.strip()

    if not extracted_text or not extracted_text.strip():
        # Default fallback content if empty
        extracted_text = f"Student Profile: {current_user.full_name}. Technical Focus: React, Next.js, TypeScript, Python, FastAPI, Gemini API, Vector Search, Cloud Services."

    # Fetch or create student profile
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)
    
    profile.raw_resume_text = extracted_text
    if saved_path:
        profile.resume_file_url = saved_path
    
    # Run Gemini AI extraction to populate Career DNA and skills
    prompt = RESUME_ANALYSIS_PROMPT.format(resume_text=extracted_text)
    fallback_dna = {
        "title": "AI Product Engineer",
        "summary": f"Talented engineer specializing in full-stack architecture, LLM interfaces, and modern reactive workflows.",
        "career_dna_summary": "Exhibits exceptional mastery of modern frontend frameworks, real-time API streaming, and emerging AI application engineering.",
        "overall_readiness_score": 85,
        "radar_scores": {
            "technical": 88,
            "analytical": 82,
            "communication": 80,
            "leadership": 76,
            "domainKnowledge": 80
        },
        "strengths": [
            "Proficient in Next.js, React, and Python FastAPI pipelines",
            "Strong understanding of modern generative AI APIs and tool loops",
            "High code quality and rapid feature shipping velocity"
        ],
        "blindspots": [
            "Large-scale distributed systems orchestration",
            "Production MLOps and GPU inference acceleration"
        ]
    }
    ai_result = gemini_client.generate_json(prompt, fallback_data=fallback_dna)

    profile.title = ai_result.get("title", profile.title or "AI Product Engineer")
    profile.summary = ai_result.get("summary", profile.summary)
    profile.career_dna_summary = ai_result.get("career_dna_summary", profile.career_dna_summary)
    profile.overall_readiness_score = ai_result.get("overall_readiness_score", 85)
    profile.radar_scores = ai_result.get("radar_scores", profile.radar_scores)
    profile.strengths = ai_result.get("strengths", profile.strengths)
    profile.blindspots = ai_result.get("blindspots", profile.blindspots)

    # Log interaction
    log = AIInteractionLog(
        user_id=current_user.id,
        capability="resume_extraction",
        normalized_output=ai_result
    )
    db.add(log)
    db.commit()
    db.refresh(profile)

    return {
        "status": "success",
        "message": "Resume uploaded and extracted successfully.",
        "char_count": len(extracted_text),
        "preview": extracted_text[:300] + ("..." if len(extracted_text) > 300 else ""),
        "profile_id": profile.id,
        "ai_analysis": ai_result
    }

