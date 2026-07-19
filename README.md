# PEQ Academy

A worldwide online academy for pressure equipment professionals — pressure
vessels, boilers, piping systems, and storage tanks. Built with Next.js
(App Router), TypeScript, and Tailwind CSS.

## What's included

- **Marketing site** (`/`) — hero, domain overview, featured courses, and
  platform highlights.
- **Course catalog** (`/courses`) — searchable, filterable catalog of 14
  courses spanning fundamentals, codes & standards (ASME, PED, API, NBIC,
  B31.3), inspection & NDE, mechanical integrity, safety & relief systems,
  welding, and certification exam prep (API 510 / 570 / 653).
- **Course detail pages** (`/courses/[slug]`) — curriculum, outcomes,
  instructor info, and an enroll CTA, statically generated per course.
- **Equipment Manager** (`/equipment-manager`) — a working, client-side
  asset registry. Register pressure vessels, boilers, piping circuits,
  tanks, heat exchangers, compressors, and relief devices; the tool
  computes each asset's next inspection due date from its applicable code
  and interval, and flags Compliant / Due Soon / Overdue status. Data
  persists to `localStorage` and can be exported to CSV.
- **Pricing** (`/pricing`) — Starter / Professional / Team & Enterprise
  plans, plus FAQ.
- **About** (`/about`) and **Contact** (`/contact`) pages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Content to customize before launch

- Replace placeholder testimonials in `src/app/page.tsx` with real learner
  quotes.
- Add real instructor bios/photos in `src/app/about/page.tsx` and
  `src/data/courses.ts` (`instructorRole`).
- Wire `src/components/ContactForm.tsx` to a real email/CRM backend — it
  currently only simulates submission client-side.
- If you want the Equipment Manager to sync across users/devices (the
  "Team & Enterprise" pitch on the pricing page), add a backend + auth;
  today it's local-only by design (`localStorage`).
