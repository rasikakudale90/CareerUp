import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "online"
    assert "CareerUp" in data["service"]

def test_persona_seeding_and_login():
    # Seed personas
    seed_res = client.post("/api/v1/auth/seed-personas")
    assert seed_res.status_code == 200

    # Login as Aditi
    login_res = client.post("/api/v1/auth/login", json={
        "email": "aditi.sharma@iit.ac.in",
        "password": "password123"
    })
    assert login_res.status_code == 200
    token_data = login_res.json()
    assert "access_token" in token_data
    assert token_data["user"]["name"] == "Aditi Sharma"

def test_profile_endpoints():
    res = client.get("/api/v1/profile")
    assert res.status_code == 200
    data = res.json()
    assert "name" in data
    assert "radarScores" in data
    assert "technical" in data["radarScores"]

def test_resume_upload():
    res = client.post("/api/v1/resume/upload", data={
        "raw_text": "Aditi Sharma. AI Engineer. Skills: Next.js, Python, FastAPI, PyTorch, LangGraph."
    })
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["char_count"] > 0

def test_career_recommendations():
    res = client.get("/api/v1/careers")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert len(data["data"]) >= 6
    assert any(c["title"] == "AI Product Engineer" for c in data["data"])

def test_skill_gap_analysis():
    res = client.get("/api/v1/skill-gap?track=AI%20Product%20Engineer")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert len(data["data"]) > 0

def test_roadmap_and_task_toggle():
    res = client.get("/api/v1/roadmap")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert len(data["milestones"]) >= 4

    toggle_res = client.patch("/api/v1/roadmap/tasks/t-101/toggle")
    assert toggle_res.status_code == 200
    assert toggle_res.json()["status"] == "success"

def test_what_if_simulator():
    skills_res = client.get("/api/v1/simulator/skills")
    assert skills_res.status_code == 200
    assert len(skills_res.json()["skills"]) > 0

    sim_res = client.post("/api/v1/simulator/what-if", json={
        "selectedSkillIds": ["sim-langgraph", "sim-vectordb"]
    })
    assert sim_res.status_code == 200
    sim_data = sim_res.json()
    assert sim_data["status"] == "success"
    assert sim_data["readinessDelta"] > 0

def test_jobs_and_ats_matcher():
    jobs_res = client.get("/api/v1/jobs")
    assert jobs_res.status_code == 200
    assert len(jobs_res.json()["data"]) >= 3

    parse_res = client.post("/api/v1/jobs/parse-jd", json={
        "roleTitle": "Founding AI Engineer",
        "company": "Supabase",
        "jobDescription": "Looking for Next.js and Python engineers with experience in vector embeddings and real-time streaming."
    })
    assert parse_res.status_code == 200
    match_data = parse_res.json()
    assert match_data["status"] == "success"
    assert match_data["matchedJob"]["matchPercentage"] > 0

def test_readiness_diagnostics():
    res = client.get("/api/v1/jobs/readiness")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["overallReadinessScore"] > 0
    assert len(data["breakdown"]) >= 5
