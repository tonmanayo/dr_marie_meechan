# Dr Marie Meechan Website — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the finished static design at `~/Downloads/Dr marie Meechan Website V1/` into a Next.js 16 app, pixel-faithful, deployed to Netlify, with linting, type-checking, and a CI pipeline that fails if anything is broken.

**Architecture:** A faithful port. The existing `tokens.css` + `site.css` and all assets are served unchanged as static files from `public/assets/`, referenced via `<link>` tags in the root layout — this preserves every relative `url()` (fonts/images) and the design verbatim. The JS-injected header/footer (`site.js`) become React components, and each discrete interactive behaviour (mobile menu, rotating tagline, testimonial rotator, FAQ accordion, form success state, letter filters, scroll reveals) becomes a small, tested client component. Page bodies are transcribed from the source HTML into `app/*/page.tsx`, swapping in those components and converting `*.html` links to Next routes.

**Tech Stack:** Next.js 16 (App Router, Turbopack, React Compiler), TypeScript (strict), Vitest + React Testing Library, ESLint (flat config) + Prettier, Husky + lint-staged, GitHub Actions, Netlify.

---

## Source → route mapping

| Source file | Route | `page.tsx` path |
|---|---|---|
| `index.html` | `/` | `app/page.tsx` |
| `about.html` | `/about` | `app/about/page.tsx` |
| `sessions.html` | `/sessions` | `app/sessions/page.tsx` |
| `your-journey.html` | `/your-journey` | `app/your-journey/page.tsx` |
| `becoming-belonging.html` | `/becoming-belonging` | `app/becoming-belonging/page.tsx` |
| `training.html` | `/training` | `app/training/page.tsx` |
| `letters.html` | `/letters` | `app/letters/page.tsx` |
| `contact.html` | `/contact` | `app/contact/page.tsx` |
| `letter-disenfranchised-grief.html` | `/letters/disenfranchised-grief` | `app/letters/disenfranchised-grief/page.tsx` |
| `letter-petri-dish-loss.html` | `/letters/petri-dish-loss` | `app/letters/petri-dish-loss/page.tsx` |
| `letter-after-the-miracle-baby.html` | `/letters/after-the-miracle-baby` | `app/letters/after-the-miracle-baby/page.tsx` |

Ignore the alternate exports (`index-print.html`, `index-standalone.html`, `*-standalone*.html`, `tweaks-panel.jsx`, `scraps/`, `screenshots/`, `uploads/`, `copy_extracted.txt`) — they are not part of the live site. (`screenshots/` is used only for the manual fidelity check.)

## File structure

```
app/
  layout.tsx                       # root: html/body, <link> css, skip-link, header, <main>, footer
  page.tsx                         # home
  about/page.tsx
  sessions/page.tsx
  your-journey/page.tsx
  becoming-belonging/page.tsx
  training/page.tsx
  letters/page.tsx
  letters/disenfranchised-grief/page.tsx
  letters/petri-dish-loss/page.tsx
  letters/after-the-miracle-baby/page.tsx
  contact/page.tsx
  not-found.tsx
components/
  SiteHeader.tsx                   # client: nav + mobile menu, active link
  SiteFooter.tsx                   # server: static footer
  RevealObserver.tsx               # client: .reveal scroll-in observer
  RotatingTagline.tsx              # client: hero tagline cycle
  TestimonialRotator.tsx           # client: rotating pullquote
  Faq.tsx                          # client: accordion
  FormWithSuccess.tsx              # client: form → success panel
  LetterFilters.tsx                # client: topic chips + post grid
  __tests__/*.test.tsx
lib/
  nav.ts                           # NAV array (shared by header + footer)
public/assets/                     # verbatim copy of design assets (css, fonts, img, video)
next.config.ts  tsconfig.json  eslint.config.mjs  .prettierrc  .prettierignore
vitest.config.ts  vitest.setup.ts  netlify.toml  package.json
.husky/pre-commit  .github/workflows/ci.yml
```

---

## Task 1: Scaffold the Next.js app

**Files:** Creates `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, etc. (the repo currently contains only `.git/` and `docs/`).

- [ ] **Step 1: Scaffold into the current directory**

Run:
```bash
cd /Users/tonymack/dev/dr_marie_meechan
npx create-next-app@latest . --typescript --eslint --app --no-src-dir --no-tailwind --turbopack --import-alias "@/*" --use-npm
```
If prompted that the directory is not empty, accept (it only contains `.git/` and `docs/`, which do not conflict). Accept defaults for any remaining prompts.

- [ ] **Step 2: Enable the React Compiler**

Edit `next.config.ts` to:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
```
Install the compiler plugin if the build asks for it:
```bash
npm install -D babel-plugin-react-compiler
```

- [ ] **Step 3: Confirm strict TypeScript**

Open `tsconfig.json` and verify `"strict": true` is present under `compilerOptions` (create-next-app sets this by default). If absent, add it.

- [ ] **Step 4: Verify the app boots and builds**

Run:
```bash
npm run build
```
Expected: build completes with no errors (a default Next starter page).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 16 app with TypeScript + React Compiler"
```

---

## Task 2: Add Prettier and finalize lint/type-check scripts

**Files:**
- Create: `.prettierrc`, `.prettierignore`
- Modify: `package.json` (scripts)
- Verify: `eslint.config.mjs` (created by scaffold)

- [ ] **Step 1: Add Prettier**

Run:
```bash
npm install -D prettier
```
Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100
}
```
Create `.prettierignore`:
```
.next
node_modules
public/assets
package-lock.json
```
(`public/assets` is ignored so the verbatim design CSS/JS is never reformatted.)

- [ ] **Step 2: Add scripts**

In `package.json`, set the `scripts` block to:
```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "vitest run"
}
```

- [ ] **Step 3: Run the gates**

Run:
```bash
npm run typecheck && npm run lint && npm run format:check
```
Expected: `typecheck` and `lint` pass. `format:check` may report files to format — if so, run `npm run format` once, then re-run `npm run format:check` until clean.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add Prettier and lint/typecheck/format scripts"
```

---

## Task 3: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.tsx`, `components/__tests__/smoke.test.tsx`

- [ ] **Step 1: Install test deps**

Run:
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.tsx"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 3: Create `vitest.setup.tsx`**

```ts
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/navigation is not available in jsdom; provide a default mock.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// next/link → plain anchor in tests.
vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => {
    const { href, ...rest } = props;
    return <a href={typeof href === "string" ? href : "#"} {...rest}>{children}</a>;
  },
}));
```

- [ ] **Step 4: Write a failing smoke test**

Create `components/__tests__/smoke.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";

function Hello() {
  return <p>hello</p>;
}

test("test harness renders components", () => {
  render(<Hello />);
  expect(screen.getByText("hello")).toBeInTheDocument();
});
```

- [ ] **Step 5: Run and verify it passes**

Run: `npm test`
Expected: 1 passing test.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test: set up Vitest + React Testing Library"
```

---

## Task 4: Add Husky + lint-staged pre-commit hook

**Files:**
- Create: `.husky/pre-commit`
- Modify: `package.json` (`lint-staged` config, `prepare` script)

- [ ] **Step 1: Install and init**

Run:
```bash
npm install -D husky lint-staged
npx husky init
```

- [ ] **Step 2: Configure lint-staged**

Add to `package.json`:
```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

- [ ] **Step 3: Set the hook**

Replace the contents of `.husky/pre-commit` with:
```sh
npx lint-staged
```

- [ ] **Step 4: Verify the hook runs**

Run:
```bash
git add -A && git commit -m "chore: add Husky + lint-staged pre-commit hook"
```
Expected: lint-staged runs on commit and the commit succeeds.

---

## Task 5: GitHub Actions CI pipeline

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create the workflow**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run format:check
      - run: npm test
      - run: npm run build
```

- [ ] **Step 2: Verify the steps locally first**

Run:
```bash
npm ci && npm run typecheck && npm run lint && npm run format:check && npm test && npm run build
```
Expected: every command exits 0.

- [ ] **Step 3: Commit and push**

```bash
git add -A
git commit -m "ci: add GitHub Actions pipeline (typecheck, lint, format, test, build)"
git push -u origin main
```
Expected: the CI run on GitHub goes green. (Verify in the Actions tab.)

---

## Task 6: Migrate design assets into `public/assets`

**Files:**
- Create: `public/assets/css/*`, `public/assets/fonts/*`, `public/assets/img/*`, video files

- [ ] **Step 1: Copy assets verbatim**

Run:
```bash
cp -R "/Users/tonymack/Downloads/Dr marie Meechan Website V1/assets" /Users/tonymack/dev/dr_marie_meechan/public/assets
```
This brings `css/` (tokens.css, site.css), `fonts/`, `img/`, and `js/` across. The `@font-face` rules in `tokens.css` use `url("../fonts/...")` relative to `css/`, so they resolve correctly when served from `/assets/css/`.

- [ ] **Step 2: Remove the now-unused JS**

The behaviour in `assets/js/site.js` is reimplemented as React components, so delete it to avoid confusion:
```bash
rm /Users/tonymack/dev/dr_marie_meechan/public/assets/js/site.js
```

- [ ] **Step 3: Verify fonts and a key image exist**

Run:
```bash
ls public/assets/fonts/Lato-Regular.ttf public/assets/img/marie-hero.jpg public/assets/img/logo-stacked-bold.png
```
Expected: all three paths listed (no "No such file").

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add design assets (css, fonts, images) to public/assets"
```

---

## Task 7: Shared NAV data and root layout

**Files:**
- Create: `lib/nav.ts`
- Modify: `app/layout.tsx`
- Delete: `app/page.module.css`, default global styles import if they conflict (see step 3)

- [ ] **Step 1: Create `lib/nav.ts`**

```ts
export type NavItem = { href: string; label: string; key: string };

export const NAV: NavItem[] = [
  { href: "/", label: "Home", key: "home" },
  { href: "/about", label: "About", key: "about" },
  { href: "/sessions", label: "Sessions", key: "sessions" },
  { href: "/your-journey", label: "Your journey", key: "journey" },
  { href: "/becoming-belonging", label: "Becoming & belonging", key: "becoming" },
  { href: "/letters", label: "Letters", key: "letters" },
  { href: "/contact", label: "Contact", key: "contact" },
];
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";

export const metadata: Metadata = {
  title:
    "Dr Marie Meechan, PhD · The Fertility Psychotherapist — Edinburgh & worldwide online",
  description:
    "Specialist online fertility counselling and coaching with Dr Marie Meechan, PhD. Edinburgh-based, supporting you worldwide through every season of your fertility journey.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/tokens.css" />
        <link rel="stylesheet" href="/assets/css/site.css" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Remove starter styles that would override the design**

Delete the scaffold's default styling so only the design CSS applies:
```bash
rm -f app/page.module.css app/globals.css
```
If `app/layout.tsx` (from the scaffold) imported `./globals.css` or used `next/font`, ensure those imports are gone (the replacement above has none).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add shared NAV data and root layout with design stylesheets"
```
(Note: the app will not build cleanly until the components in Tasks 8–10 exist; that is expected. Do the build verification at the end of Task 10.)

---

## Task 8: SiteHeader component

**Files:**
- Create: `components/SiteHeader.tsx`, `components/__tests__/SiteHeader.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/__tests__/SiteHeader.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";

vi.mock("next/navigation", () => ({ usePathname: () => "/about" }));

test("marks the current route link as current", () => {
  render(<SiteHeader />);
  const about = screen.getAllByRole("link", { name: "About" })[0];
  expect(about).toHaveAttribute("aria-current", "page");
});

test("mobile menu opens and closes", async () => {
  const user = userEvent.setup();
  render(<SiteHeader />);
  const openBtn = screen.getByRole("button", { name: "Open menu" });
  expect(openBtn).toHaveAttribute("aria-expanded", "false");
  await user.click(openBtn);
  expect(openBtn).toHaveAttribute("aria-expanded", "true");
  await user.click(screen.getByRole("button", { name: "Close menu" }));
  expect(openBtn).toHaveAttribute("aria-expanded", "false");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- SiteHeader`
Expected: FAIL (cannot find module `SiteHeader`).

- [ ] **Step 3: Implement `components/SiteHeader.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";

const LOGO = "/assets/img/logo-stacked-bold.png";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isCurrent = (href: string) => pathname === href;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const links = NAV.map((n) => (
    <Link
      key={n.key}
      href={n.href}
      className={isCurrent(n.href) ? "is-current" : undefined}
      aria-current={isCurrent(n.href) ? "page" : undefined}
      onClick={() => setOpen(false)}
    >
      {n.label}
    </Link>
  ));

  return (
    <>
      <header className="site-header">
        <div className="container site-header__row">
          <Link
            className="brand"
            href="/"
            aria-label="Dr Marie Meechan, The Fertility Psychotherapist — home"
          >
            <img src={LOGO} alt="Dr Marie Meechan, The Fertility Psychotherapist" />
          </Link>
          <nav className="nav" aria-label="Primary">
            {links}
          </nav>
          <div className="header-actions">
            <Link className="btn btn--primary" href="/contact">
              Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
            </Link>
            <button
              className="burger"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <i className="ph-light ph-list" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="container mobile-menu__top">
          <img src={LOGO} alt="" />
          <button
            className="mobile-menu__close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <i className="ph-light ph-x" aria-hidden="true" />
          </button>
        </div>
        <nav className="container" aria-label="Mobile">
          {links}
          <Link className="btn btn--primary" href="/contact" onClick={() => setOpen(false)}>
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- SiteHeader`
Expected: PASS (both tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add SiteHeader with active link and mobile menu"
```

---

## Task 9: SiteFooter component

**Files:**
- Create: `components/SiteFooter.tsx`, `components/__tests__/SiteFooter.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/__tests__/SiteFooter.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/SiteFooter";

test("renders contact email and key explore links", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("link", { name: /hello@drmariemeechan.com/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "About Marie" })).toHaveAttribute("href", "/about");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- SiteFooter`
Expected: FAIL (cannot find module).

- [ ] **Step 3: Implement `components/SiteFooter.tsx`**

Transcribe `buildFooter()` from `assets/js/site.js` (lines 56–92) into JSX. Use `<Link>` for internal routes (`/about`, `/sessions`, `/your-journey`, `/becoming-belonging`, `/letters`, `/contact`) and plain `<a>` for `mailto:` and external (`https://intherapywithmarie.com`). Replace `&amp;` with `&`. The footer privacy link has no target page yet — render it as `<a className="link" href="#">Privacy &amp; ethics</a>` and leave a `{/* TODO Phase: privacy page */}` comment.

```tsx
import Link from "next/link";

const LOGO = "/assets/img/logo-stacked-bold.png";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src={LOGO} alt="Dr Marie Meechan, The Fertility Psychotherapist" />
          <p>Specialist psychotherapy for your whole self — not just your fertility.</p>
        </div>
        <div className="footer-col">
          <span className="eyebrow">Explore</span>
          <Link href="/about">About Marie</Link>
          <Link href="/sessions">How sessions work</Link>
          <Link href="/your-journey">Your journey</Link>
          <Link href="/becoming-belonging">Becoming & belonging</Link>
          <Link href="/letters">Letters from Marie</Link>
        </div>
        <div className="footer-col">
          <span className="eyebrow">Begin</span>
          <Link href="/contact">Send a message</Link>
          <Link href="/contact">Book a session</Link>
          <Link href="/contact">Free introductory call</Link>
        </div>
        <div className="footer-col">
          <span className="eyebrow">Find Marie</span>
          <a href="mailto:hello@drmariemeechan.com">
            <i className="ph-light ph-envelope-simple" aria-hidden="true" /> hello@drmariemeechan.com
          </a>
          <a href="https://intherapywithmarie.com">
            <i className="ph-light ph-globe-simple" aria-hidden="true" /> intherapywithmarie.com
          </a>
          <Link href="/contact">
            <i className="ph-light ph-map-pin" aria-hidden="true" /> 37 Mayfield Gardens, Edinburgh
          </Link>
          <span
            className="footer-col"
            style={{ gap: 4, marginTop: 8, color: "var(--color-ink)", fontSize: ".9rem", opacity: 0.85 }}
          >
            In person in Edinburgh · Online worldwide
          </span>
        </div>
      </div>
      <div className="container site-footer__fine">
        <span>© 2026 Dr Marie Meechan, PhD · The Fertility Psychotherapist</span>
        <span>Registered member, British Association for Counselling and Psychotherapy (BACP)</span>
        <a className="link" href="#">
          Privacy & ethics
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- SiteFooter`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add SiteFooter component"
```

---

## Task 10: RevealObserver component

**Files:**
- Create: `components/RevealObserver.tsx`, `components/__tests__/RevealObserver.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/__tests__/RevealObserver.test.tsx`:
```tsx
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { RevealObserver } from "@/components/RevealObserver";

test("falls back to making .reveal elements visible without IntersectionObserver", () => {
  const original = (globalThis as any).IntersectionObserver;
  // @ts-expect-error simulate unsupported environment
  delete (globalThis as any).IntersectionObserver;
  document.body.innerHTML = `<div class="reveal" data-testid="r"></div>`;
  render(<RevealObserver />);
  expect(document.querySelector(".reveal")).toHaveClass("is-visible");
  (globalThis as any).IntersectionObserver = original;
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- RevealObserver`
Expected: FAIL (cannot find module).

- [ ] **Step 3: Implement `components/RevealObserver.tsx`**

Port `initReveal()` from `site.js` (lines 184–194), re-running on pathname change so reveals work after client navigation.
```tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- RevealObserver`
Expected: PASS.

- [ ] **Step 5: Verify the whole app now builds**

Run: `npm run build`
Expected: build succeeds (home page still the starter; full pages come next). Fix any import errors before continuing.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add RevealObserver for scroll-in animations"
```

---

## Task 11: RotatingTagline component

**Files:**
- Create: `components/RotatingTagline.tsx`, `components/__tests__/RotatingTagline.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { RotatingTagline } from "@/components/RotatingTagline";

const LINES = ["One line.", "Two line.", "Three line."];

test("renders all lines and an aria-label of the full text", () => {
  render(<RotatingTagline lines={LINES} />);
  LINES.forEach((l) => expect(screen.getByText(l)).toBeInTheDocument());
  expect(screen.getByLabelText(LINES.join(" "))).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- RotatingTagline`
Expected: FAIL.

- [ ] **Step 3: Implement `components/RotatingTagline.tsx`**

Port `initTagline()` (lines 139–153), honouring `prefers-reduced-motion`.
```tsx
"use client";

import { useEffect, useState } from "react";

export function RotatingTagline({ lines }: { lines: string[] }) {
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setReduce(true);
      return;
    }
    const id = setInterval(() => setActive((i) => (i + 1) % lines.length), 3200);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <h1
      className={`tagline-stack${reduce ? " tagline-static" : ""}`}
      aria-label={lines.join(" ")}
      style={reduce ? { gridAutoFlow: "row" } : undefined}
    >
      {lines.map((line, i) => (
        <span key={i} className={`line${reduce || i === active ? " is-active" : ""}`}>
          {line}
        </span>
      ))}
    </h1>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- RotatingTagline`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add RotatingTagline hero component"
```

---

## Task 12: TestimonialRotator component

**Files:**
- Create: `components/TestimonialRotator.tsx`, `components/__tests__/TestimonialRotator.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestimonialRotator } from "@/components/TestimonialRotator";

const ITEMS = [
  { quote: "First quote", cite: "Client A" },
  { quote: "Second quote", cite: "Client B" },
];

test("renders a dot per testimonial and activates the clicked one", async () => {
  const user = userEvent.setup();
  render(<TestimonialRotator items={ITEMS} />);
  const dots = screen.getAllByRole("button", { name: /Show testimonial/ });
  expect(dots).toHaveLength(2);
  await user.click(dots[1]);
  expect(dots[1]).toHaveClass("is-active");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- TestimonialRotator`
Expected: FAIL.

- [ ] **Step 3: Implement `components/TestimonialRotator.tsx`**

Port `initRotators()` (lines 155–182). The `big` flag reproduces the first home slide's inline `font-size: 42px`.
```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type Testimonial = { quote: string; cite: string; big?: boolean };

export function TestimonialRotator({ items }: { items: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function restart() {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % items.length), 11000);
  }

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <div className="pullquote rotator reveal">
      <span className="quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      {items.map((t, i) => (
        <figure key={i} className={`slide${i === idx ? " is-active" : ""}`} style={{ margin: 0 }}>
          <blockquote style={t.big ? { fontSize: 42 } : undefined}>{t.quote}</blockquote>
          <cite>{t.cite}</cite>
        </figure>
      ))}
      <div className="rotator-dots" role="tablist" aria-label="Testimonials">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            className={i === idx ? "is-active" : undefined}
            onClick={() => {
              setIdx(i);
              restart();
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- TestimonialRotator`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add TestimonialRotator component"
```

---

## Task 13: Faq accordion component

**Files:**
- Create: `components/Faq.tsx`, `components/__tests__/Faq.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "@/components/Faq";

const ITEMS = [
  { q: "Question one?", a: <p>Answer one.</p> },
  { q: "Question two?", a: <p>Answer two.</p> },
];

test("opens an item and closes siblings", async () => {
  const user = userEvent.setup();
  render(<Faq items={ITEMS} />);
  const [q1, q2] = screen.getAllByRole("button");
  expect(q1).toHaveAttribute("aria-expanded", "false");
  await user.click(q1);
  expect(q1).toHaveAttribute("aria-expanded", "true");
  await user.click(q2);
  expect(q1).toHaveAttribute("aria-expanded", "false");
  expect(q2).toHaveAttribute("aria-expanded", "true");
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- Faq`
Expected: FAIL.

- [ ] **Step 3: Implement `components/Faq.tsx`**

Port `initFaq()` (lines 107–137): single-open accordion, sibling close, inline `maxHeight` set to the panel's `scrollHeight` when open (removed when closed) to drive the CSS transition.
```tsx
"use client";

import { useRef, useState, type ReactNode } from "react";

export type FaqEntry = { q: ReactNode; a: ReactNode };

export function Faq({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="faq reveal">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq__item${isOpen ? " is-open" : ""}`}>
            <button
              className="faq__q"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <span className="faq__icon">
                <i className="ph-light ph-plus" aria-hidden="true" />
              </span>
            </button>
            <div
              className="faq__a"
              ref={(el) => {
                panels.current[i] = el;
              }}
              style={isOpen ? { maxHeight: panels.current[i]?.scrollHeight } : undefined}
            >
              <div className="faq__a-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- Faq`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Faq accordion component"
```

---

## Task 14: FormWithSuccess component

**Files:**
- Create: `components/FormWithSuccess.tsx`, `components/__tests__/FormWithSuccess.test.tsx`

> **Phase 1 scope:** this reproduces the existing front-end behaviour only — on submit it hides the form and reveals the success panel (matching `initForms()`, lines 196–209). Actual email sending is Phase 3.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormWithSuccess } from "@/components/FormWithSuccess";

test("hides the form and shows success on submit", async () => {
  const user = userEvent.setup();
  render(
    <FormWithSuccess formClassName="form" success={<p>Thank you.</p>}>
      <button type="submit">Send</button>
    </FormWithSuccess>,
  );
  await user.click(screen.getByRole("button", { name: "Send" }));
  expect(screen.getByText("Thank you.")).toBeVisible();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- FormWithSuccess`
Expected: FAIL.

- [ ] **Step 3: Implement `components/FormWithSuccess.tsx`**

```tsx
"use client";

import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

export function FormWithSuccess({
  formClassName,
  children,
  success,
  successStyle,
}: {
  formClassName?: string;
  children: ReactNode;
  success: ReactNode;
  successStyle?: CSSProperties;
}) {
  const [done, setDone] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return (
    <div style={{ position: "relative" }}>
      <form className={formClassName} onSubmit={onSubmit} style={done ? { display: "none" } : undefined}>
        {children}
      </form>
      <div className="form-success" ref={successRef} hidden={!done} tabIndex={-1} style={successStyle}>
        {success}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- FormWithSuccess`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add FormWithSuccess wrapper (front-end success state)"
```

---

## Task 15: LetterFilters component

**Files:**
- Create: `components/LetterFilters.tsx`, `components/__tests__/LetterFilters.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LetterFilters, type LetterPost } from "@/components/LetterFilters";

const POSTS: LetterPost[] = [
  { slug: "a", topic: "loss", topicLabel: "Loss & grief", img: "/x.png", alt: "", title: "Loss post", excerpt: "", meta: "" },
  { slug: "b", topic: "beyond", topicLabel: "Beyond fertility", img: "/y.png", alt: "", title: "Beyond post", excerpt: "", meta: "" },
];

test("filters posts by topic", async () => {
  const user = userEvent.setup();
  render(<LetterFilters posts={POSTS} />);
  await user.click(screen.getByRole("button", { name: "Beyond fertility" }));
  expect(screen.getByText("Loss post").closest("a")).toHaveStyle({ display: "none" });
  expect(screen.getByText("Beyond post").closest("a")).not.toHaveStyle({ display: "none" });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- LetterFilters`
Expected: FAIL.

- [ ] **Step 3: Implement `components/LetterFilters.tsx`**

Port `initFilters()` (lines 211–227). Hidden posts use `display:none` (matching the original) so layout/animation behaviour is identical.
```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export type LetterPost = {
  slug: string;
  topic: "loss" | "beyond";
  topicLabel: string;
  img: string;
  alt: string;
  title: string;
  excerpt: string;
  meta: string;
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "loss", label: "Loss & grief" },
  { key: "beyond", label: "Beyond fertility" },
] as const;

export function LetterFilters({ posts }: { posts: LetterPost[] }) {
  const [active, setActive] = useState<string>("all");

  return (
    <>
      <div
        className="chips reveal"
        style={{ marginBottom: "var(--space-12)" }}
        role="tablist"
        aria-label="Filter letters by topic"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`chip${active === f.key ? " is-active" : ""}`}
            type="button"
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="post-grid">
        {posts.map((p) => {
          const show = active === "all" || p.topic === active;
          return (
            <Link
              key={p.slug}
              className="post-card reveal"
              href={`/letters/${p.slug}`}
              style={show ? undefined : { display: "none" }}
            >
              <figure className="media media--landscape" style={{ margin: 0 }}>
                <img src={p.img} alt={p.alt} />
              </figure>
              <span className="post-card__topic">{p.topicLabel}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="post-card__meta">{p.meta}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test -- LetterFilters`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add LetterFilters component"
```

---

## Page porting procedure (read before Tasks 16–24)

Each page task transcribes the `<main>` content of the source HTML file into the matching `page.tsx`. Apply these rules consistently:

1. **Copy only the `<main id="main">` inner content.** The `<head>`, `<body data-page>`, skip-link, `data-site-header`/`data-site-footer`, and the `<script>` tag are already handled by the layout — do not copy them.
2. **JSX conversion:** `class` → `className`; `for` → `htmlFor`; self-close void tags (`<img ... />`, `<input ... />`, `<br />`); convert inline `style="a:b;c:d"` strings to `style={{ a: "b", c: "d" }}` objects (camelCase keys; unitless numbers allowed). Convert HTML entities to characters or JSX-safe equivalents (`&amp;`→`&`, `&ldquo;`/`&rdquo;`→`&ldquo;`/`&rdquo;` are fine as JSX text, `&nbsp;`→`{" "}`).
3. **Asset paths:** `assets/img/...` → `/assets/img/...` (leading slash). Keep using a plain `<img>` (not `next/image`) to avoid any layout shift from the design.
4. **Internal links:** `*.html` → routes per the mapping table at the top (`index.html`→`/`, `about.html`→`/about`, …, `letter-<x>.html`→`/letters/<x>`). Use `next/link` `<Link href="...">` for internal links; keep `<a>` for `mailto:`, external URLs, and in-page anchors (`#message`). For `privacy.html` (newsletter consent link) use `href="#"` and add a `{/* TODO Phase: privacy page */}` comment — there is no privacy page yet.
5. **Swap in components** where a behaviour applies:
   - Hero tagline (`<h1 class="tagline-stack" data-tagline>` with `.line` spans) → `<RotatingTagline lines={[...]} />`.
   - Rotating pullquote (`.rotator[data-rotator]`) → `<TestimonialRotator items={[...]} />` (set `big: true` on the first home slide to keep its `font-size:42px`).
   - Any `.faq` block → `<Faq items={[{ q: ..., a: ... }]} />`.
   - Any `<form data-form>` + sibling `.form-success` → wrap the form's inner fields in `<FormWithSuccess formClassName="..." success={...} successStyle={...}>`. Match `formClassName` to the original form's class (`"form"` on contact, `"stack stack-4"`/`"stack stack-4 mt-4"` on newsletter) and copy the original `.form-success` inline style into `successStyle` where present.
   - Letters filter + post grid (`[data-filter-group]` + `.post-grid`) → `<LetterFilters posts={[...]} />`.
6. **Metadata:** add `export const metadata = { title, description }` to each `page.tsx`, copying the `<title>` and `<meta name="description">` text from the source `<head>`.
7. **Per-page verification:** after each page, run `npm run build`, then `npm run dev`, open the route, and **compare against the matching image in `~/Downloads/Dr marie Meechan Website V1/screenshots/`** — checking layout, fonts, colours, spacing, and that interactions (menu, FAQ, tagline, rotator, filters, form submit) behave as in the original. Fix any drift before committing.

---

## Task 16: Home page (`/`) — worked example

**Files:**
- Create: `app/page.tsx`
- Source: `index.html`

- [ ] **Step 1: Implement `app/page.tsx`**

Follow the porting procedure. The structure is: Hero (with `RotatingTagline` + two `.reveal` columns), "What makes this different" split, "How I work" split, "Who I work with" chooser, `TestimonialRotator`, CTA, Newsletter (`FormWithSuccess`), and `Faq`. Tagline lines and testimonials below are copied verbatim from `index.html`.

```tsx
import { RotatingTagline } from "@/components/RotatingTagline";
import { TestimonialRotator } from "@/components/TestimonialRotator";
import { Faq } from "@/components/Faq";
import { FormWithSuccess } from "@/components/FormWithSuccess";
import Link from "next/link";

const TAGLINE = [
  "A space to know that you are not alone.",
  "A space to honour grief.",
  "A space to find hope.",
  "A space to make meaning of your experiences.",
  "A space to walk forward toward your goals and your dreams.",
];

const TESTIMONIALS = [
  {
    quote:
      "I came to Marie when I was at the end of my tether with fertility challenges. The way she guided me through every hurdle transformed everything. I'm now the mother of a healthy baby girl and am pregnant again — this time without IVF. Her door really is always open.",
    cite: "Female client · Edinburgh",
    big: true,
  },
  {
    quote:
      "Marie made me feel truly seen. She's the first therapist who just got infertility language. I didn't need to spell it out.",
    cite: "Female client · after loss",
  },
  {
    quote: "Marie was the first person who asked how I was doing. Not how my wife was. How I was.",
    cite: "The partner · Edinburgh",
  },
];

const FAQ = [
  {
    q: "What is fertility counselling — and is it the same as therapy?",
    a: (
      <p>
        Fertility counselling is therapy with a specialism. It holds the emotional weight of your
        fertility journey — the grief, the anxiety, the identity questions — alongside the medical
        and practical decisions you may be facing. I will also coach you through specific parts of
        the journey when that is what you need. Together, we work through whatever is in your way and
        build a path forward that feels like yours.
      </p>
    ),
  },
  // ... transcribe the remaining four FAQ items from index.html lines 191–206 verbatim
];
```

Then render the full `<main>` body (the JSX below the constants) by transcribing `index.html` lines 18–209, substituting `<RotatingTagline lines={TAGLINE} />` for the `<h1 data-tagline>`, `<TestimonialRotator items={TESTIMONIALS} />` for the `.rotator`, `<Faq items={FAQ} />` for the `.faq`, and wrapping the newsletter form (lines 155–173) in `<FormWithSuccess formClassName="stack stack-4" successStyle={{ textAlign: "left", alignItems: "flex-start", padding: "var(--space-4) 0" }} success={<>...</>}>`. Add the page metadata:
```tsx
export const metadata = {
  title:
    "Dr Marie Meechan, PhD · The Fertility Psychotherapist — Edinburgh & worldwide online",
  description:
    "Specialist online fertility counselling and coaching with Dr Marie Meechan, PhD. Edinburgh-based, supporting you worldwide through every season of your fertility journey.",
};
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build` then `npm run dev`, open `http://localhost:3000/`, and compare against `screenshots/` per procedure step 7. Confirm the tagline cycles, the testimonial rotator advances and dots work, FAQ items open/close, the newsletter form shows its success state, and scroll reveals fire.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: port home page"
```

---

## Tasks 17–22: Content page ports

For each task below: implement `page.tsx` from the listed source file following the **Page porting procedure**, add `metadata` from the source `<head>`, run `npm run build` + visual-compare against `screenshots/`, then commit with the given message. These pages are primarily static content; swap in `Faq` / `FormWithSuccess` only where those blocks appear in the source.

- [ ] **Task 17 — About (`/about`)** — Source `about.html` → `app/about/page.tsx`. No interactive components expected beyond reveals. Commit: `feat: port about page`.
- [ ] **Task 18 — Sessions (`/sessions`)** — Source `sessions.html` → `app/sessions/page.tsx`. Includes a `.faq` block → `<Faq>`. Commit: `feat: port sessions page`.
- [ ] **Task 19 — Your journey (`/your-journey`)** — Source `your-journey.html` → `app/your-journey/page.tsx`. Commit: `feat: port your-journey page`.
- [ ] **Task 20 — Becoming & belonging (`/becoming-belonging`)** — Source `becoming-belonging.html` → `app/becoming-belonging/page.tsx`. Commit: `feat: port becoming-belonging page`.
- [ ] **Task 21 — Training (`/training`)** — Source `training.html` → `app/training/page.tsx`. (Not in the nav, but a real page; link integrity still matters.) Commit: `feat: port training page`.
- [ ] **Task 22 — Contact (`/contact`)** — Source `contact.html` → `app/contact/page.tsx`. Wrap the message form (lines 66–97) in `<FormWithSuccess formClassName="form" success={<><i className="ph-light ph-check-circle" aria-hidden="true" /><h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>Thank you. Your message is here.</h3><p style={{ margin: 0 }}>I respond to all enquiries within 24 hours. Take gentle care of yourself in the meantime.</p></>}>`. Includes a `.faq` block → `<Faq>`. The in-page anchors (`#message`) stay as `<a href="#message">`. Commit: `feat: port contact page`.

> For each, before committing run `npm run build` and confirm the route renders and matches its screenshot.

---

## Task 23: Letters index page (`/letters`)

**Files:**
- Create: `app/letters/page.tsx`
- Source: `letters.html`

- [ ] **Step 1: Implement `app/letters/page.tsx`**

Follow the procedure. The hero contains the subscribe form (wrap in `<FormWithSuccess formClassName="stack stack-4 mt-4" successStyle={{ textAlign: "left", alignItems: "flex-start", padding: "var(--space-4) 0" }} success={<><i className="ph-light ph-envelope-open" aria-hidden="true" /><p style={{ margin: 0 }}>Thank you. You will receive a letter the next time I write one.</p></>}>`). Replace the `[data-filter-group]` chips + `.post-grid` (letters.html lines 56–84) with `<LetterFilters posts={POSTS} />`, where:
```tsx
const POSTS = [
  {
    slug: "disenfranchised-grief",
    topic: "loss" as const,
    topicLabel: "Loss & grief",
    img: "/assets/img/flowers-linen-wide.png",
    alt: "Dried flowers resting on soft linen in warm light.",
    title: "What disenfranchised grief actually means, and why I keep saying it",
    excerpt:
      "The grief society does not make room for, and how naming it begins to lift its weight.",
    meta: "A letter · 5 min read",
  },
  {
    slug: "petri-dish-loss",
    topic: "loss" as const,
    topicLabel: "Loss & grief",
    img: "/assets/img/hands-mug-wide.png",
    alt: "Hands wrapped around a warm ceramic mug.",
    title: "The petri dish loss: grieving the embryo that never implanted",
    excerpt:
      "On the losses that have no funeral, no card, no casserole, and why they are losses all the same.",
    meta: "A letter · 6 min read",
  },
  {
    slug: "after-the-miracle-baby",
    topic: "beyond" as const,
    topicLabel: "Beyond fertility",
    img: "/assets/img/heart-sunset-wide.png",
    alt: "A person standing in golden light with hands resting over their heart.",
    title: "After the miracle baby: nobody told me motherhood would feel like this",
    excerpt:
      "When the longed-for arrival brings its own grief and anxiety, and why that does not mean you are failing.",
    meta: "A letter · 5 min read",
  },
];
```
Add metadata from the source head. Keep the "More letters are on their way" notice and the closing CTA verbatim.

- [ ] **Step 2: Build and verify**

Run: `npm run build` then `npm run dev`; open `/letters`; confirm chips filter the cards (All / Loss & grief / Beyond fertility) and cards link to `/letters/<slug>`. Compare to the screenshot.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: port letters index with topic filters"
```

---

## Task 24: Letter post pages (3 static routes)

**Files:**
- Create: `app/letters/disenfranchised-grief/page.tsx` (source `letter-disenfranchised-grief.html`)
- Create: `app/letters/petri-dish-loss/page.tsx` (source `letter-petri-dish-loss.html`)
- Create: `app/letters/after-the-miracle-baby/page.tsx` (source `letter-after-the-miracle-baby.html`)

> These are ported as static pages for Phase 1. Phase 2 replaces them with a dynamic `app/letters/[slug]/page.tsx` sourced from Sanity.

- [ ] **Step 1: Implement the three pages**

For each source file, follow the porting procedure: copy the `<main>` content into the matching `page.tsx`, convert links/assets, and add `metadata` from the source head. These are article-style pages (no forms/rotators); transcribe content verbatim.

- [ ] **Step 2: Build and verify**

Run: `npm run build` then `npm run dev`; open each `/letters/<slug>` route and compare to its screenshot. Confirm the "back to letters" / internal links resolve.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: port three letter posts as static pages"
```

---

## Task 25: 404 page

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Implement a styled 404**

Use the site's existing classes so it matches the design. Keep it simple and on-brand:
```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section--hero section--parchment">
      <div className="container container--medium center stack stack-6" style={{ alignItems: "center" }}>
        <span className="eyebrow">Page not found</span>
        <h1>This page seems to have wandered off</h1>
        <p className="lead" style={{ maxWidth: "34rem" }}>
          The page you were looking for isn&rsquo;t here. Let&rsquo;s get you back to safe ground.
        </p>
        <div className="cta-row cta-row--center">
          <Link className="btn btn--primary" href="/">
            Return home <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
          <Link className="link" href="/contact" style={{ fontSize: "1rem" }}>
            Or get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`, then `npm run dev` and visit a nonexistent route (e.g. `/nope`); confirm the styled 404 renders within the site header/footer.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add styled 404 page"
```

---

## Task 26: Netlify configuration and deploy

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Add `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

- [ ] **Step 2: Connect the repo in Netlify**

In the Netlify dashboard: "Add new site" → "Import an existing project" → select the GitHub repo. Netlify auto-detects Next.js and installs `@netlify/plugin-nextjs`. Accept the detected build settings (they match `netlify.toml`). Trigger the first deploy.

- [ ] **Step 3: Verify the deploy**

Open the Netlify-provided URL (`*.netlify.app`). Click through every route and confirm the site matches local. Confirm fonts load (Cormorant Garamond + Lato), images render, and Phosphor icons appear.

- [ ] **Step 4: Point the domain**

In Netlify → Domain settings, add the custom domain and follow the DNS instructions (point the apex/`www` records to Netlify). Enable HTTPS (automatic via Let's Encrypt).

- [ ] **Step 5: Confirm deploy previews on PRs**

Netlify enables deploy previews by default. Confirm by checking a PR shows a "Deploy Preview" status.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add Netlify configuration"
git push
```

---

## Task 27: Final verification

- [ ] **Step 1: Run the full gate locally**

Run:
```bash
npm run typecheck && npm run lint && npm run format:check && npm test && npm run build
```
Expected: all pass.

- [ ] **Step 2: Confirm CI is green**

Push and check the GitHub Actions run for the latest commit on `main` is green.

- [ ] **Step 3: Full fidelity pass**

With `npm run dev` running, walk every route against `~/Downloads/Dr marie Meechan Website V1/screenshots/`:
`/`, `/about`, `/sessions`, `/your-journey`, `/becoming-belonging`, `/training`, `/letters`, `/letters/disenfranchised-grief`, `/letters/petri-dish-loss`, `/letters/after-the-miracle-baby`, `/contact`, plus a 404.
Check: layout, typography, colours, spacing, images, icons; mobile menu open/close; tagline cycle; testimonial rotator; FAQ accordions; letter filters; both forms' success states; scroll reveals; and that no internal link 404s.

- [ ] **Step 4: Confirm the live site**

Verify the production Netlify URL (and custom domain once DNS propagates) matches local on desktop and mobile widths.

- [ ] **Step 5: Final commit/tag (optional)**

```bash
git tag phase-1-live
git push --tags
```

---

## Known non-functional items (flag to client, out of Phase 1 scope)
- **Newsletter / contact forms** show the success state but do **not** send email yet (Phase 3).
- **"Book a session"** buttons link to `/contact`; they do not yet email or open a calendar (Phase 3).
- **Privacy & ethics** link and the newsletter `privacy.html` link point to `#` — there is no privacy page in the design yet. Confirm whether one is needed.
- **Phone number** on the contact page is "to be confirmed at launch" per the design copy.
