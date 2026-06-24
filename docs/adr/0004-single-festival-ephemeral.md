# ADR 0004 — Single festival, ephemeral

**Status:** Accepted
**Date:** 2026-06-24

## Context
Could build a multi-festival platform (festivals over time, each with its own stalls). Decided against — this serves one event.

## Decision
Hardcode to **one festival**. No Festival entity, no festival selector, no multi-tenant data. Stalls and Ratings all belong to the single implicit event. Data is throwaway after the event.

## Consequences
- No `festivalId` on any entity.
- Simpler routing, simpler data, simpler UI.
- Reuse for a future event = redeploy / wipe data, not a feature.
- Festival name/branding can be a build-time constant.
