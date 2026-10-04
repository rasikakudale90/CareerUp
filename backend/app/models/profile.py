import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    title = Column(String(255), default="Full-Stack & Applied AI Engineer")
    university = Column(String(255), default="Indian Institute of Technology")
    graduation_year = Column(String(10), default="2026")
    degree = Column(String(255), default="B.Tech in Computer Science & Engineering")
    summary = Column(Text, default="")
    career_dna_summary = Column(Text, default="")
    overall_readiness_score = Column(Integer, default=68)
    
    # 5-Axis Radar Matrix stored as JSON {technical, analytical, communication, leadership, domainKnowledge}
    radar_scores = Column(JSON, default=lambda: {
        "technical": 84,
        "analytical": 78,
        "communication": 80,
        "leadership": 72,
        "domainKnowledge": 75
    })
    
    strengths = Column(JSON, default=list)
    blindspots = Column(JSON, default=list)
    raw_resume_text = Column(Text, nullable=True)
    resume_file_url = Column(String(500), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="profile")
    skills = relationship("Skill", back_populates="profile", cascade="all, delete-orphan")
    projects = relationship("PortfolioProject", back_populates="profile", cascade="all, delete-orphan")
    experiences = relationship("Experience", back_populates="profile", cascade="all, delete-orphan")
    career_tracks = relationship("CareerTrack", back_populates="profile", cascade="all, delete-orphan")
    skill_gaps = relationship("SkillGap", back_populates="profile", cascade="all, delete-orphan")
    roadmap_milestones = relationship("RoadmapMilestone", back_populates="profile", cascade="all, delete-orphan")
    job_matches = relationship("JobMatch", back_populates="profile", cascade="all, delete-orphan")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), default="Technical") # Technical, Analytical, Communication, Leadership, Domain
    proficiency = Column(Integer, default=70) # 0-100
    verified = Column(Boolean, default=True)

    profile = relationship("StudentProfile", back_populates="skills")

class PortfolioProject(Base):
    __tablename__ = "portfolio_projects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    technologies = Column(JSON, default=list)
    metrics = Column(String(255), default="")
    github_url = Column(String(500), nullable=True)

    profile = relationship("StudentProfile", back_populates="projects")

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    profile_id = Column(String(36), ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    period = Column(String(100), default="")
    highlights = Column(JSON, default=list)

    profile = relationship("StudentProfile", back_populates="experiences")
