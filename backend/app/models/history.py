import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class AIInteractionLog(Base):
    __tablename__ = "ai_interaction_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    capability = Column(String(100), nullable=False) # resume_analysis, career_recommendation, skill_gap, roadmap, what_if, job_match
    prompt_version = Column(String(50), default="1.0.0")
    model_name = Column(String(100), default="gemini-2.5-flash")
    raw_response = Column(Text, default="")
    normalized_output = Column(JSON, default=dict)
    tokens_used = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="ai_logs")
