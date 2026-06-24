# ADR 0006 — localStorage nickname (attribution only)

**Status:** Accepted
**Date:** 2026-06-24

## Context
Wanted submissions attributed to a person without building real auth. A nickname captured on first visit and kept in localStorage gives a name with near-zero friction.

## Decision
On first open, **prompt for a nickname** (required — can't rate or add a stall without one). Store it in localStorage. Attach it to every Rating and every added Stall as the creator's display name.

Scope is **attribution only**:
- The nickname is shown on ratings/stalls ("🤘 4.5 — Stian").
- It is **not** auth: spoofable, per-device, no verification.
- Ratings remain **immutable** — no edit, no delete, even of your own. (Upholds ADR 0001.)

## Consequences
- This is the only use of localStorage for app behaviour.
- Clearing storage / switching device = new prompt, no continuity. Accepted.
- Two people can pick the same nickname. Accepted — it's a label, not an account.
- `nickname` is a required string field on both `stalls` and `ratings`.
- Nickname can be changed by the user (it's just a localStorage value); past submissions keep the name they were made under.
