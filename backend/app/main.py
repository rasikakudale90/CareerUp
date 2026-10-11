import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    description="""
    🚀 **CareerUp AI Intelligence Backend Engine**
    
    Powers dynamic multi-dimensional Career DNA evaluation, resume parsing,
    real-time skill gap analysis, personalized roadmaps, and What-If simulation.
    """
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Correlation Request ID & Observability Middleware (Addresses FR-14 & AC-12)
import uuid
import time
from fastapi import Request

@app.middleware("http")
async def add_request_id_and_timing_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Response-Time"] = f"{duration:.4f}s"
    return response

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

# Initialize database tables automatically (SQLite or Supabase Postgres)
try:
    from backend.app.db.session import Base, engine
    import backend.app.models
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"[Database Initialization Warning] {e}")


from backend.app.api.auth import router as auth_router
from backend.app.api.resume import router as resume_router
from backend.app.api.profile import router as profile_router
from backend.app.api.careers import router as careers_router
from backend.app.api.skill_gap import router as skill_gap_router
from backend.app.api.roadmap import router as roadmap_router
from backend.app.api.simulator import router as simulator_router
from backend.app.api.jobs import router as jobs_router
from backend.app.api.history import router as history_router

app.include_router(auth_router, prefix="/api/v1")
app.include_router(resume_router, prefix="/api/v1")
app.include_router(profile_router, prefix="/api/v1")
app.include_router(careers_router, prefix="/api/v1")
app.include_router(skill_gap_router, prefix="/api/v1")
app.include_router(roadmap_router, prefix="/api/v1")
app.include_router(simulator_router, prefix="/api/v1")
app.include_router(jobs_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")

@app.get("/api/health", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": "1.0.0",
        "ai_engine": settings.GEMINI_MODEL,
        "docs_url": "/docs"
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to CareerUp AI Backend API",
        "health": "/api/health",
        "swagger_docs": "/docs"
    }
