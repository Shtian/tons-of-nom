# Domain Model — tons-of-nom

The whole domain after grilling. Two entities. No User, no Menu, no Festival entity.

## Entities

### Stall
A food vendor at the (single, implicit) festival.

| Field | Type | Notes |
|-------|------|-------|
| `_id` | Convex id | |
| `name` | string | Required. Not unique — duplicates allowed (ADR 0007). |
| `nickname` | string | Required. Who added it (ADR 0006). |
| `_creationTime` | number | Convex built-in. |

Derived (computed in query, not stored):
- `count` — number of ratings
- `avgHorns` — raw mean of horn scores (display)
- `weighted` — Bayesian score for sorting (ADR 0009)

### Rating
One immutable submission against a Stall.

| Field | Type | Notes |
|-------|------|-------|
| `_id` | Convex id | |
| `stallId` | id → stalls | Required. |
| `horns` | number | Required. 1.0–5.0, 0.5 steps (ADR 0003). |
| `description` | string \| undefined | Optional free text (ADR 0002). |
| `nickname` | string | Required. Who rated (ADR 0006). |
| `_creationTime` | number | Convex built-in. |

## Relationships
- Stall **1 — N** Rating (a rating belongs to exactly one stall).
- No User entity — nickname is a plain string on each row, not a foreign key.

## Convex schema (sketch)

```ts
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stalls: defineTable({
    name: v.string(),
    nickname: v.string(),
  }),
  ratings: defineTable({
    stallId: v.id("stalls"),
    horns: v.number(),        // 1.0–5.0, 0.5 steps
    description: v.optional(v.string()),
    nickname: v.string(),
  }).index("by_stall", ["stallId"]),
});
```

## Core operations
- `addStall(name, nickname)` → mutation.
- `addRating(stallId, horns, description?, nickname)` → mutation. No edit/delete (ADR 0001/0006).
- `listStalls()` → query returning each stall + `count`, `avgHorns`, `weighted`, sorted by `weighted` desc; zero-rating stalls last.
- `getStall(stallId)` → query: stall + its ratings (newest first) for the detail view.

## UI surfaces (implied, not yet specced)
1. **First-visit nickname prompt** (required, localStorage).
2. **Stall list / leaderboard** — ranked, with search filter + "add stall" affordance (obvious when empty).
3. **Add stall** — name only.
4. **Rate stall** — half-horn 🤘 picker + optional description; 5 horns → metal moment (confetti + sting).
5. **Stall detail** — avg + count + the list of ratings/descriptions.

## Validation rules
- `horns` must be in {1, 1.5, 2, … 5}. Reject otherwise.
- `name`, `nickname` non-empty after trim.
- `description` optional; cap length (e.g. 500 chars) — sane bound, not moderation (ADR 0001).
