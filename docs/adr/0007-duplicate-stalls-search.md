# ADR 0007 — Duplicate stalls allowed; search filter to mitigate

**Status:** Accepted
**Date:** 2026-06-24

## Context
No auth + anyone-can-add means the same stall can be added twice, splitting its ratings. Considered a hard unique constraint and a soft "did you mean?" check.

## Decision
**Allow duplicates.** No uniqueness enforced. Instead, the stall list has a **search/filter box** (client-side, case-insensitive, matches stall name). It serves double duty:
1. Find a stall fast to rate it.
2. Before adding, type the name — if it shows up, rate the existing one instead of creating a dupe.

## Consequences
- Adding a stall is frictionless (name only, no server round-trip to dedupe).
- Duplicates can still happen if people don't search first — accepted, consistent with ADR 0001.
- Search is a pure client filter over the already-loaded stall list (fits a single small festival).
- Empty start (ADR 0008): the list grows entirely from user adds; search keeps it usable as it grows.
