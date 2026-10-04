from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile
from backend.app.api.deps import get_current_user
from backend.app.ai.gemini_client import gemini_client
from backend.app.ai.prompts import WHAT_IF_PROMPT

router = APIRouter(prefix="/simulator", tags=["What-If Simulator"])

AVAILABLE_SIMULATION_SKILLS = [
    {
        "id": "sim-langgraph",
        "name": "LangGraph & Agentic Workflows",
        "category": "AI Frameworks",
        "impactScore": 14,
        "description": "Cyclic graphs, multi-agent coordination, and human-in-the-loop workflows."
    },
    {
        "id": "sim-vectordb",
        "name": "Vector Databases & Hybrid RAG",
        "category": "Data Architecture",
        "impactScore": 12,
        "description": "High-dimensional embeddings, HNSW index tuning, and semantic reranking."
    },
    {
        "id": "sim-docker",
        "name": "Docker & Container Orchestration",
        "category": "Cloud & DevOps",
        "impactScore": 8,
        "description": "Containerized microservices, multi-stage builds, and deployment pipelines."
    },
    {
        "id": "sim-redis",
        "name": "Redis Pub/Sub & Edge Caching",
        "category": "Distributed Systems",
        "impactScore": 7,
        "description": "Sub-millisecond data structures, token bucket rate limiters, and real-time queues."
    },
    {
        "id": "sim-triton",
        "name": "Triton / vLLM Inference Serving",
        "category": "MLOps",
        "impactScore": 15,
        "description": "High-throughput GPU batching, PagedAttention, and KV-cache optimization."
    },
    {
        "id": "sim-kubernetes",
        "name": "Kubernetes & Helm Charts",
        "category": "Cloud & DevOps",
        "impactScore": 10,
        "description": "Cluster management, autoscaling pods, ingress controllers, and service meshes."
    }
]

class SimulateRequest(BaseModel):
    selectedSkillIds: Optional[List[str]] = None
    hypothetical_skills: Optional[List[str]] = None
    hypothetical_projects: Optional[List[str]] = None
    target_role: Optional[str] = None

@router.get("/skills")
def get_simulation_skills():
    return {"status": "success", "skills": AVAILABLE_SIMULATION_SKILLS}

@router.post("/what-if")
def run_what_if_simulation(
    payload: SimulateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    base_score = profile.overall_readiness_score if profile else 78
    
    selected_skills = []
    if payload.selectedSkillIds:
        selected_skills = [s for s in AVAILABLE_SIMULATION_SKILLS if s["id"] in payload.selectedSkillIds]
    
    skill_names = [s["name"] for s in selected_skills]
    if payload.hypothetical_skills:
        for sk in payload.hypothetical_skills:
            if sk not in skill_names:
                skill_names.append(sk)
                selected_skills.append({
                    "id": f"custom-{hash(sk) % 1000}",
                    "name": sk,
                    "category": "Custom Simulation",
                    "impactScore": 10,
                    "description": f"Hypothetical skill: {sk}"
                })
    
    lift = sum(int(s.get("impactScore", 8) * 0.5) for s in selected_skills)
    if lift == 0:
        lift = 12
    projected_score = min(99, base_score + lift)

    fallback = {
        "projected_readiness_score": projected_score,
        "readiness_delta": lift,
        "projected_salary_increase": f"+${lift * 2000:,}",
        "simulated_skills": skill_names or ["LangGraph", "Vector Databases"],
        "reasoning": f"Simulating high-leverage frameworks elevates your architecture score across Tier-1 AI SaaS companies."
    }

    student_dna = "AI Product Engineer student"
    if profile and profile.career_dna_summary:
        student_dna = str(profile.career_dna_summary)

    prompt = WHAT_IF_PROMPT.format(
        simulated_skills=", ".join(skill_names) if skill_names else "LangGraph, Vector Databases",
        student_dna=student_dna
    )

    ai_result = gemini_client.generate_json(prompt, fallback_data=fallback)

    return {
        "status": "success",
        "baseReadinessScore": base_score,
        "projectedReadinessScore": projected_score,
        "readinessDelta": lift,
        "projectedSalaryIncrease": f"+${lift * 2000:,}",
        "activeSimulatedSkills": selected_skills,
        "aiAnalysis": ai_result
    }
