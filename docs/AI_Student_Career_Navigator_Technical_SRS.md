# Software Requirements Specification (SRS)
# AI Student Career Navigator

**Document Type:** Technical Software Requirements Specification  
**Implementation Target:** Google Antigravity AI Coding Agent  
**Project Mode:** Hackathon MVP with production-ready architectural boundaries  
**Primary Constraint:** Approximately 24 hours of implementation time  
**Document Language:** English  
**Status:** Implementation-ready specification  
**Version:** 1.0  

---

## 1. Purpose

This Software Requirements Specification defines the technical requirements, architecture, modules, APIs, data model, AI services, security controls, deployment model, testing requirements, and implementation order for the **AI Student Career Navigator**.

This document is intended to be consumed directly by an AI coding agent in Google Antigravity. The implementation should therefore favor:

- explicit module boundaries;
- deterministic API contracts;
- simple, maintainable abstractions;
- minimal unnecessary infrastructure;
- clear database relationships;
- reusable AI service interfaces;
- secure server-side AI integration;
- an end-to-end working product before optional polish;
- implementation order optimized for a 24-hour hackathon window.

The product concept is based on the project abstract: an AI-powered career navigator that moves a student through the continuous loop:

> **Profile → Career → Skill Gap → Learning → Assessment → Adaptation → Job Readiness**

The system must not behave as a static career list or a generic chatbot.

---

# 2. Product Definition

## 2.1 Product Name

**AI Student Career Navigator**

The final product name may be changed later without changing the technical architecture.

## 2.2 Product Vision

> **Don't just tell students what career to choose — use AI to show them exactly how to get there.**

The platform should understand a student's profile, dynamically reason about career possibilities, identify gaps, create a learning path, compare the student against jobs, and show how hypothetical skill changes can affect the student's career landscape.

## 2.3 Primary User

The primary user is a college student, final-year student, fresh graduate, career-confused student, or student who already has a target career but does not know the path to reach it.

## 2.4 Core Product Loop

```text
Resume / Manual Profile
        ↓
AI Resume Analysis
        ↓
Student AI Profile
        ↓
Dynamic Career Discovery
        ↓
Career Match + Explanation
        ↓
Skill Gap
        ↓
Personalized Roadmap
        ↓
Progress
        ↓
Job Description Match
        ↓
Job Readiness
        ↓
Career What-If Simulation
        ↓
Updated Career Understanding
```

The architecture must support future adaptive behavior without requiring a rewrite of the core data model.

---

# 3. Scope

## 3.1 In Scope

The implementation must support:

1. Authentication.
2. Email/password authentication.
3. Google OAuth authentication where time and provider configuration permit.
4. Student profile creation and persistence.
5. Resume upload.
6. Resume formats:
   - PDF
   - DOCX
   - TXT
7. AI resume analysis using Google Gemini.
8. AI-generated student profile.
9. User review/edit of extracted profile.
10. Dynamic career recommendations.
11. Career match score and explanation.
12. Skill-gap analysis.
13. Personalized learning roadmap.
14. Roadmap task tracking and progress.
15. Career What-If Simulator.
16. Job-description upload:
   - PDF
   - DOCX
   - TXT
17. Job-description analysis.
18. Job match analysis.
19. Job-readiness evaluation.
20. Career Command Center dashboard.
21. Persistent student journey/history.
22. AI interaction history visible to the student.
23. Retry handling for AI failures.
24. Backend rate limiting and AI request controls.
25. Local development using PostgreSQL.
26. Production database using Supabase PostgreSQL.
27. Local file storage during local development.
28. Supabase Storage in production.
29. Vercel frontend deployment.
30. Render backend deployment.
31. REST APIs.
32. OpenAPI/Swagger API documentation.
33. Automated backend/API/frontend critical-flow testing to the extent practical within the hackathon timeline.

## 3.2 Explicitly Out of MVP Scope

The following should not block MVP completion:

- live job scraping;
- LinkedIn scraping;
- external job APIs;
- large manually curated career databases;
- vector database infrastructure;
- complex RAG infrastructure;
- mobile applications;
- admin portal;
- multi-tenant enterprise functionality;
- real-time collaboration;
- complex notification infrastructure;
- payment systems;
- unnecessary microservices;
- over-engineered agent orchestration;
- guaranteed employment predictions.

Advanced features such as project generation, advanced assessments, resume review, and automated job discovery can be added after the core MVP if time remains.

---

# 4. Technical Decisions Locked by Project Questionnaire

| Area | Final Decision |
|---|---|
| Frontend | Next.js + TypeScript + React + Tailwind CSS + shadcn/ui + Framer Motion |
| Backend | FastAPI/Python for AI and business logic; Next.js only for frontend/BFF responsibilities |
| Database | Local PostgreSQL; production Supabase PostgreSQL |
| ORM | SQLAlchemy |
| AI Provider | Google Gemini API directly from FastAPI |
| Model Strategy | One selected model for hackathon; replacement should require a single configuration change |
| Raw AI Response Style | Free-form Gemini text |
| Internal AI Data Handling | Normalize free-form responses into application/domain data before persistence or UI use |
| Resume Formats | PDF + DOCX + TXT |
| Resume Storage | Local server in development; Supabase Storage in production |
| Authentication | Email/password; Google OAuth prioritized if time permits |
| Persistence | Full persistent student journey and history |
| API Style | REST |
| Gemini Key | Backend only |
| Prompt Architecture | Separate prompt modules/files per AI capability |
| AI Services | Resume, Profile, Career, Match Explanation, Skill Gap, Roadmap, What-If, Job Analysis, Job Match, Job Readiness |
| What-If | Temporary simulated profile; original profile must never be modified |
| Job Input | Uploaded PDF/DOCX/TXT |
| External Job Data | None in MVP |
| Frontend State | Simplest suitable state approach |
| DB Schema | Same logical SQLAlchemy schema/migrations across local and production PostgreSQL |
| File Security | Extension + MIME + size validation, secure temp storage, sanitized names, malicious-content/path-traversal protections |
| AI Failure | Retry with backoff, preserve user input, then return a controlled error |
| AI Cost Control | Backend rate limiting + validation + max inputs + caching/reuse |
| AI History | Persist all relevant AI interactions so users can view past conversations/results |
| API Auth | JWT locally with a production-compatible approach |
| API Documentation | OpenAPI + Swagger + documented request/response schemas |
| Testing | Comprehensive practical automated coverage, prioritized by critical flows |
| Backend Deployment | Render |
| Supabase | PostgreSQL + Storage |
| What-If Persistence | Simulation history may be stored, but original profile is never mutated |
| Job Description Formats | PDF + DOCX + TXT |
| Dashboard | Persisted results + cached summaries; AI runs only when a new analysis is requested |
| Prompt Versioning | Versioned prompts + schemas + model configuration + metadata |
| SRS Detail | Very detailed, agent-ready, implementation order optimized for 24 hours |

---

# 5. Architecture

## 5.1 High-Level Architecture

```text
                         ┌──────────────────────────┐
                         │       Next.js Web App    │
                         │ TypeScript / React       │
                         │ Tailwind / shadcn/ui     │
                         │ Framer Motion            │
                         └────────────┬─────────────┘
                                      │
                               HTTPS REST API
                                      │
                         ┌────────────▼─────────────┐
                         │       FastAPI Backend    │
                         │ Auth / API / Services    │
                         │ Validation / Security    │
                         └────────────┬─────────────┘
                                      │
                 ┌────────────────────┼────────────────────┐
                 │                    │                    │
                 ▼                    ▼                    ▼
        ┌────────────────┐   ┌────────────────┐   ┌─────────────────┐
        │ AI Service     │   │ SQLAlchemy     │   │ File Storage    │
        │ Layer          │   │ ORM            │   │ Adapter         │
        └───────┬────────┘   └───────┬────────┘   └────────┬────────┘
                │                    │                     │
                ▼                    ▼                     ▼
        ┌──────────────┐     ┌───────────────┐    ┌────────────────┐
        │ Gemini API   │     │ PostgreSQL    │    │ Local /        │
        │              │     │               │    │ Supabase       │
        └──────────────┘     └───────────────┘    │ Storage        │
                                                   └────────────────┘
```

## 5.2 Deployment Architecture

```text
Browser
   │
   ▼
Vercel
Next.js
   │
   │ HTTPS REST
   ▼
Render
FastAPI
   │
   ├──────────────► Gemini API
   │
   ├──────────────► Supabase PostgreSQL
   │
   └──────────────► Supabase Storage
```

Local development:

```text
Browser
   ↓
Next.js localhost
   ↓
FastAPI localhost
   ├── Local PostgreSQL
   └── Local file storage
```

---

# 6. Architectural Principles

## 6.1 No Hardcoded Career Intelligence

The application must not hardcode:

- career names;
- career-specific skill lists;
- career-specific score rules;
- fixed career recommendation logic;
- fixed roadmaps;
- fixed skill-gap rules;
- AI responses.

Do not implement:

```python
if career == "Data Analyst":
    skills = ["Python", "SQL", "Power BI"]
```

Instead:

```text
Student Profile
    +
AI Context
    +
Selected Career
    ↓
Gemini Career Intelligence
    ↓
Normalized Domain Result
```

## 6.2 Separation of Responsibilities

Frontend:

- rendering;
- client interactions;
- navigation;
- form handling;
- presentation state;
- API calls.

FastAPI:

- authentication;
- authorization;
- validation;
- file processing;
- business orchestration;
- AI calls;
- persistence;
- rate limiting;
- security.

AI service:

- prompt selection;
- Gemini request;
- retry;
- response normalization;
- AI metadata;
- AI-specific error handling.

Database layer:

- persistence;
- relationships;
- transactions;
- query operations.

Storage adapter:

- local file storage;
- Supabase Storage.

## 6.3 AI Must Not Be Called Directly From Browser

The browser must never contain:

```text
GEMINI_API_KEY
```

All Gemini calls must pass through FastAPI.

---

# 7. Repository Structure

The implementation should use a monorepo.

```text
ai-student-career-navigator/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── resume/
│   │   ├── career/
│   │   ├── skill-gap/
│   │   ├── roadmap/
│   │   ├── job-match/
│   │   └── career-simulator/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── career/
│   │   ├── roadmap/
│   │   ├── jobs/
│   │   └── simulator/
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── validators.ts
│   │   └── utils.ts
│   │
│   ├── hooks/
│   ├── types/
│   ├── public/
│   ├── middleware.ts
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   │
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── profile.py
│   │   │   ├── resume.py
│   │   │   ├── career.py
│   │   │   ├── skill_gap.py
│   │   │   ├── roadmap.py
│   │   │   ├── simulator.py
│   │   │   ├── jobs.py
│   │   │   ├── readiness.py
│   │   │   └── history.py
│   │   │
│   │   ├── ai/
│   │   │   ├── gemini_client.py
│   │   │   ├── normalizer.py
│   │   │   ├── prompts/
│   │   │   │   ├── resume_analysis.py
│   │   │   │   ├── profile_generation.py
│   │   │   │   ├── career_recommendation.py
│   │   │   │   ├── career_explanation.py
│   │   │   │   ├── skill_gap.py
│   │   │   │   ├── roadmap.py
│   │   │   │   ├── what_if.py
│   │   │   │   ├── job_analysis.py
│   │   │   │   ├── job_match.py
│   │   │   │   └── job_readiness.py
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── resume_analyzer.py
│   │   │   │   ├── profile_generator.py
│   │   │   │   ├── career_engine.py
│   │   │   │   ├── career_match_engine.py
│   │   │   │   ├── skill_gap_engine.py
│   │   │   │   ├── roadmap_engine.py
│   │   │   │   ├── what_if_engine.py
│   │   │   │   ├── job_analyzer.py
│   │   │   │   ├── job_match_engine.py
│   │   │   │   └── readiness_engine.py
│   │   │   │
│   │   │   └── schemas/
│   │   │       ├── resume.py
│   │   │       ├── career.py
│   │   │       ├── skill_gap.py
│   │   │       ├── roadmap.py
│   │   │       ├── what_if.py
│   │   │       ├── job.py
│   │   │       └── readiness.py
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── profile.py
│   │   │   ├── skill.py
│   │   │   ├── resume.py
│   │   │   ├── career.py
│   │   │   ├── roadmap.py
│   │   │   ├── simulator.py
│   │   │   ├── job.py
│   │   │   ├── readiness.py
│   │   │   └── ai_history.py
│   │   │
│   │   ├── schemas/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── storage/
│   │   │   ├── base.py
│   │   │   ├── local.py
│   │   │   └── supabase.py
│   │   └── core/
│   │       ├── config.py
│   │       ├── database.py
│   │       ├── security.py
│   │       ├── rate_limit.py
│   │       └── exceptions.py
│   │
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
├── README.md
└── .gitignore
```

The agent may simplify folder names if the same responsibilities remain intact.

---

# 8. Frontend Requirements

## 8.1 Required Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Framer Motion

Additional libraries may be introduced only when genuinely required.

## 8.2 Frontend Routes

Required routes:

```text
/
 /login
 /register
 /dashboard
 /profile
 /resume
 /career
 /skill-gap
 /roadmap
 /job-match
 /career-simulator
```

## 8.3 Landing Page

Must communicate:

- AI career navigator concept;
- resume-to-career journey;
- dynamic career discovery;
- skill-gap intelligence;
- personalized roadmap;
- job readiness;
- What-If simulation.

The page should not present the product as a generic chatbot.

## 8.4 Dashboard

The dashboard is the **Career Command Center**.

It should display, where data exists:

```text
Student Career Profile
Career Recommendations
Current Skill Snapshot
Selected Career
Skill Gaps
Roadmap Progress
Recent Job Matches
Job Readiness
What-If Summary
Recent AI History
```

Use cached/persisted results.

Opening the dashboard must not automatically trigger expensive Gemini calls.

## 8.5 UI State Requirements

Every AI-powered screen must have:

- initial state;
- loading state;
- success state;
- empty state;
- error state;
- retry action where applicable.

Long AI operations should display meaningful progress messaging such as:

```text
Analyzing your resume...
Building your career profile...
Comparing career paths...
Generating your roadmap...
```

## 8.6 Accessibility

The UI should include:

- keyboard-accessible controls;
- labels for form fields;
- readable contrast;
- visible focus states;
- semantic buttons;
- accessible dialogs;
- accessible upload controls.

---

# 9. Authentication Requirements

## 9.1 Email/Password

The backend must support:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

Passwords must never be stored in plaintext.

Use a secure password hashing algorithm available in the Python ecosystem.

## 9.2 Google OAuth

Google OAuth should be architecturally supported.

Implementation priority:

1. Email/password fully functional.
2. Google OAuth implemented if configuration/time permits.
3. If OAuth configuration becomes a time blocker, the MVP must remain fully usable with email/password.

## 9.3 JWT

The API uses JWT-based authentication.

JWT payload should contain a stable user identifier and expiry.

Example conceptual payload:

```json
{
  "sub": "user-id",
  "exp": 0
}
```

Do not store secrets in source control.

---

# 10. Resume Processing

## 10.1 Supported Formats

```text
application/pdf
DOCX
TXT
```

File extension alone is insufficient.

Validation must include:

- extension;
- MIME type;
- file size;
- content parsing;
- malicious-content/path traversal protections.

## 10.2 Upload Flow

```text
User selects resume
        ↓
Frontend validation
        ↓
POST /api/v1/resume/upload
        ↓
Backend validates file
        ↓
Sanitized temporary filename
        ↓
Text extraction
        ↓
Gemini Resume Analyzer
        ↓
Profile normalization
        ↓
Database persistence
        ↓
Return analysis
```

## 10.3 Storage

Development:

```text
backend/uploads/
```

Production:

```text
Supabase Storage
```

Use a storage adapter:

```python
class FileStorage:
    save(...)
    get(...)
    delete(...)
```

Implement:

```text
LocalFileStorage
SupabaseStorage
```

The application layer must not depend directly on local filesystem or Supabase APIs.

## 10.4 Resume Retention

The selected policy is:

> Store the original resume and extracted profile; allow deletion.

Deletion should remove:

- stored file;
- associated metadata;
- any derived records that are explicitly dependent on the deleted resume, according to product rules.

Do not silently delete independent career history.

---

# 11. AI Architecture

## 11.1 Gemini Provider

FastAPI communicates directly with Google Gemini.

```text
FastAPI
   ↓
GeminiClient
   ↓
Google Gemini API
```

## 11.2 Model Configuration

For the hackathon, use one model.

The model identifier should be isolated in one configuration location so replacement requires one change.

At the time of this SRS, Google's official Gemini API documentation lists **Gemini 3.8 Flash (`gemini-3.8-flash`)** as a stable current Flash model and describes it as suitable for long-horizon software engineering and complex workflows. citeturn0search0turn0search5

Therefore the initial implementation should use:

```text
GEMINI_MODEL = "gemini-3.8-flash"
```

Keep this as a single configurable constant rather than scattering the model string across prompt/service files.

## 11.3 Raw AI Response Decision

The project decision is:

> Gemini responses are free-form text.

However, application features such as career cards, skill gaps, roadmaps, and match scores require structured application data.

Therefore implement a **normalization boundary**:

```text
Gemini free-form response
        ↓
AI Normalizer
        ↓
Domain object
        ↓
Application schema validation
        ↓
Database / API response
```

The system must not assume arbitrary Gemini text is directly safe for database insertion.

The normalizer may use:

- deterministic extraction;
- JSON extraction when Gemini happens to return JSON;
- schema-aware parsing;
- fallback defaults;
- validation;
- a controlled repair/retry call if necessary.

Do not expose malformed internal data to the frontend.

## 11.4 Prompt Modules

Each capability must have its own prompt module.

Required:

```text
resume_analysis
profile_generation
career_recommendation
career_explanation
skill_gap
roadmap
what_if
job_analysis
job_match
job_readiness
```

Each module should expose a stable function or template.

## 11.5 Prompt Versioning

Every AI request must be associated with metadata:

```text
prompt_name
prompt_version
model_name
temperature/configuration
timestamp
feature
user_id
```

Example:

```text
career_recommendation
v1.0
gemini-3.8-flash
```

## 11.6 AI Interaction History

The user selected persistent AI history.

Store relevant AI interactions so the user can view past conversations/results.

History records should include:

- feature;
- user input/context;
- AI response;
- normalized result where applicable;
- timestamp;
- model;
- prompt version;
- success/failure status.

Sensitive information must not be logged unnecessarily.

---

# 12. AI Service Contracts

All AI services must use a common interface conceptually:

```python
class AIService:
    async def execute(...):
        ...
```

Each service should:

1. validate input;
2. build context;
3. select prompt;
4. call Gemini;
5. retry if appropriate;
6. normalize output;
7. validate normalized result;
8. persist result where required;
9. return application data.

---

# 13. Resume Analyzer

## 13.1 Input

```text
Resume file
```

## 13.2 Output Domain

The analyzer should identify, where present:

- education;
- skills;
- projects;
- experience;
- certifications;
- achievements;
- interests;
- career signals.

It must never invent missing information.

## 13.3 Endpoint

```http
POST /api/v1/resume/analyze
Content-Type: multipart/form-data
```

Request:

```text
file: uploaded resume
```

Response:

```json
{
  "resume_id": "uuid",
  "status": "completed",
  "profile": {
    "education": [],
    "skills": [],
    "projects": [],
    "experience": [],
    "certifications": [],
    "achievements": [],
    "interests": [],
    "career_signals": []
  },
  "analysis_summary": "..."
}
```

## 13.4 User Confirmation

After analysis, the user must be able to review/edit the extracted profile before relying on it for downstream intelligence.

---

# 14. Student Profile

## 14.1 Profile Components

A student profile may include:

```text
Personal information
Education
Skills
Skill levels
Projects
Experience
Certifications
Achievements
Interests
Career goals
Preferred learning style
Available study time
Target duration
```

## 14.2 Profile Editing

The user must be able to correct AI extraction.

API:

```http
GET   /api/v1/profile
PUT   /api/v1/profile
```

The user's confirmed edits become the authoritative profile for subsequent analyses.

---

# 15. Career Recommendation Engine

## 15.1 Objective

Dynamically discover career paths based on the student's profile.

There must be no fixed career list required by application code.

## 15.2 Inputs

```text
Confirmed student profile
Optional goals/preferences
```

## 15.3 Processing

```text
Profile
   ↓
Career Recommendation Prompt
   ↓
Gemini
   ↓
Normalization
   ↓
Career recommendation objects
```

## 15.4 Endpoint

```http
POST /api/v1/careers/recommend
```

Example normalized response:

```json
{
  "analysis_id": "uuid",
  "recommendations": [
    {
      "career": "Example Career",
      "match_score": 87,
      "reasoning": "Natural-language explanation",
      "matching_skills": [],
      "missing_skills": [],
      "key_factors": []
    }
  ]
}
```

Scores are indicators generated by the system and must not be represented as guaranteed employment probabilities.

---

# 16. Career Match Explanation Engine

## 16.1 Objective

Explain why a career is relevant.

The explanation should identify:

- matching skills;
- relevant education;
- experience signals;
- projects;
- missing requirements;
- important factors;
- actions that could improve compatibility.

## 16.2 Endpoint

```http
POST /api/v1/careers/{career_analysis_id}/explain
```

The endpoint must reuse persisted analysis where possible rather than generating redundant AI calls.

---

# 17. Skill Gap Engine

## 17.1 Inputs

```text
Confirmed student profile
Selected target career
```

## 17.2 Output

Each skill gap should include, when supported by the AI analysis:

```text
skill
importance
current_level
target_level
reason
priority
```

Example:

```json
{
  "skill_gaps": [
    {
      "skill": "Example Skill",
      "importance": "high",
      "current_level": 2,
      "target_level": 4,
      "priority": 1,
      "reason": "..."
    }
  ]
}
```

## 17.3 Endpoint

```http
POST /api/v1/skill-gap/analyze
```

## 17.4 Roadmap Link

Every skill gap should be usable as an input to roadmap generation.

---

# 18. Roadmap Engine

## 18.1 Inputs

```text
Target career
Current skills
Skill gaps
Current skill levels
Available study time
Desired duration
Learning preference
Student goals
```

## 18.2 Duration

The roadmap must support configurable durations such as:

```text
7 days
14 days
30 days
60 days
90 days
```

The duration must not be hardcoded to 30 days.

## 18.3 Roadmap Structure

Conceptually:

```text
Roadmap
 ├── Milestone
 │    ├── Task
 │    ├── Task
 │    └── Task
 ├── Milestone
 │    └── ...
```

A task should support:

```text
title
description
day/order
estimated_time
skill_target
resource_suggestion
completion_status
```

## 18.4 Endpoint

```http
POST /api/v1/roadmap/generate
GET  /api/v1/roadmap/current
PATCH /api/v1/roadmap/tasks/{task_id}
```

## 18.5 Progress

The system must persist:

- completed tasks;
- completion timestamps;
- current progress;
- milestone progress.

---

# 19. Career What-If Simulator

## 19.1 Objective

Allow a student to ask:

> What happens if I learn this skill?

Examples:

```text
What if I learn Python?
What if I learn Cloud Computing?
What if I learn Docker?
```

## 19.2 Critical Rule

The original student profile must never be modified by a simulation.

## 19.3 Processing

```text
Original Profile
      ↓
Copy in memory
      ↓
Add hypothetical skill
      ↓
Run same career analysis engine
      ↓
Compare original vs simulated
      ↓
Return Before / After
```

## 19.4 Comparison

The result should include:

```text
Original career compatibility
Simulated compatibility
Changed career recommendations
Changed scores
New/reduced skill gaps
Reasoning
```

## 19.5 Endpoint

```http
POST /api/v1/simulator/what-if
GET  /api/v1/simulator/history
```

Request:

```json
{
  "skills_to_add": [
    {
      "skill": "Python",
      "level": 4
    }
  ]
}
```

Response:

```json
{
  "simulation_id": "uuid",
  "original": {
    "careers": []
  },
  "simulated": {
    "careers": []
  },
  "changes": {
    "career_score_changes": [],
    "new_recommendations": [],
    "skill_gap_changes": [],
    "explanation": "..."
  }
}
```

## 19.6 Persistence

Simulation history may be persisted for user viewing.

Persistence must contain enough information to display the simulation without changing the actual student profile.

---

# 20. Job Description Analyzer

## 20.1 Input

Uploaded:

```text
PDF
DOCX
TXT
```

No live scraping or external job API is required for MVP.

## 20.2 Processing

```text
Job file
   ↓
Text extraction
   ↓
Gemini
   ↓
Normalized job requirements
```

## 20.3 Endpoint

```http
POST /api/v1/jobs/analyze
```

Example normalized result:

```json
{
  "job_description_id": "uuid",
  "title": "...",
  "company": "...",
  "required_skills": [],
  "preferred_skills": [],
  "education_requirements": [],
  "experience_requirements": [],
  "responsibilities": [],
  "summary": "..."
}
```

Do not invent a company, role, requirement, or qualification not present in the uploaded job description.

---

# 21. Job Match Engine

## 21.1 Inputs

```text
Confirmed student profile
Analyzed job description
```

## 21.2 Output

```text
overall_match
strengths
missing_skills
matching_requirements
unmet_requirements
explanation
recommended_actions
```

Example:

```json
{
  "match_score": 82,
  "strengths": [],
  "missing_skills": [],
  "explanation": "...",
  "recommended_actions": []
}
```

## 21.3 Endpoint

```http
POST /api/v1/jobs/{job_description_id}/match
GET  /api/v1/jobs/history
```

## 21.4 Job Readiness Roadmap

Recommended actions should be connectable to roadmap generation.

---

# 22. Job Readiness Engine

## 22.1 Objective

Evaluate how well the student's current profile aligns with a selected target job/career.

## 22.2 Input

```text
Student profile
Career or analyzed job
Skill gaps
Relevant roadmap/progress
```

## 22.3 Endpoint

```http
POST /api/v1/readiness/evaluate
GET  /api/v1/readiness/current
```

## 22.4 Output

```json
{
  "readiness_score": 0,
  "strengths": [],
  "gaps": [],
  "priority_actions": [],
  "explanation": "..."
}
```

The score is an application indicator, not a guarantee of employment.

---

# 23. AI Reliability

## 23.1 Retry Policy

For transient Gemini failures:

```text
Request
 ↓
Attempt 1
 ↓ failure
Backoff
 ↓
Attempt 2
 ↓ failure
Backoff
 ↓
Attempt 3
 ↓ failure
Controlled error
```

Preserve the original user input throughout.

## 23.2 Error Categories

```text
AI_TIMEOUT
AI_RATE_LIMIT
AI_PROVIDER_ERROR
AI_MALFORMED_RESPONSE
AI_NORMALIZATION_ERROR
AI_VALIDATION_ERROR
FILE_PARSE_ERROR
UNSUPPORTED_FILE
FILE_TOO_LARGE
AUTHENTICATION_ERROR
AUTHORIZATION_ERROR
VALIDATION_ERROR
DATABASE_ERROR
STORAGE_ERROR
```

## 23.3 API Error Format

Use a consistent response:

```json
{
  "error": {
    "code": "AI_PROVIDER_ERROR",
    "message": "The AI service is temporarily unavailable.",
    "retryable": true,
    "request_id": "uuid"
  }
}
```

Do not return internal stack traces.

---

# 24. AI Rate Limiting and Cost Control

Backend must implement:

- per-user request limiting;
- maximum upload sizes;
- maximum prompt/input sizes;
- maximum AI operation frequency;
- caching/reuse for identical or equivalent persisted analyses where appropriate.

Dashboard reads must not invoke Gemini automatically.

Use existing persisted analyses wherever possible.

---

# 25. File Security

## 25.1 Validation

Every uploaded file must validate:

1. Extension.
2. MIME type.
3. Size.
4. Parseability.
5. Safe filename.
6. Safe storage path.
7. Malicious-content/path traversal protections.

## 25.2 Filename Sanitization

Never use a raw user-provided filename as a storage path.

Generate a server-side UUID-based filename.

Example:

```text
{uuid}.pdf
```

## 25.3 Temporary Processing

Files may be written to secure temporary storage during processing.

Temporary files must be deleted after processing when no longer required.

---

# 26. Database

## 26.1 Database Technology

Development:

```text
PostgreSQL
```

Production:

```text
Supabase PostgreSQL
```

The logical schema must remain the same.

Use SQLAlchemy.

## 26.2 Required Entities

At minimum:

```text
users
student_profiles
skills
student_skills
resumes
career_analyses
career_recommendations
skill_gaps
roadmaps
roadmap_tasks
roadmap_progress
career_simulations
job_descriptions
job_matches
job_readiness
ai_interactions
```

## 26.3 User

```text
users
-----
id UUID PK
email UNIQUE
password_hash nullable
full_name
google_subject nullable
auth_provider
created_at
updated_at
```

Google OAuth users may not have a local password.

## 26.4 Student Profile

```text
student_profiles
----------------
id UUID PK
user_id FK users.id UNIQUE
education JSONB
experience JSONB
projects JSONB
certifications JSONB
achievements JSONB
interests JSONB
career_goals TEXT
learning_preferences JSONB
available_study_time
target_duration_days
created_at
updated_at
```

JSONB is acceptable for semi-structured AI-derived information in the hackathon architecture.

## 26.5 Skills

```text
skills
------
id UUID PK
name
normalized_name
created_at
```

Do not pre-populate this table with a huge hardcoded career database.

## 26.6 Student Skills

```text
student_skills
--------------
id UUID PK
profile_id FK
skill_id FK
level
source
evidence
created_at
updated_at
```

`source` may be:

```text
resume
manual
ai
simulation
```

Simulation records must not overwrite the actual student skill records.

## 26.7 Resumes

```text
resumes
-------
id UUID PK
user_id FK
original_filename
stored_path
mime_type
file_size
storage_provider
extracted_text
analysis_status
created_at
updated_at
deleted_at nullable
```

## 26.8 Career Analyses

```text
career_analyses
---------------
id UUID PK
user_id FK
profile_id FK
analysis_type
summary
raw_ai_response
prompt_version
model_name
created_at
```

## 26.9 Career Recommendations

```text
career_recommendations
----------------------
id UUID PK
career_analysis_id FK
career_name
match_score
reasoning
matching_skills JSONB
missing_skills JSONB
key_factors JSONB
created_at
```

## 26.10 Skill Gaps

```text
skill_gaps
----------
id UUID PK
user_id FK
career_name
skill_name
importance
priority
current_level
target_level
reason
analysis_id FK nullable
created_at
```

## 26.11 Roadmaps

```text
roadmaps
--------
id UUID PK
user_id FK
target_career
duration_days
study_time
learning_preference
status
summary
created_at
updated_at
```

## 26.12 Roadmap Tasks

```text
roadmap_tasks
-------------
id UUID PK
roadmap_id FK
title
description
day_number
order_index
estimated_minutes
skill_target
resource_suggestion
status
completed_at nullable
created_at
updated_at
```

## 26.13 Career Simulations

```text
career_simulations
------------------
id UUID PK
user_id FK
added_skills JSONB
original_results JSONB
simulated_results JSONB
changes JSONB
created_at
```

## 26.14 Job Descriptions

```text
job_descriptions
----------------
id UUID PK
user_id FK
original_filename
stored_path
mime_type
raw_text
title
company
requirements JSONB
analysis_status
created_at
```

## 26.15 Job Matches

```text
job_matches
-----------
id UUID PK
user_id FK
job_description_id FK
match_score
strengths JSONB
missing_skills JSONB
requirements_analysis JSONB
recommended_actions JSONB
explanation
created_at
```

## 26.16 Job Readiness

```text
job_readiness
-------------
id UUID PK
user_id FK
target_type
target_id nullable
score
strengths JSONB
gaps JSONB
priority_actions JSONB
explanation
created_at
```

## 26.17 AI Interactions

```text
ai_interactions
---------------
id UUID PK
user_id FK
feature
prompt_version
model_name
input_context JSONB
raw_response TEXT
normalized_response JSONB nullable
status
error_code nullable
latency_ms
created_at
```

This table enables the user-facing AI history requirement.

---

# 27. Database Relationships

```text
User
 ├── StudentProfile
 │    ├── StudentSkills
 │    └── Resumes
 │
 ├── CareerAnalyses
 │    └── CareerRecommendations
 │
 ├── SkillGaps
 │
 ├── Roadmaps
 │    └── RoadmapTasks
 │
 ├── CareerSimulations
 │
 ├── JobDescriptions
 │    └── JobMatches
 │
 ├── JobReadiness
 │
 └── AIInteractions
```

---

# 28. SQLAlchemy Requirements

Use SQLAlchemy declarative models.

Requirements:

- UUID primary keys;
- foreign keys;
- indexes on user IDs;
- timestamps;
- relationship definitions;
- transaction handling;
- no raw SQL in business services unless required;
- repository/service separation where useful.

Migrations should be used.

Alembic is recommended.

---

# 29. REST API Standards

Base path:

```text
/api/v1
```

## 29.1 Auth

```text
POST   /auth/register
POST   /auth/login
GET    /auth/me
POST   /auth/google
```

## 29.2 Profile

```text
GET    /profile
PUT    /profile
```

## 29.3 Resume

```text
POST   /resume/upload
GET    /resume
GET    /resume/{id}
DELETE /resume/{id}
POST   /resume/{id}/analyze
```

## 29.4 Careers

```text
POST   /careers/recommend
GET    /careers/history
GET    /careers/{id}
POST   /careers/{id}/explain
```

## 29.5 Skill Gap

```text
POST   /skill-gap/analyze
GET    /skill-gap/current
```

## 29.6 Roadmap

```text
POST   /roadmap/generate
GET    /roadmap/current
GET    /roadmap/history
PATCH  /roadmap/tasks/{task_id}
```

## 29.7 Simulator

```text
POST   /simulator/what-if
GET    /simulator/history
GET    /simulator/{id}
```

## 29.8 Jobs

```text
POST   /jobs/analyze
GET    /jobs
GET    /jobs/{id}
POST   /jobs/{id}/match
GET    /jobs/{id}/match
```

## 29.9 Readiness

```text
POST   /readiness/evaluate
GET    /readiness/current
```

## 29.10 AI History

```text
GET    /history/ai
GET    /history/ai/{id}
```

---

# 30. API Authentication Rules

Protected endpoints require:

```http
Authorization: Bearer <JWT>
```

The backend must:

1. validate token;
2. identify user;
3. enforce ownership;
4. reject cross-user resource access.

Every resource query must be scoped by authenticated user where appropriate.

---

# 31. API Validation

FastAPI/Pydantic request schemas must validate:

- required fields;
- UUIDs;
- score ranges;
- enum-like status values;
- duration values;
- file metadata;
- string length;
- list sizes;
- simulation input sizes.

Even though raw Gemini output is free-form, the **API and normalized domain data must be validated** before persistence/response.

---

# 32. Environment Variables

Development `.env` should support:

```env
APP_ENV=development

DATABASE_URL=postgresql://...

GEMINI_API_KEY=...

JWT_SECRET=...

CORS_ORIGINS=http://localhost:3000

MAX_RESUME_SIZE_MB=10

MAX_JOB_FILE_SIZE_MB=10

RATE_LIMIT_PER_MINUTE=...

UPLOAD_DIR=./uploads

SUPABASE_URL=

SUPABASE_SERVICE_ROLE_KEY=

SUPABASE_STORAGE_BUCKET=resumes
```

Production should provide corresponding secure values.

Do not commit `.env`.

Commit `.env.example` only.

---

# 33. Configuration Rule

The selected Gemini model should be declared in one place:

```python
GEMINI_MODEL = "gemini-3.8-flash"
```

Although the hackathon decision is to use one hardcoded model, the implementation must not duplicate the string across files.

If the model changes later, the developer should change one configuration value.

Secrets remain environment variables.

---

# 34. Storage Configuration

## Development

```text
FILE_STORAGE_PROVIDER=local
```

Use local filesystem.

## Production

```text
FILE_STORAGE_PROVIDER=supabase
```

Use Supabase Storage.

The storage interface must hide this difference from business logic.

---

# 35. Dashboard Data Strategy

The dashboard must load persisted data.

Preferred sequence:

```text
GET dashboard data
      ↓
Database
      ↓
Cached/persisted summaries
      ↓
Render
```

Do not:

```text
Dashboard open
    ↓
Run all Gemini analyses
```

New AI analysis is initiated only by an explicit user action or workflow requirement.

---

# 36. AI History UI

The user must be able to view past AI interactions.

The history UI should show:

- feature;
- date/time;
- short title;
- status;
- relevant output;
- optionally the original input/context.

Examples:

```text
Resume Analysis — Today
Career Discovery — Today
Skill Gap — Yesterday
What-If: Python — Yesterday
Job Match — 2 days ago
```

Do not expose internal API keys, system prompts, or hidden infrastructure secrets.

---

# 37. Security Requirements

The system must:

- hash passwords;
- protect JWT secret;
- keep Gemini API key server-side;
- sanitize uploads;
- validate MIME type;
- limit file sizes;
- sanitize paths;
- prevent path traversal;
- enforce authorization;
- scope resources to authenticated users;
- avoid logging secrets;
- avoid logging full sensitive files unnecessarily;
- use HTTPS in production;
- configure CORS;
- rate-limit AI endpoints;
- validate AI outputs before persistence;
- avoid fabricated user achievements;
- avoid guaranteed employment claims.

---

# 38. Privacy Requirements

Only necessary student data should be stored.

The user should be able to delete uploaded resumes.

AI interaction history must belong to the authenticated user.

One user must never be able to retrieve another user's:

- resume;
- profile;
- roadmap;
- simulation;
- job description;
- job match;
- AI history.

---

# 39. AI Prompt Design Requirements

Each prompt should explicitly instruct Gemini to:

1. use only supplied user/job/profile information;
2. never fabricate experience;
3. never fabricate certifications;
4. never fabricate achievements;
5. distinguish inferred information from explicit information;
6. provide useful explanations;
7. avoid guaranteed career outcomes;
8. produce output suitable for downstream normalization;
9. keep recommendations grounded in the supplied context.

Example instruction:

```text
Do not invent qualifications, skills, experience, certifications,
achievements, employers, or job requirements that are not supported
by the supplied input.
```

---

# 40. Career Recommendation Logic

The application must not determine careers using hardcoded rules.

The application provides context:

```text
Profile
Goals
Skills
Education
Experience
Projects
Interests
```

Gemini provides career intelligence.

The backend then normalizes the response.

The application stores the resulting recommendation as an analysis snapshot.

A later profile change must trigger a new analysis rather than silently rewriting historical analysis.

---

# 41. Skill Gap Logic

The skill gap engine must not contain:

```text
career → fixed skills
```

Instead:

```text
Student profile
+
Target career
+
AI reasoning
↓
Current capabilities
+
Target capabilities
+
Gap
```

The result is persisted as an analysis snapshot.

---

# 42. Roadmap Logic

Roadmap generation must use the latest confirmed:

- student profile;
- target career;
- skill gaps;
- available study time;
- desired duration;
- learning preferences.

The roadmap should prioritize high-impact gaps.

The roadmap must connect tasks to target skills whenever possible.

---

# 43. What-If Logic

The simulator must use the same career intelligence path as normal career analysis.

It must not create a second hardcoded career engine.

```text
normal:
Profile → Career Engine

simulation:
Profile + hypothetical skill → Career Engine
```

Then:

```text
Normal Result
+
Simulation Result
↓
Comparison
```

The original profile remains unchanged.

---

# 44. Job Matching Logic

The job match engine must compare:

```text
Student Profile
       +
Analyzed Job
       ↓
Gemini Job Match
       ↓
Normalized Match
```

It must identify:

- matching skills;
- missing skills;
- education mismatch;
- experience mismatch;
- strengths;
- recommended next steps.

Do not invent job requirements.

---

# 45. Job Data Limitation

MVP does not use:

- LinkedIn scraping;
- live job scraping;
- job board APIs;
- automated external job ingestion.

The user supplies a job description file.

Future job discovery may be implemented as a separate module.

---

# 46. Testing Strategy

Testing priority:

```text
1. Authentication
2. Profile persistence
3. Resume upload/security
4. Resume analysis flow
5. Career recommendation
6. Skill gap
7. Roadmap
8. What-If
9. Job analysis/matching
10. Dashboard
```

## 46.1 Backend Unit Tests

Test:

- authentication utilities;
- file validation;
- filename sanitization;
- AI normalization;
- score validation;
- ownership checks;
- roadmap progress;
- simulation isolation;
- storage adapter behavior.

## 46.2 API Tests

Test:

```text
register
login
profile
resume upload
resume analyze
career recommend
skill gap
roadmap
what-if
job analyze
job match
readiness
history
```

## 46.3 Frontend Critical Flow Tests

At minimum verify:

```text
Register/Login
    ↓
Upload Resume
    ↓
Review Profile
    ↓
Generate Careers
    ↓
Select Career
    ↓
Skill Gap
    ↓
Roadmap
```

Also verify:

```text
What-If
Job Upload → Job Match
Dashboard
```

## 46.4 AI Testing

Do not depend entirely on live Gemini calls in every automated test.

Use mocked Gemini responses for deterministic tests.

Include malformed AI-response fixtures.

---

# 47. Error and Empty States

Every page must handle:

## Loading

```text
Analyzing...
Generating...
Comparing...
```

## Empty

```text
No career analysis yet.
Upload a resume or complete your profile to begin.
```

## Error

```text
We couldn't complete this analysis.
Please retry.
```

## Retry

Retry buttons must repeat the failed operation safely.

---

# 48. Frontend State Management

Use the simplest architecture that avoids unnecessary dependencies.

Recommended approach:

- React state for local component state;
- server/API data fetched through small reusable hooks;
- URL state where useful;
- lightweight context only where global state is actually needed;
- do not introduce a large state framework unless the implementation proves it necessary.

The backend/database remains the source of truth for persistent application data.

---

# 49. API Client

Create a centralized frontend API client.

Example:

```text
frontend/lib/api.ts
```

Responsibilities:

- base URL;
- authentication headers;
- JSON handling;
- multipart upload handling;
- common errors;
- request IDs where supported.

Components should not duplicate raw `fetch()` configuration.

---

# 50. BFF Boundary

Next.js may provide lightweight frontend/BFF responsibilities where useful, but business logic must remain in FastAPI.

Do not move:

- Gemini calls;
- career intelligence;
- skill-gap logic;
- roadmap generation;
- job matching;
- database business logic

into Next.js.

---

# 51. Observability

Backend should provide:

- structured server logs;
- request IDs;
- AI operation timing;
- AI success/failure status;
- database error logging;
- storage error logging.

Do not log:

- Gemini API keys;
- JWT secrets;
- passwords;
- unnecessary full resume contents;
- unnecessary sensitive user information.

---

# 52. API Documentation

FastAPI must expose OpenAPI documentation.

Required:

```text
/docs
/redoc
/openapi.json
```

Every public endpoint must have:

- description;
- authentication requirement;
- request schema;
- response schema;
- common errors.

---

# 53. Database Migration Requirements

Use migrations.

Initial migration must create all required MVP tables.

Do not manually require the user to create production tables.

Deployment process should run migrations before application use.

---

# 54. Production Deployment

## 54.1 Frontend

Deploy to:

```text
Vercel
```

Environment:

```env
NEXT_PUBLIC_API_URL=https://<backend-domain>
```

## 54.2 Backend

Deploy to:

```text
Render
```

Backend must expose:

```text
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

## 54.3 Database

Use Supabase PostgreSQL.

## 54.4 Storage

Use Supabase Storage.

## 54.5 Secrets

Set through hosting-provider environment variables.

Never commit secrets.

---

# 55. Health Checks

Backend:

```http
GET /health
```

Should verify basic application availability.

A deeper readiness endpoint may be added:

```http
GET /health/ready
```

which may check database connectivity.

Do not make health checks call Gemini.

---

# 56. Performance Requirements

The application should prioritize perceived responsiveness.

For AI operations:

- show immediate loading state;
- stream is optional and not required;
- avoid duplicate requests;
- cache/reuse persisted results;
- provide retry controls.

For normal API/database operations:

- use async FastAPI patterns where appropriate;
- avoid blocking long-running operations unnecessarily;
- index common user-scoped queries.

---

# 57. AI Cost Optimization

Use:

- persisted analyses;
- caching;
- explicit user-triggered regeneration;
- rate limits;
- input size limits;
- concise context construction;
- one Gemini model;
- no unnecessary repeated analysis.

Do not regenerate the entire career profile every time the dashboard opens.

---

# 58. Product Rules

The application must obey these rules:

### Rule 1
No hardcoded career intelligence.

### Rule 2
No fabricated student information.

### Rule 3
No fabricated jobs.

### Rule 4
No guaranteed employment claims.

### Rule 5
User can edit AI-extracted profile data.

### Rule 6
What-If never modifies the original profile.

### Rule 7
Roadmap uses skill gaps.

### Rule 8
Job match uses confirmed profile data.

### Rule 9
Historical AI analyses should remain identifiable as historical snapshots.

### Rule 10
Scores are indicators, not guarantees.

### Rule 11
Gemini key is backend-only.

### Rule 12
Dashboard should use persisted/cached data.

---

# 59. Functional Requirements

## FR-001 Authentication

The system shall allow users to register and log in using email/password.

## FR-002 Google OAuth

The system shall support Google OAuth architecture and implement it when provider setup/time permits.

## FR-003 Resume Upload

The system shall accept PDF, DOCX, and TXT resumes.

## FR-004 Resume Analysis

The system shall extract meaningful profile information using Gemini.

## FR-005 Profile Review

The system shall allow users to edit extracted profile information.

## FR-006 Career Discovery

The system shall dynamically recommend career paths.

## FR-007 Career Explanation

The system shall explain career recommendations.

## FR-008 Skill Gap

The system shall identify current versus target skill gaps.

## FR-009 Roadmap

The system shall generate a personalized learning roadmap.

## FR-010 Progress

The system shall persist roadmap progress.

## FR-011 What-If

The system shall simulate hypothetical skills without modifying the original profile.

## FR-012 Job Analysis

The system shall analyze uploaded job descriptions.

## FR-013 Job Match

The system shall compare job requirements with the student's profile.

## FR-014 Readiness

The system shall provide a job-readiness evaluation.

## FR-015 Dashboard

The system shall provide a Career Command Center.

## FR-016 AI History

The system shall allow users to view previous AI interactions/results.

---

# 60. Non-Functional Requirements

## NFR-001 Security

Secrets and credentials must be protected.

## NFR-002 Reliability

Transient AI failures must be retried.

## NFR-003 Maintainability

AI capabilities must be modular.

## NFR-004 Scalability

Business logic must not depend on hardcoded career lists.

## NFR-005 Portability

The same logical PostgreSQL schema must work locally and in Supabase.

## NFR-006 Deployment

The system must be deployable to Vercel + Render + Supabase.

## NFR-007 Usability

Critical flows must be understandable without technical knowledge.

## NFR-008 Performance

Cached/persisted results should be preferred to repeated AI calls.

## NFR-009 Privacy

User data must be isolated by authenticated identity.

## NFR-010 Testability

AI integrations must be mockable.

---

# 61. Acceptance Criteria

## Authentication

- User can register.
- User can log in.
- Protected routes require authentication.
- Unauthorized users cannot access another user's data.

## Resume

- PDF/DOCX/TXT upload works.
- Invalid file types are rejected.
- Oversized files are rejected.
- Filename/path attacks are rejected.
- Gemini analysis works.
- Profile is persisted.
- User can edit the profile.

## Career

- Career recommendations are dynamically generated.
- No fixed career list is required.
- Match explanations are shown.
- Results persist.

## Skill Gap

- User can select a career.
- Skill gaps are generated.
- Current/target levels are represented.
- Gaps can feed roadmap generation.

## Roadmap

- User can generate a roadmap.
- Duration is configurable.
- Tasks are persisted.
- Tasks can be completed.
- Progress persists after refresh.

## What-If

- User can add hypothetical skills.
- Original profile remains unchanged.
- Before/After comparison is shown.
- Simulation can be revisited.

## Job Match

- User can upload PDF/DOCX/TXT.
- Requirements are extracted.
- Student-job comparison is generated.
- Missing skills and strengths are shown.
- Result persists.

## Dashboard

- Dashboard loads without unnecessary AI calls.
- Existing analyses are shown.
- Roadmap progress is shown.
- Recent AI history is visible.

---

# 62. 24-Hour Implementation Strategy

The implementation must optimize for an end-to-end demo.

## Phase 1 — Foundation

Estimated priority: highest.

Build:

```text
Repository
Next.js
FastAPI
PostgreSQL
SQLAlchemy
Alembic
Environment config
CORS
JWT
Health endpoint
```

Deliverable:

```text
Frontend ↔ Backend ↔ Database
```

## Phase 2 — Authentication + Profile

Build:

```text
Register
Login
JWT
Profile
Profile edit
```

Google OAuth may follow if email/password is stable.

## Phase 3 — Resume Pipeline

Build:

```text
Upload
Validation
Text extraction
Gemini
Normalization
Profile persistence
```

This creates the first major demo moment.

## Phase 4 — Career Intelligence

Build:

```text
Career recommendations
Career match score
Explanation
```

## Phase 5 — Skill Gap

Build:

```text
Target career
Skill gap
Priority
Current/target level
```

## Phase 6 — Roadmap

Build:

```text
Generate roadmap
Tasks
Progress
```

## Phase 7 — What-If

Build:

```text
Hypothetical skill
Temporary profile
Career engine
Before/After
```

This is a high-value hackathon differentiator.

## Phase 8 — Job Match

Build:

```text
Job upload
Job analysis
Match
Readiness
```

## Phase 9 — Dashboard + History

Build:

```text
Career Command Center
AI history
Cached summaries
```

## Phase 10 — Deployment

Deploy:

```text
Supabase
Render
Vercel
```

Then test the full flow in production.

---

# 63. Antigravity Agent Implementation Rules

The coding agent must follow these rules.

## Rule A — Build Vertically

Do not build every frontend page first.

Complete one working vertical slice:

```text
Auth
→ Resume
→ Profile
→ Career
→ Skill Gap
→ Roadmap
```

Then add What-If and Job Match.

## Rule B — Do Not Overengineer

Avoid:

- microservices;
- Kafka;
- Redis unless absolutely required;
- vector databases;
- complex event buses;
- unnecessary background workers;
- unnecessary abstraction layers.

## Rule C — Keep AI Modular

Each AI feature must have:

```text
prompt
service
normalizer
schema
API endpoint
```

## Rule D — Never Put Secrets in Frontend

No Gemini API key in Next.js.

## Rule E — Never Hardcode Career Rules

No:

```python
if career == ...
```

for career intelligence.

## Rule F — Preserve User Input

AI failure must never erase:

- uploaded file;
- profile edits;
- simulation input;
- job description.

## Rule G — Persist Important Results

If a Gemini result is expensive and meaningful, store it.

## Rule H — Avoid Duplicate AI Calls

Use persisted results unless the user explicitly regenerates.

## Rule I — Test Before Moving On

After each major feature:

```text
implement
→ run backend tests
→ run API tests
→ run frontend critical-flow test
→ fix
→ continue
```

## Rule J — Deploy Early

Do not wait until the final hour to discover deployment issues.

---

# 64. Recommended Implementation Order

```text
01. Project scaffold
02. Environment/config
03. PostgreSQL
04. SQLAlchemy
05. Alembic
06. User model
07. JWT auth
08. Register/login
09. Profile model/API
10. Frontend shell
11. Resume upload
12. File validation
13. Text extraction
14. Gemini client
15. AI prompt framework
16. AI normalizer
17. Resume analyzer
18. Profile generation
19. Career engine
20. Career recommendations
21. Skill gap engine
22. Roadmap engine
23. Roadmap persistence/progress
24. What-If simulator
25. Job analyzer
26. Job matcher
27. Job readiness
28. AI history
29. Dashboard
30. Error/loading/empty states
31. Tests
32. Supabase migration/config
33. Render deployment
34. Vercel deployment
35. Production end-to-end test
```

---

# 65. Suggested Backend Service Boundaries

```text
AuthService
ProfileService
ResumeService
CareerService
SkillGapService
RoadmapService
SimulationService
JobService
ReadinessService
AIHistoryService
```

Each service should coordinate repositories and AI modules rather than embedding all logic in route handlers.

---

# 66. Suggested Repository Boundaries

```text
UserRepository
ProfileRepository
ResumeRepository
CareerRepository
SkillGapRepository
RoadmapRepository
SimulationRepository
JobRepository
ReadinessRepository
AIInteractionRepository
```

Repositories should handle persistence operations.

Routes should not contain large database queries.

---

# 67. AI Normalization Strategy

Because the selected implementation decision is free-form Gemini output, normalization is a first-class technical requirement.

## 67.1 Normalization Pipeline

```text
Prompt
 ↓
Gemini
 ↓
Raw text
 ↓
Response cleaning
 ↓
Structured candidate extraction
 ↓
Pydantic/domain validation
 ↓
Repair/retry if possible
 ↓
Validated domain object
```

## 67.2 Normalizer Requirements

A normalizer must:

- tolerate markdown fences;
- tolerate introductory prose;
- extract structured fields when possible;
- reject impossible values;
- provide safe defaults where semantically appropriate;
- never invent missing facts;
- report normalization failure when required fields cannot be recovered.

## 67.3 Example

Gemini:

```text
Here are the careers I recommend:

1. Data Analyst — strong fit because...
2. ML Engineer — moderate fit because...
```

Normalizer:

```json
{
  "recommendations": [
    {
      "career": "Data Analyst",
      "match_score": null,
      "reasoning": "strong fit because..."
    },
    {
      "career": "ML Engineer",
      "match_score": null,
      "reasoning": "moderate fit because..."
    }
  ]
}
```

The application must not fabricate a score if Gemini did not provide sufficient information.

---

# 68. AI Score Handling

Scores must:

- be numeric when available;
- be constrained to the defined range;
- be clearly labeled as AI-generated indicators;
- not be represented as probability of employment;
- not be represented as guaranteed outcome.

If a score cannot be safely normalized, the API may return:

```json
{
  "score": null
}
```

rather than inventing one.

---

# 69. Data Snapshot Strategy

AI-generated results should be stored as snapshots.

Example:

```text
Profile v1
   ↓
Career Analysis v1
   ↓
Skill Gap v1
   ↓
Roadmap v1
```

If the user changes their profile:

```text
Profile v2
   ↓
New Career Analysis
```

Historical results remain distinguishable.

---

# 70. Transaction Requirements

Operations involving:

```text
AI result + database record
```

must use controlled transaction boundaries.

If persistence fails after AI succeeds:

- retain enough information to retry safely;
- do not silently report success;
- do not duplicate records on retry where possible.

---

# 71. Frontend UX Flow

## 71.1 First-Time User

```text
Landing
 ↓
Register/Login
 ↓
Upload Resume
 ↓
Processing
 ↓
Review AI Profile
 ↓
Confirm Profile
 ↓
Generate Career Landscape
 ↓
Explore Career
 ↓
View Skill Gap
 ↓
Generate Roadmap
 ↓
Track Progress
```

## 71.2 What-If

```text
Career Landscape
 ↓
What If?
 ↓
Add Skill
 ↓
Simulate
 ↓
Before / After
 ↓
Why Changed?
```

## 71.3 Job Match

```text
Job Match
 ↓
Upload JD
 ↓
Analyze
 ↓
Match
 ↓
Strengths
 ↓
Gaps
 ↓
Readiness
 ↓
Recommended Actions
```

---

# 72. Dashboard Layout

The dashboard should conceptually contain:

```text
┌──────────────────────────────────────────────┐
│ Career Command Center                        │
├──────────────────────────────────────────────┤
│ Profile / Career DNA                         │
├───────────────────┬──────────────────────────┤
│ Top Career Paths  │ Readiness                │
├───────────────────┼──────────────────────────┤
│ Skill Gaps        │ Roadmap Progress         │
├───────────────────┼──────────────────────────┤
│ Job Matches       │ What-If                  │
├───────────────────┴──────────────────────────┤
│ Recent AI History                            │
└──────────────────────────────────────────────┘
```

Exact visual styling is left to the frontend implementation while maintaining a coherent modern AI-product experience.

---

# 73. Animations

Framer Motion should be used selectively.

Good use cases:

- page transitions;
- card entrance;
- progress changes;
- career comparison;
- What-If before/after transitions;
- loading transitions.

Avoid excessive animations that slow the hackathon demo.

---

# 74. Hackathon Demo Requirements

The implementation should make the following demo possible:

```text
1. Upload resume
2. AI extracts profile
3. Show Career DNA/profile
4. Generate dynamic career landscape
5. Select a career
6. Show match reasoning
7. Show skill gaps
8. Generate roadmap
9. Open What-If
10. Add hypothetical skill
11. Show Before vs After
12. Upload job description
13. Show job match
14. Show job readiness
15. Return to dashboard
16. Show persistent history/progress
```

This should be the primary end-to-end acceptance demonstration.

---

# 75. Definition of Done

The MVP is considered technically complete when:

- [ ] Frontend builds successfully.
- [ ] Backend starts successfully.
- [ ] Database migrations run successfully.
- [ ] Registration works.
- [ ] Login works.
- [ ] JWT authorization works.
- [ ] Profile persists.
- [ ] Resume upload works.
- [ ] PDF/DOCX/TXT validation works.
- [ ] Resume text extraction works.
- [ ] Gemini integration works.
- [ ] Profile generation works.
- [ ] Career recommendation works.
- [ ] Career explanations work.
- [ ] Skill-gap generation works.
- [ ] Roadmap generation works.
- [ ] Roadmap progress persists.
- [ ] What-If simulation works.
- [ ] Original profile remains unchanged by simulation.
- [ ] Job description upload works.
- [ ] Job analysis works.
- [ ] Job matching works.
- [ ] Job readiness works.
- [ ] AI history is visible.
- [ ] Dashboard loads persisted data.
- [ ] AI failures show controlled errors.
- [ ] AI retry works.
- [ ] Rate limiting is active.
- [ ] User data is isolated.
- [ ] Gemini key is not exposed.
- [ ] Production environment is configured.
- [ ] Vercel frontend deploys.
- [ ] Render backend deploys.
- [ ] Supabase database works.
- [ ] Supabase storage works.
- [ ] Production critical flow is tested.

---

# 76. Future Extensions

These are intentionally outside the first implementation boundary:

## Adaptive Roadmap

```text
Learning
 ↓
Assessment
 ↓
Performance
 ↓
Roadmap Adaptation
```

## AI Project Generator

Generate portfolio projects based on:

- career;
- gaps;
- interests;
- current skills;
- difficulty.

## AI Resume Reviewer

Evaluate:

- weak sections;
- project descriptions;
- skill presentation;
- role-specific alignment.

## Automated Job Discovery

Add external approved job APIs later.

## Vector Search

Introduce embeddings and vector search only if a later version requires semantic retrieval.

---

# 77. Technical Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Gemini malformed output | Normalizer + validation + retry |
| Gemini rate limits | Backend rate limiting + caching |
| Large resume | File size limits + extraction limits |
| Malicious upload | MIME/content/path validation |
| Deployment mismatch | Same SQLAlchemy schema/migrations |
| Supabase storage failure | Storage adapter + controlled error |
| AI cost explosion | Explicit AI actions + caching |
| Dashboard latency | Persisted summaries |
| OAuth delay | Email/password remains primary |
| 24-hour scope creep | Vertical implementation order |
| Hardcoded career logic | AI-driven career intelligence |
| Simulation mutates profile | Deep-copy/in-memory simulation |
| Cross-user data access | JWT identity + ownership checks |
| AI fabrication | Prompt constraints + source-grounded normalization |

---

# 78. Implementation Notes for Google Antigravity

The coding agent should read this document as an implementation contract.

When requirements conflict, prioritize in this order:

```text
1. Security
2. End-to-end functionality
3. Data correctness
4. AI feature correctness
5. Persistence
6. Deployment
7. UI polish
8. Optional features
```

If time becomes constrained:

### Never cut

- authentication;
- database;
- resume upload;
- Gemini integration;
- profile;
- career recommendations;
- skill gap;
- roadmap;
- What-If;
- basic job match;
- dashboard;
- security.

### May be simplified

- Google OAuth;
- advanced animations;
- advanced AI history UI;
- complex visualizations;
- advanced assessments;
- project generator;
- resume reviewer.

### Do not add

- unnecessary infrastructure;
- large static career datasets;
- live scraping;
- microservices;
- vector DB;
- unrelated features.

---

# 79. Final System Definition

The completed application is an AI-powered personal career navigator for students.

A student should be able to start with:

> “I don't know what career is right for me.”

and progress through:

```text
My Profile
     ↓
Career Landscape
     ↓
Why These Careers?
     ↓
My Skill Gaps
     ↓
What I Should Learn
     ↓
My Personalized Roadmap
     ↓
My Progress
     ↓
What If I Learn X?
     ↓
Jobs I Can Target
     ↓
How Job-Ready I Am
```

The system is not a static career database.

It is not intended to be a generic chatbot.

It is an AI-driven navigation system that continuously connects:

```text
Student Context
      ↓
Career Intelligence
      ↓
Skill Intelligence
      ↓
Learning Intelligence
      ↓
Job Intelligence
      ↓
Career Decision Support
```

The architecture must preserve clean separation between:

```text
Next.js
FastAPI
AI Services
Gemini
SQLAlchemy
PostgreSQL
File Storage
Authentication
```

while keeping the implementation simple enough for a 24-hour hackathon build.

---

# 80. Source Alignment Note

This SRS is based on the supplied **AI Student Career Navigator Project Abstract** and the technical decisions selected during the requirements questionnaire.

The source project specification establishes the core principles of:

- dynamic career intelligence;
- no hardcoded career logic;
- Gemini as the primary AI layer;
- Next.js frontend;
- FastAPI backend;
- PostgreSQL persistence;
- modular AI services;
- secure server-side Gemini access;
- resume analysis;
- dynamic career recommendation;
- skill-gap analysis;
- personalized roadmap;
- Career What-If simulation;
- job matching;
- persistent application state;
- AI output validation and reliability.

The current SRS deliberately applies the user's later technical decisions where they differ from the original abstract, including:

- local PostgreSQL + production Supabase PostgreSQL;
- local storage + production Supabase Storage;
- PDF/DOCX/TXT uploads;
- email/password plus Google OAuth architecture;
- REST APIs;
- Render backend;
- persistent AI history;
- free-form raw Gemini responses with an internal normalization boundary;
- uploaded job descriptions instead of live job data;
- a single hackathon Gemini model configuration.

The original project abstract explicitly recommends structured AI outputs for reliable frontend consumption; the selected questionnaire decision changes the **raw provider response format**, not the requirement for validated application/domain data. Therefore normalization and application-level validation remain mandatory.

