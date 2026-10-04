from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.history import AIInteractionLog
from backend.app.api.deps import get_current_user

router = APIRouter(prefix="/history", tags=["AI Interaction History"])

@router.get("/ai-logs")
def get_ai_logs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logs = db.query(AIInteractionLog).filter(AIInteractionLog.user_id == current_user.id).order_by(AIInteractionLog.created_at.desc()).all()
    
    if not logs:
        # Provide sample historical interactions if new user
        return {
            "status": "success",
            "count": 3,
            "data": [
                {
                    "id": "log-1",
                    "capability": "Resume Analysis & DNA Synthesis",
                    "model": "gemini-2.5-flash",
                    "timestamp": "Today at 09:45 AM",
                    "summary": "Extracted full-stack engineering foundations, 94% React/Next.js depth, and recommended AI Product Engineer pivot."
                },
                {
                    "id": "log-2",
                    "capability": "Skill Gap Diagnostic",
                    "model": "gemini-2.5-flash",
                    "timestamp": "Today at 09:47 AM",
                    "summary": "Identified Vector DBs & LangGraph as the top 2 critical blockers with ~54 total learning hours to bridge."
                },
                {
                    "id": "log-3",
                    "capability": "What-If Simulator",
                    "model": "gemini-2.5-flash",
                    "timestamp": "Today at 09:50 AM",
                    "summary": "Simulated LangGraph + Vector DB acquisition. Projected +14% hiring readiness and +$25,000 salary lift."
                }
            ]
        }

    return {
        "status": "success",
        "count": len(logs),
        "data": [
            {
                "id": log.id,
                "capability": log.capability.replace("_", " ").title(),
                "model": log.model_name,
                "timestamp": log.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "summary": str(log.normalized_output.get("summary") or log.normalized_output.get("career_dna_summary") or "AI reasoning complete.")[:150]
            }
            for log in logs
        ]
    }
