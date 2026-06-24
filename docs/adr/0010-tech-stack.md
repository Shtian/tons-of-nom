# ADR 0010 — Tech stack

**Status:** Accepted
**Date:** 2026-06-24

## Decision
Build with, every dependency pinned to the latest available at scaffold time:

| Concern | Choice | Version (2026-06-24) |
|---------|--------|----------------------|
| Framework | Next.js (App Router) | 16.2.9 |
| UI runtime | React / React DOM | 19.2.7 |
| Backend / DB | Convex | 1.42.0 |
| Styling | Tailwind CSS | 4.3.1 |
| Components | shadcn/ui (CLI) | 4.11.0 |
| Lint + format | Biome | 2.5.1 |
| Icons | lucide-react | (latest) |
| Confetti (metal moment) | canvas-confetti | 1.9.4 |

Package manager: **pnpm** (already set in package.json: `pnpm@10.33.0`).

## Notes
- Biome replaces ESLint + Prettier (one tool, fast).
- Tailwind 4 = CSS-first config (`@import "tailwindcss"`, no `tailwind.config.js` unless needed).
- shadcn is a CLI/generator, not a runtime dep — components are copied into the repo.
- Convex provides the live-reactive data layer (ADR 0005).

## Consequences
- `create-next-app` baseline, then layer Convex + shadcn + Biome.
- Next's default ESLint is removed in favour of Biome.
