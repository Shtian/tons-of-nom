# ADR 0003 — Horn rating scale (1–5, half-horns)

**Status:** Accepted
**Date:** 2026-06-24

## Context
Ratings use the metal horns 🤘. Needed to pin down range, granularity, and meaning.

## Decision
- Range **1 to 5 horns**. Higher = better.
- **Half-horns allowed** — 0.5 increments (1, 1.5, … 5). 9 selectable levels.
- No zero rating — submitting a rating means at least 1 horn.
- A full **5-horn** rating triggers the **metal moment**: metal-themed confetti. No audio.

## Consequences
- Rating value stored as a number with 0.5 granularity (e.g. 1.0–5.0).
- UI needs a half-step horn picker (tap/drag), not just 5 discrete buttons.
- 5-horn path needs a confetti animation. No audio asset.
- Aggregate display (average horns per stall) must render half horns sensibly.
- Minimum rating is **1.0** (no zero, no 0.5).
