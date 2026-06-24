# ADR 0011 — Mobile-first (north star)

**Status:** Accepted
**Date:** 2026-06-24

## Context
The site is used at a festival, on phones, standing in line at a stall. Desktop is an afterthought.

## Decision
**Mobile is the primary and effectively only target.** Design and build mobile-first:
- Single-column layouts, thumb-reachable controls, large tap targets (horn picker especially).
- Bottom-anchored primary actions where it helps one-handed use.
- Default to base (mobile) Tailwind styles; add `sm:`/`md:` only to keep it from looking broken on a laptop — not to build a separate desktop experience.
- Test at ~375–430px width first.

## Consequences
- No complex multi-pane / sidebar layouts.
- Dialogs and sheets sized for small screens.
- Horn picker must work well with touch (tap + drag for half-horns), not hover.
