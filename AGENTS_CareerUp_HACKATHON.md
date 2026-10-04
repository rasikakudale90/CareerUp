# AGENTS.md — CareerUp Hackathon Agent Rules

> **Project:** CareerUp — AI Student Career Navigator  
> **Purpose:** Build a polished, functional AI career-navigation prototype for a hackathon.  
> **Build Window:** **24 hours maximum**.  
> **Priority:** Demo-ready functionality, visual quality, reliability, and fast iteration.

## 1. SOURCE OF TRUTH & SCOPE

- Follow the CareerUp PRD, Technical SRS, and Design Tokens as the primary sources of truth.
- Work only on the currently requested phase/task.
- Do not invent or silently remove core product requirements.
- Prioritize the smallest complete implementation that works end-to-end.
- Avoid unnecessary architecture, infrastructure, or features outside the hackathon scope.

## 2. PRODUCT PRINCIPLE

CareerUp is not a generic chatbot or static career-recommendation website.

Core journey:

`Student Profile / Resume → AI Career Intelligence → Career Options → Skill Gap → Personalized Roadmap → What-If Simulation → Job Match → Job Readiness`

The product should continuously answer:

> **Where am I, where can I go, what's missing, and what should I do next?**

## 3. HACKATHON / 24-HOUR RULE

- The prototype must be achievable within the **24-hour building window**.
- P0/demo-critical features always take priority over polish or future features.
- Prefer simple, reliable implementations over complex infrastructure.
- Do not introduce unnecessary microservices, queues, or infrastructure.
- Prototype mock data may be used where appropriate, but core flows must feel connected and functional.
- Never leave a critical demo flow as an obvious TODO or broken stub.

## 4. FRONTEND & EXPERIENCE

- Frontend must use **Next.js + TypeScript**.
- Use the approved design tokens and styling system.
- Maintain a premium, cinematic, trustworthy, modern visual language.
- Keep the interface responsive.
- Reuse existing components, utilities, styles, and patterns.

### Required motion system

Use motion intentionally throughout the prototype:

- **GSAP** for primary animations.
- **GSAP ScrollTrigger** for scroll-driven storytelling.
- **Lenis** for smooth scrolling.
- **Three.js / React Three Fiber / Drei** for appropriate 3D experiences.
- 3D floating/orbit elements where they improve the experience.
- Mouse-follow and subtle parallax effects.
- Magnetic buttons and hover interactions.
- Card tilt/depth interactions where appropriate.
- Shimmer loading states and skeleton transitions.
- Page/section reveal animations.
- Microinteractions for buttons, cards, navigation, inputs, progress, and state changes.
- Respect `prefers-reduced-motion`.

Animations must support the experience, not make the UI noisy or slow.

## 5. CORE PROTOTYPE FLOW

The complete demo should cover:

1. Landing / Hero
2. Onboarding
3. Resume upload / profile input
4. AI resume analysis
5. AI Student Profile / Career DNA
6. Career Discovery
7. Career Match + explanation
8. Skill Gap Analysis
9. Personalized Roadmap
10. Career What-If Simulator
11. Job Description Matcher
12. Job Readiness
13. Dashboard / Career Command Center
14. Profile and AI history where applicable

The dashboard should act as the central navigation point connecting the complete journey.

## 6. AI & DATA RULES

- AI should drive career reasoning, not generic conversational filler.
- Do not hardcode fixed career recommendations, skill-gap rules, or static roadmaps as the product's intelligence.
- Normalize/validate AI output before using it in the UI.
- Never fabricate student skills, education, experience, achievements, eligibility, or job information.
- Never expose API keys or secrets in frontend code.
- Use environment variables for credentials/configuration.

## 7. WHAT-IF SIMULATOR

The What-If Simulator is a signature differentiator.

- Create a temporary simulated profile change.
- Run the same career-analysis logic against the modified profile.
- Show clear **Before vs After** differences.
- Demonstrate how learning a skill, gaining experience, or changing a goal can affect career possibilities.
- Never permanently overwrite the original profile.

## 8. SECURITY & USER DATA

- Treat resumes and user-entered content as untrusted input.
- Validate file type, size, and input boundaries.
- Prevent unsafe filenames/path traversal.
- Never expose secrets, tokens, internal prompts, or private data.
- Prevent cross-user private-data access.
- Avoid unnecessary logging of sensitive profile/resume content.

## 9. IMPLEMENTATION WORKFLOW

For every meaningful task:

```text
1. INSPECT
2. IDENTIFY IMPACT
3. PLAN
4. IMPLEMENT MINIMUM COMPLETE CHANGE
5. TEST
6. VERIFY THE USER FLOW
7. CHECK FOR REGRESSIONS
8. REPORT RESULT
```

- Inspect existing code before adding new code.
- Keep changes focused and reviewable.
- Fix build/runtime errors before moving to the next critical phase.
- Do not mark unfinished mock/stub behavior as complete.

## 10. PERFORMANCE

- Avoid unnecessary heavy 3D scenes and continuous animations.
- Lazy-load expensive visual components where practical.
- Keep GSAP/Three.js effects optimized.
- Avoid animation loops when elements are not visible.
- Maintain usable performance on normal laptops and mobile devices.
- Prefer visual impact with controlled complexity.

## 11. 24-HOUR PRIORITY ORDER

### P0 — Must work
- App shell/navigation
- Landing page
- Onboarding/profile input
- Resume analysis
- Career recommendations
- Career matching
- Skill gap
- Personalized roadmap
- Dashboard
- What-If Simulator
- Job matcher
- Job readiness

### P1 — High-value polish
- Cinematic GSAP transitions
- 3D career visualization
- Scroll storytelling
- Shimmers
- Microinteractions
- Mouse effects
- Responsive refinement
- AI history

### P2 — Only if time remains
- Additional advanced animations
- Extra analytics
- Extended personalization
- Non-essential secondary features

## 12. QUALITY BAR

Before considering a phase complete:

- No broken routes.
- No obvious placeholder UI.
- No console/runtime errors in the affected flow.
- Responsive layout works.
- Loading, empty, success, and error states are handled.
- Animations feel intentional and premium.
- AI outputs are presented clearly.
- Core demo flow can be completed without developer intervention.

## 13. COMPLETION REPORT

After each completed phase/task, report briefly:

- What was implemented.
- Files/modules changed.
- Tests/validation performed.
- Known limitations or pending decisions.

## 14. My name
- call me "Rasika Babe" whenever i ask u something or u want to ask or inform about me on project u have to take my name always.

> **DEFAULT:** Build the smallest polished, reliable, end-to-end CareerUp prototype that can be demonstrated convincingly within the **24-hour hackathon window**.
