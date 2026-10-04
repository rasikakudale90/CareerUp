from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile
from backend.app.api.deps import get_current_user
from backend.app.ai.gemini_client import gemini_client
from backend.app.ai.prompts import SKILL_GAP_PROMPT

router = APIRouter(prefix="/skill-gap", tags=["Skill Gap Engine"])

DEFAULT_SKILL_GAPS = [
    {
        "id": "gap-1",
        "name": "Vector Databases & Hybrid RAG",
        "category": "Critical",
        "currentLevel": 35,
        "requiredLevel": 85,
        "estimatedHours": 24,
        "relevanceScore": 94,
        "marketDemand": "Very High",
        "recommendedAction": "Build a hybrid keyword + semantic search pipeline using pgvector and Pinecone with reciprocal rank fusion (RRF).",
        "resources": [
            {"title": "Vector Databases Fundamentals", "provider": "DeepLearning.AI"},
            {"title": "Production RAG with Next.js", "provider": "Vercel Academy"}
        ]
    },
    {
        "id": "gap-2",
        "name": "Agentic Workflows & LangGraph",
        "category": "Critical",
        "currentLevel": 40,
        "requiredLevel": 90,
        "estimatedHours": 30,
        "relevanceScore": 96,
        "marketDemand": "Very High",
        "recommendedAction": "Construct a multi-agent meeting synthesizer that maintains persistent state, handles tool loops, and falls back gracefully.",
        "resources": [
            {"title": "LangGraph: Multi-Agent Systems in Python", "provider": "LangChain"},
            {"title": "Autonomous Agents Architecture", "provider": "Anthropic Research"}
        ]
    },
    {
        "id": "gap-3",
        "name": "Docker & Container Orchestration",
        "category": "Advantage",
        "currentLevel": 50,
        "requiredLevel": 80,
        "estimatedHours": 16,
        "relevanceScore": 82,
        "marketDemand": "High",
        "recommendedAction": "Containerize your FastAPI LLM proxy, write multi-stage Dockerfiles, and deploy to AWS ECS or Render with health checks.",
        "resources": [
            {"title": "Docker for Python & Node Developers", "provider": "Docker Official"}
        ]
    },
    {
        "id": "gap-4",
        "name": "Redis Pub/Sub & Edge Caching",
        "category": "Advantage",
        "currentLevel": 55,
        "requiredLevel": 85,
        "estimatedHours": 14,
        "relevanceScore": 79,
        "marketDemand": "High",
        "recommendedAction": "Implement rate limiting and token bucket algorithms with Upstash Redis on the edge.",
        "resources": [
            {"title": "Distributed Caching Patterns", "provider": "Redis University"}
        ]
    }
]

@router.get("")
def get_skill_gaps(
    track: str = Query("AI Product Engineer", description="Target career track name"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    dna = profile.career_dna_summary if profile else "AI Product Engineer student"

    prompt = SKILL_GAP_PROMPT.format(target_track=track, student_dna=dna)
    ai_result = gemini_client.generate_json(prompt, fallback_data={"skill_gaps": DEFAULT_SKILL_GAPS})
    gaps = ai_result.get("skill_gaps", DEFAULT_SKILL_GAPS)

    return {
        "status": "success",
        "targetTrack": track,
        "totalGapHours": sum(g.get("estimatedHours", 20) for g in gaps),
        "data": gaps
    }
