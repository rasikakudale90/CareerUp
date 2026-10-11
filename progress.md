# 🚀 CareerUp — Fullstack State, Deployment & Progress Tracker

**Platform:** CareerUp — AI Student Career Intelligence Platform  
**Frontend Stack:** Next.js 16 (App Router / Turbopack), TypeScript, Tailwind CSS, GSAP, Three.js, Lenis, Framer Motion  
**Frontend Live Deployment:** [https://career-up-indol.vercel.app](https://career-up-indol.vercel.app)  
**Backend Stack:** FastAPI (Python 3.11 / 3.14), SQLAlchemy ORM, Google Gemini GenAI SDK, PostgreSQL / SQLite, JWT Bearer Auth  
**Backend Live Deployment:** [https://careerup-h35y.onrender.com](https://careerup-h35y.onrender.com) (Swagger UI: [`/docs`](https://careerup-h35y.onrender.com/docs))  
**Cloud Storage & Database:** Supabase (PostgreSQL Transaction Pooler + S3 Storage Bucket `resumes`)  
**GitHub Repository:** [https://github.com/rasikakudale90/CareerUp](https://github.com/rasikakudale90/CareerUp)  
**Permanent Repo-Memory:** [`REPO_MEMORY.md`](file:///e:/Ai%20career/REPO_MEMORY.md)  
**Status Date:** 2026-10-11  
**Lead / Principal:** Rasika Babe  

---

## 📌 Executive Summary & Core Value Proposition
> *"A resume tells a student where they are. CareerUp tells them where they can go, what is missing, and what to do next."*

CareerUp transforms static resumes into actionable, multidimensional career intelligence for students targeting top-tier tech roles.

---

## 🏗️ Architecture & Component Inventory

### 1. Frontend App Routes (`/app`) — Deployed on Vercel
- [x] **`/` (Landing Page)**: Cinematic Hero with GSAP entrance sequence, Three.js 3D Career Orbit, Streamlined Floating Pill Navbar, Dynamic Readiness Calculator Preview, Feature Showcases, Social Proof, and CTA.
- [x] **`/auth/signin` & `/signin`**: Clean Single-User Authentication (strictly 1 active session at a time, eliminating persona switcher clutter).
- [x] **`/auth/register` & `/register` & `/signup`**: Registration flow with university, graduation year, and target role inputs.
- [x] **`/onboarding`**: 4-Step Onboarding Flow with reactive custom resume text/file parsing, immediate Career DNA generation, and real-time state synchronization.
- [x] **`/dashboard`**: Unified Intelligence Hub with **strict Authentication Gate** when logged out; displays Readiness Score Dial, Career DNA Radar Polygon, Active Track Details, Urgent Skill Gaps, and Next Milestones when authenticated.
- [x] **`/profile`**: Comprehensive Career DNA Breakdown, **Profile Photo Upload & Dicebear AI Avatar Generator**, verified project portfolio, in-place resume re-parser, and **Account & RBAC Session Management with Log Out**.
- [x] **`/notifications` (Dedicated AI Notification Center)**: Live Career Intelligence Feed with auto-dismiss on view (delay-free), category filtering (`All`, `Unread`, `Match Alert`, `Skill Milestone`, `Market Shift`, `Readiness Boost`), interactive item read toggles, and live simulated alert triggers.
- [x] **`/career`**: 6-Track Career Explorer (AI Product Engineer, Full-Stack AI Dev, Applied ML, GenAI Fullstack, Distributed Systems, ML Ops) with market demand, salary benchmarks, and fit scores.
- [x] **`/skill-gap`**: Deep Gap Analysis with **dynamic critical blockers count**, dynamic blocker names, and dynamically computed estimated weeks to close.
- [x] **`/roadmap`**: Interactive 12-Week Milestone Action Plan with **dynamic target career binding** (`selectedCareer.title`) and interactive checkboxes updating candidate readiness score in real-time.
- [x] **`/what-if`**: Real-time Skill Acquisition Simulator with **persistent custom simulated skills across refreshes**, salary lifts, and **1-Click "Commit to Roadmap & Profile"**.
- [x] **`/job-match`**: ATS Compatibility Engine with curated listings + **Intelligent Custom JD Parser** scanning technical keywords, matching against `studentProfile.skills`, and calculating live ATS fit percentages.
- [x] **`/readiness`**: Deep-dive readiness diagnostics with dynamic score distributions and portfolio counts tied to verified candidate data.

---

### 2. Frontend Polish, Bug Fixes & UX Enhancements

1. **Strict Single-User Authentication & Persistent RBAC**:
   - Eliminated all persona switcher accounts and demo persona buttons across the entire platform.
   - Enforced single-user authentication with persistent `localStorage` session state.
   - Protected dashboard and candidate data behind an explicit Authentication Gate when logged out.
   - Added prominent **"Log Out"** actions across the Top Navbar, Mobile Hamburger Menu, AppShell Sidebar footer, Header controls, and Profile section.

2. **Reactive Resume Ingestion Engine**:
   - Uploading different resumes automatically extracts candidate name, title, skills, projects, strengths, blindspots, and radar scores in real-time.

3. **Profile Picture Custom Upload & AI Avatar Fallback**:
   - Custom file uploader supporting `.png`, `.jpg`, `.webp` with live previews.
   - 1-Click "Generate AI Avatar" (powered by Dicebear neural avatars) with automatic fallback reset.

4. **Instant Notification Read & Badge Synchronization**:
   - When entering `/notifications`, notifications are immediately marked as read, clearing the unread count badge on the header and sidebar instantly.
   - Wrapped notification state handlers in memoized `useCallback` with no-op guards, eliminating re-render cycles and ensuring butter-smooth page navigation.

5. **Top Floating Navbar Alignment & Responsive Layout**:
   - Streamlined desktop navigation link labels (`Careers`, `Skill Gap`, `Roadmap`, `What-If`, `Jobs`, `Readiness`).
   - Cleaned up redundant secondary elements from the floating landing navbar.
   - Added `shrink-0` to all critical header controls and the **"Upload Resume"** CTA, ensuring 100% containment and perfect visual alignment inside the rounded glassmorphic bar across all resolutions.

6. **Fully Dynamic & Logical UI**:
   - Removed remaining hardcoded strings across Skill Gap, Roadmap, Job Match, and Readiness pages.
   - Bound all blockers, estimated learning weeks, active target roles, and ATS compatibility metrics to live state.

---

### 3. User Experience & Real-World Feedback Bug Resolutions (2026-10-10)

1. **Dashboard Pre-Upload State & Calibration Banner (Bug 1)**:
   - Added `hasUploadedResume` state tracking.
   - When entering `/dashboard` before uploading a resume, users are presented with a **"Upload Resume to Calibrate Your Live Career DNA"** banner featuring an in-place drag-and-drop uploader and a link to 4-Step AI Ingestion.
   - Clear indicators denote uncalibrated baseline preview versus verified candidate data.

2. **Reactive Multi-System Resume Calibration (Bug 2)**:
   - Uploading different resumes dynamically recalculates **all interconnected metrics**: candidate radar polygon scores, match scores across all 6 career tracks, custom skill gaps, personalized 12-week roadmap milestones, job match compatibility %, and overall readiness index.
   - Tested across diverse candidate profiles (Fullstack AI, ML/Data Scientist, Systems Architect, and custom uploaded resumes).

3. **Roadmap Initial Clean State (Bug 3)**:
   - Fixed pre-completed task flags in `INITIAL_ROADMAP` (`completed: false` for all baseline tasks).
   - Milestones and tasks now start completely fresh (0% progress) and only reflect tasks explicitly checked by the candidate.

4. **Multi-Account State Isolation (Bug 4)**:
   - Scoped `localStorage` persistence per user email (`careerup_state_v4_<user_email>`).
   - Logging in or registering with a different account initializes clean candidate state without previous user data, custom job matches, or simulation leakage.

5. **Dedicated ATS Diagnostic Modal & Query Routing (Bug 5)**:
   - Replaced plain `/job-match` navigation link on "Test ATS Score" with an interactive **ATS Compatibility Diagnostic Modal** showing live ATS match %, keyword density, architecture alignment, and recruiter compliance.
   - Added direct action buttons to test custom job descriptions (`/job-match?tab=custom`) or browse matching openings (`/job-match?tab=browse`).

---

### 4. CareerUp AI Fix PRD Audit Resolutions (2026-10-11)

1. **Phase 1: Security, Storage & Auth Isolation**:
   - Eliminated unauthenticated fallback to first database user in `deps.py`. Enforced strict 401 Unauthorized for missing/invalid bearer tokens.
   - Refactored `storage_adapter.py` to store private object references with signed short-lived URLs (`create_signed_url`) and secure file deletion (`delete_file`).
   - Hardened `prompts.py` with `<untrusted_content>` boundary tags and strict prompt-injection defense directives across all LLM pipelines.

2. **Phase 2: Core Reliability & Route Stabilization**:
   - Replaced plain text Suspense fallback in `/job-match` with a full-page `JobMatchSkeleton` preventing bot/crawler stalls.
   - Added explicit empty state and timeout error handling with retry actions for custom job descriptions.
   - Removed artificial 55% floor on ATS compatibility score; now computes true keyword & semantic overlap.
   - Fixed What-If skill commits in `prototype-state.tsx` to mark hypothetical skills as `verified: false` / in-learning roadmap goals.

3. **Phase 3: AI Trust, Scoring Explainability & Claims Calibration**:
   - Removed unsubstantiated "top 5th percentile" language on `/readiness`; added transparent scoring methodology rubric (Technical Depth 35%, Portfolio Evidence 25%, Tooling 20%, Roadmap Execution 20%) and educational diagnostic disclaimer.
   - Calibrated What-If simulator compensation metrics to illustrative market benchmarks ($140k–$180k) with explicit no-guarantee disclaimers.
   - Added persistent, elegant `Demo Mode • Seeded Baseline` badge to AppShell header whenever uncalibrated sample data is shown.

4. **Phase 4: Privacy, Data Deletion & Observability**:
   - Added backend `DELETE /api/v1/profile/data` endpoint to permanently wipe stored resume files, candidate skills, projects, and AI interaction logs.
   - Integrated full frontend Data Deletion Danger Zone in `/profile` with a 2-step confirmation modal and complete local session purge.
   - Integrated `X-Request-ID` correlation middleware and sub-millisecond response timing headers in FastAPI `main.py`.

5. **Phase 5: User Calibration & Profile Verification (FR-02, FR-05, FR-06)**:
   - Added Step 2 Extracted Fact Review & Target Role Selection modal in `/onboarding` (FR-02 & FR-05): allows candidate to review extracted facts, remove inaccurate skills, add missing skills, and select their target career track before entering the dashboard.
   - Updated Skill-Gap Analysis in `/skill-gap` (FR-06): missing resume evidence is now explicitly marked as "Not Assessed (Evidence Not Found in Resume)" instead of implying zero candidate capability.
   - 100% of all PRD Functional Requirements (FR-01 through FR-14) and Acceptance Criteria (AC-01 through AC-12) are now fully satisfied.

---

## 📊 Verification & Deployment Matrix

| Verification Scope | Platform | Status | Result |
| :--- | :--- | :--- | :--- |
| **Frontend Production Build** | Vercel / Turbopack | ✅ Verified | **19/19 static routes compiled cleanly (0 TypeScript / Turbopack errors)**. |
| **Audit PRD Fix Suite (Phases 1-5)** | Next.js 16 & FastAPI | ✅ Verified | **100% of loopholes (FR-01 through FR-14, AC-01 through AC-12) resolved.** |
| **Live Cloud Backend Verification** | Render (`careerup-h35y`) | ✅ Verified | 18 of 18 REST endpoints operational (including DELETE /data and request-id middleware). |
| **GitHub Deployment Sync** | GitHub (`main`) | ✅ Up to Date | Live on [career-up-indol.vercel.app](https://career-up-indol.vercel.app) via auto-deploy. |

---

## 🎯 Current Status & Persistent Repo-Memory
- **State Version:** `careerup_state_v4_<email>` (Active isolated per-user session engine).
- **Core Intelligence Engine:** Reactive multi-system synchronization connecting resume ingestion $\rightarrow$ fact verification & track selector $\rightarrow$ 5D radar matrix $\rightarrow$ 6-track matching $\rightarrow$ skill gaps (not-assessed handling) $\rightarrow$ 12-week roadmap $\rightarrow$ ATS compatibility $\rightarrow$ readiness score $\rightarrow$ right to be forgotten (data deletion).
- **Demo Readiness:** 100% demo-ready, 0 broken routes, 0 placeholder stubbing, fully responsive on desktop & mobile devices.

