# Skolvo
weblink:https://www.skolvo.online/

Marketing site for Skolvo, a software studio building focused tools for industries where a
mistake is expensive.

Three products are under development:

- **SignalWatch** — a validation build for source-linked monitoring of public FDA device records
  across separate consultant client workspaces. Scheduled production monitoring is not running.
- **CampusNova** — a private prototype for academy attendance, parent messaging, and fee workflows,
  designed around on-device biometric processing.
- **Skolvo Agent** — a coming-soon workspace intended to help users discover, evaluate, prepare,
  and track job opportunities. It is not publicly available.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

Copy `.env.example` to `.env.local` and fill in the values before running anything that touches
the database or the contact and waitlist endpoints.

## Billing readiness

Published pricing and usage allowances live in `lib/billing/catalog.ts`. Paddle checkout is
deliberately disabled in `lib/billing/paddle.ts` until seller review, public price IDs, and
server-side webhook verification are complete. `.env.example` documents the client-safe price
identifiers and the server-only API key/webhook secret. Never expose a Paddle secret through a
`NEXT_PUBLIC_*` variable.

The public legal pages identify Abdul Rehman as the individual / sole-proprietor operator. The
`LEGAL_OWNER_NAME` variable remains available as the centralized deployment override.

## Stack

- **Next.js 15** (App Router) and **React 19**
- **Tailwind CSS v4**, configured through CSS custom properties in `app/globals.css`
- **Motion** (`motion/react`) for animation and interactive system diagrams
- **MongoDB** via Mongoose, for the waitlist and contact submissions
- **Fonts:** Geist (display), Public Sans (body), IBM Plex Mono (record IDs and timestamps)

## Project layout

```
app/                 Routes, API handlers, and page metadata
  api/               Contact and waitlist endpoints
  legal/             Shared shell for the privacy, terms, and security pages
components/
  motion/            Reveal, HeroSequence, LineReveal, ScrollProgress, Counter
  ui/                Button primitives
  hero/              Animated, status-aware system map
  waitlist/          Single app-wide waitlist dialog provider
lib/                 Database connection
models/              Mongoose schemas
```

## Design system

All colour, type, spacing, radius, and motion values are defined as CSS custom properties in
[`app/globals.css`](app/globals.css). Components reference tokens rather than literal values.

A few conventions worth knowing before adding UI:

- **One accent.** Verdigris is the only accent. Amber identifies FDA Regulatory Watchdog and is
  used nowhere else; crimson is reserved for error states.
- **Contrast.** Every foreground and surface pair is verified at WCAG AA (4.5:1) against paper,
  white, sunk, and both wash surfaces. Verify any new colour before shipping it.
- **Type scale.** Eight steps, from `--text-data` (12px, the floor) to `--text-display-lg`. Avoid
  arbitrary sizes like `text-[13.5px]`.
- **Radius.** Three values only: cards 16px, inputs and small controls 10px, buttons and badges
  fully rounded.
- **Motion.** One shared rhythm (`--ease`, `--dur-enter`, `--dur-exit`). Marketing pages run no
  ambient infinite loops; animation inside a product demo should be demonstrating something.
  Everything honours `prefers-reduced-motion`.

## Known issues

- `eslint.config.mjs` throws `nextVitals is not iterable` on ESLint 9, because
  `eslint-config-next` 15.5 exports flat-config objects rather than arrays. Lint is silently
  skipped during builds as a result. Fixing it surfaces two pre-existing
  `@typescript-eslint/no-explicit-any` errors in the API routes.
- `/logo.png` is a square 1024×1024 icon used as the Open Graph image. Link previews want a
  landscape 1200×630 banner.
- The site has no real photography. Components that need it carry `TODO(assets)` comments with
  the expected dimensions.
