from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile
from backend.app.api.deps import get_current_user
from backend.app.ai.gemini_client import gemini_client
from backend.app.ai.prompts import JOB_MATCH_PROMPT

router = APIRouter(prefix="/jobs", tags=["ATS Job Matching & Diagnostics"])

SAMPLE_JOBS = [
    {
        "id": "job-1",
        "company": "Linear",
        "companyLogo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
        "title": "AI Product Engineer (New Grad / Junior)",
        "location": "San Francisco, CA / Remote",
        "workType": "Full-time",
        "salaryRange": "$145,000 – $180,000",
        "matchPercentage": 92,
        "postedDate": "2 days ago",
        "requiredSkills": ["Next.js", "TypeScript", "FastAPI", "Gemini API", "Tailwind CSS"],
        "matchedSkills": ["Next.js", "TypeScript", "FastAPI", "Tailwind CSS"],
        "missingSkills": ["LangGraph", "Vector Search"],
        "description": "Building next-generation project intelligence tools combining reactive UI craft with low-latency LLM agent pipelines."
    },
    {
        "id": "job-2",
        "company": "Scale AI",
        "companyLogo": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
        "title": "Full-Stack AI Solutions Engineer",
        "location": "San Francisco, CA",
        "workType": "Full-time",
        "salaryRange": "$150,000 – $190,000",
        "matchPercentage": 86,
        "postedDate": "3 days ago",
        "requiredSkills": ["Python", "TypeScript", "Docker", "PostgreSQL", "LLM Fine-tuning"],
        "matchedSkills": ["Python", "TypeScript", "PostgreSQL"],
        "missingSkills": ["Docker", "LLM Fine-tuning"],
        "description": "Collaborate directly with enterprise clients to build custom synthetic data pipelines and multimodal evaluation platforms."
    },
    {
        "id": "job-3",
        "company": "Vercel",
        "companyLogo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
        "title": "AI Platform Developer Advocate",
        "location": "Remote",
        "workType": "Full-time",
        "salaryRange": "$140,000 – $175,000",
        "matchPercentage": 89,
        "postedDate": "5 days ago",
        "requiredSkills": ["Next.js", "AI SDK", "Open Source", "Technical Writing", "React 19"],
        "matchedSkills": ["Next.js", "Open Source", "React 19"],
        "missingSkills": ["AI SDK v4", "Edge Runtimes"],
        "description": "Create high-visibility open-source templates, benchmark AI streaming patterns, and inspire developer communities."
    }
]

class ParseJDRequest(BaseModel):
    roleTitle: str
    company: Optional[str] = "Target Tech Co."
    jobDescription: str

@router.get("")
def get_job_matches(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return {
        "status": "success",
        "count": len(SAMPLE_JOBS),
        "data": SAMPLE_JOBS
    }

@router.post("/parse-jd")
def parse_job_description(
    payload: ParseJDRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    dna = profile.career_dna_summary if profile else "AI Product Engineer student"

    fallback = {
        "match_percentage": 87,
        "fit_status": "Strong Fit",
        "matched_skills": ["Next.js", "TypeScript", "FastAPI"],
        "missing_skills": ["Vector Search", "LangGraph"],
        "summary": f"High ATS compatibility with {payload.company} {payload.roleTitle}. Solid full-stack foundations."
    }

    prompt = JOB_MATCH_PROMPT.format(
        job_description=payload.jobDescription,
        student_dna=dna
    )

    ai_result = gemini_client.generate_json(prompt, fallback_data=fallback)

    matched_job = {
        "id": f"custom-{hash(payload.roleTitle) % 10000}",
        "company": payload.company or "Target Company",
        "companyLogo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
        "title": payload.roleTitle,
        "location": "Remote / Hybrid",
        "workType": "Full-time",
        "salaryRange": "$145,000 – $185,000",
        "matchPercentage": ai_result.get("match_percentage", 87),
        "postedDate": "Parsed Just Now",
        "requiredSkills": ai_result.get("matched_skills", []) + ai_result.get("missing_skills", []),
        "matchedSkills": ai_result.get("matched_skills", ["Next.js", "TypeScript", "FastAPI"]),
        "missingSkills": ai_result.get("missing_skills", ["Vector Search", "LangGraph"]),
        "description": payload.jobDescription
    }

    return {
        "status": "success",
        "matchedJob": matched_job,
        "aiReport": ai_result
    }

@router.get("/readiness")
def get_readiness_diagnostics(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    overall = profile.overall_readiness_score if profile else 78

    return {
        "status": "success",
        "overallReadinessScore": overall,
        "hiringBarTier": "Tier-1 Competitive",
        "breakdown": [
            {"label": "Technical Execution Depth", "score": 86, "desc": "Strong frontend architecture, React 19, FastAPI integration."},
            {"label": "AI & Model Tooling", "score": overall, "desc": "Gemini Live API streaming, RAG foundations, prompt caching."},
            {"label": "System Design & Scalability", "score": 72, "desc": "Redis caching, rate limiting, and containerized Docker services."},
            {"label": "Portfolio Evidence & Open Source", "score": 88, "desc": "3 live deployed repositories with active campus users."},
            {"label": "Technical Interview Defense", "score": 78, "desc": "Articulates trade-offs between latency, accuracy, and token costs."}
        ]
    }
