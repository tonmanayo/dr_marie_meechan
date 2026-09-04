§# SEO & Discovery — Dr Marie Meechan, PhD

Site: **https://www.drmariemeechan.co.uk** · Stack: Next.js (App Router) on Netlify.
Status: all items below are merged to `main` and live. One item (Google Analytics) is pending — see the end.

---

## 1. Crawl & discovery files

| File                              | Detail                                                                      |
| --------------------------------- | --------------------------------------------------------------------------- |
| `app/robots.ts` → `/robots.txt`   | Site crawlable (index/follow); canonical host advertised; links the sitemap |
| `app/sitemap.ts` → `/sitemap.xml` | **15 URLs** — every public page                                             |
| `public/llms.txt`                 | Guidance file for AI crawlers / LLMs                                        |

## 2. Canonical URLs

Self-referencing `alternates.canonical` on **13 / 13 pages** (home, about, sessions, your-journey, becoming-belonging, training, contact, letters + 3 letters, privacy-policy, terms-of-use). `metadataBase` is set to the `www` host so every canonical resolves to one absolute URL.

## 3. Page metadata

Set site-wide in `app/layout.tsx` and per-page overrides:

- Unique `<title>` and meta `description` on every route
- `metadataBase: https://www.drmariemeechan.co.uk`
- `robots: { index: true, follow: true }`
- `applicationName`, `locale: en_GB`

## 4. Social share cards (Open Graph + Twitter)

- Open Graph tags: `type=website`, `siteName`, `locale`, `url`, `title`, `description`
- Twitter tags: `card=summary_large_image`, `title`, `description`
- Branded **1200×630** share image generated dynamically at `app/opengraph-image.tsx` (parchment/terracotta palette)

## 5. Structured data (JSON-LD)

Site-wide `@graph` injected in `app/layout.tsx`:

- **`ProfessionalService`** (`#practice`) — name "Dr Marie Meechan, PhD — The Fertility Psychotherapist", `email` hello@drmariemeechan.co.uk, `telephone` +447852813610, `priceRange` ££, `PostalAddress` (37 Mayfield Gardens, Edinburgh, EH9 2BX, GB), `areaServed` [Edinburgh, United Kingdom, Online worldwide], `founder` → the Person below, `sameAs` [intherapywithmarie.com]
- **`Person`** (`#marie`) — Dr Marie Meechan, `jobTitle` Fertility Psychotherapist, `hasCredential` (PhD in Counselling Studies, University of Edinburgh; BACP registered member), `worksFor` → the practice
- **`WebSite`** (`#website`) — `inLanguage` en-GB

## 6. Rich-result schema (FAQ + Articles)

Built via a shared helper, `components/schema.ts` (JSX answers are flattened to plain text so the schema stays in sync with the visible copy — no duplication):

- **`FAQPage`** on **Contact** (5 Q&As) and **Sessions** (6 Q&As)
- **`Article`** on all **3 Letters** (petri-dish-loss, after-the-miracle-baby, disenfranchised-grief) — headline, description, image, author (Marie), publisher (the practice). `datePublished` intentionally omitted (letters are evergreen).
- **`Blog`** collection on the **/letters** index, listing all three letters

## 7. Performance / Core Web Vitals

Every image converted from raw `<img>` to **`next/image`** (auto WebP/AVIF, responsive `srcset`, lazy-load below the fold, no layout shift). Files:

- Pages: home, about, sessions, your-journey, becoming-belonging, training, letters index + 3 letters
- Components: `SiteHeader`, `SiteFooter` (logos), `LetterFilters` (letter cards)
- Content photos use `fill` against the existing `.media` aspect-ratio boxes; logos use intrinsic width/height. `~18 images` total.

## 8. Branding in tabs & results (favicon + app icons + manifest)

The site was shipping the default `create-next-app` favicon; replaced with a branded set:

- Removed the default `app/favicon.ico`
- `app/icon.tsx` — generates favicon + **192** + **512** px icons
- `app/apple-icon.tsx` — **180** px Apple touch icon
- `app/manifest.ts` → `/manifest.webmanifest` — name, short_name, description, `display: standalone`, `background_color` #F5EFE6, `theme_color` #C47B5A, 192/512 icons
- Mark: terracotta **"M"** on parchment (matches the OG image palette)

---

## 9. Google Analytics 4 (with cookie consent) — LIVE

Google Analytics 4 (`G-C4YEDHHTE4`) is live, gated behind an opt-in cookie-consent banner (`components/CookieConsent.tsx`). Nothing from Google loads until the visitor accepts — 0 requests/cookies before consent (UK PECR/GDPR). The choice is stored for a year; a "Cookie preferences" link in the footer lets visitors change it. Privacy policy §13.c updated to describe GA-with-consent.

**Still recommended (owner action):** lawyer review of the §13.c wording; in the GA4 admin, confirm Google Signals is off and set data retention.
