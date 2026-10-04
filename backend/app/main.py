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

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

from backend.app.api.auth import router as auth_router
from backend.app.api.resume import router as resume_router

app.include_router(auth_router, prefix="/api/v1")
app.include_router(resume_router, prefix="/api/v1")

@app.get("/api/health", tags=["Health"])
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
