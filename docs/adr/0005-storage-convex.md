# ADR 0005 — Convex as backend / storage

**Status:** Accepted
**Date:** 2026-06-24

## Context
Ratings and stalls must be shared across every visitor's phone, so a server-side store is required (localStorage alone can't work for shared data). Wanted minimal ops for a short-lived event site.

## Decision
Use **Convex** as the backend and database. Stalls and Ratings live in Convex tables. Reads are live/reactive, so a stall's average horns and new ratings update on screen without manual refresh.

## Consequences
- No separate API layer to build — Convex queries/mutations are the backend.
- Real-time updates come for free (good festival vibe: watch scores move live).
- Aggregates (average horns, rating count) computed in Convex queries.
- localStorage is used only for the per-device nickname (see ADR 0006), never for shared data.
- Schema lives in Convex; the two tables are `stalls` and `ratings`.
