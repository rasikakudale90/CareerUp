import urllib.request
import urllib.parse
import json
import sys

BASE = 'http://127.0.0.1:8000'
results = []

def test(name, fn):
    try:
        fn()
        results.append((name, 'PASS'))
        print(f"[PASS] {name}")
    except Exception as e:
        results.append((name, f"FAIL: {e}"))
        print(f"[FAIL] {name}: {e}")

token = ""

# 1. Health
def t_health():
    resp = json.loads(urllib.request.urlopen(f"{BASE}/health").read().decode())
    assert resp["status"] == "online"
test("1. System Health Check (/health)", t_health)

# 2. Seed Aditi
def t_seed():
    global token
    req = urllib.request.Request(
        f"{BASE}/api/v1/auth/seed",
        data=json.dumps({"persona": "aditi"}).encode(),
        headers={"Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert "access_token" in resp["data"]
    token = resp["data"]["access_token"]
test("2. Seed Persona Aditi Sharma (/api/v1/auth/seed)", t_seed)

# 3. Auth Me
def t_me():
    req = urllib.request.Request(
        f"{BASE}/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert "aditi" in resp["email"]
test("3. Get Current User Me (/api/v1/auth/me)", t_me)

# 4. Get Profile
def t_profile_get():
    req = urllib.request.Request(
        f"{BASE}/api/v1/profile",
        headers={"Authorization": f"Bearer {token}"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert "radarScores" in resp
    assert len(resp["skills"]) > 0
test("4. Get Full Student Profile (/api/v1/profile)", t_profile_get)

# 5. Update Profile
def t_profile_put():
    req = urllib.request.Request(
        f"{BASE}/api/v1/profile",
        data=json.dumps({"title": "Lead AI Engineer", "graduation_year": "2026"}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="PUT"
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
test("5. Update Student Profile PUT (/api/v1/profile)", t_profile_put)

# 6. Resume Upload (JSON & Form)
def t_resume_upload():
    req = urllib.request.Request(
        f"{BASE}/api/v1/resume/upload",
        data=json.dumps({"raw_text": "Aditi Sharma. AI Engineer with Next.js, FastAPI, Vector DB, LangGraph experience."}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert resp["char_count"] > 0
test("6. Resume Text Upload & Ingestion (/api/v1/resume/upload)", t_resume_upload)

# 7. Resume Upload Alias (/api/v1/profile/upload-resume)
def t_resume_alias():
    req = urllib.request.Request(
        f"{BASE}/api/v1/profile/upload-resume",
        data=json.dumps({"raw_text": "Full stack AI student candidate with 95% Next.js and Python mastery."}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
test("7. Profile Resume Upload Alias (/api/v1/profile/upload-resume)", t_resume_alias)

# 8. Career Recommendations
def t_careers():
    req = urllib.request.Request(
        f"{BASE}/api/v1/careers/recommend",
        data=b"{}",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert len(resp["data"]) > 0
test("8. AI Career Recommendations POST (/api/v1/careers/recommend)", t_careers)

# 9. Get Career by ID
def t_career_id():
    req = urllib.request.Request(
        f"{BASE}/api/v1/careers/ai-product-engineer",
        headers={"Authorization": f"Bearer {token}"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
test("9. Get Career Track by ID (/api/v1/careers/ai-product-engineer)", t_career_id)

# 10. Skill Gap Analysis
def t_skill_gap():
    req = urllib.request.Request(
        f"{BASE}/api/v1/skill-gap/analyze",
        data=json.dumps({"target_role": "AI Product Engineer"}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert "data" in resp
test("10. Skill Gap Analyzer POST (/api/v1/skill-gap/analyze)", t_skill_gap)

# 11. Dynamic Roadmap
def t_roadmap():
    req = urllib.request.Request(
        f"{BASE}/api/v1/roadmap/generate",
        data=b"{}",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert len(resp["milestones"]) > 0
test("11. Dynamic Milestone Roadmap POST (/api/v1/roadmap/generate)", t_roadmap)

# 12. Roadmap Task Complete
def t_task_complete():
    req = urllib.request.Request(
        f"{BASE}/api/v1/roadmap/tasks/t-101/complete",
        data=b"{}",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="PATCH"
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
test("12. Roadmap Task Complete PATCH (/api/v1/roadmap/tasks/t-101/complete)", t_task_complete)

# 13. What-If Simulator
def t_simulator():
    req = urllib.request.Request(
        f"{BASE}/api/v1/simulator/what-if",
        data=json.dumps({"hypothetical_skills": ["LangGraph", "Vector DB", "Triton"]}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert "projectedReadinessScore" in resp
test("13. What-If Career Simulator POST (/api/v1/simulator/what-if)", t_simulator)

# 14. Job Matcher (Parse JD)
def t_jobs():
    req = urllib.request.Request(
        f"{BASE}/api/v1/jobs/parse-jd",
        data=json.dumps({
            "roleTitle": "Senior AI Software Engineer",
            "company": "Scale AI",
            "jobDescription": "Build AI applications with React 19, Next.js, FastAPI, and LangGraph."
        }).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert "matchedJob" in resp
test("14. Job Intelligence & ATS Parse JD POST (/api/v1/jobs/parse-jd)", t_jobs)

# 15. Readiness Diagnostics
def t_readiness():
    req = urllib.request.Request(
        f"{BASE}/api/v1/jobs/readiness",
        data=json.dumps({"company": "Scale AI", "roleTitle": "AI Engineer"}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST"
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert "atsMatchScore" in resp
    assert "coverLetter" in resp
test("15. Job Readiness Diagnostics & Cover Letter POST (/api/v1/jobs/readiness)", t_readiness)

# 16. AI Audit Logs
def t_history():
    req = urllib.request.Request(
        f"{BASE}/api/v1/history/ai-logs",
        headers={"Authorization": f"Bearer {token}"}
    )
    resp = json.loads(urllib.request.urlopen(req).read().decode())
    assert resp["status"] == "success"
    assert "logs" in resp
test("16. AI Interaction History & Audit Logs GET (/api/v1/history/ai-logs)", t_history)

passed = sum(1 for r in results if r[1] == "PASS")
total = len(results)
print("\n" + "="*50)
print(f"BACKEND API VERIFICATION RESULT: {passed}/{total} ENDPOINTS PASSED")
print("="*50)

if passed != total:
    sys.exit(1)
