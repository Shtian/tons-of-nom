# ADR 0009 — Leaderboard ranking via weighted (Bayesian) average

**Status:** Accepted
**Date:** 2026-06-24

## Context
Stall list is sorted highest-rated first. With half-horns and a low, uneven number of ratings, a raw average lets a 5.0-from-1-rating outrank a 4.7-from-many. Decision was delegated ("you choose, there won't be many ratings").

## Decision
Sort by a **weighted (Bayesian) average** that gently pulls each stall's score toward the global mean when it has few ratings:

```
weighted = (avg_horns * n + prior_mean * m) / (n + m)
```
- `n` = number of ratings for the stall
- `avg_horns` = that stall's raw mean horn score
- `prior_mean` = `3.0` (midpoint of the 1–5 scale)
- `m` = `3` (prior weight — a stall needs a few ratings to fully "earn" its average)

**Sort** by `weighted`, descending. **Display** the raw average (rounded to half horns) and the rating count — users see the honest number; the leaderboard just orders fairly. Stalls with zero ratings sort last, shown as "not rated yet".

## Consequences
- A single 5.0 starts near 3.0-ish and climbs as real ratings accumulate — no flukes at #1.
- Harmless at low volume (the whole point) and still correct if it gets busy.
- `m` and `prior_mean` are tunable constants if the ordering feels off.
- Computed in the Convex query that returns the ranked stall list.
