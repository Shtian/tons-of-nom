# ADR 0002 — No menu entity; description lives on the rating

**Status:** Accepted
**Date:** 2026-06-24

## Context
Initial brief said each stall has its own menu. Considered modeling Menu / MenuItem and rating items. That adds a whole entity tree, seeding burden, and per-item rating UI — heavy for a casual festival site.

## Decision
Drop the menu concept entirely. A Stall has no stored menu. If a user wants to say what they ate or why they scored it, they type it into the optional **description** on their Rating.

## Consequences
- Domain shrinks to two entities: Stall and Rating.
- No menu seeding, no item management.
- Ratings are stall-level only, never item-level.
- Free-text description carries all the "what / why" nuance.
- If item-level ratings are ever wanted, this is a real schema change — not a config tweak.
