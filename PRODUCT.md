# Product

## Register

product

## Users
Festival-goers standing in line or just-finished eating, on a phone, one-handed, in daylight and noise. No account, no onboarding — they arrived from a QR code or a friend. Two jobs: (1) find or add the stall they just ate at, (2) drop a horn rating (and maybe a line about what they ate) in seconds, then get back to the festival. A secondary "lean-back" job: browse the leaderboard to decide where to eat next.

## Product Purpose
A single-festival, throwaway crowd-rating site for food stalls, scored in metal horns 🤘 (1–5, half-steps). No auth, no moderation, no menus — a nickname in localStorage is the only identity. Success = a stall gets rated in under ~15 seconds from intent, the leaderboard feels alive and trustworthy (weighted ranking so few-vote stalls can't fluke #1), and a 5-horn rating delivers one genuine hit of delight. The product exists for one event, then it's gone; it optimizes for immediacy over permanence.

## Brand Personality
Dark, heavy, serious. True death-metal gravity — brooding, intense, restrained — not playful festival kitsch. Crimson-on-black weight. The voice is terse and confident: short labels, no exclamation-point cheer, no emoji spam beyond the horn itself. The heaviness is carried by darkness, space, and typographic mass, not by decoration. Emotional arc: composed and quiet while you rate, one concentrated release (the metal moment) when you award the full five.

## Anti-references
- **Generic SaaS / shadcn-default dashboard.** The current base is shadcn-neutral gray. Do NOT ship it looking like a corporate admin panel — neutral cards, safe gray-on-white, default radii everywhere. The neutral scaffold must be overtaken by the dark/crimson identity.
- **Yelp / TripAdvisor review site.** No clutter, no ad-shaped blocks, no star-rating-plus-stock-photo consumer-review density. Stay sparse and editorial.
- (Implied guardrail) Avoid cliché "edgy" metal kitsch too — no skulls, flames, barbed-wire fonts, or chrome gradients. Restraint reads heavier than costume metal.

## Design Principles
1. **Task-first, mood-second.** The rating flow must be fast and thumb-reachable in a queue. The metal gravity never costs the user a tap or a moment of legibility. Mobile (~375–430px) is the only real target.
2. **Weight through restraint.** Heaviness comes from deep darkness, generous negative space, and typographic mass — not from ornament. If an element feels "metal" because of a decoration, remove the decoration and let darkness do it.
3. **One earned release.** Everything holds its composure except the 5-horn metal moment. Concentrate delight into that single payoff so it actually lands; don't spread micro-celebration everywhere.
4. **Honest crowd data.** Show the real average and vote count plainly; rank by a weighted score, never inflate. Trust the crowd (no moderation theater, ratings are immutable) and make that trust visible.
5. **Festival-native, fail-soft.** Built for thumb, sun, noise, and flaky connectivity. Large tap targets, bottom-anchored primary actions, graceful empty/loading states. Never block the user behind auth, seeds, or setup.

## Accessibility & Inclusion
Basic / best-effort — this is a throwaway single-event app, so don't over-invest, but don't ship something unusable outdoors. Keep body text and horn states legible in bright sun (lean toward AA contrast even if not formally audited), maintain large touch targets per the mobile-first ADR, and honor `prefers-reduced-motion` for the confetti / metal moment. Don't rely on crimson alone to convey horn fill where a cheap shape/fill cue also works.
