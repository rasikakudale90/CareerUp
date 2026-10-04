from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.core.security import verify_password, get_password_hash, create_access_token
from backend.app.models.user import User
from backend.app.models.profile import StudentProfile, Skill, PortfolioProject, Experience
from backend.app.models.career import CareerTrack, SkillGap
from backend.app.models.roadmap import RoadmapMilestone, RoadmapTask
from backend.app.schemas.auth import UserRegister, UserLogin, TokenResponse, UserOut
from backend.app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists."
        )
    
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role="student"
    )
    db.add(user)
    db.flush()

    # Create associated student profile
    profile = StudentProfile(
        user_id=user.id,
        university=user_in.university or "Indian Institute of Technology",
        graduation_year=user_in.graduation_year or "2026",
        degree=user_in.degree or "B.Tech in Computer Science",
        title="Aspiring AI Engineer",
        career_dna_summary="Engineering student targeting cutting-edge AI and software architecture roles."
    )
    db.add(profile)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.full_name,
            "avatarUrl": user.avatar_url,
            "role": user.role
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        # Auto-create if demo credentials
        if "sharma" in user_in.email or "morgan" in user_in.email or "test" in user_in.email:
            seed_personas_internal(db)
            user = db.query(User).filter(User.email == user_in.email).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password."
            )
    
    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.full_name,
            "avatarUrl": user.avatar_url,
            "role": user.role
        }
    }

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.full_name,
        "avatarUrl": current_user.avatar_url,
        "role": current_user.role
    }

def seed_personas_internal(db: Session):
    # Seed Aditi Sharma
    aditi = db.query(User).filter(User.email == "aditi.sharma@iit.ac.in").first()
    if not aditi:
        aditi = User(
            id="student-aditi",
            email="aditi.sharma@iit.ac.in",
            hashed_password=get_password_hash("password123"),
            full_name="Aditi Sharma",
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
            role="student"
        )
        db.add(aditi)
        db.flush()

        profile = StudentProfile(
            id="profile-aditi",
            user_id=aditi.id,
            title="Full-Stack & Applied AI Engineer",
            university="Indian Institute of Technology",
            graduation_year="2026",
            degree="B.Tech in Computer Science & Engineering",
            summary="Passionate builder focusing on reactive UI systems, LLM agent orchestration, and edge inference.",
            career_dna_summary="A high-leverage product builder sitting at the exact intersection of robust frontend engineering, clean system architecture, and applied AI interfaces.",
            overall_readiness_score=78,
            radar_scores={
                "technical": 84,
                "analytical": 78,
                "communication": 80,
                "leadership": 72,
                "domainKnowledge": 75
            },
            strengths=[
                "Exceptional frontend craft & user empathy",
                "Rapid prototyping of AI-powered workflows",
                "Strong technical communication and presentation clarity"
            ],
            blindspots=[
                "Production MLOps & model fine-tuning orchestration",
                "Distributed systems telemetry & large-scale Kubernetes deployment"
            ]
        )
        db.add(profile)
        db.commit()

    # Seed Alex Morgan
    alex = db.query(User).filter(User.email == "alex.morgan@stanford.edu").first()
    if not alex:
        alex = User(
            id="student-alex",
            email="alex.morgan@stanford.edu",
            hashed_password=get_password_hash("password123"),
            full_name="Alex Morgan",
            avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
            role="student"
        )
        db.add(alex)
        db.flush()

        alex_profile = StudentProfile(
            id="profile-alex",
            user_id=alex.id,
            title="Backend & Distributed ML Systems",
            university="Stanford University",
            graduation_year="2025",
            degree="M.S. in Computer Systems",
            summary="Backend specialist with a passion for distributed data pipelines, Redis caching, and FastAPI services.",
            career_dna_summary="Deep systems thinker with exceptional mastery of concurrency, database scaling, and distributed architecture.",
            overall_readiness_score=82,
            radar_scores={
                "technical": 90,
                "analytical": 86,
                "communication": 68,
                "leadership": 74,
                "domainKnowledge": 82
            },
            strengths=[
                "High-concurrency backend design in Python and Go",
                "Database performance optimization & indexing",
                "Clean RESTful & gRPC API architecture"
            ],
            blindspots=[
                "Complex frontend state management & animations",
                "UX prototyping & visual design craft"
            ]
        )
        db.add(alex_profile)
        db.commit()

@router.post("/seed-personas")
def seed_personas(db: Session = Depends(get_db)):
    seed_personas_internal(db)
    return {"message": "Demo personas (Aditi & Alex) seeded successfully."}
