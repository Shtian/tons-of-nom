# ADR 0001 — No auth, accept spam

**Status:** Accepted
**Date:** 2026-06-24

## Context
Site lets festival-goers rate food stalls. Lowest possible friction is the goal — no login, no signup, no identity. The flip side: anyone can rate the same stall repeatedly, or add junk stalls. Festival crowd + bored phones = mischief is guaranteed.

## Decision
No authentication. No spam guard of any kind (no per-device cap, no cookie throttle). Ratings are anonymous and unthrottled. Garbage gets buried by volume; the event is short and the stakes are low.

## Consequences
- Zero signup friction — anyone scans a QR / opens the URL and rates instantly.
- No user accounts, no sessions, no identity model in the domain.
- Ratings cannot be edited or deleted by their author (no author identity to tie them to).
- A motivated troll can inflate or tank a stall. Accepted risk.
- Revisit only if abuse visibly ruins the event experience.

> Note: a localStorage **nickname** (ADR 0006) is later added for attribution. It is not auth and does not throttle or verify anything — this ADR stands.
