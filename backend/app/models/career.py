import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class CareerTrack(Base):
    __tablename__ = "career_tracks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    
    slug = Column(String(100), index=True, nullable=False) # e.g. ai-product-engineer
    title = Column(String(255), nullable=False)
    match_score = Column(Integer, default=80)
    market_demand = Column(String(50), default="High") # Explosive, High, Moderate
    avg_salary = Column(String(100), default="$140,000 – $180,000")
    open_roles_count = Column(Integer, default=1000)
    description = Column(Text, default="")
    category = Column(String(100), default="AI & Product")
    growth_projection = Column(String(255), default="+35% YoY growth")
    
    why_fit = Column(JSON, default=list)
    key_missing_skills = Column(JSON, default=list)
    top_companies = Column(JSON, default=list)

    profile = relationship("StudentProfile", back_populates="career_tracks")

class SkillGap(Base):
    __tablename__ = "skill_gaps"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    
    name = Column(String(100), nullable=False)
    category = Column(String(50), default="Critical") # Critical, Advantage, Bonus
    current_level = Column(Integer, default=30)
    required_level = Column(Integer, default=85)
    estimated_hours = Column(Integer, default=25)
    market_demand = Column(String(50), default="Very High")
    recommended_action = Column(Text, default="")
    resources = Column(JSON, default=list)

    profile = relationship("StudentProfile", back_populates="skill_gaps")
