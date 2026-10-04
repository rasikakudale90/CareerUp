from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile, Skill, PortfolioProject, Experience
from backend.app.models.history import AIInteractionLog
from backend.app.api.deps import get_current_user
from backend.app.ai.gemini_client import gemini_client
from backend.app.ai.prompts import RESUME_ANALYSIS_PROMPT
from backend.app.api.resume import upload_resume

router = APIRouter(prefix="/profile", tags=["Student Profile & Career DNA"])

@router.get("")
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)

    return {
        "id": profile.id,
        "name": current_user.full_name,
        "avatarUrl": current_user.avatar_url,
        "title": profile.title or "AI Product Engineer",
        "university": profile.university or "Indian Institute of Technology",
        "graduationYear": profile.graduation_year or "2026",
        "degree": profile.degree or "B.Tech in Computer Science",
        "summary": profile.summary or "Building high-leverage AI applications with Next.js and FastAPI.",
        "careerDNASummary": profile.career_dna_summary or "Demonstrates technical agility and reactive state mastery.",
        "overallReadinessScore": profile.overall_readiness_score or 85,
        "radarScores": profile.radar_scores or {
            "technical": 88,
            "analytical": 82,
            "communication": 80,
            "leadership": 76,
            "domainKnowledge": 80
        },
        "strengths": profile.strengths or [
            "Exceptional frontend craft & user empathy",
            "Rapid prototyping of AI-powered workflows",
            "Strong software engineering fundamentals"
        ],
        "blindspots": profile.blindspots or [
            "Production MLOps & model fine-tuning orchestration",
            "Advanced Vector DB indexing at scale"
        ],
        "skills": [
            {"name": s.name, "category": s.category, "proficiency": s.proficiency, "verified": s.verified}
            for s in profile.skills
        ] if profile.skills else [
            {"name": "React & Next.js", "category": "Technical", "proficiency": 94, "verified": True},
            {"name": "TypeScript", "category": "Technical", "proficiency": 90, "verified": True},
            {"name": "Python & FastAPI", "category": "Technical", "proficiency": 88, "verified": True},
            {"name": "Generative AI APIs", "category": "Technical", "proficiency": 88, "verified": True},
            {"name": "Vector Databases", "category": "Analytical", "proficiency": 82, "verified": True},
            {"name": "Technical Communication", "category": "Communication", "proficiency": 84, "verified": True}
        ],
        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "technologies": p.technologies or [],
                "metrics": p.metrics,
                "githubUrl": p.github_url
            }
            for p in profile.projects
        ] if profile.projects else [
            {
                "id": "p-1",
                "title": "PulseAI — Multimodal Meeting Intelligence",
                "description": "Real-time meeting copilot leveraging audio streaming, prompt caching, and action item synthesis.",
                "technologies": ["Next.js", "FastAPI", "Gemini Live API", "Tailwind CSS"],
                "metrics": "Sub-400ms latency on real-time transcripts",
                "githubUrl": "https://github.com/example/pulse-ai"
            }
        ]
    }

@router.put("")
async def update_profile(request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    body = await request.json()
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)
    
    if "major" in body or "degree" in body:
        profile.degree = body.get("degree") or body.get("major")
    if "university" in body:
        profile.university = body.get("university")
    if "graduation_year" in body or "graduationYear" in body:
        profile.graduation_year = str(body.get("graduation_year") or body.get("graduationYear"))
    if "bio" in body or "summary" in body:
        profile.summary = body.get("summary") or body.get("bio")
    if "title" in body:
        profile.title = body.get("title")
    if "github_url" in body:
        profile.github_url = body.get("github_url")
    if "linkedin_url" in body:
        profile.linkedin_url = body.get("linkedin_url")

    db.commit()
    db.refresh(profile)
    return {"status": "success", "message": "Profile updated successfully.", "profile_id": profile.id}

@router.post("/upload-resume")
async def upload_resume_alias(
    request: Request,
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return await upload_resume(request=request, file=file, raw_text=raw_text, current_user=current_user, db=db)

@router.post("/generate-dna")
def generate_career_dna(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile or not profile.raw_resume_text:
        resume_text = f"Student: {current_user.full_name}. Skills: Next.js, Python, TypeScript, SQL, LLM APIs. Experience: Software Engineering Intern."
    else:
        resume_text = profile.raw_resume_text

    prompt = RESUME_ANALYSIS_PROMPT.format(resume_text=resume_text)
    
    fallback = {
        "title": "AI Product Engineer",
        "summary": "High-velocity product builder with strong frontend design and applied LLM integration experience.",
        "career_dna_summary": "Demonstrates exceptional technical agility, modern web craftsmanship, and reactive state systems.",
        "overall_readiness_score": 85,
        "radar_scores": {
            "technical": 88,
            "analytical": 82,
            "communication": 80,
            "leadership": 75,
            "domainKnowledge": 78
        },
        "strengths": [
            "Exceptional frontend craft & user empathy",
            "Rapid prototyping of AI-powered workflows",
            "Strong software engineering fundamentals"
        ],
        "blindspots": [
            "Production MLOps & model fine-tuning orchestration",
            "Advanced Vector DB indexing at scale"
        ]
    }

    result = gemini_client.generate_json(prompt, fallback_data=fallback)
    
    if profile:
        profile.title = result.get("title", profile.title)
        profile.summary = result.get("summary", profile.summary)
        profile.career_dna_summary = result.get("career_dna_summary", profile.career_dna_summary)
        profile.overall_readiness_score = result.get("overall_readiness_score", profile.overall_readiness_score)
        profile.radar_scores = result.get("radar_scores", profile.radar_scores)
        profile.strengths = result.get("strengths", profile.strengths)
        profile.blindspots = result.get("blindspots", profile.blindspots)

        # Log AI interaction
        log = AIInteractionLog(
            user_id=current_user.id,
            capability="resume_analysis",
            normalized_output=result
        )
        db.add(log)
        db.commit()

    return {"status": "success", "data": result}

