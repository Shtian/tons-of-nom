---
name: Tons of Nom
description: Dark, heavy crowd-rating for festival food — scored in metal horns.
colors:
  blood-crimson: "oklch(0.55 0.23 27)"
  horn-crimson: "oklch(0.68 0.24 27)"
  stage-black: "oklch(0.145 0 0)"
  card-black: "oklch(0.205 0 0)"
  elevated-black: "oklch(0.269 0 0)"
  bone-white: "oklch(0.985 0 0)"
  ash-gray: "oklch(0.708 0 0)"
  border-veil: "oklch(1 0 0 / 10%)"
  danger-red: "oklch(0.704 0.191 22.216)"
typography:
  display:
    fontFamily: "Faceless, Impact, Haettenschweiler, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  pill: "26px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.blood-crimson}"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.lg}"
    padding: "0 0.625rem"
    height: "2rem"
  button-primary-hover:
    backgroundColor: "oklch(0.55 0.23 27 / 0.8)"
    textColor: "{colors.bone-white}"
  button-secondary:
    backgroundColor: "{colors.elevated-black}"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.lg}"
    height: "2rem"
  input-search:
    backgroundColor: "transparent"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.lg}"
    padding: "0.25rem 0.625rem"
    height: "2rem"
  card-stall:
    backgroundColor: "{colors.card-black}"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.xl}"
    padding: "0.75rem"
---

# Design System: Tons of Nom

## 1. Overview

**Creative North Star: "The Blackened Stage"**

Everything emerges from stage-black. The interface is a dark venue with the house lights down; crimson is the spotlight, and it only ever hits what matters — the horns, the rank, the one action in front of you. Weight is carried by darkness and space, never by ornament. There are no skulls, no flames, no chrome: the gravity is real because it's restrained. A festival-goer pulls this up one-handed in a queue, in daylight or under stage lights, and it reads instantly: find a stall, strike a rating, get back to the music.

The system is composed and quiet while you work. Tap targets are large and deliberate, motion is minimal, surfaces hold still. It saves its one release for the full **five-horn** rating — the moment the lights come up: metal-themed confetti, and nothing else in the product competes with it. That single payoff is the reward the whole restrained system exists to make land.

This explicitly rejects two things. It is **not** a generic SaaS / shadcn-default dashboard — no neutral gray cards on white, no safe corporate admin chrome. And it is **not** a Yelp / TripAdvisor review site — no clutter, no ad-shaped blocks, no star-rating-with-stock-photo density. The shadcn neutral scaffold underneath is fully overtaken by the dark/crimson identity.

**Key Characteristics:**
- Stage-black surfaces, crimson reserved for accent and signal (≤10% of any screen).
- Mobile-only target (~375–430px); single column, thumb-reachable, bottom-anchored primary action.
- Flat by default — depth from tonal lightness steps + hairline rings, not shadows.
- Composed everywhere; one concentrated release at five horns.
- Metal wordmark as the only display moment; everything else is clean Geist sans.

## 2. Colors

A near-monochrome black system with a single crimson voice — blood on black, bone for text.

### Primary
- **Blood Crimson** (`oklch(0.55 0.23 27)`): The one accent. Primary buttons (Rate, Add a stall), focus rings, the active/selected signal. Crimson is the spotlight — used sparingly so it always means "act here" or "this is the score."
- **Horn Crimson** (`oklch(0.68 0.24 27)`): A brighter crimson used exclusively for the filled portion of the 🤘 horn glyph, with a faint crimson drop-shadow glow. Slightly lifted from Blood Crimson so horns read as lit, not just colored.

### Neutral
- **Stage Black** (`oklch(0.145 0 0)`): The body background. The pit. Everything sits on this.
- **Card Black** (`oklch(0.205 0 0)`): Cards, dialogs, popovers — one tonal step up from Stage Black. This step *is* the elevation.
- **Elevated Black** (`oklch(0.269 0 0)`): Secondary/ghost button surfaces, muted fills, input hover. The highest resting surface.
- **Bone White** (`oklch(0.985 0 0)`): Primary text and the wordmark. High contrast on black for outdoor legibility.
- **Ash Gray** (`oklch(0.708 0 0)`): Muted text — rating counts, "not rated yet", placeholders, the search icon. Secondary information only.
- **Border Veil** (`oklch(1 0 0 / 10%)`): Hairline borders and rings. A 10%-white veil, never a hard line.

### Tertiary
- **Danger Red** (`oklch(0.704 0.191 22.216)`): Destructive/error state only (invalid input, failed submit). Deliberately a different, more orange red than Blood Crimson so "error" never reads as "rating."

### Named Rules
**The Spotlight Rule.** Crimson appears on ≤10% of any screen. It marks exactly two things: the action you can take now, and the horn score. If crimson is decorating anything else, it's stolen from the horns — remove it.

**The Two Reds Rule.** Blood Crimson (the brand) and Danger Red (errors) must stay visibly distinct. Never tint an error with the brand crimson; never warn with the horn crimson. The horn is sacred; errors get their own, oranger red.

## 3. Typography

**Display Font:** Faceless (with Impact, Haettenschweiler fallback) — a death-metal wordmark face. Loaded via `@font-face` with `font-display: swap`; falls back gracefully if `public/fonts/Faceless.woff2` is absent, no build break.
**Body Font:** Geist (with system-ui fallback) — the workhorse for everything readable.
**Label/Mono Font:** Geist Mono — used wherever numbers must align.

**Character:** One loud voice, one calm voice. The metal face is theatrical and used exactly once (the wordmark); Geist underneath is neutral and legible so the data never fights the brand. The pairing works because the two fonts are nothing alike — display drama vs. sans clarity, never two similar sans-serifs.

### Hierarchy
- **Display** (Faceless, 3rem / `text-5xl`, uppercase, `letter-spacing: 0.02em`, line-height 0.95): The "TONS OF NOM" wordmark. The only place the metal face appears.
- **Headline** (Geist, 600, 1.125rem / `text-lg`): Empty-state and section leads ("No stalls yet.").
- **Title** (Geist, 600, 1rem / `text-base`): Stall names in the list, dialog titles. The primary scannable text.
- **Body** (Geist, 400, 0.875rem / `text-sm`): Descriptions, tagline, supporting copy. Cap prose at 65–75ch (rarely an issue at mobile width).
- **Label** (Geist Mono, 500, 0.75rem / `text-xs`, `tabular-nums`): Rank numbers, rating averages and counts. Monospace + tabular figures so columns of numbers line up and don't jitter.

### Named Rules
**The One-Wordmark Rule.** The Faceless metal face is used for the wordmark and nowhere else. The moment it appears on a button, a heading, or a label, it becomes costume metal. Restraint is what keeps it heavy.

**The Tabular-Numbers Rule.** Every horn score, count, and rank renders in Geist Mono with `tabular-nums`. Numbers are data here; they must align and stay still.

## 4. Elevation

Flat by default. This system uses **tonal layering**, not shadows: depth is communicated by stepping the surface lightness (Stage Black → Card Black → Elevated Black) and by a single hairline ring (`ring-1` at 10% white) around cards. A surface that needs to feel "raised" gets lighter, not a drop-shadow. The sole exceptions are functional, not decorative: a `backdrop-blur` on the sticky bottom action bar (so content scrolling under it stays legible), and a faint crimson `drop-shadow` glow on the filled horn glyph (so the score reads as lit).

### Named Rules
**The No-Shadow Rule.** Surfaces never cast drop shadows for decoration. If something must come forward, raise its tonal step or add the hairline ring. The only glow in the system is the crimson on a horn.

**The Tonal-Step Rule.** Each layer is exactly one lightness step above its parent (≈0.06 L in OKLCH). Don't stack more than three layers; if you need a fourth surface, you've nested too deep.

## 5. Components

Components are **heavy and composed**: solid, deliberate, unhurried. Big tap targets, a firm `translate-y-px` press, nothing bouncy. Calm until the metal moment.

### Buttons
- **Shape:** Gently squared (`rounded-lg`, 10px). Small sizes tighten toward 8px.
- **Primary:** Blood Crimson fill, Bone White text. The single call-to-action per surface — "Rate", "Add a stall" (full-width and sticky-bottom on the list).
- **Hover / Focus:** Hover drops the crimson to 80% opacity. Focus shows a crimson ring (`ring-3` at 50%). Active presses down 1px — a firm physical click, no bounce.
- **Secondary:** Elevated Black fill, Bone White text — for "Add '<search>'" and lower-priority actions. **Ghost:** transparent, fills to Elevated Black on hover.

### Cards / Containers
- **Corner Style:** `rounded-xl` (14px).
- **Background:** Card Black, one step above the page.
- **Shadow Strategy:** None — see Elevation. Depth is the tonal step plus a hairline `ring-1` at 10% white.
- **Border:** Hairline ring only; empty states use a dashed Border Veil outline instead of a solid card.
- **Internal Padding:** 12px (`p-3`) for list rows; 16px (`--card-spacing`) for full cards.

### Inputs / Fields
- **Style:** Transparent fill, hairline Border Veil stroke, `rounded-lg` (10px). Search field carries an inline Ash Gray search icon.
- **Focus:** Border shifts to crimson, crimson ring (`ring-3` at 50%). No glow.
- **Placeholder:** Ash Gray. **Error:** Danger Red border + ring (never brand crimson).

### Navigation
- No chrome nav. Navigation is a centered wordmark header plus a **sticky bottom action bar** (Border Veil top edge, `bg-background/90` + `backdrop-blur`) holding the one primary action — built for one-handed thumb reach.

### Horn Rating (signature component)
The defining element. A horn 🤘 renders in two stacked layers: a desaturated, 25%-opacity glyph underneath (the empty state) and a crimson, glow-shadowed glyph on top, clipped by width to show partial fill — this is how half-horns render at any precision. **Display** mode (`HornDisplay`) is read-only, sized sm/md/lg. **Input** mode (`HornInput`) renders five `text-4xl` horns, each split into two oversized invisible tap zones (left half = x.5, right half = x.0) for reliable thumb targeting per the mobile-first ADR. A full five-horn submission triggers the **metal moment**: metal-themed confetti, honoring `prefers-reduced-motion`.

## 6. Do's and Don'ts

### Do:
- **Do** keep the surface stage-black and reserve crimson for the action and the score (The Spotlight Rule, ≤10% crimson per screen).
- **Do** convey depth by stepping surface lightness (Stage Black → Card Black → Elevated Black) and a hairline 10%-white ring — never a drop shadow.
- **Do** render every horn score, count, and rank in Geist Mono with `tabular-nums` so numbers align and hold still.
- **Do** keep the Faceless metal face for the wordmark only; let Geist carry everything readable.
- **Do** make tap targets large and bottom-anchored; design for ~375–430px one-handed first, add `sm:`/`md:` only to keep a laptop from looking broken.
- **Do** concentrate delight in the single five-horn metal moment, and honor `prefers-reduced-motion` there.

### Don't:
- **Don't** ship the generic SaaS / shadcn-default look — no neutral gray cards on white, no corporate admin chrome. The neutral scaffold must be fully overtaken by the dark/crimson identity.
- **Don't** build a Yelp / TripAdvisor review aesthetic — no clutter, no ad-shaped blocks, no star-rating-plus-stock-photo density. Stay sparse and editorial.
- **Don't** reach for cliché "edgy" metal kitsch — no skulls, flames, barbed-wire fonts, or chrome gradients. Restraint reads heavier than costume.
- **Don't** add decorative drop shadows, glassmorphism, or gradients (the horn glow and the sticky-bar blur are the only blur/glow in the system, and they're functional).
- **Don't** let error red borrow the brand crimson — Danger Red is its own, oranger red so "error" never reads as "rating" (The Two Reds Rule).
- **Don't** spread micro-celebration across the product; the five-horn moment is the one release, and diluting it kills it.
- **Don't** use the metal display face for anything but the wordmark, and **don't** rely on crimson alone to signal horn fill where a shape/fill cue also reads.
