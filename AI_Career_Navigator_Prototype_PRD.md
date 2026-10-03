# CareerUp — Prototype PRD (AI Student Career Intelligence Platform)

**Prototype:** Next.js only  
**Implementation Agent:** Google Antigravity  
**Visual Reference:** NexEvent — AI for Event Management Website (Career Page), Robbi Darwis / Flow Forge  
**Primary Goal:** Build a premium, cinematic, hackathon-distinctive CareerUp prototype  
**Status:** Implementation-ready  
**Prototype Scope:** Frontend-only interactive prototype with realistic mock data and simulated AI states  
**Animation Stack:** GSAP + ScrollTrigger + Lenis + Three.js/React Three Fiber  
**UI Stack:** Next.js + TypeScript + Tailwind CSS + Framer Motion + Semantic Dynamic Themes

---

# 1. Prototype Objective

Build **CareerUp** as a professional Next.js prototype that demonstrates the product's core idea:

> **A resume tells a student where they are. CareerUp tells them where they can go, what's missing, and what they should do next.**

The prototype must make that concept immediately understandable within the first 30–60 seconds.

It should feel:

- premium;
- trustworthy;
- intelligent;
- cinematic;
- human;
- interactive;
- technically impressive;
- clearly different from a generic AI chatbot;
- clearly different from a normal student dashboard.

---

# 2. Reference Analysis

The provided NexEvent Career Page uses a visual system centered around:

1. Cinematic image-led hero.
2. Compact navigation.
3. Large editorial headline.
4. Pill-shaped CTA controls.
5. Dark translucent metric cards.
6. Light editorial content sections.
7. Human/team profile cards.
8. Structured opportunity listings.
9. Dark cinematic final CTA.
10. Strong visual contrast between dark and light sections.
11. Large whitespace.
12. Rounded cards with subtle shadows.
13. Professional, trustworthy typography.
14. Warm neutral color palette.

The source page explicitly describes its experience as focusing on people, opportunities, culture, expertise, testimonials, job browsing, filters, and direct application actions.

The prototype should preserve those visual principles but translate the information architecture to career intelligence:

```text
People / Culture
→ Student Career DNA

Career Opportunities
→ AI Career Landscape

Role Filters
→ Career / Skill / Goal Filters

Application / Opportunity
→ Roadmap / Job Match / Readiness

Company Mission CTA
→ Personal Career CTA
```

The prototype must **not** copy NexEvent's text, imagery, branding, or exact composition.

---

# 3. Core Product Story

The prototype should communicate one continuous narrative:

```text
I have a resume.
        ↓
AI understands me.
        ↓
What careers fit me?
        ↓
Why?
        ↓
What am I missing?
        ↓
What should I learn?
        ↓
What happens if I learn X?
        ↓
Can I match a real job?
        ↓
How ready am I?
```

This is the product story.

---

# 4. Prototype Scope

## 4.1 Required Screens

Build these screens/routes:

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
```

The prototype may use client-side mock state instead of a backend.

## 4.2 Required Interactive Features

The prototype must demonstrate:

- resume upload simulation;
- AI analysis loading state;
- generated Career DNA;
- career recommendation cards;
- career match explanations;
- skill-gap visualization;
- personalized roadmap;
- roadmap task interaction;
- What-If skill simulation;
- Before/After career comparison;
- job-description upload simulation;
- job match visualization;
- readiness visualization;
- dashboard summary;
- smooth scrolling;
- GSAP scroll choreography;
- 3D floating career objects;
- mouse hover interactions;
- microinteractions;
- shimmer loading states.

---

# 5. Technology Requirements

## 5.1 Framework

**Next.js strictly.**

Use:

```text
Next.js
TypeScript
React
```

Do not use:

- Vue;
- Angular;
- plain HTML-only implementation;
- separate frontend frameworks.

## 5.2 Styling

Use:

```text
Tailwind CSS
shadcn/ui
```

The design tokens from `DESIGN_TOKENS.md` are authoritative.

## 5.3 Animation

Mandatory:

```text
GSAP
GSAP ScrollTrigger
Lenis
```

Use Framer Motion only for lightweight component-level interactions where GSAP would be unnecessarily complex.

## 5.4 3D

Use:

```text
three
@react-three/fiber
@react-three/drei
```

3D must remain lightweight.

---

# 6. Recommended Project Structure

```text
app/
├── page.tsx
├── onboarding/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
├── profile/
│   └── page.tsx
├── career/
│   └── page.tsx
├── skill-gap/
│   └── page.tsx
├── roadmap/
│   └── page.tsx
├── what-if/
│   └── page.tsx
├── job-match/
│   └── page.tsx
└── readiness/
    └── page.tsx

components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── PageTransition.tsx
│
├── hero/
│   ├── CareerHero.tsx
│   ├── CareerOrbit.tsx
│   └── FloatingCareerCard.tsx
│
├── career/
│   ├── CareerCard.tsx
│   ├── CareerLandscape.tsx
│   ├── MatchScore.tsx
│   └── CareerExplanation.tsx
│
├── profile/
│   ├── CareerDNA.tsx
│   ├── SkillCloud.tsx
│   └── ProfileSummary.tsx
│
├── skill-gap/
│   ├── SkillGapCard.tsx
│   ├── SkillComparison.tsx
│   └── PriorityIndicator.tsx
│
├── roadmap/
│   ├── RoadmapTimeline.tsx
│   ├── RoadmapNode.tsx
│   └── RoadmapTask.tsx
│
├── simulator/
│   ├── WhatIfInput.tsx
│   ├── BeforeAfter.tsx
│   └── CareerOrbitComparison.tsx
│
├── jobs/
│   ├── JobUploader.tsx
│   ├── JobMatchCard.tsx
│   └── RequirementComparison.tsx
│
├── readiness/
│   ├── ReadinessScore.tsx
│   └── ReadinessBreakdown.tsx
│
├── dashboard/
│   ├── CommandCenter.tsx
│   ├── InsightCard.tsx
│   ├── ProgressCard.tsx
│   └── RecentAIHistory.tsx
│
├── motion/
│   ├── SmoothScroll.tsx
│   ├── ScrollReveal.tsx
│   ├── MagneticButton.tsx
│   ├── CursorGlow.tsx
│   └── ParallaxImage.tsx
│
└── ui/
    └── shadcn components

lib/
├── mock-data.ts
├── motion.ts
├── utils.ts
└── prototype-state.ts

public/
├── images/
└── textures/
```

---

# 7. Prototype State

Use a lightweight React state/context solution.

No backend is required for this prototype.

Create a central mock state:

```ts
interface PrototypeState {
  profile: StudentProfile;
  careers: CareerRecommendation[];
  selectedCareer: string | null;
  skillGaps: SkillGap[];
  roadmap: Roadmap;
  simulations: Simulation[];
  jobMatches: JobMatch[];
  readiness: Readiness;
  aiHistory: AIHistoryItem[];
}
```

Persist prototype state to:

```text
localStorage
```

This allows navigation without losing the demo state.

---

# 8. Mock Student

Use one believable fictional student.

Example:

```text
Name:
Alex Morgan

Education:
B.Tech Computer Science

Skills:
Python
JavaScript
React
SQL
Git
Figma

Projects:
Campus Event Platform
AI Study Assistant
Expense Tracker

Experience:
Student Developer Intern

Interests:
AI
Product Development
Data
Automation
```

The mock student should feel realistic.

Do not use a real person's information.

---

# 9. Landing Page

The landing page is the most important visual screen.

## 9.1 Hero

Hero background:

- cinematic landscape;
- dark warm overlay;
- subtle grain;
- slow parallax;
- floating 3D career objects.

Navigation:

```text
Career Navigator
Career Map
Skill Gaps
Roadmap
Job Match
What-If

[Enter Navigator]
```

Hero eyebrow:

```text
AI CAREER NAVIGATOR
```

Headline:

```text
Turn your skills
into your next
career move.
```

Supporting copy:

```text
AI understands where you are,
where you want to go,
and what you need to do next.
```

CTA:

```text
Discover My Career Path →
```

Secondary CTA:

```text
See How It Works
```

---

# 10. Hero 3D Experience

The hero must contain a floating 3D intelligence object.

Concept:

```text
Central Career Core
       │
 ┌─────┼─────┐
 │     │     │
Skill Career Job
Node  Node   Node
```

The central object slowly rotates.

Nodes:

```text
Python
AI
React
Data
Product
Cloud
```

The objects should:

- float;
- rotate;
- react subtly to mouse movement;
- have depth;
- cast soft shadows/glow;
- remain behind important text.

Mouse interaction:

```text
cursor movement
→ camera/parallax movement
→ node movement
```

Maximum movement should remain subtle.

---

# 11. Hero Entrance Animation

On page load:

### 0ms

Background visible.

### 150ms

Navbar fades/slides down.

### 300ms

Eyebrow appears.

### 450ms

Headline reveals line-by-line.

### 700ms

Body copy appears.

### 850ms

CTA buttons appear.

### 1000ms

3D objects become visible.

### 1200ms

Metric cards rise into position.

Use:

```text
GSAP timeline
power4.out
```

Do not animate every word independently.

---

# 12. Hero Metrics

Adapt the reference's three dark metric cards.

Use:

```text
Career Paths
Skill Gaps
Next Steps
```

Example:

```text
12
Career paths discovered

7
High-impact skill gaps

30
Days to your next milestone
```

These are prototype values.

Cards should overlap the lower hero area.

Hover:

```text
translateY(-6px)
shadow increase
```

---

# 13. Section — Career DNA

Use a light section.

Eyebrow:

```text
YOUR CAREER DNA
```

Headline:

```text
AI sees more than
what's written on your resume.
```

Body:

```text
Your education, skills, projects, interests
and experience become one evolving career profile.
```

Visual:

Large central profile card with:

```text
Strengths
Skills
Interests
Experience
Career Signals
```

Around it, floating small skill chips.

Use GSAP to animate chips into position on scroll.

---

# 14. Career DNA Card

Main card:

```text
Alex Morgan
B.Tech Computer Science

Career DNA

Builder
Analytical
AI Curious
Product Minded
```

Skill indicators:

```text
Python       82
React        78
SQL          74
AI           62
Product      55
```

Do not use rainbow progress bars.

Use neutral warm visual indicators.

---

# 15. Section — Career Landscape

Eyebrow:

```text
YOUR POSSIBILITIES
```

Headline:

```text
See where your
current skills can take you.
```

Display 3–5 career cards.

Example:

```text
AI Product Engineer
88% Match

Data Analyst
84% Match

ML Engineer
76% Match

Product Engineer
73% Match
```

Each card includes:

- match score;
- why it fits;
- top matching skills;
- top missing skill;
- Explore button.

---

# 16. Career Card Interaction

On hover:

```text
card rises
background slightly darkens
score enlarges
arrow moves right
skill chips reveal
```

On click:

```text
card expands
→ explanation panel
```

Explanation:

```text
Why this fits

✓ Python
✓ React
✓ Product projects

What you're missing

+ Machine Learning
+ Model deployment
```

---

# 17. Career Landscape Scroll Animation

Use ScrollTrigger.

As the section enters:

```text
cards start at y=80px
opacity 0
scale .96
```

Animate to:

```text
y=0
opacity 1
scale 1
```

Stagger:

```text
0.08–0.12s
```

As the section exits, no dramatic reverse animation is required.

---

# 18. Section — Skill Gap Intelligence

Dark section.

Eyebrow:

```text
THE GAP
```

Headline:

```text
Know exactly
what's holding you back.
```

Show a comparison:

```text
CURRENT
Python ████████░░ 4/5
SQL    ███████░░░ 3.5/5
ML     ███░░░░░░░ 1.5/5

TARGET
Python █████████░ 4.5/5
SQL    █████████░ 4.5/5
ML     ████████░░ 4/5
```

Add priority labels:

```text
HIGH IMPACT
MEDIUM
FOUNDATION
```

---

# 19. Skill Gap Interaction

Click a skill:

```text
Skill detail panel
```

Example:

```text
Machine Learning

Current level
1.5 / 5

Target
4 / 5

Why it matters
This skill connects your current Python
foundation to your target ML career.

Roadmap
12 learning tasks
18 estimated hours
```

CTA:

```text
Add to Roadmap →
```

---

# 20. Section — Personalized Roadmap

Light section.

Eyebrow:

```text
YOUR NEXT STEPS
```

Headline:

```text
Not a generic course list.
A path built around you.
```

Display a cinematic vertical roadmap.

```text
01
Foundation
Python for ML
✓ Complete

02
Core Skill
ML fundamentals
● Current

03
Applied Practice
Build a prediction model
○ Upcoming

04
Portfolio
Ship one complete project
○ Upcoming

05
Job Readiness
Target role simulation
○ Upcoming
```

---

# 21. Roadmap Animation

Use ScrollTrigger.

As user scrolls:

```text
timeline line draws
node activates
task card enters
```

Each node:

```text
scale .8 → 1
opacity 0 → 1
```

The active node gets a subtle warm accent ring.

---

# 22. Roadmap Interaction

Click a task:

```text
expanded detail
```

Example:

```text
Build a Customer Churn Model

Estimated time
3 hours

Skills
Python
Pandas
Machine Learning

Outcome
A portfolio-ready model with
documented evaluation.
```

Buttons:

```text
Mark Complete
Open Task
```

On completion:

```text
check animation
progress updates
next node subtly activates
```

---

# 23. Signature Section — What-If Simulator

This is the hero feature for the hackathon.

Dark cinematic section.

Eyebrow:

```text
CAREER WHAT-IF
```

Headline:

```text
What changes
if you learn one more skill?
```

Supporting:

```text
Don't guess. Simulate it.
```

Input:

```text
+ Add a skill
```

Suggested chips:

```text
Machine Learning
AWS
Docker
Generative AI
Data Analytics
```

CTA:

```text
Simulate Impact
```

---

# 24. What-If Animation

Initial state:

```text
CURRENT CAREER LANDSCAPE
```

User selects:

```text
Generative AI
```

Click:

```text
Simulate Impact
```

Animation sequence:

```text
1. UI freezes briefly.
2. Skill chip rises.
3. Skill enters central career orbit.
4. Orbit expands.
5. Existing career nodes shift.
6. New career nodes appear.
7. Match scores count upward/downward.
8. New skill gaps appear.
9. Explanation card slides in.
```

Use GSAP timeline.

Duration:

```text
1.2–1.8 seconds
```

---

# 25. What-If Before/After

Before:

```text
AI Product Engineer     88%
ML Engineer             76%
Data Analyst            84%
```

After Generative AI:

```text
AI Product Engineer     94%   +6
ML Engineer             84%   +8
Data Analyst            86%   +2
```

Add:

```text
3 new career signals
2 reduced skill gaps
1 new recommended project
```

These are mock prototype values.

---

# 26. What-If Explanation

Display:

```text
Why did the landscape change?

Generative AI strengthens your existing
Python + React foundation and opens
additional AI-product pathways.

Your biggest remaining gap:
Model deployment.
```

CTA:

```text
Add This Path to My Roadmap
```

---

# 27. Section — Real Job Match

Use a light section.

Eyebrow:

```text
REAL-WORLD ALIGNMENT
```

Headline:

```text
See how your profile
matches the jobs you want.
```

Upload UI:

```text
Drop a job description
PDF / DOCX / TXT

or

Choose File
```

Simulated loading:

```text
Reading requirements...
Understanding the role...
Comparing your profile...
Building your match...
```

Use shimmer.

---

# 28. Job Match Result

Display:

```text
82%
Job Match
```

Breakdown:

```text
Strong matches
✓ React
✓ Python
✓ REST APIs
✓ Git

Missing
× Docker
× AWS

Experience
Good alignment

Education
Strong alignment
```

CTA:

```text
Close the Gap →
```

---

# 29. Job Match Interaction

Click:

```text
Close the Gap
```

Navigate or scroll to roadmap with:

```text
Roadmap updated for this job.
```

Show:

```text
2 new priority tasks
1 project recommendation
14-day focus path
```

This visually connects:

```text
Job → Gap → Roadmap
```

---

# 30. Section — Job Readiness

Dark or image-backed section.

Eyebrow:

```text
READINESS
```

Headline:

```text
Know what to improve
before you apply.
```

Large circular score:

```text
78%
```

Around it:

```text
Skills       84%
Experience   71%
Projects    82%
Role Fit     77%
```

Underneath:

```text
3 priority improvements
```

CTA:

```text
View My Readiness →
```

---

# 31. Trust Section

The reference uses human/team imagery to create trust.

For Career Navigator, use:

```text
AI recommendations,
human decisions.
```

Copy:

```text
The navigator helps you understand
your options. You remain in control
of every career decision.
```

Show three principles:

```text
Explainable
Every recommendation includes why.

Editable
You control your profile.

Adaptive
Your path evolves as you do.
```

Use simple icons.

---

# 32. AI History Section

Show:

```text
Recent AI Insights
```

Cards:

```text
Career Discovery
Today
4 career paths identified

Skill Gap
Today
7 priority skills identified

What-If: Generative AI
Yesterday
3 career paths changed

Job Match
Yesterday
82% match
```

Clicking opens the relevant result.

---

# 33. Final CTA

Use a full-width cinematic section.

Background:

- mountain/forest/abstract landscape;
- dark overlay;
- subtle moving grain.

Headline:

```text
Your next career move
starts with understanding
where you are.
```

Supporting:

```text
Upload your resume.
Let AI map the path forward.
```

Buttons:

```text
Start My Career Analysis
Explore the Navigator
```

---

# 34. Footer

Dark footer.

Logo:

```text
Career Navigator
```

Navigation:

```text
Career Map
Skill Gaps
Roadmap
What-If
Job Match
Readiness
```

Small statement:

```text
AI-powered career intelligence
for the next generation.
```

---

# 35. Dashboard

Dashboard should not look like a generic admin panel.

## Header

```text
Good morning, Alex.

Your career path is moving.
```

Subtext:

```text
You have 3 high-impact actions this week.
```

CTA:

```text
Continue Roadmap →
```

## Main Cards

```text
Career Direction
AI Product Engineer
88% match

Roadmap
Day 12 / 30

Job Readiness
78%

Skill Gaps
7 remaining
```

---

# 36. Dashboard Career Landscape

Use a horizontal or radial visualization.

Center:

```text
You
```

Around it:

```text
AI Product Engineer
Data Analyst
ML Engineer
Product Engineer
```

Connect through subtle lines.

Hover a career:

```text
highlight node
fade others
show tooltip
```

---

# 37. Profile Page

Display:

```text
Career DNA
```

Sections:

```text
Education
Experience
Skills
Projects
Interests
Career Signals
Goals
```

Allow editing.

Use cards rather than form-heavy layout.

---

# 38. Career Page

Header:

```text
Your Career Landscape
```

Filters:

```text
All
High Match
Emerging
Stretch
```

Career cards.

Selecting one opens:

```text
Career detail
```

with:

```text
Match
Why
Strengths
Gaps
Suggested roadmap
```

---

# 39. Skill Gap Page

Header:

```text
Close the Gap
```

Show:

```text
Target Career
```

Then:

```text
Critical Gaps
Important Gaps
Optional Gaps
```

Each gap:

```text
Skill
Current
Target
Priority
Why
Roadmap
```

---

# 40. Roadmap Page

Header:

```text
Your 30-Day Career Path
```

Controls:

```text
7 days
14 days
30 days
60 days
90 days
```

Prototype should update mock duration.

Show:

```text
Progress
Current milestone
Tasks
Estimated hours
Completed
Upcoming
```

---

# 41. What-If Page

Dedicated simulator.

Layout:

```text
Left:
Current profile

Center:
Career orbit

Right:
Simulation result
```

Mobile:

```text
Profile
↓
Skill
↓
Simulation
↓
Before/After
```

---

# 42. Job Match Page

Layout:

```text
Upload
 ↓
Analyze
 ↓
Match
 ↓
Gap
 ↓
Action Plan
```

Make each stage visually clear.

---

# 43. Readiness Page

Large score.

Then:

```text
Skills
Projects
Experience
Education
Job Fit
```

Show:

```text
Ready now
Improve first
Longer-term
```

Do not use red/green extremes excessively.

---

# 44. Navbar Behavior

At top:

```text
transparent
```

After scrolling:

```text
rgba(239,240,248,0.78)
backdrop-filter blur(16px)
border-bottom subtle
```

On dark section:

```text
dark variant
```

Use GSAP/ScrollTrigger or IntersectionObserver to switch theme.

---

# 45. Page Transitions

Use a subtle:

```text
opacity
translateY(12px)
```

Do not use dramatic page wipes.

---

# 46. Cursor Effects

Desktop only.

Implement:

```text
CursorGlow
MagneticButton
```

Cursor glow:

```text
small
low opacity
slow interpolation
```

Buttons:

```text
cursor enters
→ button follows by 8px
```

Cards:

```text
optional 3D tilt
```

Disable all on touch devices.

---

# 47. Scroll Experience

Lenis is mandatory.

Page should feel:

```text
smooth
weighted
cinematic
```

Do not make scrolling excessively slow.

Target feeling:

```text
natural smoothness
```

not:

```text
floating / disconnected
```

---

# 48. GSAP Scroll Scenes

Implement at minimum:

## Scene 1

Hero parallax.

## Scene 2

Career DNA skill nodes.

## Scene 3

Career cards reveal.

## Scene 4

Skill-gap visualization.

## Scene 5

Roadmap timeline draw.

## Scene 6

What-If transition.

## Scene 7

Job match reveal.

## Scene 8

Final CTA reveal.

---

# 49. Loading Shimmer

Every simulated AI operation must have a shimmer.

Example:

```text
Analyzing your career DNA
████████████░░░░
```

Use animated skeletons.

Sequence:

```text
button click
↓
loading state
↓
shimmer
↓
AI status messages
↓
result reveal
```

Prototype timing:

```text
1.5–3 seconds
```

Do not make the user wait unnecessarily long.

---

# 50. AI Processing Messages

Rotate messages:

```text
Reading your profile...
Mapping your skills...
Exploring career paths...
Finding skill gaps...
Building your roadmap...
```

For What-If:

```text
Simulating skill impact...
Recalculating career paths...
Comparing your future options...
```

For Job Match:

```text
Reading role requirements...
Comparing your experience...
Finding missing skills...
Building your readiness picture...
```

---

# 51. Microinteraction Rules

Every important interactive element must respond.

Buttons:

```text
hover
press
focus
```

Cards:

```text
hover
selected
```

Tabs:

```text
active indicator
```

Progress:

```text
animated
```

Upload:

```text
drag over
uploading
success
error
```

---

# 52. Accessibility

Implement:

- keyboard navigation;
- focus states;
- semantic buttons;
- labels;
- accessible dialogs;
- accessible upload;
- reduced-motion mode;
- sufficient text contrast.

Do not rely solely on color.

---

# 53. Responsive Requirements

## Desktop

Primary visual experience.

Must include:

- 3D hero;
- hover effects;
- large cinematic sections;
- GSAP scenes.

## Tablet

Reduce:

- 3D complexity;
- font scale;
- horizontal density.

## Mobile

Must remain fully usable.

Disable:

- cursor effects;
- complex 3D;
- heavy parallax.

Keep:

- smooth scroll;
- subtle reveal;
- microinteractions.

---

# 54. Performance

Prototype must remain smooth.

Requirements:

- lazy-load Three.js scene;
- avoid heavy 3D models;
- use procedural/simple geometry;
- cap device pixel ratio;
- pause 3D when offscreen;
- use `next/image`;
- optimize images;
- use GPU transforms;
- avoid layout thrashing;
- cleanup GSAP timelines;
- cleanup Lenis;
- cleanup Three.js resources.

Target:

```text
smooth desktop interaction
```

Do not sacrifice UX for decorative animation.

---

# 55. Mock AI Architecture

Even though the prototype is frontend-only, structure the mock AI layer so it can later connect to FastAPI.

Create:

```text
lib/mock-ai/
  resume-analyzer.ts
  career-engine.ts
  skill-gap.ts
  roadmap.ts
  what-if.ts
  job-match.ts
  readiness.ts
```

Each should return a Promise to mimic an API.

Example:

```ts
export async function generateCareerRecommendations(profile) {
  await delay(1800);
  return mockCareerRecommendations;
}
```

This makes the UI behave like a real AI product.

---

# 56. Mock API Contract

Keep the prototype response shape compatible with the technical SRS.

Example:

```ts
interface CareerRecommendation {
  id: string;
  career: string;
  matchScore: number;
  reasoning: string;
  matchingSkills: string[];
  missingSkills: string[];
  keyFactors: string[];
}
```

Roadmap:

```ts
interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  day: number;
  estimatedMinutes: number;
  skillTarget: string;
  completed: boolean;
}
```

Simulation:

```ts
interface SimulationResult {
  addedSkills: string[];
  original: CareerRecommendation[];
  simulated: CareerRecommendation[];
  changes: {
    careerScoreChanges: [];
    newRecommendations: [];
    skillGapChanges: [];
    explanation: string;
  };
}
```

---

# 57. Demo Data Requirements

Use consistent data across every screen.

If:

```text
AI Product Engineer = 88%
```

on the dashboard, it must remain:

```text
AI Product Engineer = 88%
```

on the career page.

If:

```text
Machine Learning = high-priority gap
```

it must appear consistently in:

- skill gap;
- roadmap;
- readiness;
- job match.

---

# 58. Prototype Navigation

Primary navigation:

```text
Home
Career Map
Skill Gaps
Roadmap
What-If
Job Match
```

Authenticated navigation:

```text
Dashboard
Profile
Career Map
Skill Gaps
Roadmap
What-If
Job Match
Readiness
AI History
```

---

# 59. Empty States

If no data exists:

```text
Your career map is waiting.

Upload your resume to let AI
understand your starting point.
```

CTA:

```text
Upload Resume
```

---

# 60. Error States

Example:

```text
Something interrupted the analysis.

Your information is safe.
Try the analysis again.
```

Button:

```text
Retry Analysis
```

---

# 61. Trust Messaging

Avoid claims such as:

```text
AI knows your perfect career.
```

Use:

```text
AI-powered career exploration.
```

or:

```text
Understand your options with explainable AI.
```

The system supports decisions; it does not guarantee outcomes.

---

# 62. Copy Principles

Copy should be:

- short;
- confident;
- human;
- intelligent;
- non-corporate;
- action-oriented.

Avoid:

```text
Leverage our revolutionary AI-powered ecosystem.
```

Prefer:

```text
See what your skills can become.
```

Avoid:

```text
Optimize your professional trajectory.
```

Prefer:

```text
Know what to learn next.
```

---

# 63. Premium Detail Checklist

The agent must implement:

```text
✓ Cinematic hero
✓ Large typography
✓ Subtle image treatment
✓ Grain
✓ Dark glass cards
✓ Soft shadows
✓ Pill buttons
✓ Magnetic hover
✓ Card tilt
✓ Cursor glow
✓ Shimmer
✓ Animated progress
✓ Count-up scores
✓ GSAP ScrollTrigger
✓ Lenis
✓ 3D career orbit
✓ Before/After simulation
✓ Smooth roadmap drawing
✓ Responsive states
✓ Reduced motion
```

---

# 64. Hackathon Standout Requirements

The prototype must have three visual moments that a judge remembers.

## Moment 1 — Career DNA

Resume/profile transforms into a visual career identity.

```text
Profile
→
Career DNA
```

## Moment 2 — Career Landscape

Multiple career paths appear around the student.

```text
You
→
AI Product Engineer
→
ML Engineer
→
Data Analyst
→
Product Engineer
```

## Moment 3 — What-If

The student adds:

```text
Generative AI
```

and the entire career landscape transforms.

This should be the signature moment.

---

# 65. Prototype Demo Sequence

The ideal demo:

```text
00:00
Landing page

00:10
Click Discover My Career Path

00:15
Upload resume simulation

00:18
AI shimmer

00:21
Career DNA appears

00:28
Career landscape appears

00:35
Open AI Product Engineer

00:40
Show skill gaps

00:47
Open roadmap

00:55
Open What-If

01:00
Add Generative AI

01:03
Career orbit transforms

01:08
Show Before vs After

01:15
Upload job description

01:20
Show 82% match

01:25
Show readiness

01:30
Return to dashboard
```

The prototype should be demoable in approximately 90 seconds.

---

# 66. What Not To Build

Do not spend prototype time on:

- real authentication;
- real Gemini integration;
- real PostgreSQL;
- backend;
- live job scraping;
- complex CMS;
- admin panel;
- real OAuth;
- production billing;
- notification systems.

The prototype is a frontend experience.

The existing Technical SRS defines the production architecture separately.

---

# 67. Implementation Sequence

## Step 1

Initialize Next.js TypeScript project.

## Step 2

Install:

```text
tailwindcss
shadcn/ui
gsap
lenis
three
@react-three/fiber
@react-three/drei
lucide-react
```

## Step 3

Implement design tokens.

## Step 4

Build global typography and surfaces.

## Step 5

Build Navbar.

## Step 6

Build cinematic Hero.

## Step 7

Add 3D Career Orbit.

## Step 8

Add Lenis.

## Step 9

Add GSAP ScrollTrigger.

## Step 10

Build Career DNA.

## Step 11

Build Career Landscape.

## Step 12

Build Skill Gap.

## Step 13

Build Roadmap.

## Step 14

Build What-If.

## Step 15

Build Job Match.

## Step 16

Build Readiness.

## Step 17

Build Dashboard.

## Step 18

Add microinteractions.

## Step 19

Add shimmer/loading states.

## Step 20

Add responsive behavior.

## Step 21

Add reduced motion.

## Step 22

Run visual quality pass.

## Step 23

Run production build.

---

# 68. Antigravity Instructions

The coding agent must follow these rules.

### Rule 1

Read `DESIGN_TOKENS.md` before writing UI code.

### Rule 2

Do not invent a separate color system.

### Rule 3

Do not use arbitrary hex values inside components.

### Rule 4

Do not replace GSAP with CSS-only animation for the major scroll scenes.

### Rule 5

Use Lenis for page scrolling.

### Rule 6

Use Three.js/React Three Fiber for the hero 3D object.

### Rule 7

Do not make the 3D scene so complex that it harms performance.

### Rule 8

Do not make every element animated.

### Rule 9

Animation must support hierarchy.

### Rule 10

Do not use generic dashboard templates.

### Rule 11

Do not copy NexEvent branding, content, or exact UI.

### Rule 12

Use the NexEvent visual language as inspiration only.

### Rule 13

Keep mock data centralized.

### Rule 14

Keep component responsibilities small.

### Rule 15

Use real navigation between prototype pages.

### Rule 16

Persist demo state using localStorage.

### Rule 17

All AI operations must have loading/success/error states.

### Rule 18

The What-If simulator must visually transform the career landscape.

### Rule 19

Mobile must not be a broken desktop layout.

### Rule 20

The final build must pass `npm run build`.

---

# 69. Acceptance Criteria

## Global

- [ ] Next.js project builds.
- [ ] TypeScript has no blocking errors.
- [ ] Tailwind works.
- [ ] shadcn components are customized.
- [ ] Design tokens are centralized.
- [ ] No arbitrary component colors.
- [ ] Lenis works.
- [ ] GSAP works.
- [ ] ScrollTrigger works.
- [ ] 3D scene works.
- [ ] Reduced motion works.

## Landing

- [ ] Cinematic hero.
- [ ] Premium typography.
- [ ] 3D career object.
- [ ] Hero animations.
- [ ] Metric cards.
- [ ] Scroll sections.
- [ ] Final CTA.

## Career

- [ ] Career cards.
- [ ] Match score.
- [ ] Explanation.
- [ ] Hover states.
- [ ] Selection state.

## Skill Gap

- [ ] Current/target comparison.
- [ ] Priority.
- [ ] Explanation.
- [ ] Roadmap connection.

## Roadmap

- [ ] Timeline.
- [ ] Animated nodes.
- [ ] Task cards.
- [ ] Completion state.
- [ ] Progress update.

## What-If

- [ ] Skill input.
- [ ] Simulation loading.
- [ ] Career transformation.
- [ ] Before/After.
- [ ] Explanation.
- [ ] Roadmap CTA.

## Job Match

- [ ] Upload interface.
- [ ] Shimmer.
- [ ] Match score.
- [ ] Strengths.
- [ ] Gaps.
- [ ] Action CTA.

## Dashboard

- [ ] Career summary.
- [ ] Roadmap.
- [ ] Skill gaps.
- [ ] Readiness.
- [ ] AI history.

---

# 70. Visual QA Checklist

Before completion, inspect the application at:

```text
1440 × 900
1280 × 800
1024 × 768
768 × 1024
390 × 844
```

Check:

```text
□ No horizontal overflow.
□ Hero headline doesn't collide with 3D.
□ Navbar remains readable.
□ Cards don't become cramped.
□ Text hierarchy remains strong.
□ Buttons are usable.
□ 3D doesn't cover content.
□ Scroll animations don't stutter.
□ Shimmers don't remain after loading.
□ What-If transition completes correctly.
□ Dashboard is visually consistent with landing.
□ Light/dark transitions feel intentional.
```

---

# 71. Final Product Feeling

The prototype should make the user feel:

> “This isn't another career recommendation website.”

It should communicate:

> “This system understands my current state, maps my possibilities, explains my gaps, and lets me experiment with what happens next.”

The visual language should combine:

```text
NexEvent-inspired premium editorial design
+
AI intelligence visualization
+
career decision support
+
cinematic motion
+
human trust
```

The result should look like a **high-end AI product launch experience**, while still being a usable web application.

---

# 72. Final Design North Star

When there is a design decision that is not explicitly specified, choose the option that is:

1. calmer;
2. more premium;
3. more readable;
4. more spacious;
5. more intentional;
6. less generic;
7. less saturated;
8. more cinematic;
9. more trustworthy;
10. more aligned with the design tokens.

Never choose visual complexity merely because the technology can produce it.

The product should feel **expensive, intelligent, and effortless**.
