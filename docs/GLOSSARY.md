# Glossary — tons-of-nom

Shared language for the project. One festival, no auth, rate food stalls with metal horns.

| Term | Meaning |
|------|---------|
| **Festival** | The single, hardcoded event this site serves. Not a reusable platform — one event, then throwaway. (ADR 0004) |
| **Stall** | A food vendor at the festival. The thing being rated. Has a **name** and a creator **nickname**. No menu is stored. Anyone can add one; duplicates are allowed. (ADR 0002, 0007, 0008) |
| **Rating** | One anonymous-ish, fire-and-forget submission against a Stall: a horn score, an optional description, and the creator's nickname. Immutable — no edit, no delete. (ADR 0001, 0003, 0006) |
| **Horn score** | The 🤘 rating value. Range 1–5, half-horns allowed (0.5 steps, 9 levels). Higher = better. (ADR 0003) |
| **Metal moment** | The reward for a full **5-horn** rating: metal-themed confetti. No audio. (ADR 0003) |
| **Description** | Optional free text on a Rating. Replaces the menu idea — users say what they ate / thought here. (ADR 0002) |
| **Nickname** | A required name captured on first visit and stored in localStorage. Attribution only — spoofable, not auth, doesn't unlock edit/delete. Shown on stalls and ratings. (ADR 0006) |
| **Weighted average** | The ranking score: raw horn average pulled toward 3.0 with a small prior, so few-vote stalls can't fluke to #1. Sort by this; display the raw average + count. (ADR 0009) |
| **Search filter** | Client-side, case-insensitive filter over the stall list. Find a stall to rate, and check for an existing one before adding (soft dup-avoidance). (ADR 0007) |
