# CareerUp — Design Token Specification

**File:** `DESIGN_TOKENS.md`  
**Brand:** CareerUp (AI Career Intelligence Platform)  
**Implementation:** Next.js + TypeScript + Tailwind CSS + Framer Motion  
**Animation:** GSAP + ScrollTrigger + Lenis  
**3D:** Three.js / React Three Fiber  
**Source of visual inspiration:** NexEvent — AI for Event Management Website (Career Page), Robbi Darwis / Flow Forge, Dribbble  
**Purpose:** Single visual source of truth for the Google Antigravity implementation agent.

---

## 0. Design Direction

### Product Personality

CareerUp must feel:

- Premium
- Intelligent
- Trustworthy
- Human
- Calm
- Editorial
- Cinematic
- Modern
- Technically sophisticated
- Hackathon-distinctive without looking gimmicky

### Core Visual Idea

Translate the NexEvent career-page language from **AI event management** into **AI career intelligence**.

The reference uses a restrained editorial system:

- warm near-black hero areas;
- off-white content surfaces;
- muted warm brown/stone accents;
- large confident typography;
- photographic/natural imagery;
- rounded dark glass cards;
- generous whitespace;
- strong CTA pills;
- compact navigation;
- large section headlines;
- stacked role/opportunity cards;
- a high-contrast final CTA/footer.

For this product, replace event imagery and career-company messaging with:

- abstract career landscapes;
- student profile intelligence;
- floating skill nodes;
- career paths;
- roadmap timelines;
- job-match signals;
- AI-generated insight cards.

Do **not** copy the Dribbble layout pixel-for-pixel. Reproduce its visual grammar and premium feeling while creating an original career-product interface.

---

# 1. Source Palette

The referenced NexEvent Career Page exposes the following six-color palette:

```text
#1A1917
#EFF0F8
#49423A
#BABBC3
#47382A
#8E705A
```

These values are the foundation of the adapted theme.

## 1.1 Raw Color Tokens

```css
--color-ink-950: #1A1917;
--color-paper-50: #EFF0F8;
--color-earth-800: #49423A;
--color-mist-300: #BABBC3;
--color-earth-900: #47382A;
--color-clay-600: #8E705A;
```

## 1.2 Semantic Colors

```css
--color-bg-primary: #EFF0F8;
--color-bg-secondary: #F7F7FA;
--color-bg-tertiary: #E8E8EE;

--color-surface: #FFFFFF;
--color-surface-soft: #F2F2F6;
--color-surface-dark: #1A1917;
--color-surface-dark-soft: #24221F;

--color-text-primary: #1A1917;
--color-text-secondary: #49423A;
--color-text-muted: #6E6D73;
--color-text-inverse: #EFF0F8;
--color-text-on-dark-muted: #BABBC3;

--color-border: rgba(26,25,23,0.12);
--color-border-strong: rgba(26,25,23,0.22);
--color-border-dark: rgba(239,240,248,0.14);

--color-accent: #8E705A;
--color-accent-dark: #47382A;
--color-accent-soft: #E8DED6;

--color-success: #4D6B59;
--color-success-soft: #E3ECE5;
--color-warning: #9A7650;
--color-warning-soft: #F0E7DC;
--color-danger: #9A5750;
--color-danger-soft: #F1E2E0;
--color-info: #667482;
--color-info-soft: #E5E9ED;
```

### Rule

The interface should remain mostly neutral.

Accent colors are for:

- progress;
- selected states;
- AI signal highlights;
- important actions;
- status indicators.

Do not turn every component into an accent-colored element.

---

# 2. Color Usage Ratio

Target visual ratio:

```text
65% Off-white / neutral surfaces
20% Near-black / dark cinematic surfaces
10% Warm earth / clay accents
5% semantic states
```

The visual hierarchy should remain calm.

Avoid:

- neon gradients;
- rainbow AI colors;
- excessive purple;
- excessive blue;
- saturated backgrounds;
- glossy SaaS-template gradients.

---

# 3. Typography

## 3.1 Typography Character

Typography should feel similar to the reference:

- large;
- clean;
- geometric;
- highly readable;
- restrained;
- confident.

Recommended primary family:

```text
Inter
```

Recommended display alternative:

```text
Manrope
```

Preferred implementation:

```css
--font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
--font-display: "Manrope", "Inter", sans-serif;
```

If only one font is loaded, use Inter throughout.

## 3.2 Font Weights

```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

Avoid 800/900 except for extremely large display typography.

## 3.3 Desktop Type Scale

```css
--text-display-xl: clamp(4rem, 8vw, 8rem);
--text-display-lg: clamp(3.5rem, 6.5vw, 6.5rem);
--text-display-md: clamp(3rem, 5vw, 5rem);

--text-h1: clamp(2.75rem, 5vw, 5rem);
--text-h2: clamp(2.25rem, 4vw, 4rem);
--text-h3: clamp(1.75rem, 3vw, 2.75rem);
--text-h4: clamp(1.35rem, 2vw, 1.75rem);

--text-body-xl: 1.25rem;
--text-body-lg: 1.125rem;
--text-body: 1rem;
--text-body-sm: 0.875rem;
--text-caption: 0.75rem;
```

## 3.4 Mobile Type Scale

```css
--text-mobile-display: clamp(3rem, 14vw, 5rem);
--text-mobile-h1: clamp(2.5rem, 11vw, 4rem);
--text-mobile-h2: clamp(2rem, 9vw, 3rem);
--text-mobile-h3: 1.75rem;
--text-mobile-body: 1rem;
```

## 3.5 Typography Rules

Hero:

```text
font-weight: 500–600
line-height: 0.92–1.02
letter-spacing: -0.045em
```

Section headline:

```text
font-weight: 500–600
line-height: 0.98–1.08
letter-spacing: -0.035em
```

Body:

```text
font-weight: 400
line-height: 1.55–1.7
letter-spacing: -0.01em
```

Navigation:

```text
font-size: 0.75rem–0.875rem
font-weight: 500
```

Avoid excessive uppercase typography.

---

# 4. Layout System

## 4.1 Maximum Width

```css
--container-max: 1440px;
```

Content width:

```css
--content-max: 1240px;
```

Reading width:

```css
--reading-max: 720px;
```

## 4.2 Horizontal Padding

Desktop:

```css
--page-padding-desktop: 48px;
```

Tablet:

```css
--page-padding-tablet: 32px;
```

Mobile:

```css
--page-padding-mobile: 20px;
```

Large cinematic sections may use:

```text
48–64px
```

inside the viewport.

## 4.3 Grid

Desktop:

```text
12 columns
24px gutter
```

Tablet:

```text
8 columns
20px gutter
```

Mobile:

```text
4 columns
16px gutter
```

## 4.4 Section Spacing

```css
--section-space-xl: clamp(140px, 16vw, 260px);
--section-space-lg: clamp(100px, 12vw, 180px);
--section-space-md: clamp(72px, 8vw, 120px);
--section-space-sm: 48px;
```

The page should breathe.

---

# 5. Border Radius

The reference uses soft rounded cards and pill-shaped controls.

```css
--radius-xs: 6px;
--radius-sm: 10px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-2xl: 40px;
--radius-pill: 999px;
```

Recommended:

```text
Buttons: pill
Inputs: 12–16px
Cards: 20–28px
Hero floating panels: 24–32px
Large image containers: 28–40px
```

Avoid overly rounded “toy-like” UI.

---

# 6. Borders

```css
--border-width: 1px;
--border-subtle: rgba(26,25,23,0.08);
--border-default: rgba(26,25,23,0.12);
--border-strong: rgba(26,25,23,0.20);
--border-on-dark: rgba(239,240,248,0.14);
```

Use borders sparingly.

The interface should derive hierarchy from:

```text
spacing
contrast
surface changes
shadow
typography
```

not from heavy outlines.

---

# 7. Shadows

The reference uses dark soft cards rather than aggressive Material-style shadows.

```css
--shadow-xs:
  0 2px 8px rgba(26,25,23,0.06);

--shadow-sm:
  0 8px 24px rgba(26,25,23,0.08);

--shadow-md:
  0 16px 40px rgba(26,25,23,0.12);

--shadow-lg:
  0 28px 70px rgba(26,25,23,0.18);

--shadow-floating:
  0 24px 80px rgba(0,0,0,0.24);
```

Dark glass cards:

```css
box-shadow:
  0 18px 60px rgba(0,0,0,0.24);
```

---

# 8. Glass / Dark Cards

For hero statistics, AI insight cards, and floating UI:

```css
background:
  rgba(26,25,23,0.86);

backdrop-filter:
  blur(18px);

border:
  1px solid rgba(239,240,248,0.12);

box-shadow:
  0 20px 60px rgba(0,0,0,0.22);
```

Do not use glass everywhere.

Use it only on:

- hero overlays;
- AI floating objects;
- metrics;
- interactive intelligence cards;
- selected career states.

---

# 9. Buttons

## 9.1 Primary

```text
background: #1A1917
text: #EFF0F8
border: none
radius: pill
```

Hover:

```text
background: #47382A
transform: translateY(-2px)
shadow: shadow-md
```

## 9.2 Secondary

```text
background: transparent
text: #1A1917
border: 1px solid rgba(26,25,23,0.22)
radius: pill
```

Hover:

```text
background: #1A1917
text: #EFF0F8
```

## 9.3 Light-on-dark

```text
background: #EFF0F8
text: #1A1917
```

Hover:

```text
background: #FFFFFF
transform: translateY(-2px)
```

## 9.4 AI Action

Use accent subtly:

```text
background: #8E705A
text: #FFFFFF
```

Only for actions such as:

```text
Run Career Analysis
Simulate Skill
Generate Roadmap
Analyze Job
```

---

# 10. Navigation

Reference characteristics:

- compact;
- horizontal;
- centered/contained;
- minimal;
- white/light text over hero;
- pill CTAs;
- small logo;
- generous horizontal spacing.

Prototype navigation:

```text
Logo
Career Map
Skill Gaps
Roadmap
Job Match
What-If
        [Dashboard]
        [Profile]
```

Desktop nav should overlay the hero when appropriate.

On scroll:

```text
transparent → subtle blurred surface
```

Transition:

```text
300–500ms
```

Mobile:

```text
Logo
        Menu button
```

Use a full-screen or large overlay menu with smooth GSAP entrance.

---

# 11. Hero Design

## 11.1 Hero Concept

The hero should communicate:

> **Your career is not a guess. It's a path you can understand.**

Suggested headline:

```text
Turn your skills
into your next
career move.
```

Alternative:

```text
See where your
skills can take you.
```

Subheadline:

```text
AI understands where you are,
where you want to go, and what
you need to do next.
```

CTA:

```text
Discover My Career Path
```

Secondary:

```text
Explore the Navigator
```

## 11.2 Hero Visual

Use a cinematic background:

- misty landscape;
- abstract dark gradient;
- subtle grain;
- soft light;
- floating translucent career nodes.

Do not use generic stock-office imagery.

## 11.3 Hero Floating Objects

Create 3D floating objects representing:

```text
Skill node
Career node
Roadmap node
Job node
```

Use low-poly / glass / metallic visual treatment.

Example:

```text
       [Python]
           \
            ●
           / \
 [AI] ─── ● ─── [Data]
           \
         [ML Engineer]
```

The nodes should float slowly.

---

# 12. 3D System

## 12.1 Library

Use:

```text
three
@react-three/fiber
@react-three/drei
```

## 12.2 3D Style

Objects should be:

- minimal;
- abstract;
- translucent;
- warm neutral;
- softly reflective;
- low visual noise.

## 12.3 3D Objects

Recommended:

### Career Orbit

A central glowing orb with 5–8 orbiting skill nodes.

### Skill Crystal

A translucent faceted object that rotates slowly.

### Roadmap Sphere

A dark sphere containing a thin animated path.

### Job Match Ring

A floating ring representing match percentage.

## 12.4 Performance

Use:

```text
devicePixelRatio capped
lazy loading
reduced geometry
no heavy textures
```

Disable or simplify 3D on low-power/mobile devices.

---

# 13. Motion System

Animation must feel cinematic, not like a template.

## 13.1 Motion Principles

```text
Slow where decorative.
Fast where interactive.
Precise where functional.
```

## 13.2 Durations

```css
--motion-instant: 100ms;
--motion-fast: 180ms;
--motion-normal: 300ms;
--motion-medium: 500ms;
--motion-slow: 800ms;
--motion-cinematic: 1200ms;
```

## 13.3 Easing

Preferred:

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

GSAP:

```text
power3.out
power4.out
expo.out
```

For smooth cinematic movement:

```text
power2.inOut
```

---

# 14. GSAP Requirements

GSAP is mandatory for major scroll/motion choreography.

Use:

```text
gsap
ScrollTrigger
```

Recommended architecture:

```text
components/
  motion/
    HeroMotion.tsx
    ScrollReveal.tsx
    CareerLandscape.tsx
    WhatIfTransition.tsx
```

Initialize GSAP only in client components.

Always clean up:

```text
gsap.context()
context.revert()
```

---

# 15. ScrollTrigger System

Use ScrollTrigger for:

- hero parallax;
- section reveals;
- career landscape transformation;
- skill-node movement;
- roadmap timeline reveal;
- before/after What-If animation;
- CTA reveal;
- footer entrance.

Example motion pattern:

```text
Hero
↓
background moves 10%
headline moves 4%
3D objects move 14%
metrics move 7%
```

The motion must be subtle.

---

# 16. Lenis Smooth Scrolling

Use:

```text
lenis
```

Preferred architecture:

```text
LenisProvider
```

The provider should:

- initialize once;
- integrate with GSAP ticker;
- synchronize ScrollTrigger;
- clean up on unmount.

Conceptual flow:

```text
Lenis
   ↓
Smooth scroll position
   ↓
GSAP ticker
   ↓
ScrollTrigger
```

Do not run multiple independent smooth-scroll systems.

---

# 17. Cursor / Mouse Interaction

Desktop-only.

The cursor can influence:

- 3D objects;
- hero gradients;
- floating cards;
- magnetic buttons.

## 17.1 Magnetic Button

Maximum movement:

```text
8–12px
```

Do not overdo.

## 17.2 Card Tilt

Maximum:

```text
3–5 degrees
```

Use only on selected hero/feature cards.

## 17.3 Cursor Glow

Use a very subtle:

```text
radial-gradient
```

with low opacity.

Never create a large distracting spotlight.

---

# 18. Shimmer System

Shimmers are required for AI loading states.

Use:

```css
background:
  linear-gradient(
    110deg,
    transparent 25%,
    rgba(255,255,255,0.35) 45%,
    transparent 65%
  );
```

Animate:

```text
background-position
```

Duration:

```text
1.4–1.8s
```

Use on:

- profile generation;
- career analysis;
- skill gap;
- roadmap;
- job match;
- dashboard cards.

Avoid shimmer after content has loaded.

---

# 19. Microinteractions

Required:

### Buttons

```text
hover lift
subtle shadow
icon translation
```

### Cards

```text
border shift
translateY
soft shadow
```

### Skill chips

```text
hover scale 1.02
accent border
```

### Progress bars

```text
animated fill
```

### Match score

```text
number count-up
radial progress
```

### Checkboxes/tasks

```text
checkmark animation
strike-through transition
```

### Tabs

```text
animated active indicator
```

---

# 20. Page Surface System

## Light Section

```text
background: #EFF0F8
text: #1A1917
```

## White Section

```text
background: #FFFFFF
```

## Dark Cinematic Section

```text
background: #1A1917
text: #EFF0F8
```

## Image Section

Use:

```text
image
+
dark overlay
+
content
```

Overlay:

```text
rgba(26,25,23,0.35–0.65)
```

---

# 21. Section Patterns Inspired by Reference

## Pattern A — Cinematic Hero

```text
Dark/photographic background
        ↓
Small eyebrow pill
        ↓
Huge headline
        ↓
Supporting copy
        ↓
Primary + secondary CTA
        ↓
Floating metric cards
```

## Pattern B — Human/Trust Section

Reference uses:

```text
Meet the People Behind the Impact
```

For Career Navigator:

```text
Understand Your Career DNA
```

Use:

- profile cards;
- skills;
- interests;
- education;
- strengths.

## Pattern C — Opportunities List

Reference uses job opportunity cards.

For Career Navigator:

```text
Career Paths That Fit You
```

Cards show:

```text
Career
Match
Why
Top strengths
Top gaps
Explore
```

## Pattern D — Final CTA

Reference uses a full-width cinematic CTA.

Use:

```text
Your next career move
starts with understanding
where you are.
```

CTA:

```text
Start My Career Analysis
```

---

# 22. Career Card

Dimensions:

```text
min-height: 260px
radius: 24–28px
padding: 28–32px
```

Structure:

```text
Career label
Career name
Match score
Short explanation
3 skill chips
→ Explore
```

Hover:

```text
translateY(-6px)
shadow increase
arrow moves right
```

---

# 23. Skill Gap Card

Structure:

```text
Skill
Current
Target
Importance
Why it matters
Roadmap connection
```

Use a horizontal or radial visual.

Example:

```text
Python
██████░░░░
Level 3 / 5

Target
█████████░
Level 4.5 / 5
```

---

# 24. Roadmap Visual

The roadmap should feel like a journey, not a task-management spreadsheet.

Visual:

```text
START
  │
  ● Foundation
  │
  ● Core Skill
  │
  ● Applied Practice
  │
  ● Portfolio
  │
  ● Job Readiness
  │
TARGET
```

GSAP should reveal each node as the user scrolls.

---

# 25. What-If Visual

This is the signature hackathon interaction.

Before:

```text
CURRENT CAREER LANDSCAPE
```

After adding:

```text
+ Python
```

animate into:

```text
SIMULATED CAREER LANDSCAPE
```

Visual treatment:

```text
Before → neutral
Transition → expanding orbit
After → highlighted new paths
```

Show:

```text
New opportunities
Changed match
New gaps
Why it changed
```

---

# 26. Dashboard Design

The authenticated application should preserve the same visual language.

Dashboard:

```text
Dark top navigation
Light content background
Soft cards
Warm accent
Large typography
Editorial spacing
```

Avoid generic admin-dashboard styling.

The dashboard should feel like a **personal command center**, not a CRUD panel.

---

# 27. Input Styling

Inputs:

```css
height: 52–56px;
border-radius: 14px;
background: #FFFFFF;
border: 1px solid rgba(26,25,23,0.12);
```

Focus:

```text
border: #8E705A
box-shadow: 0 0 0 4px rgba(142,112,90,0.12)
```

Textarea:

```text
min-height: 140px
```

Upload zone:

```text
dashed border
soft background
subtle hover
```

---

# 28. Upload Dropzone

Resume/job upload should feel premium.

Default:

```text
Drag your resume here
or
Choose file
```

Hover:

```text
border accent
background accent-soft
icon lift
```

Processing:

```text
animated shimmer
AI orbital icon
progress status
```

Success:

```text
check animation
filename
file type
size
Continue
```

---

# 29. Badges

Use compact pills.

Examples:

```text
AI ANALYZED
87% MATCH
HIGH PRIORITY
3 SKILLS TO CLOSE
READY TO EXPLORE
```

Style:

```text
font-size: 11px–12px
font-weight: 600
letter-spacing: 0.02em
radius: pill
```

---

# 30. Icons

Use one icon system consistently.

Recommended:

```text
Lucide React
```

Icons should be:

```text
1.5–1.75px stroke
```

Avoid mixing icon styles.

---

# 31. Imagery

Imagery should support:

- discovery;
- growth;
- technology;
- human potential;
- career exploration.

Preferred treatment:

```text
cinematic landscape
abstract macro
architectural forms
soft natural light
people in authentic learning/work contexts
```

Avoid:

- obvious corporate stock photos;
- handshakes;
- fake AI robots;
- generic coding stock images.

---

# 32. Texture / Grain

Use a very subtle film grain overlay:

```text
opacity: 0.025–0.05
pointer-events: none
mix-blend-mode: soft-light
```

Only on cinematic sections.

---

# 33. Background Effects

Preferred:

```text
soft radial light
large blurred image
subtle grain
slow parallax
```

Avoid:

```text
strong mesh gradients
neon glows
excessive glassmorphism
```

---

# 34. Responsive Rules

## Desktop ≥ 1200px

Use:

- 12-column grid;
- full navigation;
- 3D hero;
- large cards;
- horizontal opportunity lists.

## Tablet 768–1199px

Use:

- 8-column grid;
- reduced typography;
- simplified 3D;
- 2-column cards.

## Mobile < 768px

Use:

- 4-column grid;
- stacked layout;
- compact navigation;
- reduced 3D;
- no cursor effects;
- simplified parallax.

---

# 35. Reduced Motion

Respect:

```css
prefers-reduced-motion: reduce
```

When enabled:

- disable smooth scrolling;
- disable 3D movement;
- disable parallax;
- reduce GSAP transforms;
- keep essential transitions only.

---

# 36. Z-Index Scale

```css
--z-base: 0;
--z-content: 10;
--z-floating: 20;
--z-header: 50;
--z-overlay: 100;
--z-modal: 200;
--z-toast: 300;
--z-cursor: 400;
```

---

# 37. Component Token Naming

Use semantic names.

Good:

```text
bg-surface
text-primary
border-subtle
accent
surface-dark
```

Avoid:

```text
brown1
gray2
dark3
```

Raw palette values should remain centralized.

---

# 38. Tailwind Mapping

Create CSS variables in:

```text
app/globals.css
```

Then map semantic tokens through Tailwind.

Example:

```css
:root {
  --background: #EFF0F8;
  --foreground: #1A1917;
  --primary: #1A1917;
  --primary-foreground: #EFF0F8;
  --secondary: #F7F7FA;
  --muted: #BABBC3;
  --accent: #8E705A;
  --border: rgba(26,25,23,0.12);
  --radius: 1rem;
}
```

Do not scatter hex values through components.

---

# 39. shadcn/ui Rules

Use shadcn/ui for:

- Button;
- Input;
- Textarea;
- Dialog;
- Dropdown;
- Select;
- Tabs;
- Tooltip;
- Progress;
- Badge.

Customize them to match this design system.

Do not ship default shadcn styling unchanged.

---

# 40. Motion Component Contract

Every major animated component should support:

```tsx
interface MotionProps {
  className?: string;
  delay?: number;
  disabled?: boolean;
}
```

Animation code should remain reusable.

---

# 41. Performance Rules

- Lazy-load 3D.
- Avoid large background videos unless necessary.
- Optimize images.
- Use `next/image`.
- Do not render dozens of 3D objects.
- Use GPU-friendly transforms.
- Avoid layout-triggering animations.
- Animate `transform` and `opacity`.
- Kill GSAP contexts on unmount.
- Avoid continuously running animations when offscreen.

---

# 42. Visual Quality Gate

Before considering a page complete, verify:

```text
□ Typography feels editorial.
□ Spacing feels premium.
□ No random colors.
□ No inconsistent radii.
□ No default browser controls.
□ No default shadcn appearance.
□ Animations are purposeful.
□ Hover states exist.
□ Loading states use shimmer.
□ Hero has depth.
□ Cards have clear hierarchy.
□ Mobile remains premium.
□ No visual clutter.
□ AI feels intelligent rather than gimmicky.
```

---

# 43. Final Visual Principle

The finished product should look like:

> **A premium AI intelligence product designed by a high-end digital studio, not a student dashboard with AI features added to it.**

The reference's strongest visual characteristics should be preserved:

```text
cinematic
+
editorial
+
minimal
+
warm
+
dark/light contrast
+
large typography
+
soft cards
+
human trust
+
strong CTA
```

The career-specific layer should add:

```text
career intelligence
+
skill graph
+
roadmap visualization
+
AI simulation
+
job matching
```

That combination is the intended visual identity.
