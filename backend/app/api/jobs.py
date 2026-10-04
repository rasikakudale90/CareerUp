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
    roleTitle: Optional[str] = None
    job_title: Optional[str] = None
    company: Optional[str] = "Target Tech Co."
    jobDescription: Optional[str] = None
    description_text: Optional[str] = None

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
    title = payload.roleTitle or payload.job_title or "Senior AI Software Engineer"
    desc = payload.jobDescription or payload.description_text or "Experience building AI applications with React, Next.js, and Python."
    company = payload.company or "Target Company"

    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    dna = profile.career_dna_summary if profile else "AI Product Engineer student"

    fallback = {
        "match_percentage": 89,
        "fit_status": "Strong Fit",
        "matched_skills": ["Next.js", "TypeScript", "FastAPI", "Python"],
        "missing_skills": ["Vector Search", "LangGraph"],
        "summary": f"High ATS compatibility with {company} {title}. Solid full-stack foundations."
    }

    prompt = JOB_MATCH_PROMPT.format(
        job_description=desc,
        student_dna=dna
    )

    ai_result = gemini_client.generate_json(prompt, fallback_data=fallback)

    matched_job = {
        "id": f"custom-{hash(title) % 10000}",
        "company": company,
        "companyLogo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
        "title": title,
        "location": "Remote / Hybrid",
        "workType": "Full-time",
        "salaryRange": "$145,000 – $185,000",
        "matchPercentage": ai_result.get("match_percentage", 89),
        "postedDate": "Parsed Just Now",
        "requiredSkills": ai_result.get("matched_skills", []) + ai_result.get("missing_skills", []),
        "matchedSkills": ai_result.get("matched_skills", ["Next.js", "TypeScript", "FastAPI"]),
        "missingSkills": ai_result.get("missing_skills", ["Vector Search", "LangGraph"]),
        "description": desc
    }

    return {
        "status": "success",
        "matchedJob": matched_job,
        "aiReport": ai_result
    }

@router.get("/readiness")
def get_readiness_diagnostics(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    overall = profile.overall_readiness_score if profile else 85

    return {
        "status": "success",
        "overallReadinessScore": overall,
        "hiringBarTier": "Tier-1 Competitive",
        "breakdown": [
            {"label": "Technical Execution Depth", "score": 88, "desc": "Strong frontend architecture, React 19, FastAPI integration."},
            {"label": "AI & Model Tooling", "score": overall, "desc": "Gemini Live API streaming, RAG foundations, prompt caching."},
            {"label": "System Design & Scalability", "score": 76, "desc": "Redis caching, rate limiting, and containerized Docker services."},
            {"label": "Portfolio Evidence & Open Source", "score": 88, "desc": "3 live deployed repositories with active campus users."},
            {"label": "Technical Interview Defense", "score": 80, "desc": "Articulates trade-offs between latency, accuracy, and token costs."}
        ]
    }

@router.post("/readiness")
def post_readiness_diagnostics(
    payload: Optional[ParseJDRequest] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    diag = get_readiness_diagnostics(current_user=current_user, db=db)
    diag["atsMatchScore"] = 89
    diag["bulletPointOptimizations"] = [
        "Enhanced: Architected high-concurrency LLM inference gateway in FastAPI, achieving sub-200ms TTFT.",
        "Enhanced: Built reactive Next.js 15 dashboard with optimistic UI updates and real-time WebSocket state."
    ]
    diag["coverLetter"] = f"Dear Hiring Team at {payload.company if payload and payload.company else 'Target Company'},\n\nI am writing to express my strong interest in the {payload.roleTitle or payload.job_title if payload and (payload.roleTitle or payload.job_title) else 'AI Engineering'} role. With hands-on experience building production-grade AI microservices, Next.js applications, and multimodal agent workflows, I am eager to contribute immediately to your engineering velocity."
    return diag

