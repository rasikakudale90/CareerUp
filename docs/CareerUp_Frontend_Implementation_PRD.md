# CareerUp — Exact Frontend Implementation PRD
## Google Antigravity AI Agent — Implementation Source of Truth

**Project:** CareerUp  
**Product:** AI Student Career Navigator  
**Build type:** Frontend-only implementation of the existing CareerUp prototype  
**Frontend:** Next.js + TypeScript  
**Hackathon constraint:** **24-hour building window**  
**Primary objective:** Rebuild the supplied CareerUp prototype as a polished, production-quality frontend **without redesigning the product or inventing a different UI**.

---

# 0. AGENT DIRECTIVE — READ FIRST

This document is the implementation contract.

The existing `CareerUp-Prototype-Codebase` is the visual and interaction reference. The goal is NOT to create another interpretation of CareerUp. The goal is to turn the prototype into the exact, refined frontend product.

### Non-negotiable rules

1. **Inspect the existing code before changing anything.**
2. Preserve the existing route structure unless a route is clearly broken.
3. Preserve the existing information architecture, terminology, content hierarchy, visual language, cards, interactions, and user journey.
4. Do not replace the prototype with a generic SaaS dashboard.
5. Do not redesign the UI because another pattern seems easier.
6. Do not remove GSAP/Lenis/3D/microinteractions already present or required by the prototype.
7. Use the existing design token document as the styling source of truth.
8. Use the existing prototype PRD as the interaction/experience source of truth.
9. Reuse existing components before creating duplicates.
10. Do not add backend architecture, database infrastructure, authentication services, or external APIs in this frontend phase unless explicitly requested.
11. The frontend must remain a **Next.js application**.
12. The entire core journey must be navigable end-to-end.
13. Every interactive control should have a visible, believable response.
14. No dead buttons, broken links, placeholder screens, or console errors in the demo path.
15. Prioritize a working, visually excellent hackathon build over unnecessary abstraction.
16. The prototype must be achievable and stable within the **24-hour hackathon window**.

---

# 1. PRODUCT DEFINITION

CareerUp is an AI-powered career navigation system for students.

It should answer four questions:

> **Where am I?**  
> **Where can I go?**  
> **What am I missing?**  
> **What should I do next?**

The product journey is:

`Resume / Profile → AI Career DNA → Career Discovery → Match Explanation → Skill Gap → Personalized Roadmap → What-If Simulation → Job Match → Job Readiness`

The dashboard is the central Career Command Center connecting the journey.

CareerUp is NOT:

- a generic chatbot;
- a static career list;
- a generic job board;
- a static course recommendation page;
- a resume parser with no downstream intelligence.

---

# 2. FRONTEND IMPLEMENTATION GOAL

The final frontend must feel like the same product as the supplied prototype, but more refined:

- premium;
- cinematic;
- calm;
- intelligent;
- trustworthy;
- editorial;
- responsive;
- highly interactive;
- visually distinctive;
- fast enough for a hackathon demo.

The visual direction combines:

- muted warm neutrals;
- charcoal/dark surfaces;
- editorial typography;
- large whitespace;
- glass/translucent surfaces;
- subtle grain;
- atmospheric imagery;
- controlled 3D;
- precise motion;
- premium microinteractions.

Do not overuse gradients, neon colors, excessive glow, or generic AI visual clichés.

---

# 3. EXISTING PROTOTYPE BASELINE

The supplied prototype already establishes the following frontend structure.

## Existing routes

```text
/
 /onboarding
 /dashboard
 /profile
 /career
 /skill-gap
 /roadmap
 /what-if
 /job-match
 /readiness
 /signin
 /signup
 /register
 /auth/signin
 /auth/register
```

The implementation should preserve these routes.

## Existing major components

```text
components/dashboard/AppShell.tsx
components/dashboard/CircularProgress.tsx
components/dashboard/RadarChartDNA.tsx
components/hero/CareerOrbit3D.tsx
components/layout/Footer.tsx
components/layout/Navbar.tsx
components/motion/LenisProvider.tsx
components/motion/SpotlightCard.tsx
components/theme/ThemeProvider.tsx
components/theme/ThemeToggle.tsx
lib/mock-data.ts
lib/prototype-state.tsx
lib/utils.ts
```

Reuse these where appropriate.

---

# 4. TECHNOLOGY CONTRACT

## Required

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide icons or existing icon system
- GSAP
- GSAP ScrollTrigger
- Lenis
- Three.js
- React Three Fiber where appropriate
- Framer Motion only where already useful; do not duplicate animation systems unnecessarily

## Existing prototype dependency baseline

The current prototype uses:

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `gsap`
- `lenis`
- `three`
- `framer-motion`
- `lucide-react`
- `clsx`
- `tailwind-merge`
- `canvas-confetti`

Do not replace these unnecessarily.

## Animation ownership

Use:

**GSAP**
- hero choreography;
- ScrollTrigger;
- timeline sequences;
- section reveals;
- complex motion;
- number/count-up animations;
- pinned scenes.

**Lenis**
- global smooth scrolling.

**Three.js/R3F**
- 3D orbit/career visualization;
- controlled floating objects;
- depth scenes.

**CSS**
- simple hover;
- opacity;
- border;
- color;
- small transitions.

**Framer Motion**
- only where it already provides a simpler local component transition.

Avoid having multiple animation libraries fight over the same element.

---

# 5. DESIGN SOURCE OF TRUTH

Use:

```text
AI_Career_Navigator_Design_Tokens.md
```

as the styling contract.

Important visual foundations:

## Palette

Primary reference tones:

```text
#1A1917
#EFF0F8
#49423A
#BABBC3
#47382A
#8E705A
```

Use semantic tokens rather than scattering raw hex values throughout components.

## Typography

Use the existing typography system defined by the design tokens.

Current prototype already uses:

- Plus Jakarta Sans
- Inter

Do not randomly introduce additional fonts.

## Surfaces

Use a mixture of:

- warm light surfaces;
- white content surfaces;
- dark cinematic surfaces;
- translucent glass cards;
- subtle borders;
- restrained shadows.

## Radius

Use the existing token system consistently.

## Shadows

Shadows must be soft and premium, not exaggerated.

## Grain

Subtle grain may be applied to cinematic sections.

---

# 6. GLOBAL APP ARCHITECTURE

## Root layout

The root layout should provide:

- fonts;
- metadata;
- theme;
- prototype state;
- Lenis;
- global CSS.

Existing providers should be preserved where useful.

Recommended structure:

```text
RootLayout
 ├─ ThemeProvider
 ├─ PrototypeProvider
 ├─ LenisProvider
 └─ application content
```

Do not introduce unnecessary provider layers.

---

# 7. GLOBAL NAVIGATION

## Public navigation

Landing page navigation should include the prototype's established information architecture.

Primary navigation:

```text
Home
Explore Careers
Roadmap
What If
Find Jobs
Resources
```

Actions:

```text
Sign In
Get Started
```

The navigation should feel lightweight and editorial.

## Dashboard navigation

The application shell should expose:

```text
Dashboard
Career Paths
Skill Gap
Roadmap
What If Simulator
Job Match
Job Readiness
AI Conversations
Profile
```

The selected route must be visually obvious.

## Navigation behavior

- desktop: fixed/anchored shell as defined by prototype;
- mobile: compact navigation/drawer;
- active state animated subtly;
- route transitions must not flash or feel abrupt;
- preserve scroll behavior where appropriate.

---

# 8. LANDING PAGE

Route:

```text
/
```

The landing page is the cinematic entry point.

## Required sequence

1. Navbar
2. Hero
3. Hero 3D Career Orbit
4. Trust/social proof
5. Career DNA intelligence section
6. Career landscape
7. Skill gap intelligence
8. Personalized roadmap
9. What-If simulator
10. Job matching
11. Job readiness
12. AI history/trust
13. Final CTA
14. Footer

## Hero content hierarchy

The prototype establishes a career-future-focused headline around:

> Discover your next career move.

Primary actions:

```text
Upload Your Resume
Explore 6 AI Career Tracks
```

Supporting proof includes:

```text
50,000+ students
95%
3x Faster
80%+
```

Do not replace these with generic SaaS copy unless the source prototype has already changed them.

---

# 9. HERO VISUAL SYSTEM

The hero is one of the highest-priority visual areas.

## Hero must contain

- oversized editorial headline;
- supporting paragraph;
- primary CTA;
- secondary CTA;
- social proof;
- atmospheric visual treatment;
- Career Orbit 3D scene;
- floating intelligence cards;
- subtle mouse response;
- controlled depth;
- premium entrance animation.

## Floating concepts

The prototype establishes floating career intelligence concepts such as:

- Explore Career Paths
- Analyze Your Skills
- What If Simulator
- Personalized Roadmap
- Find Real Job Opportunities

These should feel like part of one intelligent system.

---

# 10. CAREER ORBIT 3D

Component:

```text
components/hero/CareerOrbit3D.tsx
```

This is a signature visual.

## Requirements

- Three.js/R3F based;
- subtle orbit motion;
- depth;
- floating career nodes/cards;
- mouse influence;
- gentle idle movement;
- no excessive CPU usage;
- responsive scaling;
- hidden/simplified version on low-power/mobile devices.

## Interaction

Mouse movement should create a subtle parallax/orbit response.

Do not make the scene spin aggressively.

## Reduced motion

When:

```text
prefers-reduced-motion: reduce
```

disable continuous motion and provide a static representation.

---

# 11. HERO ENTRANCE ANIMATION

Use GSAP.

Suggested choreography:

```text
0ms       page shell appears
150ms     navbar fades/slides in
300ms     eyebrow appears
450ms     headline reveals
700ms     supporting text appears
850ms     CTA group appears
1000ms    social proof appears
1200ms    3D orbit settles into idle motion
```

Use subtle transforms and opacity.

Avoid bounce-heavy animations.

---

# 12. LANDING — CAREER DNA

Purpose:

Show that CareerUp evaluates multiple dimensions instead of a single resume keyword score.

Required concepts:

- Technical;
- Analytical;
- Communication;
- Leadership;
- Domain intelligence where applicable.

Visual:

- radar/polygon visualization;
- metric chips;
- explanatory text;
- premium card surface.

The section should reveal progressively on scroll.

---

# 13. CAREER LANDSCAPE

Show multiple AI-generated career possibilities.

Prototype concept:

```text
Career Path
Match %
Demand
Compensation
Open Roles
Why You Match
Missing Skills
Growth Projection
```

Career cards must feel exploratory rather than like a generic job-board list.

## Card interactions

On hover:

- slight lift;
- border emphasis;
- shadow/depth change;
- icon motion;
- match score emphasis.

On click:

- navigate to `/career`;
- selected career becomes the active career target.

---

# 14. CAREER PAGE

Route:

```text
/career
```

Purpose:

Deep-dive into the selected career.

Required information:

- career title;
- match score;
- average compensation;
- market demand;
- open roles;
- why the student matches;
- missing skills;
- growth projection;
- top companies;
- primary CTA to start roadmap.

## Primary CTA

```text
Start Roadmap
```

must navigate to:

```text
/roadmap
```

with the selected career retained in prototype state.

---

# 15. SKILL GAP PAGE

Route:

```text
/skill-gap
```

Purpose:

Convert career ambition into a concrete skill deficit.

Top-level summary:

```text
Current Match
Critical Blockers
Est. Time to Close
```

Required content:

- current proficiency;
- required proficiency;
- gap size;
- relevance;
- market demand;
- estimated learning hours;
- recommended action;
- resource;
- roadmap action.

## Skill categories

Use:

```text
Critical
Advantage
Bonus
```

## Main CTA

```text
Add to Learning Roadmap
```

Secondary:

```text
Simulate Lift
```

which routes/opens the What-If experience.

---

# 16. ROADMAP PAGE

Route:

```text
/roadmap
```

Purpose:

Turn the skill gap into an executable plan.

Required:

- active target career;
- readiness score;
- phases;
- milestone progression;
- task list;
- completion state;
- readiness delta.

## Task categories

```text
Learn
Build
Publish
```

## Task interaction

Clicking a task checkbox must:

- update state;
- animate completion;
- update progress;
- update readiness where applicable;
- persist in localStorage during prototype mode.

## Milestones

Statuses:

```text
completed
in-progress
locked
```

Use visual progression.

---

# 17. WHAT-IF SIMULATOR

Route:

```text
/what-if
```

This is the signature hackathon feature.

Purpose:

Show how changing one part of a student's profile changes career possibilities.

## Required UI

- Simulation Sandbox Mode indicator;
- active simulations;
- simulated readiness;
- skill selector;
- projected match delta;
- before/after comparison;
- explanation.

## Interaction

A student selects skills.

Example:

```text
LangGraph
Vector Databases
Agentic Graphs
Generative AI
```

Toggling a skill should immediately update the simulated state.

## Important rule

Simulation state must remain isolated from the original profile.

Never mutate the original profile simply because the simulation is active.

## Visual moment

The most important interaction is:

```text
CURRENT
68%

        → simulation →

SIMULATED
82%
```

with animated score delta.

Use GSAP for the transition.

---

# 18. JOB MATCH PAGE

Route:

```text
/job-match
```

Purpose:

Show whether the student is ready for a real target job description.

## Required capabilities

- predefined job matches;
- custom job-description input/upload UI;
- compatibility analysis;
- matched skills;
- missing skills;
- overall match;
- actions.

Prototype copy includes:

```text
Analyze Custom Job Description
Analyze Any Tech Job Posting
Run Compatibility Analysis
```

When analysis runs, show an AI-processing state:

```text
Extracting ATS Match Signals...
```

Do not leave the UI frozen.

---

# 19. JOB MATCH RESULT

Result should show:

- match percentage;
- matched skills;
- missing skills;
- job title;
- company;
- location;
- work type;
- salary;
- application state;
- recommended actions.

If the prototype supports applying:

```text
Apply
```

must update the visible application state.

No fake external application should actually be submitted in frontend-only mode.

---

# 20. JOB READINESS PAGE

Route:

```text
/readiness
```

Purpose:

Provide an overall readiness assessment.

Required sections:

- readiness score;
- readiness tier;
- AI recruiter synthesis;
- competency breakdown;
- verified strengths;
- interview areas to defend;
- recommended actions;
- roadmap acceleration CTA.

Prototype language includes:

```text
Tier-1 Competitive
AI Recruiter Synthesis
Accelerate Roadmap
View 90%+ Job Fits
```

The visual hierarchy should make the readiness score immediately understandable.

---

# 21. DASHBOARD / CAREER COMMAND CENTER

Route:

```text
/dashboard
```

This is the central product surface.

## Header

Show:

- greeting;
- supporting message;
- search/AI input;
- profile/avatar;
- notification affordance where present.

Prototype greeting:

> Your future is full of possibilities. Let's explore.

## Dashboard cards

Required:

### Career DNA

Show:

- radar chart;
- technical;
- analytical;
- communication;
- leadership;
- active career direction.

### Top Career Matches

Show several career cards with:

- title;
- match;
- demand;
- visual identity.

### What-If Simulator

Show:

- projected match lift;
- skill prompt;
- launch action.

Prototype concept:

```text
Projected Match Lift:
+14% to AI Roles
```

### Skill Gap

Show:

```text
Top Priority Gap to Close
Vector Databases & Hybrid RAG
~20 hrs
```

### Roadmap

Show:

- active plan;
- progress;
- current phase;
- tasks.

### Job Matches

Show:

- job count;
- match rate;
- company logos/marks;
- action.

### AI Career Insights

Show:

- insight category;
- title;
- message;
- action.

---

# 22. PROFILE PAGE

Route:

```text
/profile
```

Required:

- profile summary;
- Career DNA;
- multidimensional radar;
- technical depth;
- analytical rigor;
- communication/craft;
- ownership/leadership;
- verified projects;
- experience;
- skills.

Prototype includes:

```text
AI Career DNA Summary
Multidimensional DNA Polygon
Verified Project Portfolio
```

Keep this as a credible student profile, not a social network profile.

---

# 23. ONBOARDING

Route:

```text
/onboarding
```

Purpose:

Allow the prototype to demonstrate profile ingestion without requiring a full backend.

Prototype currently supports example student personas:

```text
Aditi Sharma
Alex Morgan
```

The frontend may preserve these demo personas.

## Primary CTA

```text
Generate Career DNA & Roadmap
```

On completion:

```text
/dashboard
```

## UX

Show AI processing state rather than an instant unexplained redirect.

Example staged messages:

```text
Reading profile...
Mapping skills...
Evaluating career fit...
Finding priority gaps...
Building your roadmap...
```

---

# 24. AUTHENTICATION UI

Routes:

```text
/signin
/signup
/register
/auth/signin
/auth/register
```

Frontend requirements:

- premium branded auth surfaces;
- form validation;
- loading state;
- error state;
- successful navigation;
- consistent typography and tokens.

For prototype mode, local state may be used.

Do not build production OAuth/backend behavior unless explicitly requested.

---

# 25. PROTOTYPE STATE

Existing state source:

```text
lib/prototype-state.tsx
```

Preserve the concept of centralized prototype state.

State includes:

- authentication;
- current user;
- student profile;
- selected career;
- skill gaps;
- roadmap;
- simulation skills;
- jobs;
- insights;
- readiness;
- completion counts.

Persist appropriate prototype state with localStorage.

Do not introduce Redux/Zustand unless the current architecture genuinely requires it.

---

# 26. MOCK DATA

Existing source:

```text
lib/mock-data.ts
```

Preserve existing data structures.

Important domain types include:

```text
StudentProfile
CareerPath
SkillGapItem
RoadmapTask
RoadmapMilestone
SimulationSkill
JobListing
AIInsight
```

Do not create competing duplicate domain models.

---

# 27. APP SHELL

Existing component:

```text
components/dashboard/AppShell.tsx
```

It should own:

- sidebar;
- content shell;
- header;
- responsive navigation;
- active route state;
- consistent page spacing.

All dashboard/application pages should use the same shell unless there is a deliberate prototype exception.

---

# 28. MOTION SYSTEM

Motion must be consistent.

## Global principles

- reveal;
- transform;
- depth;
- feedback;
- continuity.

Never animate everything simultaneously.

## Timing guidance

Use the existing design-token timing scale.

General:

```text
micro: 120–180ms
standard: 240–400ms
emphasis: 500–900ms
cinematic: 900–1600ms
```

Use appropriate easing from the design tokens.

---

# 29. GSAP REQUIREMENTS

GSAP should be used for:

- hero timeline;
- scroll reveals;
- pinned scenes;
- score transitions;
- roadmap progression;
- What-If score transitions;
- staggered cards;
- number counters;
- major page transitions where justified.

## React safety

Use:

```text
useLayoutEffect / gsap.context()
```

or an equivalent cleanup pattern.

Every GSAP animation must clean itself up on unmount.

Do not create duplicate timelines on re-render.

---

# 30. SCROLLTRIGGER REQUIREMENTS

Use ScrollTrigger for cinematic sections such as:

```text
Hero
Career DNA
Career Landscape
Skill Gap
Roadmap
What-If
Job Match
Readiness
Final CTA
```

Recommended behaviors:

- fade + translate;
- stagger;
- scale/depth;
- horizontal card movement;
- pinned storytelling where justified.

Do not make the entire site one giant pinned animation.

---

# 31. LENIS

Use the existing:

```text
components/motion/LenisProvider.tsx
```

for global smooth scrolling.

Requirements:

- one global Lenis instance;
- integrate ScrollTrigger update;
- clean up on unmount;
- avoid nested smooth-scroll containers;
- do not break native keyboard scrolling.

---

# 32. MICROINTERACTIONS

Required categories:

## Buttons

- hover lift;
- subtle arrow movement;
- pressed state;
- disabled state;
- loading state.

## Cards

- hover lift;
- border emphasis;
- subtle tilt where appropriate;
- spotlight effect where appropriate.

## Skill chips

- hover;
- selected;
- simulated;
- disabled.

## Progress

- animated fill;
- completion state;
- score update.

## Match score

- count-up;
- circular/radial transition;
- positive delta highlight.

## Tasks

- checkbox animation;
- completion strike/opacity;
- progress update.

## Tabs

- active indicator movement.

---

# 33. SHIMMER SYSTEM

All meaningful asynchronous-looking UI should have premium loading states.

Use shimmers for:

- AI analysis;
- resume processing;
- dashboard loading;
- career generation;
- skill-gap generation;
- roadmap generation;
- job matching;
- readiness synthesis.

Shimmers must be subtle and aligned with the surface color.

Do not use generic bright skeletons.

---

# 34. AI PROCESSING EXPERIENCE

When an AI-like operation is triggered, show progress.

Example:

```text
Analyzing your profile...
Understanding your skills...
Mapping career possibilities...
Identifying skill gaps...
Building your roadmap...
```

The processing state should:

- prevent accidental duplicate submission;
- provide visual feedback;
- transition into the result;
- handle failure gracefully.

---

# 35. CURSOR / MOUSE SYSTEM

Desktop only.

## Cursor glow

Subtle radial/spotlight effect.

## Magnetic buttons

Only for major CTAs.

## Card tilt

Use sparingly on:

- hero floating cards;
- career cards;
- selected dashboard cards.

Do not apply tilt to every card.

Disable advanced mouse effects on touch devices.

---

# 36. SPOTLIGHT CARD

Existing component:

```text
components/motion/SpotlightCard.tsx
```

Reuse for premium interactive cards.

Requirements:

- pointer-aware spotlight;
- subtle border response;
- no excessive brightness;
- no performance-heavy global event listeners.

---

# 37. 3D PERFORMANCE

3D is a premium enhancement, not a reason to sacrifice usability.

Rules:

- keep geometry simple;
- avoid huge texture files;
- use device-aware quality;
- reduce effects on mobile;
- avoid rendering offscreen scenes;
- respect reduced motion;
- preserve readable UI if WebGL fails.

Fallback must still look intentional.

---

# 38. RESPONSIVE DESIGN

## Desktop ≥ 1200px

- full cinematic layouts;
- 3D hero;
- multi-column dashboards;
- hover effects;
- full sidebar.

## Tablet 768–1199px

- reduce card density;
- reduce 3D scale;
- simplify navigation;
- preserve hierarchy.

## Mobile < 768px

- single-column layouts;
- compact header;
- drawer navigation;
- reduced 3D;
- no cursor effects;
- touch-friendly controls;
- horizontal overflow only when intentionally designed;
- preserve critical content order.

Never simply shrink desktop into mobile.

---

# 39. ACCESSIBILITY

Required:

- semantic headings;
- keyboard navigation;
- visible focus;
- accessible labels;
- adequate contrast;
- button semantics;
- form labels;
- reduced-motion support;
- alt text for meaningful images;
- no interaction dependent only on hover.

---

# 40. IMAGE / MEDIA RULES

Use supplied project assets where they already exist.

Existing relevant assets include:

```text
public/career2.png
public/images/career.png
public/images/career1.png
public/images/career2.png
public/images/Screenshot (35).png
public/images/Screenshot (36).png
public/images/Screenshot (37).png
```

Do not unnecessarily replace supplied reference imagery.

For remote images already used by the prototype, preserve the visual intent.

Do not add random stock imagery that changes the prototype identity.

---

# 41. COMPONENT SYSTEM

Prefer reusable components.

Suggested structure:

```text
components/
  layout/
  dashboard/
  hero/
  motion/
  career/
  skill-gap/
  roadmap/
  what-if/
  job-match/
  readiness/
  profile/
  ui/
```

Only create a new component when it has a clear reuse or complexity benefit.

---

# 42. PAGE-LEVEL ACCEPTANCE CRITERIA

## Landing

- visually matches prototype;
- hero works;
- 3D works/falls back gracefully;
- scroll sections work;
- CTAs navigate correctly;
- motion is polished.

## Onboarding

- demo persona selection/input works;
- AI processing state works;
- navigation works.

## Dashboard

- shell works;
- cards render;
- data is coherent;
- actions navigate;
- progress reflects state.

## Career

- selected career renders;
- match information is visible;
- roadmap CTA works.

## Skill Gap

- skill gaps render;
- proficiency visualization works;
- actions work.

## Roadmap

- tasks toggle;
- progress changes;
- state persists.

## What-If

- skills toggle;
- simulated score changes;
- before/after is visible;
- original profile is untouched.

## Job Match

- jobs render;
- custom analysis interaction works;
- processing state works;
- match result is visible.

## Readiness

- score renders;
- synthesis renders;
- competency breakdown renders;
- actions work.

## Profile

- profile renders;
- DNA renders;
- projects/skills/experience render.

---

# 43. NAVIGATION ACCEPTANCE TEST

A demo user must be able to complete:

```text
Landing
 ↓
Get Started
 ↓
Onboarding
 ↓
Generate Career DNA
 ↓
Dashboard
 ↓
Career
 ↓
Skill Gap
 ↓
Roadmap
 ↓
What-If
 ↓
Job Match
 ↓
Readiness
 ↓
Profile
```

No route should dead-end unexpectedly.

Browser back/forward must remain usable.

---

# 44. DEMO DATA CONSISTENCY

The same student should appear consistently across:

- onboarding;
- dashboard;
- profile;
- career;
- skill gap;
- roadmap;
- what-if;
- job match;
- readiness.

Example prototype student:

```text
Aditi Sharma
Aspiring AI Product Engineer
B.Tech Computer Science & Engineering
2026
```

If switching to the alternative demo persona, all downstream UI should update coherently.

---

# 45. VISUAL QUALITY GATE

Before declaring frontend complete, inspect every major route at desktop and mobile sizes.

Check:

### Typography
- no wrapping mistakes;
- correct hierarchy;
- no accidental bold;
- no clipped text.

### Spacing
- consistent rhythm;
- no excessive whitespace;
- no cramped cards.

### Cards
- aligned;
- equal visual weight;
- consistent borders/radius.

### Motion
- no flicker;
- no layout jumps;
- no duplicate animation;
- no scroll locking bugs.

### 3D
- no WebGL crash;
- no giant blank canvas;
- no performance regression.

### Responsive
- no horizontal page overflow;
- no clipped CTA;
- no unusable sidebar.

---

# 46. PERFORMANCE QUALITY GATE

Before completion:

- run production build;
- fix TypeScript errors;
- fix lint errors;
- inspect console;
- test navigation;
- test localStorage;
- test task toggling;
- test simulation toggling;
- test job apply state;
- test mobile layout;
- test reduced motion.

Avoid unnecessary dependency additions.

---

# 47. 24-HOUR HACKATHON IMPLEMENTATION ORDER

## Phase 1 — Foundation

- inspect prototype;
- preserve package setup;
- preserve routes;
- establish tokens;
- verify layout/providers/state.

## Phase 2 — Global shell

- Navbar;
- Footer;
- AppShell;
- responsive navigation;
- typography;
- surfaces.

## Phase 3 — Landing

- hero;
- GSAP entrance;
- 3D orbit;
- scroll sections;
- CTAs.

## Phase 4 — Dashboard

- shell;
- Career DNA;
- career matches;
- skill gap;
- roadmap;
- What-If;
- job matches;
- insights.

## Phase 5 — Functional pages

- career;
- skill gap;
- roadmap;
- What-If;
- job match;
- readiness;
- profile.

## Phase 6 — Onboarding/auth

- onboarding;
- sign-in;
- sign-up;
- navigation.

## Phase 7 — Interaction polish

- GSAP;
- ScrollTrigger;
- Lenis;
- shimmers;
- hover;
- microinteractions;
- mouse effects.

## Phase 8 — Responsive

- tablet;
- mobile;
- touch;
- reduced motion.

## Phase 9 — QA

- production build;
- lint;
- route audit;
- console audit;
- visual audit;
- demo rehearsal.

---

# 48. DO NOT BUILD

Do not add during this frontend phase:

- microservices;
- Redis;
- queues;
- production database;
- payment systems;
- real job scraping;
- unnecessary CMS;
- admin portal;
- native mobile application;
- unnecessary state-management frameworks;
- generic chatbot as the primary experience;
- unrelated analytics dashboards.

These are outside the current frontend objective.

---

# 49. DO NOT REDESIGN

The following are explicitly prohibited unless required to fix a functional problem:

- replacing the visual identity;
- changing the core color system;
- changing the page hierarchy;
- changing route names;
- removing What-If;
- removing 3D;
- replacing GSAP with CSS-only motion;
- removing Lenis;
- replacing the dashboard architecture;
- turning the product into a conventional SaaS admin panel;
- simplifying away the cinematic landing experience.

The goal is:

> **Prototype parity first. Refinement second. Innovation only where it does not break parity.**

---

# 50. ANTIGRAVITY EXECUTION PROTOCOL

The AI agent should work in small verified phases.

For each phase:

```text
1. Inspect existing implementation.
2. Identify the exact files involved.
3. State the intended change internally.
4. Implement only that phase.
5. Run lint/build/type checks where relevant.
6. Verify the affected route in the browser.
7. Fix errors immediately.
8. Continue to the next phase.
```

Do not rewrite the whole repository blindly.

Do not generate hundreds of unrelated files.

Do not replace working components simply because another implementation is easier.

---

# 51. FINAL DEFINITION OF DONE

CareerUp frontend is complete when:

- all required routes work;
- the complete student journey is navigable;
- the visual system matches the prototype;
- dashboard is the central command center;
- Career DNA is visible;
- career discovery works;
- skill gap works;
- roadmap works;
- What-If works;
- job matching works;
- readiness works;
- profile works;
- onboarding works;
- state persists in prototype mode;
- GSAP is used for major motion;
- ScrollTrigger drives scroll storytelling;
- Lenis provides smooth scrolling;
- 3D is present where specified;
- shimmers exist for processing/loading states;
- microinteractions are present;
- responsive layouts work;
- reduced-motion support exists;
- no major console errors exist;
- production build succeeds;
- the full demo can be performed reliably within the **24-hour hackathon context**.

---

# 52. FINAL AGENT COMMAND

> **Build CareerUp as the exact refined frontend of the supplied prototype. Do not interpret the product from scratch. Inspect the existing implementation, preserve its information architecture and visual language, reuse existing components/data/state, and progressively improve visual fidelity, responsiveness, motion, and reliability. Use Next.js + TypeScript as the foundation, GSAP + ScrollTrigger for cinematic motion, Lenis for smooth scrolling, and Three.js/R3F for the specified 3D experience. Every core page and interaction must work end-to-end. Prioritize demo-critical functionality and visual polish because this is a hackathon project with a strict 24-hour building window.**
