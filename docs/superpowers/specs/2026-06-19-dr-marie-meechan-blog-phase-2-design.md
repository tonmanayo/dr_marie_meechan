# Dr Marie Meechan Website — Phase 2 (Blog / Letters) Design

**Date:** 2026-06-19
**Status:** Approved
**Builds on:** Phase 1 (live Next.js 16 site on Netlify — see `2026-06-18-dr-marie-meechan-website-design.md`).

## Goal

Let Dr Meechan author and publish "Letters" (the blog) herself through a visual editor, with
no code and no developer in the loop. Replace the three hand-ported static letter pages with
content served from Sanity, while keeping the existing letter design **pixel-identical** and the
`/letters` index topic-filtering intact.

Fidelity to the existing letter design remains the top constraint.

## Decisions (from brainstorming)

| Decision                            | Choice                                                                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| CMS                                 | Sanity (free tier)                                                                                                                                    |
| Studio hosting                      | **Embedded** in the Next app at `/studio` (lives on the site's own domain)                                                                            |
| Publishing → live update            | **Instant on-demand revalidation** — a Sanity webhook calls a Next route that runs `revalidateTag('letter')`. No full rebuild, no build minutes.      |
| Migration of the 3 existing letters | **Automated one-time script** (`scripts/migrate-letters.ts`)                                                                                          |
| Dataset access                      | **Public read** — the live site fetches with no token; the Studio is protected by Sanity login; a write token (local only) is used only for migration |
| Draft preview                       | Out of scope for Phase 2 (publish → live). Can be added later with Next draft mode.                                                                   |

## Source of truth (existing letter structure)

From `letter-*.html` (e.g. `letter-disenfranchised-grief.html`), each letter is:

- **Hero** (`section--hero section--blush`): back-link "← Letters from Marie" → `/letters`; eyebrow =
  topic (e.g. "Loss & grief"); `<h1 style="max-width:18ch">` = title; `<span class="post-card__meta">`
  = "A letter · 5 min read".
- **Body** (`section--parchment` > `container container--medium`): a landscape hero image
  (`figure.media.media--landscape`), then `<article class="article-body stack stack-6">` containing
  `<p>` paragraphs (with `<em>`), `<h2>` section headings, and `.pullquote` blocks
  (`<div class="pullquote"><span class="quote-mark">&ldquo;</span><blockquote>…</blockquote></div>`).
- **CTA** (`section--blush`): eyebrow "When reading is not enough", a bespoke `<h2>` closing line
  (varies per letter), and a "Book a session" button → `/contact`.

The `/letters` index card (from `letters.html`) needs: hero image, topic label, title, excerpt,
meta ("A letter · N min read"), and links to `/letters/<slug>`. Topic chips: All / Loss & grief /
Beyond fertility.

## Sanity project & Studio

- A free Sanity project; dataset `production`, **public read**.
- Packages: `sanity`, `next-sanity`, `@sanity/image-url`, `@portabletext/react`,
  `styled-components` (peer dep of the Studio UI only — confined to the Studio route, not the site).
- `sanity.config.ts` at repo root; schema files under `sanity/`.
- Embedded Studio route: `app/studio/[[...tool]]/page.tsx` (+ minimal layout so the Studio renders
  full-screen without the site chrome).

## Data model — `letter` document (`sanity/schemas/letter.ts`)

| Field            | Type                | Notes                                                                                                                                           |
| ---------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          | string (required)   |                                                                                                                                                 |
| `slug`           | slug (required)     | generated from title                                                                                                                            |
| `topic`          | string (required)   | list of `{title:"Loss & grief", value:"loss"}`, `{title:"Beyond fertility", value:"beyond"}` (extensible)                                       |
| `heroImage`      | image (required)    | `hotspot: true`; nested `alt` string (required)                                                                                                 |
| `excerpt`        | text (required)     | index card summary                                                                                                                              |
| `readTime`       | string (required)   | e.g. "5 min read"; rendered as `A letter · {readTime}`                                                                                          |
| `publishedAt`    | datetime (required) | ordering (newest first)                                                                                                                         |
| `body`           | array               | Portable Text: block styles `normal` + `h2`; marks `em`, `strong`; plus a `pullquote` object `{ text: text }`; plus inline `image` (with `alt`) |
| `closingHeading` | string (optional)   | bespoke closing-CTA line; falls back to a default constant                                                                                      |
| `seoDescription` | string (optional)   | `<head>` meta description; falls back to `excerpt`                                                                                              |

## Routes & components

- **`app/letters/[slug]/page.tsx`** (server): `generateStaticParams()` returns all letter slugs;
  `generateMetadata()` sets title + `seoDescription`. Renders the exact letter layout, using:
  - **`components/PortableLetterBody.tsx`** — `@portabletext/react` `PortableText` with custom
    components mapping Portable Text → design markup: `block` style `h2`→`<h2>`, `normal`→`<p>`;
    marks `em`/`strong`; type `pullquote`→ the `.pullquote` (quote-mark + `<blockquote>`); type
    `image`→ `figure.media.media--landscape` with `<img>` (Sanity CDN URL via `@sanity/image-url`).
    Wrapped by the page in `<article class="article-body stack stack-6 reveal">`.
  - Hero image rendered via the same image-URL builder.
  - Closing CTA uses `closingHeading` or a default.
- **`app/letters/page.tsx`** (server): fetches all letters (slug, title, topic, heroImage, excerpt,
  readTime, publishedAt), maps each to the `LetterPost` shape the **existing `LetterFilters`**
  component already consumes (`img` = Sanity image URL, `topicLabel` from topic, `meta` =
  `A letter · {readTime}`), ordered newest-first. The hero subscribe form and surrounding markup
  are unchanged from Phase 1.
- **Delete** the three static folders `app/letters/{disenfranchised-grief,petri-dish-loss,after-the-miracle-baby}/`
  — replaced by `[slug]`.
- **`lib/sanity/client.ts`** — `next-sanity` client (projectId/dataset/apiVersion), `useCdn: true`.
  Server fetches pass `{ next: { tags: ['letter'] } }`.
- **`lib/sanity/image.ts`** — `@sanity/image-url` builder.
- **`lib/sanity/queries.ts`** — GROQ queries (all-letters-for-index, single-letter-by-slug,
  all-slugs).

## Publishing flow (revalidation)

- **`app/api/revalidate/route.ts`** (POST): verifies the request with `@sanity/webhook`'s
  `isValidSignature` against `SANITY_REVALIDATE_SECRET` (the signing secret configured on the
  webhook); on success calls `revalidateTag('letter')` and returns `{ revalidated: true }`; on a
  missing/invalid signature returns 401.
- A Sanity **webhook** (configured in Sanity manage, documented in the plan) POSTs to
  `/api/revalidate` on create/update/delete of `letter` documents.
- Result: pages are statically rendered and refresh within seconds of publishing.

## Migration — `scripts/migrate-letters.ts`

One-time, run locally with a write token (`npx tsx scripts/migrate-letters.ts`):

1. For each of the 3 `letter-*.html` sources: parse hero (title, topic, readTime) and the
   `article-body` into Portable Text (paragraphs, `h2`, `em`, `.pullquote`→`pullquote` block).
2. Pull `excerpt`, the `heroImage` file, `alt`, and `slug` from the Phase 1 `POSTS` data /
   the index cards (slugs: `disenfranchised-grief`, `petri-dish-loss`, `after-the-miracle-baby`).
3. Upload each hero image (`public/assets/img/*.png`) as a Sanity asset.
4. Extract each letter's bespoke closing `<h2>` into `closingHeading`; `seoDescription` from the
   source `<meta name="description">`; `publishedAt` set to distinct ordered timestamps.
5. Write the 3 `letter` documents via the Sanity write client (idempotent on a deterministic `_id`).

After migration the dynamic pages must match the old static pages (verified vs `screenshots/`).

## Environment & secrets

- **Public, committed-safe** (set in `.env.local`, GitHub Actions, and Netlify):
  `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (`production`),
  `NEXT_PUBLIC_SANITY_API_VERSION` (pinned date).
- **Secrets** (Netlify + local only, never committed): `SANITY_REVALIDATE_SECRET`;
  `SANITY_WRITE_TOKEN` (local only, migration).
- `.env.local` is gitignored. An `.env.example` documents the variables.
- CI: the build runs `generateStaticParams`/fetches, so the public Sanity vars must be present in
  the GitHub Actions job env (they are non-secret). The build must also succeed against an empty
  dataset (no letters) — queries return `[]`, pages still build.

## Error handling

- `/letters/[slug]` for an unknown slug → `notFound()` (the Phase 1 styled 404).
- Index/post fetch failure → fail the build (better to catch at build than ship an empty blog);
  at runtime, a revalidation that fails leaves the last good static page in place.
- `/api/revalidate` rejects unauthenticated/invalid requests with 401.

## Testing

Test-first per the project's TDD practice:

- **`PortableLetterBody`**: renders `h2`/paragraph/`em`/`strong` and a `pullquote` block with the
  exact design classes (`pullquote`, `quote-mark`, `blockquote`) and an inline image as
  `media media--landscape`.
- **Index shaping helper**: maps a Sanity letter → `LetterPost` (topic→label, meta string, image URL).
- Sanity client mocked in unit tests (no network).
- Build smoke: empty dataset still builds; a fixture letter renders.
- **Fidelity**: each migrated `/letters/<slug>` compared to its `screenshots/` counterpart.

## Quality gates

Unchanged from Phase 1 and must stay green: `typecheck`, `lint`, `format:check`, `test`, `build`
locally and in GitHub Actions CI. The Studio route and Sanity packages must not introduce lint
errors (Studio peer-dep `styled-components` is confined to `/studio`).

## Out of scope (Phase 2)

- Draft/preview mode (publish → live only for now).
- Categories/tags beyond the two existing topics, author profiles, comments, search, pagination,
  RSS — none are needed for an occasional-letters blog (revisit only if asked).
- Phase 3 (contact/booking emails) is separate.

## Decisions & assumptions

- Embedded Studio at `/studio`; public-read dataset; instant tag-based revalidation; automated
  migration — all per the brainstorming decisions above.
- The `LetterFilters` component from Phase 1 is reused unchanged; only its data source changes
  (hardcoded array → Sanity).
- The user creates the Sanity account/project and supplies the project ID; secret tokens are set
  in Netlify (and locally for migration), never committed.
