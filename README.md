# RoundReview

**Every round makes you better.**

A debate tournament preparation platform for competitive debaters: track your season,
save judge feedback, analyze performance, prepare with checklists, and practice with a
built-in debate timer.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The public landing page is at `/`; the app lives behind the
(mocked) sign-in at `/dashboard`.

Production build:

```bash
npm run build
npm start
```

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with a token-based light/dark theme (`next-themes`)
- **Recharts** for analytics, **Framer Motion** for micro-interactions, **Lucide** icons

## Project structure

```
app/
  page.tsx              Landing page
  signin/  signup/      Mock authentication
  (app)/                Logged-in app (sidebar shell)
    dashboard/  tournaments/[id]/  feedback/[id]/
    analytics/  insights/  timer/  checklist/  resources/  settings/
components/
  landing/   Marketing sections (hero, features, mobile showcase, pricing…)
  layout/    Sidebar shell, page headers
  ui/        Button, Card, Dialog, Toast, forms, progress…
  analytics/ Chart components (Recharts wrappers)
  tournaments/  feedback/  Domain forms & cards
lib/
  types.ts          Domain models (Tournament, Round, JudgeFeedback…)
  mock-data.ts      Seeded sample season
  stats.ts          Derived analytics (win rate, streaks, tag counts…)
  store.tsx         App state provider (CRUD + persistence)
  repositories/     Data-access layer (localStorage today; swap for
                    Supabase/Firebase/Postgres without touching the UI)
  timer-formats.ts  Speech time presets per debate format
```

## Data & auth

All data persists to `localStorage` through `lib/repositories/local-repository.ts` and is
seeded with a realistic sample season. Authentication is mocked; the auth pages are
structured so a real provider (Supabase, Firebase, NextAuth) can be dropped in.

Reset to the sample data anytime from **Settings → Reset Demo Data**.
