import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class RoadmapMilestone(Base):
    __tablename__ = "roadmap_milestones"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    
    phase_number = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    timeframe = Column(String(100), default="Weeks 1-3")
    description = Column(Text, default="")
    status = Column(String(50), default="in-progress") # in-progress, locked, completed

    profile = relationship("StudentProfile", back_populates="roadmap_milestones")
    tasks = relationship("RoadmapTask", back_populates="milestone", cascade="all, delete-orphan", order_by="RoadmapTask.created_at")

class RoadmapTask(Base):
    __tablename__ = "roadmap_tasks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    milestone_id = Column(String(36), ForeignKey("roadmap_milestones.id", ondelete="CASCADE"), nullable=False)
    
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    estimated_hours = Column(Integer, default=10)
    completed = Column(Boolean, default=False)
    category = Column(String(50), default="Learn") # Learn, Build, Publish
    readiness_delta = Column(Integer, default=3)
    created_at = Column(DateTime, default=datetime.utcnow)

    milestone = relationship("RoadmapMilestone", back_populates="tasks")
