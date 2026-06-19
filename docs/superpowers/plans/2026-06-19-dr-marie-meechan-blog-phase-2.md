# Dr Marie Meechan Website — Phase 2 (Letters Blog) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let Dr Meechan author "Letters" in an embedded Sanity Studio at `/studio`; serve them from Sanity through a dynamic `/letters/[slug]` that reproduces the existing letter design exactly, with the `/letters` index reusing the Phase 1 `LetterFilters`, instant publish via webhook revalidation, and the 3 existing letters migrated in by script.

**Architecture:** Sanity (free tier, public-read dataset) with an embedded Studio. The app is restructured into two route-group root layouts — `(site)` (loads the design CSS + header/footer chrome) and `(studio)` (bare, so the design CSS can't style the Studio UI). The Sanity client is resilient to missing env (returns empty), so the build and CI stay green with no secrets; production gets the real env. Portable Text renders to the design's exact markup. A Sanity webhook hits `/api/revalidate` → `revalidateTag('letter')`.

**Tech Stack:** Next.js 16 (App Router), TypeScript, `sanity`, `next-sanity`, `@sanity/image-url`, `@portabletext/react`, `@portabletext/types`, Vitest + RTL.

---

## File structure (new/changed)

```
app/
  layout.tsx                         # CHANGED → becomes minimal? NO: removed. Two root layouts via groups.
  not-found.tsx                      # CHANGED: standalone html/body + design CSS + shared 404 content (global catch-all)
  (site)/
    layout.tsx                       # NEW (was app/layout.tsx): design CSS links + skip-link + header + main + footer + reveal
    not-found.tsx                    # NEW: in-site 404 (with chrome) for notFound() calls like [slug]
    page.tsx                         # MOVED from app/page.tsx
    about/page.tsx … contact/page.tsx, etc.   # MOVED (all Phase 1 site pages)
    letters/page.tsx                 # CHANGED: fetch from Sanity, feed LetterFilters
    letters/[slug]/page.tsx          # NEW: dynamic letter page
    # DELETED: letters/{disenfranchised-grief,petri-dish-loss,after-the-miracle-baby}/page.tsx
  (studio)/
    layout.tsx                       # NEW: bare html/body (no design CSS)
    studio/[[...tool]]/page.tsx      # NEW: embedded Sanity Studio
  api/revalidate/route.ts            # NEW: webhook → revalidateTag('letter')
components/
  PortableLetterBody.tsx             # NEW: Portable Text → design markup
  NotFoundContent.tsx                # NEW: shared 404 body (used by both not-found.tsx files)
lib/sanity/
  client.ts  image.ts  queries.ts  letter-to-post.ts   # NEW
sanity/
  schemas/index.ts  schemas/letter.ts  schemas/pullquote.ts   # NEW
sanity.config.ts                     # NEW
scripts/migrate-letters.ts           # NEW (one-time)
.env.local (gitignored)  .env.example  # NEW
```

---

## Task 1: Create the Sanity project (MANUAL — user action)

This is a human step; an agent cannot create a Sanity account. **Do this before Task 12 (go-live); the code tasks 2–11 do not require it** (the client is resilient to missing env).

- [ ] **Step 1:** Sign up at https://sanity.io (free) and create a new project. Note the **Project ID**.
- [ ] **Step 2:** Ensure a dataset named `production` exists and is **public** (Project → Datasets → set visibility to Public). Public read means the live site needs no read token.
- [ ] **Step 3:** Create an **API token** with **Editor/Write** permissions (Project → API → Tokens). This is used ONLY locally for the migration script — never committed. Save it as `SANITY_WRITE_TOKEN`.
- [ ] **Step 4:** Choose a random **webhook secret** string (e.g. `openssl rand -hex 32`). Save it as `SANITY_REVALIDATE_SECRET`. (The webhook itself is configured in Task 12.)
- [ ] **Step 5:** Add `http://localhost:3333` and your production domain to **CORS origins** is NOT needed for the embedded studio (same-origin), but add your site origin under Project → API → CORS Origins with credentials allowed so the embedded Studio can authenticate: add `http://localhost:3000` and `https://<your-domain>`.
- [ ] **Step 6:** Provide the implementer: `SANITY_PROJECT_ID`, confirmation dataset=`production` (public), `SANITY_WRITE_TOKEN`, `SANITY_REVALIDATE_SECRET`.

---

## Task 2: Install dependencies and env files

**Files:** Modify `package.json`; create `.env.example`; verify `.gitignore`.

- [ ] **Step 1: Install runtime + studio deps**

Run:

```bash
npm install sanity next-sanity @sanity/image-url @portabletext/react @portabletext/types styled-components
npm install -D tsx
```

(`styled-components` is a Studio peer dependency; `tsx` runs the migration script.)

- [ ] **Step 2: Confirm `.env*` is gitignored**

Open `.gitignore` (created by create-next-app). Confirm it contains a line covering `.env*` (the scaffold includes `.env*`). If not, add:

```
.env*
!.env.example
```

- [ ] **Step 3: Create `.env.example`**

```
# Public (safe to expose; set in .env.local and in Netlify)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01

# Secret (Netlify + local only — NEVER commit)
SANITY_REVALIDATE_SECRET=
# Local only, migration script (NEVER commit, not needed in Netlify)
SANITY_WRITE_TOKEN=
```

- [ ] **Step 4: Create `.env.local`** (gitignored) with the real values from Task 1 if available; otherwise leave `NEXT_PUBLIC_SANITY_PROJECT_ID` blank for now (the client is resilient). Example:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_REVALIDATE_SECRET=
SANITY_WRITE_TOKEN=
```

- [ ] **Step 5: Verify gate still green**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: all pass (new deps installed, no code yet). Note: `npm run lint` may now warn; only errors block.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .env.example .gitignore
git commit -m "chore: add Sanity dependencies and env scaffolding"
```

---

## Task 3: Restructure into `(site)` and `(studio)` route groups

**Why:** Two root layouts let the Studio render without the design's global CSS (which uses element selectors that would break the Studio UI). Route groups `(site)`/`(studio)` do not change URLs.

**Files:**

- Delete: `app/layout.tsx`
- Create: `app/(site)/layout.tsx`, `app/(studio)/layout.tsx`, `app/(site)/not-found.tsx`, `components/NotFoundContent.tsx`
- Modify: `app/not-found.tsx` (becomes standalone)
- Move: every current `app/*` page into `app/(site)/*`

- [ ] **Step 1: Extract shared 404 content** — create `components/NotFoundContent.tsx`:

```tsx
import Link from "next/link";

export function NotFoundContent() {
  return (
    <section className="section--hero section--parchment">
      <div
        className="container container--medium center stack stack-6"
        style={{ alignItems: "center" }}
      >
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

- [ ] **Step 2: Move all site pages into `(site)`** (route group — URLs unchanged):

```bash
mkdir -p "app/(site)"
git mv app/page.tsx "app/(site)/page.tsx"
git mv app/about "app/(site)/about"
git mv app/sessions "app/(site)/sessions"
git mv app/your-journey "app/(site)/your-journey"
git mv app/becoming-belonging "app/(site)/becoming-belonging"
git mv app/training "app/(site)/training"
git mv app/contact "app/(site)/contact"
git mv app/letters "app/(site)/letters"
```

- [ ] **Step 3: Create `app/(site)/layout.tsx`** (the former root layout — design CSS + chrome):

```tsx
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";

export const metadata: Metadata = {
  title: "Dr Marie Meechan, PhD · The Fertility Psychotherapist — Edinburgh & worldwide online",
  description:
    "Specialist online fertility counselling and coaching with Dr Marie Meechan, PhD. Edinburgh-based, supporting you worldwide through every season of your fertility journey.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
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

- [ ] **Step 4: Create `app/(studio)/layout.tsx`** (bare — no design CSS so the Studio styles itself):

```tsx
export const metadata = {
  title: "Letters — Studio",
  robots: { index: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Create `app/(site)/not-found.tsx`** (in-site 404 with chrome — catches `notFound()` from site routes):

```tsx
import { NotFoundContent } from "@/components/NotFoundContent";

export default function SiteNotFound() {
  return <NotFoundContent />;
}
```

- [ ] **Step 6: Replace `app/not-found.tsx`** (global catch-all — needs its own html/body + design CSS because there is no root layout):

```tsx
import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata = { title: "Page not found · Dr Marie Meechan" };

export default function GlobalNotFound() {
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
        <NotFoundContent />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Verify build + all routes still work**

Run: `npm run build`
Expected: succeeds; route list still shows `/`, `/about`, `/sessions`, `/your-journey`, `/becoming-belonging`, `/training`, `/letters`, `/contact`, the 3 letter routes, and `/_not-found`. Then `npm run dev` and curl a few: `/`, `/about`, `/letters` → 200; `/nope` → 404.
Run the full gate: `npm test && npm run typecheck && npm run lint && npm run format:check`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: split into (site)/(studio) route groups for embedded Studio"
```

---

## Task 4: Sanity schema

**Files:** Create `sanity/schemas/pullquote.ts`, `sanity/schemas/letter.ts`, `sanity/schemas/index.ts`.

- [ ] **Step 1: `sanity/schemas/pullquote.ts`**

```ts
import { defineField, defineType } from "sanity";

export const pullquote = defineType({
  name: "pullquote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "text" } },
});
```

- [ ] **Step 2: `sanity/schemas/letter.ts`**

```ts
import { defineArrayMember, defineField, defineType } from "sanity";

export const letter = defineType({
  name: "letter",
  title: "Letter",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topic",
      type: "string",
      options: {
        list: [
          { title: "Loss & grief", value: "loss" },
          { title: "Beyond fertility", value: "beyond" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "readTime",
      type: "string",
      description: 'e.g. "5 min read" — shown as "A letter · 5 min read"',
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Section heading", value: "h2" },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: "Emphasis", value: "em" },
              { title: "Strong", value: "strong" },
            ],
            annotations: [],
          },
        }),
        defineArrayMember({ type: "pullquote" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "closingHeading",
      title: "Closing line",
      type: "string",
      description: "The closing call-to-action heading (optional; a default is used if blank).",
    }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2 }),
  ],
  orderings: [
    {
      title: "Published, newest",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "topic", media: "heroImage" } },
});
```

- [ ] **Step 3: `sanity/schemas/index.ts`**

```ts
import { letter } from "./letter";
import { pullquote } from "./pullquote";

export const schemaTypes = [letter, pullquote];
```

- [ ] **Step 4: Verify typecheck**

Run: `npm run typecheck`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add sanity/
git commit -m "feat: add Sanity letter + pullquote schema"
```

---

## Task 5: Sanity config

**Files:** Create `sanity.config.ts`.

- [ ] **Step 1: `sanity.config.ts`** (repo root)

```ts
"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Dr Marie Meechan — Letters",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
```

(`"placeholder"` keeps the build from throwing before env is set; real value comes from env in dev/prod.)

- [ ] **Step 2: Verify typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add sanity.config.ts
git commit -m "feat: add Sanity config"
```

---

## Task 6: Embedded Studio route

**Files:** Create `app/(studio)/studio/[[...tool]]/page.tsx`.

- [ ] **Step 1: `app/(studio)/studio/[[...tool]]/page.tsx`**

```tsx
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; route list now includes `/studio/[[...tool]]`.
Then `npm run dev` → open `http://localhost:3000/studio`. With no project env it will show a Sanity error about projectId — that is expected until env is set (Task 12); the route should still compile and load the Studio shell. Confirm the site CSS is NOT applied to the Studio (no Cormorant/Lato, no parchment background).

- [ ] **Step 3: Run gate + commit**

Run: `npm test && npm run typecheck && npm run lint && npm run format:check`

```bash
git add "app/(studio)"
git commit -m "feat: add embedded Sanity Studio at /studio"
```

---

## Task 7: Sanity client, image, queries

**Files:** Create `lib/sanity/client.ts`, `lib/sanity/image.ts`, `lib/sanity/queries.ts`.

- [ ] **Step 1: `lib/sanity/client.ts`** (resilient to missing env → returns null client)

```ts
import { createClient, type SanityClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const client: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
```

- [ ] **Step 2: `lib/sanity/image.ts`**

```ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlForImage(source: SanityImageSource | undefined): string {
  if (!builder || !source) return "";
  return builder.image(source).auto("format").fit("max").url();
}
```

- [ ] **Step 3: `lib/sanity/queries.ts`**

```ts
import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

export type LetterTopic = "loss" | "beyond";

export type LetterListItem = {
  slug: string;
  title: string;
  topic: LetterTopic;
  heroImage: SanityImageSource;
  alt: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
};

export type LetterDoc = LetterListItem & {
  body: PortableTextBlock[];
  closingHeading?: string;
  seoDescription?: string;
};

const fetchOpts = { next: { tags: ["letter"] } } as const;

const listQuery = groq`*[_type == "letter"] | order(publishedAt desc){
  "slug": slug.current, title, topic, heroImage, "alt": heroImage.alt, excerpt, readTime, publishedAt
}`;

const slugsQuery = groq`*[_type == "letter" && defined(slug.current)].slug.current`;

const bySlugQuery = groq`*[_type == "letter" && slug.current == $slug][0]{
  "slug": slug.current, title, topic, heroImage, "alt": heroImage.alt, excerpt, readTime, publishedAt,
  body, closingHeading, seoDescription
}`;

export async function getLetters(): Promise<LetterListItem[]> {
  if (!client) return [];
  return client.fetch(listQuery, {}, fetchOpts);
}

export async function getLetterSlugs(): Promise<string[]> {
  if (!client) return [];
  return client.fetch(slugsQuery, {}, fetchOpts);
}

export async function getLetter(slug: string): Promise<LetterDoc | null> {
  if (!client) return null;
  return client.fetch(bySlugQuery, { slug }, fetchOpts);
}
```

- [ ] **Step 4: Verify typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: clean (with no env, the functions return empty/null; build succeeds).

- [ ] **Step 5: Commit**

```bash
git add lib/sanity/client.ts lib/sanity/image.ts lib/sanity/queries.ts
git commit -m "feat: add Sanity client, image builder, and letter queries"
```

---

## Task 8: PortableLetterBody renderer (TDD)

**Files:** Create `components/PortableLetterBody.tsx`, `components/__tests__/PortableLetterBody.test.tsx`.

- [ ] **Step 1: Write the failing test** `components/__tests__/PortableLetterBody.test.tsx`

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { PortableLetterBody } from "@/components/PortableLetterBody";

const value = [
  {
    _type: "block",
    _key: "a",
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: "s1", text: "A heading", marks: [] }],
  },
  {
    _type: "block",
    _key: "b",
    style: "normal",
    markDefs: [],
    children: [
      { _type: "span", _key: "s2", text: "Body ", marks: [] },
      { _type: "span", _key: "s3", text: "emphasis", marks: ["em"] },
    ],
  },
  { _type: "pullquote", _key: "c", text: "A quote." },
];

test("renders h2, paragraph with em, and a pullquote with design classes", () => {
  const { container } = render(<PortableLetterBody value={value as any} />);
  expect(screen.getByText("A heading").tagName).toBe("H2");
  expect(screen.getByText("emphasis").tagName).toBe("EM");
  const pq = container.querySelector(".pullquote");
  expect(pq).not.toBeNull();
  expect(pq?.querySelector(".quote-mark")).not.toBeNull();
  expect(pq?.querySelector("blockquote")?.textContent).toBe("A quote.");
});
```

- [ ] **Step 2: Run to verify it fails** — `npm test -- PortableLetterBody` → FAIL (module not found).

- [ ] **Step 3: Implement `components/PortableLetterBody.tsx`**

```tsx
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
  },
  types: {
    pullquote: ({ value }: { value: { text: string } }) => (
      <div className="pullquote" style={{ margin: "var(--space-4) auto" }}>
        <span className="quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote>{value.text}</blockquote>
      </div>
    ),
    image: ({ value }: { value: { alt?: string } }) => (
      <figure className="media media--landscape" style={{ margin: "var(--space-8) auto" }}>
        <img src={urlForImage(value)} alt={value.alt ?? ""} />
      </figure>
    ),
  },
};

export function PortableLetterBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
```

- [ ] **Step 4: Run to verify it passes** — `npm test -- PortableLetterBody` → PASS.

- [ ] **Step 5: Commit**

```bash
git add components/PortableLetterBody.tsx components/__tests__/PortableLetterBody.test.tsx
git commit -m "feat: add PortableLetterBody renderer"
```

---

## Task 9: letterToPost index-shaping helper (TDD)

**Files:** Create `lib/sanity/letter-to-post.ts`, `lib/sanity/__tests__/letter-to-post.test.ts`.

- [ ] **Step 1: Write the failing test** `lib/sanity/__tests__/letter-to-post.test.ts`

```ts
import { vi } from "vitest";
import { letterToPost } from "@/lib/sanity/letter-to-post";
import type { LetterListItem } from "@/lib/sanity/queries";

vi.mock("@/lib/sanity/image", () => ({ urlForImage: () => "https://cdn.example/x.png" }));

test("maps a Sanity letter to a LetterPost for LetterFilters", () => {
  const letter: LetterListItem = {
    slug: "a",
    title: "T",
    topic: "loss",
    heroImage: { _type: "image" } as never,
    alt: "alt text",
    excerpt: "an excerpt",
    readTime: "5 min read",
    publishedAt: "2024-01-01T00:00:00Z",
  };
  expect(letterToPost(letter)).toEqual({
    slug: "a",
    topic: "loss",
    topicLabel: "Loss & grief",
    img: "https://cdn.example/x.png",
    alt: "alt text",
    title: "T",
    excerpt: "an excerpt",
    meta: "A letter · 5 min read",
  });
});
```

- [ ] **Step 2: Run to verify it fails** — `npm test -- letter-to-post` → FAIL.

- [ ] **Step 3: Implement `lib/sanity/letter-to-post.ts`**

```ts
import type { LetterPost } from "@/components/LetterFilters";
import { urlForImage } from "./image";
import type { LetterListItem, LetterTopic } from "./queries";

const TOPIC_LABELS: Record<LetterTopic, string> = {
  loss: "Loss & grief",
  beyond: "Beyond fertility",
};

export function letterToPost(letter: LetterListItem): LetterPost {
  return {
    slug: letter.slug,
    topic: letter.topic,
    topicLabel: TOPIC_LABELS[letter.topic] ?? letter.topic,
    img: urlForImage(letter.heroImage),
    alt: letter.alt ?? "",
    title: letter.title,
    excerpt: letter.excerpt,
    meta: `A letter · ${letter.readTime}`,
  };
}
```

- [ ] **Step 4: Run to verify it passes** — `npm test -- letter-to-post` → PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/sanity/letter-to-post.ts lib/sanity/__tests__/letter-to-post.test.ts
git commit -m "feat: add letterToPost index-shaping helper"
```

---

## Task 10: Dynamic letter page + delete static letter folders

**Files:** Create `app/(site)/letters/[slug]/page.tsx`; delete the 3 static folders.

- [ ] **Step 1: Delete the static letter routes** (replaced by `[slug]`):

```bash
git rm -r "app/(site)/letters/disenfranchised-grief" "app/(site)/letters/petri-dish-loss" "app/(site)/letters/after-the-miracle-baby"
```

- [ ] **Step 2: Create `app/(site)/letters/[slug]/page.tsx`** — reproduces the exact letter layout (compare to `letter-disenfranchised-grief.html`):

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLetter, getLetterSlugs, type LetterTopic } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { PortableLetterBody } from "@/components/PortableLetterBody";

const TOPIC_LABELS: Record<LetterTopic, string> = {
  loss: "Loss & grief",
  beyond: "Beyond fertility",
};
const DEFAULT_CLOSING =
  "If this speaks to something you are carrying, we can talk about it together.";

export async function generateStaticParams() {
  const slugs = await getLetterSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const letter = await getLetter(slug);
  if (!letter) return {};
  return {
    title: `${letter.title} · Letters from Marie · Dr Marie Meechan, PhD`,
    description: letter.seoDescription ?? letter.excerpt,
  };
}

export default async function LetterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const letter = await getLetter(slug);
  if (!letter) notFound();

  return (
    <>
      <section className="section--hero section--blush">
        <div
          className="container container--medium center stack stack-6 reveal"
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <Link className="arrow-link" href="/letters" style={{ alignSelf: "center" }}>
            <i className="ph-light ph-arrow-left" aria-hidden="true" /> Letters from Marie
          </Link>
          <span className="eyebrow" style={{ margin: 0 }}>
            {TOPIC_LABELS[letter.topic] ?? letter.topic}
          </span>
          <h1 style={{ maxWidth: "18ch" }}>{letter.title}</h1>
          <span className="post-card__meta">A letter · {letter.readTime}</span>
        </div>
      </section>

      <section className="section--parchment">
        <div className="container container--medium">
          <figure
            className="media media--landscape reveal"
            style={{ margin: "0 auto var(--space-16)" }}
          >
            <img src={urlForImage(letter.heroImage)} alt={letter.alt} />
          </figure>
          <article className="article-body stack stack-6 reveal">
            <PortableLetterBody value={letter.body} />
          </article>
        </div>
      </section>

      <section className="section--blush">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal">When reading is not enough</span>
          <h2 className="reveal" style={{ maxWidth: "30rem" }}>
            {letter.closingHeading ?? DEFAULT_CLOSING}
          </h2>
          <Link className="btn btn--primary reveal" href="/contact">
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify build** (no env → no slugs → page builds as on-demand; no crash):

Run: `npm run build`
Expected: succeeds. `/letters/[slug]` appears as a dynamic route.

- [ ] **Step 4: Run gate + commit**

```bash
git add -A
git commit -m "feat: add dynamic /letters/[slug] page; remove static letter pages"
```

---

## Task 11: Rewrite the `/letters` index to read from Sanity

**Files:** Modify `app/(site)/letters/page.tsx`.

- [ ] **Step 1: Replace the hardcoded `POSTS` with a Sanity fetch.** Keep the entire rest of the page (hero, subscribe `FormWithSuccess`, the "More letters" notice, the closing CTA) byte-identical. Make the component `async` and change only the data source + the `<LetterFilters>` call:

At the top, replace the `const POSTS = [ ... ]` block and imports with:

```tsx
import { getLetters } from "@/lib/sanity/queries";
import { letterToPost } from "@/lib/sanity/letter-to-post";
```

Change the component signature to async and build `posts`:

```tsx
export default async function LettersPage() {
  const posts = (await getLetters()).map(letterToPost);
  // ...unchanged hero + subscribe form markup...
  // where the chips/grid are:
  //   <LetterFilters posts={posts} />
  // ...unchanged notice + CTA...
}
```

Remove the now-unused `LetterPost`/`POSTS` import if present. Do NOT change any surrounding copy or markup.

- [ ] **Step 2: Verify build + gate**

Run: `npm run build && npm test && npm run typecheck && npm run lint && npm run format:check`
Expected: pass. With no env, the index renders with zero cards (empty filter grid) — that's fine for now; real data appears after migration.

- [ ] **Step 3: Commit**

```bash
git add "app/(site)/letters/page.tsx"
git commit -m "feat: drive /letters index from Sanity"
```

---

## Task 12: Revalidation webhook route (TDD)

**Files:** Create `app/api/revalidate/route.ts`, `app/api/revalidate/__tests__/route.test.ts`.

> Note: `app/api/` sits outside both route groups, so it is unaffected by the `(site)`/`(studio)` layouts.

- [ ] **Step 1: Write the failing test** `app/api/revalidate/__tests__/route.test.ts`

```ts
import { vi, beforeEach } from "vitest";

const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({ revalidateTag: (t: string) => revalidateTag(t) }));

const parseBody = vi.fn();
vi.mock("next-sanity/webhook", () => ({ parseBody: (...args: unknown[]) => parseBody(...args) }));

import { POST } from "@/app/api/revalidate/route";

beforeEach(() => {
  revalidateTag.mockClear();
  parseBody.mockClear();
});

function req() {
  return new Request("http://localhost/api/revalidate", { method: "POST", body: "{}" });
}

test("returns 401 and does not revalidate when the signature is invalid", async () => {
  parseBody.mockResolvedValue({ isValidSignature: false, body: null });
  const res = await POST(req() as never);
  expect(res.status).toBe(401);
  expect(revalidateTag).not.toHaveBeenCalled();
});

test("revalidates the 'letter' tag when the signature is valid", async () => {
  parseBody.mockResolvedValue({ isValidSignature: true, body: { _type: "letter" } });
  const res = await POST(req() as never);
  expect(res.status).toBe(200);
  expect(revalidateTag).toHaveBeenCalledWith("letter");
});
```

- [ ] **Step 2: Run to verify it fails** — `npm test -- revalidate` → FAIL (module not found).

- [ ] **Step 3: Implement `app/api/revalidate/route.ts`**

```ts
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    revalidateTag("letter");
    return NextResponse.json({ revalidated: true, type: body?._type });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
```

- [ ] **Step 4: Run to verify it passes** — `npm test -- revalidate` → PASS (both cases).

- [ ] **Step 5: Run gate + commit**

Run: `npm run typecheck && npm run lint && npm run build`

```bash
git add app/api/revalidate
git commit -m "feat: add Sanity webhook revalidation route"
```

---

## Task 13: Migration script for the 3 existing letters

**Files:** Create `scripts/migrate-letters.ts`.

> Run once, locally, with `SANITY_WRITE_TOKEN` + `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`. Converts each `letter-*.html` article body to Portable Text, uploads the hero image, and writes a `letter` document with a deterministic `_id` (idempotent re-runs).

- [ ] **Step 1: Add a script entry to `package.json`**

```json
"migrate:letters": "tsx scripts/migrate-letters.ts"
```

- [ ] **Step 1b: Exclude the one-off script from typecheck.** The migration is a Node script run via `tsx` (esbuild), not part of the Next build, and it uses loose `node-html-parser` typings. Add `"scripts"` to the `exclude` array in `tsconfig.json` so `tsc --noEmit` does not typecheck it (this also prevents "unused @ts-expect-error" noise). Example:

```jsonc
// tsconfig.json
"exclude": ["node_modules", "vitest.config.ts", "scripts"]
```

- [ ] **Step 2: Implement `scripts/migrate-letters.ts`**

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";
import { parse } from "node-html-parser";
import { randomUUID } from "node:crypto";

const SRC_DIR = "/Users/tonymack/Downloads/Dr marie Meechan Website V1";
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local");
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  token: TOKEN,
  useCdn: false,
});

type Source = {
  file: string;
  slug: string;
  topic: "loss" | "beyond";
  excerpt: string;
  heroImage: string; // path under public/assets/img
  publishedAt: string;
};

const SOURCES: Source[] = [
  {
    file: "letter-disenfranchised-grief.html",
    slug: "disenfranchised-grief",
    topic: "loss",
    excerpt:
      "The grief society does not make room for, and how naming it begins to lift its weight.",
    heroImage: "flowers-linen-wide.png",
    publishedAt: "2026-03-01T09:00:00Z",
  },
  {
    file: "letter-petri-dish-loss.html",
    slug: "petri-dish-loss",
    topic: "loss",
    excerpt:
      "On the losses that have no funeral, no card, no casserole, and why they are losses all the same.",
    heroImage: "hands-mug-wide.png",
    publishedAt: "2026-02-01T09:00:00Z",
  },
  {
    file: "letter-after-the-miracle-baby.html",
    slug: "after-the-miracle-baby",
    topic: "beyond",
    excerpt:
      "When the longed-for arrival brings its own grief and anxiety, and why that does not mean you are failing.",
    heroImage: "heart-sunset-wide.png",
    publishedAt: "2026-01-01T09:00:00Z",
  },
];

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

// Convert a <p>/<h2> element's inline children into Portable Text spans (handles <em>/<strong>).
function spansFor(el: ReturnType<typeof parse>["childNodes"][number]): unknown[] {
  const spans: unknown[] = [];
  // @ts-expect-error node-html-parser node typing
  for (const node of el.childNodes) {
    if (node.nodeType === 3) {
      const text = node.rawText.replace(/\s+/g, " ");
      if (text) spans.push({ _type: "span", _key: key(), text, marks: [] });
    } else {
      const tag = node.rawTagName?.toLowerCase();
      const marks = tag === "em" ? ["em"] : tag === "strong" ? ["strong"] : [];
      const text = node.text.replace(/\s+/g, " ");
      if (text) spans.push({ _type: "span", _key: key(), text, marks });
    }
  }
  return spans;
}

function bodyFor(html: string): unknown[] {
  const root = parse(html);
  const article = root.querySelector(".article-body");
  if (!article) throw new Error("no .article-body");
  const blocks: unknown[] = [];
  for (const node of article.childNodes) {
    // @ts-expect-error node-html-parser typing
    const tag: string | undefined = node.rawTagName?.toLowerCase();
    if (!tag) continue;
    if (tag === "p") {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: spansFor(node),
      });
    } else if (tag === "h2") {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "h2",
        markDefs: [],
        children: spansFor(node),
      });
    } else if (tag === "div") {
      // @ts-expect-error typing
      const bq = node.querySelector("blockquote");
      if (bq)
        blocks.push({ _type: "pullquote", _key: key(), text: bq.text.replace(/\s+/g, " ").trim() });
    }
  }
  return blocks;
}

async function run() {
  for (const s of SOURCES) {
    const html = readFileSync(resolve(SRC_DIR, s.file), "utf8");
    const root = parse(html);
    const title = root.querySelector("h1")!.text.trim();
    const readTime = (root.querySelector(".post-card__meta")?.text ?? "A letter · 5 min read")
      .replace(/^A letter ·\s*/, "")
      .trim();
    const closingHeading = root.querySelectorAll("section")[2]?.querySelector("h2")?.text.trim();
    const seoDescription =
      root.querySelector('meta[name="description"]')?.getAttribute("content") ?? s.excerpt;
    const heroAlt = root.querySelector(".article-body")
      ? (root.querySelectorAll("img")[0]?.getAttribute("alt") ?? "")
      : "";

    const imgBuf = readFileSync(resolve(SRC_DIR, "assets/img", s.heroImage));
    const asset = await client.assets.upload("image", imgBuf, { filename: s.heroImage });

    const doc = {
      _id: `letter-${s.slug}`,
      _type: "letter",
      title,
      slug: { _type: "slug", current: s.slug },
      topic: s.topic,
      heroImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: heroAlt },
      excerpt: s.excerpt,
      readTime,
      publishedAt: s.publishedAt,
      body: bodyFor(html),
      closingHeading,
      seoDescription,
    };

    await client.createOrReplace(doc);
    console.log(`migrated: ${s.slug} (${(doc.body as unknown[]).length} blocks)`);
  }
  console.log("done");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

- [ ] **Step 3: Add the parser dep**

```bash
npm install -D node-html-parser @sanity/client
```

(`@sanity/client` is a transitive dep of `next-sanity` but install explicitly for the script.)

- [ ] **Step 4: Typecheck (do NOT run the script yet — it needs the live project; that happens in Task 14)**

Run: `npm run typecheck`
Expected: clean. `scripts/` is excluded from typecheck (Step 1b), so the script's loose `node-html-parser` typings won't block the gate. Sanity-check the script compiles under tsx with a dry import only if convenient; the real run is Task 14.

- [ ] **Step 5: Commit**

```bash
git add scripts/migrate-letters.ts package.json package-lock.json
git commit -m "feat: add one-time letter migration script"
```

---

## Task 14: Go-live (MANUAL — integration, requires the live Sanity project)

Do this after Tasks 1–13 and once the Sanity project exists.

- [ ] **Step 1: Fill `.env.local`** with the real `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_REVALIDATE_SECRET`, and `SANITY_WRITE_TOKEN`.
- [ ] **Step 2: Run the migration** — `npm run migrate:letters`. Expected: "migrated: …" for all 3, then "done". Open `http://localhost:3000/studio`, log in, confirm the 3 letters exist with correct hero images, bodies, pullquotes, topics, and closing lines.
- [ ] **Step 3: Verify locally** — `npm run dev`; open `/letters` (3 cards, chips filter correctly) and each `/letters/<slug>`. **Compare each against `~/Downloads/Dr marie Meechan Website V1/screenshots/`** for fidelity (hero, image, headings, pullquotes, closing CTA). Fix any Portable Text mapping discrepancies in `PortableLetterBody`/migration and re-run.
- [ ] **Step 4: Set Netlify env vars** (Site settings → Environment variables): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01`, `SANITY_REVALIDATE_SECRET`. (Do NOT set `SANITY_WRITE_TOKEN` in Netlify.) Redeploy.
- [ ] **Step 5: Configure the Sanity webhook** (sanity.io/manage → API → Webhooks): URL `https://<your-domain>/api/revalidate`, trigger on create/update/delete, filter `_type == "letter"`, HTTP method POST, and set the **Secret** to the same `SANITY_REVALIDATE_SECRET`.
- [ ] **Step 6: End-to-end publish test** — edit a letter in `/studio`, publish, and confirm the live `/letters` page reflects the change within ~10 seconds (no rebuild). Check the Netlify function logs show a 200 from `/api/revalidate`.
- [ ] **Step 7: Confirm CORS** — the embedded `/studio` on the production domain loads and authenticates (the production origin must be in Sanity CORS origins from Task 1, Step 5).

---

## Task 15: Final verification

- [ ] **Step 1: Full local gate** — `npm run typecheck && npm run lint && npm run format:check && npm test && npm run build`. All pass.
- [ ] **Step 2: CI green** — push the branch / open the PR and confirm GitHub Actions passes. (CI builds with no Sanity env → resilient client returns empty → build still succeeds.)
- [ ] **Step 3: Fidelity pass** — the 3 migrated letters match their `screenshots/` counterparts; `/letters` filtering works; an unknown `/letters/xxx` returns the styled 404.
- [ ] **Step 4: Studio sanity-check** — `/studio` is reachable, unaffected by site CSS, and editing → publish updates the live site.

---

## Spec coverage check

- Embedded Studio at `/studio` → Tasks 3 (groups), 5, 6. ✓
- Public-read dataset, resilient client → Task 7. ✓
- `letter` schema (all fields) → Task 4. ✓
- Dynamic `/letters/[slug]` reproducing the design → Task 10. ✓
- `/letters` index from Sanity reusing `LetterFilters` → Task 11. ✓
- PortableText → design markup (h2/para/em/strong/pullquote/image) → Task 8. ✓
- Instant revalidation via `@sanity/webhook`-verified route → Task 12. ✓
- Automated migration of 3 letters (incl. image upload, closingHeading, seoDescription) → Task 13. ✓
- Env/secrets handling, CI stays green without secrets → Tasks 2, 7, 15. ✓
- Delete static letter folders → Task 10. ✓
- Testing (PortableLetterBody, letterToPost, revalidate auth, build smoke, fidelity) → Tasks 8, 9, 12, 15. ✓

## Known follow-ups / notes

- The 3 letters' `publishedAt` are assigned descending placeholder dates (Mar/Feb/Jan 2026) to preserve the index order from Phase 1; Dr Meechan can edit them in the Studio.
- Draft/preview mode is intentionally out of scope (publish → live).
- `styled-components` is pulled in only by the Studio UI; it must not appear in site-route bundles (the `(site)` pages don't import it).
