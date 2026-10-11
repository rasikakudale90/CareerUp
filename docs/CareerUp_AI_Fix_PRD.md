# CareerUp AI — Fixes Product Requirements Document (PRD)

**Product:** CareerUp AI — student career guidance and readiness platform  
**Target application:** https://career-up-indol.vercel.app/  
**Version:** 1.0  
**Prepared:** 10 October 2026  
**Audience:** Product owner, frontend/backend developers, AI/ML engineer, QA, and hackathon team.

> **Purpose:** Provide an implementation-ready plan to improve reliability, security, data integrity, AI quality, and product credibility. Findings from the public-site review are items to validate in source code and controlled tests—not confirmed vulnerabilities unless explicitly reproduced.

## 1. Executive Summary

CareerUp AI helps students explore careers, analyze resumes, identify skill gaps, build learning roadmaps, simulate skill improvements, and assess job readiness. This fix initiative focuses on making those experiences accurate, safe, explainable, and reliable before broad public use.

The public-site review surfaced areas that require verification: sample/demo data may be confused with verified candidate information; readiness labels and percentile claims may not be sufficiently explained; the What-If simulator presents fixed score and compensation changes; the job-match route appeared to remain in a loading state during public retrieval; and resume processing raises important privacy and security requirements. These are audit observations and test targets, not proof that every underlying feature is broken.

**Product principle:** No invented evidence, no unsupported employment promises, no exposure of personal data, and no silent failure.

## 2. Problem Statement

- Users may be unable to distinguish demo examples from their own analyzed data.
- Career-readiness scores, match percentages, salary estimates, and percentile claims may be interpreted as objective predictions without transparent methods or supporting data.
- Key user journeys can fail silently if AI APIs, job data sources, parsing, or navigation do not complete successfully.
- Resume files and AI prompts contain sensitive personal information and must be handled with strict access controls and data-retention rules.
- A polished dashboard can create false confidence if results are static, inconsistent between pages, or not reproducible.

## 3. Goals and Non-Goals

### Goals

- Make demo and production data unmistakably distinct throughout the application.
- Secure uploads, storage, API secrets, sessions, and user-specific records.
- Make all primary routes and core workflows complete, recoverable, and testable.
- Use a consistent, documented readiness and role-match scoring method.
- Make AI recommendations grounded in user-provided evidence and clearly communicate uncertainty.
- Show truthful job, salary, and learning-resource information with sources and freshness indicators.
- Establish automated functional, security, and regression tests.

### Non-goals for this release

- Guaranteeing employment, salary outcomes, percentile rankings, or interview success.
- Building a complete job-board crawler or enterprise HR system from scratch.
- Claiming a security certification or regulatory compliance without formal review.
- Replacing professional career counseling or making high-stakes decisions solely from an AI score.

## 4. Users and Core Journeys

| User | Primary need | Success journey |
|---|---|---|
| Student / first-time user | Understand career options from current skills and interests | Onboard → enter profile or upload resume → review extracted facts → select target role → receive explained recommendations |
| Returning student | Track progress and update a roadmap | Sign in → view saved profile → update skill evidence → complete tasks → see consistent updated results |
| Job seeker | Compare profile with a specific job | Select or paste a job description → review requirement matches and gaps → open verified source listing |
| Demo / judge | Understand product capabilities without confusing mock data for real analysis | Enter clearly marked demo mode → explore seeded examples → reset demo safely |

## 5. Scope and Priority

| Priority | Scope | Release gate |
|---|---|---|
| **P0 — Critical** | Secret handling, authorization, private file storage, upload validation, demo/real data separation, privacy and deletion behavior | Do not launch with real resumes until passed |
| **P1 — Core reliability** | Navigation, job-match loading/errors, resume parsing, persistence, score consistency, Gemini failure handling | All primary journeys pass QA |
| **P2 — AI trust** | Explainable scoring, grounded recommendations, source-backed job/salary data, removal or substantiation of claims | Results are traceable and not misleading |
| **P3 — Polish** | Responsive UI, accessibility, performance, copy improvements, empty states | No major usability blockers |

## 6. Functional Requirements

### FR-01 — Demo mode
The product must display a persistent, clear demo label whenever seeded or synthetic data is shown. Demo actions must not modify production user records. Demo data must be resettable.

### FR-02 — User profile
Users must be able to review and correct resume-extracted facts before those facts influence career recommendations. Store evidence provenance for each extracted skill where feasible.

### FR-03 — Resume upload
Accept only explicitly supported file types; enforce configurable size/page limits; validate content server-side; use safe parsing; return clear errors; prevent duplicate processing.

### FR-04 — AI extraction
Return structured, schema-validated output for education, skills, projects, and experience. Unknown values must remain unknown, not be invented.

### FR-05 — Target role
Users must be able to choose or enter a target role. Recommendations must be conditional on target role and user inputs, not one hardcoded roadmap for every user.

### FR-06 — Skill-gap analysis
For each required skill, show requirement, current evidence/proficiency, gap, reason, and recommended next step. Mark missing evidence as “not assessed” rather than “no skill.”

### FR-07 — Readiness score
Use one versioned scoring service and formula across all pages. Explain components, weights, limitations, and last-updated date. Do not show percentiles unless a defensible benchmark dataset exists.

### FR-08 — What-If simulator
Recalculate results from the chosen role, skill relevance, proficiency change, and documented scoring rules. Do not imply a score increase guarantees a salary increase.

### FR-09 — Roadmap
Create tasks with a skill objective, estimated effort, learning resource, completion criterion, and source URL. Persist completion for authenticated users and support retry/undo.

### FR-10 — Job match
Provide explicit loading, success, empty, timeout, and error states. Show source, location, posting date when available, job requirements, match rationale, and a working application link.

### FR-11 — Salary data
Show currency, geography, pay period, source, collection date, and whether the value is an estimate or sourced listing. Hide unsupported ranges.

### FR-12 — Cross-page consistency
Dashboard, skill-gap, roadmap, simulator, and readiness views must use the same user profile version and scoring version.

### FR-13 — Account and data deletion
Users must be able to request deletion of resumes, extracted profile data, generated outputs, and account-linked records, subject to clearly disclosed legal/operational retention limits.

### FR-14 — Observability
Log errors and latency without logging raw resume text, secrets, or unnecessary personal information. Provide request IDs for support/debugging.

## 7. Security and Privacy Requirements

- **Secrets:** Gemini/API credentials and database secrets must be stored in server-side environment variables or a managed secret store. Never ship secrets in frontend bundles or public source maps.
- **Authorization:** Every API request that reads or changes user data must verify identity and ownership on the server. Do not trust a client-supplied user ID.
- **Uploads:** Allowlist extensions and MIME types, inspect file signatures where possible, cap file size and page count, generate internal filenames, and isolate parsers. Consider malware scanning where supported.
- **Storage:** Keep resumes private by default. Use short-lived signed links only when needed. Avoid public buckets and guessable object paths.
- **Prompt injection:** Treat resume text and pasted job descriptions as untrusted content. Do not let document instructions override system policy, invoke privileged tools, or expose other users' data.
- **Rate limits:** Apply per-user and per-IP request limits, upload limits, model token budgets, timeouts, and cost monitoring.
- **Data minimization:** Collect only required fields, define retention periods, document third-party AI processing, and never send more personal data to the model than needed.
- **Deletion:** Deletion must cover primary storage, derived records, and scheduled cleanup of backups/logs where applicable; communicate any unavoidable retention.
- **Abuse protection:** Validate and encode displayed text, protect against XSS and injection, use secure cookies/session settings, and apply CSRF protection where the chosen authentication design requires it.

## 8. AI Quality, Scoring, and Evaluation

### Architecture recommendation

- Use Gemini for extraction, summarization, and natural-language recommendations; do not delegate arithmetic or authorization decisions to free-form model output.
- Validate model responses against strict schemas and reject, repair, or safely fall back when fields are missing or malformed.
- Store provenance: user input, extraction evidence, model/version identifier where available, prompt/config version, timestamp, and scoring version—while minimizing retained sensitive content.
- Use a deterministic scoring service for readiness and role matching. Make the formula configurable, versioned, and documented.
- Use retrieval from curated or verified sources for learning resources and job data. Clearly distinguish generated advice from externally sourced facts.

### Scoring requirements

- Define score components and weights before implementation; document how each component is normalized.
- Do not infer proficiency from a keyword alone. Prefer evidence from projects, work, assessments, or user-confirmed skills.
- Represent missing evidence as unknown and show confidence or evidence coverage separately from readiness.
- A What-If result must state that it is a scenario estimate, not a hiring or compensation prediction.
- Do not publish “top percentile,” placement-rate, student-count, or outcome-improvement claims unless the data source, sample, date, and methodology can be verified.

## 9. UX and Accessibility Requirements

- Every asynchronous page must have loading, success, empty, and recoverable error states.
- Explain technical terms in plain language; place advanced details behind optional explanations.
- Support narrow Android viewport widths without horizontal scrolling or clipped controls.
- Ensure keyboard navigation, visible focus, meaningful labels, sufficient contrast, and accessible status announcements.
- Confirm destructive actions such as deleting a resume; clearly communicate what will be deleted.
- Show timestamps and stale-data warnings for time-sensitive job and salary information.

## 10. Technical Implementation Guidance

Use the existing repository and architecture as the source of truth. Do not rewrite the stack before reviewing the code. If the project uses Next.js, a Python API, PostgreSQL, and Gemini, the following separation is recommended:

| Layer | Responsibility |
|---|---|
| Frontend | Navigation, forms, explicit demo state, user review of extracted data, accessible loading/error states; no secrets or trusted scoring logic |
| Backend API | Authentication/authorization, validation, upload orchestration, rate limiting, persistence, audit-safe logs, and API contracts |
| Resume processing | Isolated parsing pipeline, type/size limits, structured extraction, evidence capture, schema validation, and safe failure handling |
| AI adapter | Single server-side Gemini integration, configurable model settings, timeout/retry policy, output validation, usage/cost controls |
| Domain services | Versioned readiness scoring, role matching, roadmap generation, source validation, and What-If calculations |
| Database/storage | User-owned records, schema constraints, migration strategy, private object storage, retention and deletion workflows |
| External data | Job and salary sources with provenance, freshness timestamps, deduplication, and source-link validation |

### Environment configuration

- Maintain a documented `.env.example` with names and safe placeholders only; never commit real credentials.
- Validate required environment variables at server startup and fail clearly when a required service is not configured.
- Separate local, preview/staging, and production configuration and data stores.
- Keep model name, limits, timeouts, feature flags, upload limits, and source configuration environment-driven where appropriate.
- Use database migrations and a repeatable seed script. Seed data must be explicitly marked as demo.

## 11. Acceptance Criteria

- **AC-01:** Demo data is labelled on every relevant screen and cannot be confused with a real user profile.
- **AC-02:** No Gemini key, database credential, or private token is discoverable in browser assets or network responses.
- **AC-03:** A user cannot read, update, or delete another user's resume/profile by changing an identifier in a request.
- **AC-04:** Invalid, oversized, corrupted, and unsupported files fail safely with a clear message; supported files process successfully.
- **AC-05:** AI output that violates the schema is rejected or handled safely; no fabricated skill is silently saved as verified.
- **AC-06:** Readiness and role-match values are reproducible from the same profile and scoring version across all pages.
- **AC-07:** Job-match route exits loading state on success, no results, timeout, or failure; no infinite spinner.
- **AC-08:** Roadmap task updates persist for the correct user and survive refresh; demo completion remains clearly demo-only.
- **AC-09:** Salary/job claims display source and relevant context, or are removed/labelled illustrative.
- **AC-10:** User deletion workflow removes the defined data set and provides a clear completion/failure result.
- **AC-11:** Core flows pass automated tests and a manual mobile/accessibility review.
- **AC-12:** Errors and latency can be investigated through request IDs without logging raw resume content or secrets.

## 12. Test Plan

### Functional tests

- Onboarding with manual entry and with each supported file format.
- Resume extraction review/edit/confirm flow, including missing or ambiguous information.
- Different target roles and user profiles produce appropriately different explanations and roadmaps.
- Roadmap task completion, undo, refresh, logout/login, and demo reset.
- Job matching with valid results, zero results, expired links, source timeout, malformed response, and service outage.
- Cross-page consistency after profile edits and scoring-version updates.

### Security tests

- Cross-user authorization tests for read, update, upload, export, and delete endpoints.
- Upload fuzzing with malformed files, extension/MIME mismatch, very large files, and parser edge cases.
- Secret scanning of repository, build artifacts, source maps, and browser network requests.
- Prompt-injection test documents and pasted job descriptions; verify no privileged action or cross-user disclosure occurs.
- Rate-limit and cost-control tests for repeated uploads and AI requests.
- Session expiration, logout invalidation, and applicable CSRF/XSS/injection checks.

### Non-functional tests

- Set and measure a target page/API latency after obtaining a baseline; track p95 latency rather than relying on a single request.
- Test on small Android viewport sizes, keyboard-only navigation, and common modern browsers.
- Run dependency/security scanning and review high-severity findings before launch.
- Test database migration rollback/recovery and backup/restore procedures appropriate to the deployment.

## 13. Suggested Delivery Plan

| Phase | Work | Exit criteria |
|---|---|---|
| **Phase 0 — Audit** | Map routes, API endpoints, database tables, upload flow, Gemini calls, auth, and deployed environment variables. Reproduce findings. | Issue list contains severity, reproduction steps, evidence, owner, and test. |
| **Phase 1 — Secure** | Fix secrets, access control, upload validation, private storage, rate limits, and demo/production separation. | P0 security acceptance criteria pass. |
| **Phase 2 — Stabilize** | Repair loading/error states, parsing, persistence, cross-page state, and AI schema handling. | All primary user journeys pass in staging. |
| **Phase 3 — Trust** | Standardize scores, explain results, verify source-backed claims, remove unsupported statistics. | Scores are reproducible and user-facing claims are traceable. |
| **Phase 4 — QA & release** | Automated regression, manual mobile/accessibility testing, monitoring, release checklist, rollback plan. | No open critical/high issues without explicit risk acceptance. |

## 14. Suggested Ownership

| Role | Responsibilities |
|---|---|
| Product owner | Scope, acceptance criteria, claim review, privacy copy, prioritization, release sign-off |
| Frontend developer | Routes, demo labels, forms, accessibility, loading/error states, cross-page UX |
| Backend developer | AuthZ, upload pipeline, persistence, API validation, rate limits, deletion and logs |
| AI/ML developer | Gemini adapter, structured outputs, prompt-injection mitigations, scoring methodology, evaluation set |
| QA / security reviewer | Reproduction steps, regression tests, authorization tests, upload abuse tests, release verification |

## 15. Risks and Dependencies

- External Gemini, job-data, and salary-data services may be unavailable, rate-limited, costly, or change response formats.
- A reliable percentile or salary benchmark may not be available; remove those claims rather than manufacture a benchmark.
- Historical demo records may already be mixed with real records; data migration and cleanup may be required.
- Resume parsing quality varies by file layout and language; provide review/edit controls and a manual-entry fallback.
- Privacy, data retention, and applicable legal obligations should be reviewed for the deployment regions and actual data flows.

## 16. Definition of Done

- All P0 items have passed the relevant acceptance and security tests.
- All P1 flows pass on staging with documented reproduction and regression coverage.
- Every user-facing score and claim is explainable, traceable, or removed.
- No known critical or high-severity security issue remains open without documented approval and mitigation.
- Privacy notice, retention policy, deletion behavior, and third-party AI data handling are accurate.
- Deployment environment, migration, monitoring, rollback, and owner handoff are documented.

## 17. Audit Notes and Assumptions

This PRD is based on a public-page review of CareerUp AI and the visible behavior/claims surfaced during that review. Review targets included sample profile metrics and demo controls; readiness/percentile language; fixed What-If score and compensation boosts; a job-match page that appeared to remain in a loading state in public retrieval; and salary/job statistics that need sourcing. The review did not include repository inspection, authenticated testing, API penetration testing, database access, or confirmation of every deployed interaction. Therefore, security items are requirements to verify, not assertions that an exploit has been proven.

Before implementation, create a ticket for each issue with: **severity, affected route/API, reproduction steps, expected behavior, actual behavior, evidence, owner, acceptance test, and deployment status.**

---

**End of document**
