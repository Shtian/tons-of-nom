# 🤘 Tons of Nom

Rate festival food stalls with metal horns. No login, one festival, crowd-built stall list.

Design decisions live in [`docs/`](./docs) — start with [`DOMAIN-MODEL.md`](./docs/DOMAIN-MODEL.md)
and the ADRs in [`docs/adr/`](./docs/adr).

## Stack

Next.js 16 · React 19 · Convex · Tailwind 4 · shadcn/ui (base-ui) · Biome · pnpm

## Setup

```bash
pnpm install

# One-time: log in, create a Convex project, generate convex/_generated,
# and write NEXT_PUBLIC_CONVEX_URL into .env.local. Opens a browser.
pnpm dev:convex     # leave running in its own terminal

# In a second terminal:
pnpm dev            # http://localhost:3000
```

> The app won't build or typecheck until `pnpm dev:convex` has run once — it
> generates `convex/_generated/`, which the frontend imports.

### Optional: the metal title font

Drop `Faceless.woff2` into `public/fonts/` — see [`public/fonts/README.md`](./public/fonts/README.md).

## Scripts

| Script | Does |
|--------|------|
| `pnpm dev` | Next dev server |
| `pnpm dev:convex` | Convex dev (codegen + live backend) |
| `pnpm build` | Production build |
| `pnpm lint` | Biome check |
| `pnpm format` | Biome check + autofix |
| `pnpm typecheck` | `tsc --noEmit` |
