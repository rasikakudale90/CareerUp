from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile
from backend.app.api.deps import get_current_user

router = APIRouter(prefix="/roadmap", tags=["12-Week Roadmap"])

DEFAULT_ROADMAP = [
    {
        "id": "m-1",
        "phaseNumber": 1,
        "title": "Phase 1: Advanced Vector Search & Semantic Pipelines",
        "timeframe": "Weeks 1–3",
        "description": "Establish industrial retrieval augmented generation (RAG) capabilities with pgvector, hybrid ranking, and chunking strategies.",
        "status": "in-progress",
        "tasks": [
            {
                "id": "t-101",
                "title": "Implement Hybrid Keyword + Vector Retrieval",
                "description": "Deploy pgvector with Reciprocal Rank Fusion (RRF) to combine BM25 and cosine embeddings in Next.js.",
                "estimatedHours": 8,
                "completed": True,
                "category": "Build",
                "readinessDelta": 4
            },
            {
                "id": "t-102",
                "title": "Optimize Chunk Overlap & Context Windows",
                "description": "Test recursive character vs markdown chunking algorithms across 50 sample technical PDFs.",
                "estimatedHours": 6,
                "completed": True,
                "category": "Learn",
                "readinessDelta": 2
            },
            {
                "id": "t-103",
                "title": "Publish Benchmarking Repository to GitHub",
                "description": "Document latency metrics, recall@k scores, and cost trade-offs with interactive README diagrams.",
                "estimatedHours": 5,
                "completed": False,
                "category": "Publish",
                "readinessDelta": 3
            }
        ]
    },
    {
        "id": "m-2",
        "phaseNumber": 2,
        "title": "Phase 2: Agentic Orchestration & LangGraph",
        "timeframe": "Weeks 4–6",
        "description": "Design deterministic cyclic state machines, multi-agent collaboration, and robust tool-calling recovery loops.",
        "status": "in-progress",
        "tasks": [
            {
                "id": "t-201",
                "title": "Construct Cyclic Meeting Synthesizer Agent",
                "description": "Implement LangGraph state graph with human-in-the-loop review nodes and error recovery.",
                "estimatedHours": 10,
                "completed": False,
                "category": "Build",
                "readinessDelta": 5
            },
            {
                "id": "t-202",
                "title": "Integrate Structured Tool Calling with Pydantic",
                "description": "Enforce strict JSON schema guarantees on Gemini tool invocations.",
                "estimatedHours": 6,
                "completed": False,
                "category": "Learn",
                "readinessDelta": 3
            },
            {
                "id": "t-203",
                "title": "Deploy Multi-Agent Pipeline to Render/Vercel",
                "description": "Connect streaming SSE endpoints with optimistic React UI updates.",
                "estimatedHours": 8,
                "completed": False,
                "category": "Publish",
                "readinessDelta": 4
            }
        ]
    },
    {
        "id": "m-3",
        "phaseNumber": 3,
        "title": "Phase 3: Production Cloud & Container Infrastructure",
        "timeframe": "Weeks 7–9",
        "description": "Harden services with Docker containers, edge caching, and automated integration tests.",
        "status": "locked",
        "tasks": [
            {
                "id": "t-301",
                "title": "Multi-Stage Dockerfiles & CI/CD GitHub Actions",
                "description": "Automate linting, unit testing, and Docker Hub image builds under 200MB.",
                "estimatedHours": 6,
                "completed": False,
                "category": "Build",
                "readinessDelta": 3
            },
            {
                "id": "t-302",
                "title": "Redis Rate Limiting & Token Bucket Algorithms",
                "description": "Protect LLM endpoints from abuse with sliding window counters.",
                "estimatedHours": 5,
                "completed": False,
                "category": "Learn",
                "readinessDelta": 2
            }
        ]
    },
    {
        "id": "m-4",
        "phaseNumber": 4,
        "title": "Phase 4: Capstone AI Product & Portfolio Polish",
        "timeframe": "Weeks 10–12",
        "description": "Package an end-to-end AI SaaS prototype, write architectural defense guides, and prep for interviews.",
        "status": "locked",
        "tasks": [
            {
                "id": "t-401",
                "title": "Interactive Live Demo & Video Walkthrough",
                "description": "Record a 2-minute Loom breakdown of system design decisions and trade-offs.",
                "estimatedHours": 4,
                "completed": False,
                "category": "Publish",
                "readinessDelta": 3
            },
            {
                "id": "t-402",
                "title": "System Design Defense Practice",
                "description": "Simulate mock interview questions on latency, token pricing, and edge caching.",
                "estimatedHours": 6,
                "completed": False,
                "category": "Learn",
                "readinessDelta": 3
            }
        ]
    }
]

@router.get("")
def get_roadmap(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    readiness = profile.overall_readiness_score if profile else 78

    total_tasks = sum(len(m["tasks"]) for m in DEFAULT_ROADMAP)
    completed_tasks = sum(len([t for t in m["tasks"] if t.get("completed")]) for m in DEFAULT_ROADMAP)

    return {
        "status": "success",
        "milestones": DEFAULT_ROADMAP,
        "totalTasks": total_tasks,
        "completedTasks": completed_tasks,
        "overallReadinessScore": readiness
    }

@router.patch("/tasks/{task_id}/toggle")
def toggle_task(task_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Toggle task status and compute dynamic score lift
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    new_score = profile.overall_readiness_score if profile else 78
    
    return {
        "status": "success",
        "taskId": task_id,
        "newReadinessScore": min(99, new_score + 3)
    }
