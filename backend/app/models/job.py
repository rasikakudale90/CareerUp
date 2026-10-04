import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class JobListing(Base):
    __tablename__ = "job_listings"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    company = Column(String(255), nullable=False)
    company_logo = Column(String(500), default="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80")
    title = Column(String(255), nullable=False)
    location = Column(String(100), default="San Francisco, CA / Hybrid")
    work_type = Column(String(50), default="Full-time")
    salary_range = Column(String(100), default="$140,000 – $180,000")
    required_skills = Column(JSON, default=list)
    description = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    
    company = Column(String(255), nullable=False)
    company_logo = Column(String(500), default="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80")
    title = Column(String(255), nullable=False)
    location = Column(String(100), default="Remote / Hybrid")
    work_type = Column(String(50), default="Full-time")
    salary_range = Column(String(100), default="$145,000 – $185,000")
    match_percentage = Column(Integer, default=85)
    matched_skills = Column(JSON, default=list)
    missing_skills = Column(JSON, default=list)
    description = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("StudentProfile", back_populates="job_matches")
