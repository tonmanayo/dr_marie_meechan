# Dr Marie Meechan Website — Design

**Date:** 2026-06-18
**Status:** Approved (Phase 1 in scope)

## Goal

Take the finished, hand-built design (`Dr marie Meechan Website V1`) and ship it online,
pixel-faithful, on a stack that cleanly supports two later features:

1. A client-authored blog ("Letters").
2. The contact form and "Book a session" button emailing the client (Dr Meechan).

The website must look **exactly** as designed. Fidelity is the primary constraint.

## Stack

| Concern   | Choice                                                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | Next.js 16 + TypeScript, App Router, Turbopack, React Compiler                                                                                        |
| Hosting   | Netlify (free tier), auto-deploy from GitHub, existing domain                                                                                         |
| Styling   | Existing `tokens.css` + `site.css` imported verbatim as global CSS; CSS Modules for any new component-scoped styles. No Tailwind / styled-components. |
| Blog      | Sanity (free tier) — visual editor; Next pulls posts, publish triggers a Netlify rebuild via webhook _(Phase 2)_                                      |
| Email     | Netlify Forms — contact form + booking button email Dr Meechan, zero backend _(Phase 3)_                                                              |
| Icons     | Phosphor icons (as in the design)                                                                                                                     |
| Fonts     | Self-hosted Cormorant Garamond + Lato (from the design's `assets/fonts`)                                                                              |

### Why this stack

- **Next.js** is the user's known stack; consistency across their projects and confident maintenance.
- **Netlify** has official Next.js support (auto-detected, free tier runs route handlers/SSR/ISR) and
  Netlify Forms solves the email feature with no backend.
- **Bespoke CSS** preserves the finished design with zero rewrite and zero visual drift.
- **Sanity** gives a non-technical author the smoothest visual editing experience on a free tier.

## Source design

Located at `~/Downloads/Dr marie Meechan Website V1/`:

- Static multi-page HTML: `index.html`, `about.html`, `sessions.html`, `training.html`,
  `contact.html`, `letters.html` (+ `letter-*.html` posts), `your-journey.html`,
  `becoming-belonging.html`.
- `assets/css/tokens.css` + `assets/css/site.css` — the design system.
- `assets/fonts/` — Cormorant Garamond + Lato.
- `assets/img/`, video (`marie-intro.mp4`), `uploads/`.
- `assets/js/site.js` — vanilla JS: header injection (`data-site-header`), mobile menu,
  accordions, rotating tagline, scroll reveals (`IntersectionObserver`), and a contact-form
  submit handler that currently only shows a success state (no backend).
- `screenshots/` — reference renders for the fidelity check.

## Architecture (Phase 1 — faithful port)

- Each design page becomes a route under `app/`:
  `/`, `/about`, `/sessions`, `/training`, `/contact`, `/letters`,
  `/your-journey`, `/becoming-belonging`. Existing `letter-*.html` pages are ported as static
  routes in Phase 1 and migrated into Sanity in Phase 2.
- The JS-injected header (`<div data-site-header>`) becomes a real shared **layout** component
  (`app/layout.tsx` + a `SiteHeader` / `SiteFooter` component). Nav defined once.
- `site.js` behaviour is ported as small **client components** / client-side effects, preserving
  identical behaviour: mobile menu toggle, FAQ accordions, rotating tagline, scroll-reveal observer.
- Reusable markup becomes components **without changing classes or structure**:
  hero, CTA row, FAQ accordion, media figure, letter card.
- Assets move to `public/` (images, fonts, video); `tokens.css` + `site.css` imported once
  globally. Phosphor icons retained.
- The contact form keeps its existing success-state UI; it does **not** email yet in Phase 1.

### Data flow (Phase 1)

Fully static. No runtime data fetching. Pages render at build time and serve as static assets.

## Tooling & quality gates (Phase 1)

- **TypeScript** in `strict` mode; `tsc --noEmit` type-check script.
- **ESLint** (Next.js + TypeScript config) with the project's rules; `lint` script.
- **Prettier** for formatting; `format` / `format:check` scripts.
- **lint-staged + Husky** pre-commit hook running lint + format on staged files (fast local feedback).
- **npm scripts**: `dev`, `build`, `start`, `lint`, `typecheck`, `format:check`, `test`.

### GitHub Actions CI

A workflow (`.github/workflows/ci.yml`) that runs on every push and pull request and **fails if
anything is broken**:

1. Install dependencies (cached).
2. `typecheck` — `tsc --noEmit`.
3. `lint` — ESLint.
4. `format:check` — Prettier.
5. `test` — component/unit tests.
6. `build` — `next build` must succeed (catches broken routes/imports).

Netlify deploys from `main` after CI passes (deploy previews on PRs).

## Error handling

- Contact form: client-side validation + graceful failure message (full email wiring in Phase 3).
- A `not-found.tsx` 404 page styled to match the design.

## Testing

Test-first per the project's TDD practice. Phase 1 covers:

- Interactive components: mobile menu open/close, FAQ accordion toggle, rotating tagline,
  scroll-reveal behaviour, contact-form success state.
- A build/deploy smoke check (CI `next build`).
- **Fidelity check:** compare each ported route against the matching image in `screenshots/`
  to catch visual drift.

## Phasing

1. **Phase 1 — Live site (this deliverable):** Faithful port of all pages, shared layout/components,
   tooling + CI, deploy to Netlify on the domain. Form shows existing success state (no email yet).
   Milestone: the site is live, exactly as designed, with a green CI pipeline.
2. **Phase 2 — Blog:** Sanity schema for Letters (title, slug, date, hero image, body), `/letters`
   index + post template, migrate existing letters, publish→rebuild webhook.
3. **Phase 3 — Emails:** Wire contact form + "Book a session" button to Netlify Forms with email
   notifications to Dr Meechan; keep existing success UI.

## Decisions & assumptions

- **Booking button = emails Dr Meechan** (per brief). Real self-serve scheduling (e.g. Cal.com free
  tier) is explicitly out of scope; revisit only if requested later.
- Domain is already owned; DNS will point to Netlify.
- Phase 1 is the first deliverable; Phases 2–3 are follow-on work with their own plans.

## Out of scope

- Self-serve calendar/scheduling integration.
- Tailwind / styled-components / SWR / Framer Motion.
- Any redesign — the design is fixed.
