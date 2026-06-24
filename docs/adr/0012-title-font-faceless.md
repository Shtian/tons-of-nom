# ADR 0012 — Title font "Faceless" (death-metal)

**Status:** Accepted (pending font file)
**Date:** 2026-06-24

## Context
The wordmark "Tons of Nom" should look black/death-metal. Chosen font: **Faceless** — a free death-metal display face (from dafont). It is not on Google Fonts, so it must be self-hosted.

## Decision
- Self-host Faceless and load it via `next/font/local`.
- Use it **only** for the title/wordmark (display use), not body text — death-metal faces are near-illegible at small sizes.
- Body/UI text stays on the default sans (Geist) from the Next scaffold.

## Required manual step
The font file is not redistributable through this repo automatically. Drop the file here:
```
public/fonts/Faceless.woff2   (or .ttf — convert to woff2 ideally)
```
Then it's wired through `app/fonts.ts` → CSS variable `--font-faceless`.

## License note
Faceless on dafont is typically **free for personal use**. A public festival site may be commercial use — confirm the license / get a commercial license before going live. Flagged, not resolved here.

## Consequences
- Until the file is added, the title falls back to the system display stack (won't crash, just won't look metal).
- One extra font asset on the wordmark only — negligible perf cost (display swap).
