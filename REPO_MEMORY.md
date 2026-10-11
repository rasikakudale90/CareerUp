# 🧠 CareerUp — Comprehensive Long-Term Repository Memory (Repo-Memory)

> **Last Updated:** 2026-10-11  
> **Status:** Production-Ready & Deployed  
> **Owner / Principal:** Rasika Babe (Rule #14)  
> **Branch:** `main` (Up to date with `origin/main`)

---

## 1. 🌐 Live Production Environments & Repositories

| Component | Target URL | Notes / Specifications |
| :--- | :--- | :--- |
| **Frontend Production** | [https://career-up-indol.vercel.app](https://career-up-indol.vercel.app) | Next.js 16 (App Router + Turbopack), Vercel auto-deploy on `main` push. |
| **Backend API** | [https://careerup-h35y.onrender.com](https://careerup-h35y.onrender.com) | FastAPI on Render. Interactive Swagger API Docs at [`/docs`](https://careerup-h35y.onrender.com/docs). |
| **GitHub Repository** | [https://github.com/rasikakudale90/CareerUp](https://github.com/rasikakudale90/CareerUp) | Upstream origin. |
| **Cloud Database & Storage** | Supabase PostgreSQL + S3 Storage Bucket | Table schemas for users, profiles, skills, roadmaps, and private `resumes` bucket. |

---

## 2. 🏛️ Core Architecture & State Management

### A. Frontend Architecture (Next.js 16 + TypeScript)
- **App Router:** 19 statically prerendered and dynamic routes under `/app`.
- **Styling & Motion:** Tailwind CSS, CSS Variables design tokens, GSAP + ScrollTrigger, Lenis smooth scroll, Three.js 3D career orbit, Framer Motion.
- **State Engine (`lib/prototype-state.tsx`):**
  - Multi-account scoped storage key: `careerup_state_v4_<user_email>`.
  - Seamless synchronization across 6 core systems:
    1. Resume Ingestion & Parsing
    2. 5D Career DNA Radar Matrix
    3. 6-Track Career Explorer & Matching
    4. Skill-Gap Diagnostic Engine
    5. Interactive 12-Week Roadmap
    6. ATS Compatibility & Job Matching Engine
  - Strict authentication gate protecting private dashboard and candidate data.

### B. Backend Architecture (FastAPI + Python)
- **API Version:** `/api/v1` routes:
  - `/auth`: User registration, JWT login, current user verification.
  - `/profile`: Candidate profile details, avatar updates, resume re-analysis, and `DELETE /api/v1/profile/data` (Right to be Forgotten).
  - `/career`: 6 target tracks, fit scores, and market dynamics.
  - `/skills`: Skill gap breakdown and missing evidence diagnostics.
  - `/roadmap`: Milestone progress and task completion.
  - `/simulation`: What-If simulator engine.
  - `/jobs`: Job listings and ATS semantic parsing.
- **Security & Privacy:**
  - Strict 401 Unauthorized enforcement in `backend/app/api/deps.py` (no unauthenticated fallback).
  - Private resume object storage with 15-minute temporary signed URLs (`backend/app/services/storage_adapter.py`).
  - LLM prompts wrapped in `<untrusted_content>` tags with prompt injection defense directives (`backend/app/ai/prompts.py`).
  - Request tracing via `X-Request-ID` correlation middleware and latency logging (`backend/app/main.py`).

---

## 3. 🗺️ Route Directory (19/19 Verified Routes)

1. `/` — Cinematic Landing Hero with 3D Orbit, GSAP animations, Readiness Calculator, and Feature Showcase.
2. `/auth/signin` & `/signin` — Clean Single-User Authentication (persona switcher clutter completely eliminated).
3. `/auth/register`, `/register`, & `/signup` — Registration flow with university, degree, and target track.
4. `/onboarding` — Multi-stage AI resume intake + **Step 2 Extracted Fact Review & Target Role Selection** (FR-02 & FR-05).
5. `/dashboard` — Central Intelligence Hub with Readiness Dial, Career DNA Radar, Urgent Skill Gaps, and Active Roadmaps.
6. `/career` — 6-Track Career Explorer (AI Product Engineer, Full-Stack AI, Applied ML, GenAI Fullstack, Distributed Systems, ML Ops).
7. `/skill-gap` — Comprehensive Gap Analysis with dynamic blockers and **"Not Assessed (Evidence Not Found in Resume)"** labels (FR-06).
8. `/roadmap` — 12-Week Milestone Action Plan with interactive checkboxes dynamically updating the readiness index.
9. `/what-if` — Skill Acquisition Simulator with market benchmarks ($140k–$180k), salary lift projections, and 1-click roadmap commits (`verified: false`).
10. `/job-match` — ATS Diagnostic Engine with full-page `JobMatchSkeleton`, true keyword overlap score, and custom JD analyzer.
11. `/readiness` — Deep-dive readiness diagnostics with transparent 35/25/20/20 rubric and educational disclaimer.
12. `/notifications` — Dedicated Career Intelligence Feed with instant read synchronization.
13. `/profile` — Full Career DNA profile, custom image upload, Dicebear neural avatar generator, and **Data Deletion Danger Zone** (FR-13).

---

## 4. 🎯 Complete Resolution of CareerUp_AI_Fix_PRD.md Loopholes

| Requirement | Implementation & File Provenance |
| :--- | :--- |
| **FR-01: Demo Mode** | Persistent `Demo Mode • Seeded Baseline` badge in `components/dashboard/AppShell.tsx`. |
| **FR-02 & FR-05: Fact Verification & Target Role** | Interactive Step 2 in `app/onboarding/page.tsx` allowing students to edit/remove extracted skills and choose their target career track before roadmap generation. |
| **FR-03 & Storage Privacy** | Private object storage with 15-minute signed URLs and secure deletion in `backend/app/services/storage_adapter.py`. |
| **FR-04 & Prompt Injection Defense** | Input sanitization with `<untrusted_content>` tags in `backend/app/ai/prompts.py`. |
| **FR-06: Skill-Gap Missing Evidence** | Missing resume evidence labeled as "Not Assessed (Evidence Not Found in Resume)" in `app/skill-gap/page.tsx`. |
| **FR-07: Explainable Readiness Score** | Published 35/25/20/20 rubric and educational disclaimer; removed unsubstantiated percentiles in `app/readiness/page.tsx`. |
| **FR-08 & FR-11: What-If Simulator & Salaries** | Calibrated to market benchmark ranges ($140k–$180k) with no-guarantee disclaimers in `app/what-if/page.tsx`; committed simulation skills marked unverified. |
| **FR-09: Fresh Roadmap State** | Clean 0% starting milestone progress in `lib/mock-data.ts`. |
| **FR-10: Job Match Stability & ATS Accuracy** | Full-page SSR skeleton, timeout/empty states with retry, and true ATS keyword calculation in `app/job-match/page.tsx`. |
| **FR-12: Cross-Page Consistency** | Isolated multi-account session engine (`careerup_state_v4_<email>`) in `lib/prototype-state.tsx`. |
| **FR-13: Account & Data Deletion** | Backend `DELETE /api/v1/profile/data` in `backend/app/api/profile.py` and 2-step confirmation modal Danger Zone in `app/profile/page.tsx`. |
| **FR-14: Observability** | `X-Request-ID` correlation middleware and sub-millisecond response timing headers in `backend/app/main.py`. |

---

## 5. 🛠️ Build & Deployment Verification Log

- **Turbopack Production Build:** `npx next build` passes cleanly with **19/19 routes compiled (0 errors)**.
- **Git Commit Log:**
  - `2f897dd`: `feat(audit): resolve all remaining loopholes from CareerUp_AI_Fix_PRD.md`
  - `a3f4218`: `docs: update production Vercel domain to career-up-indol.vercel.app and allow in backend CORS`
  - `dc7a4d3`: `feat(privacy): Phase 4 fix - account data & resume deletion workflow, Request-ID middleware, and updated progress repo-memory`
  - `d0ebb72`: `feat(trust): Phase 3 fix - calibrated readiness methodology, What-If benchmark salary disclaimers, and persistent demo mode badge`
  - `e3c58b0`: `feat(reliability): Phase 2 fix - job-match SSR skeleton fallback, empty/error states, true ATS score, and unverified What-If simulation commit`
  - `ff4b650`: `feat(security): Phase 1 fix - enforce strict 401 auth, private signed storage URLs, and prompt injection defense`
- **Working Tree:** Clean (`git status` reports nothing to commit).

---

## 6. 📌 Critical Rules & Standing Instructions for Future Sessions
1. **Addressing:** Always refer to the user as **"Rasika Babe"** at all times (per `AGENTS_CareerUp_HACKATHON.md` Rule #14).
2. **Production Link:** The official live frontend URL is `https://career-up-indol.vercel.app/`.
3. **Integrity:** Never re-introduce persona switches, hardcoded mock floors, or unauthenticated fallbacks. Keep scoring transparent and explainable.
