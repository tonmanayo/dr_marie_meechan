# Newsletter → MailerLite Integration — Design

**Date:** 2026-08-10
**Status:** Approved
**Repo:** dr_marie_meechan · **Base branch:** `main` (live Phase 1 site) · **Feature branch:** `mailerlite-newsletter`

## Goal

Wire the "occasional letters" **newsletter signup form** (First name + Email + consent) so that
clicking **Subscribe** adds the person to a **MailerLite** group. The form appears on the homepage
and on `/letters`. Today it only shows a front-end success state and sends nothing anywhere.

## Decisions (from brainstorming)

| Decision    | Choice                                                                                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope       | **Newsletter signup only** (homepage + `/letters`). The contact form is unchanged.                                                                                           |
| Integration | **Server API route** (`/api/subscribe`) that calls the MailerLite API with a secret token. Not an embedded MailerLite form; not a client-side call (would leak the token).   |
| Grouping    | Add subscribers to a **specific MailerLite group** (Group ID supplied by the client).                                                                                        |
| Opt-in      | **Honor the MailerLite account setting** — the code does not force a status, so the account's double-opt-in config applies (if on, MailerLite sends the confirmation email). |

## Architecture

- **`app/api/subscribe/route.ts`** — a `POST` route handler (runs as a Netlify serverless function
  via the existing `@netlify/plugin-nextjs`, same as `app/api/revalidate`):
  - Parses `{ email, name }` from the JSON request body.
  - Validates that `email` is present and looks like an email; returns `400` if not.
  - Calls MailerLite (new API): `POST https://connect.mailerlite.com/api/subscribers` with headers
    `Authorization: Bearer ${MAILERLITE_API_TOKEN}`, `Content-Type: application/json`,
    `Accept: application/json`, and body:
    ```json
    {
      "email": "<email>",
      "fields": { "name": "<first name>" },
      "groups": ["<MAILERLITE_GROUP_ID>"]
    }
    ```
  - MailerLite treats create/update idempotently (re-subscribing an existing address is a no-op /
    update, HTTP 200/201). Does **not** set `status`, so the account's opt-in behavior governs.
  - Returns `{ ok: true }` on success (2xx from MailerLite); on any failure returns a **generic**
    error (`{ ok: false }`, 4xx/5xx) — never echoing MailerLite internals or the token.
  - If `MAILERLITE_API_TOKEN`/`MAILERLITE_GROUP_ID` are absent, returns a generic 500 (logged
    server-side). Because route handlers run at request time, the **build and CI succeed without
    the secret**.

- **`components/FormWithSuccess.tsx`** — extend with an optional `action?: string` (endpoint) prop:
  - When `action` is set: `onSubmit` does `preventDefault()`, gathers the form fields, `POST`s JSON
    `{ email, name }` to `action`; on a 2xx it swaps to the existing success panel, on failure it
    shows a graceful inline error message and leaves the form editable.
  - When `action` is **not** set: behaves exactly as today (front-end success only) — so the
    contact and training forms are unaffected.
  - Adds a `submitting` state (disable the button / "Sending…") and an `error` state.

- **Newsletter form usages** (`app/(site)/page.tsx` homepage + `app/(site)/letters/page.tsx`):
  pass `action="/api/subscribe"`, and ensure the First-name input has `name="name"` and the email
  input `name="email"` so the values are captured. Markup/styling otherwise unchanged.

- **Environment variables** (documented in `.env.example`):
  - `MAILERLITE_API_TOKEN` — **secret**; set in `.env.local` and in Netlify; never committed.
  - `MAILERLITE_GROUP_ID` — the target group's ID; set in the same places.

## Data flow

Fill First name + Email + tick consent → click Subscribe → client `POST /api/subscribe` with
`{ email, name }` → route calls MailerLite → subscriber added to the group (account opt-in setting
applies; double opt-in → MailerLite emails a confirmation) → success panel shown.

## Error handling

- Missing/invalid email → route returns 400; form shows a friendly "Please enter a valid email."
- MailerLite error / network failure / missing env → route logs server-side, returns a generic
  error; the form shows "Sorry — something went wrong. Please try again in a moment." and stays
  editable so the visitor can retry.
- Rate-limit (429 from MailerLite) → treated as a generic retryable error.
- The API token is never included in any response or client-visible output.

## Testing

Test-first per the project's practice:

- **Route handler** (`app/api/subscribe/route.ts`): mock `fetch`; assert it POSTs to the MailerLite
  URL with the `Bearer` token and a body containing the email, `fields.name`, and the group; assert
  `{ ok: true }` on a mocked 2xx and a generic error on a mocked non-2xx and on a thrown/network
  error. Env mocked; no real network.
- **`FormWithSuccess`** with `action`: mock `fetch`; submitting with a valid email → success panel +
  a POST to the endpoint with the right body; a mocked failure → the error message shows and the
  form remains. Confirm that without `action` the component still just shows success (no fetch).
- Full gate green with no secret present (route only runs at request time).

## Out of scope

- Changing the contact form (stays as-is).
- MailerLite automations, tags beyond the single group, or custom fields beyond `name`.
- Any change to the Sanity blog work (separate `phase-2-blog` branch).

## What the client provides

- **MailerLite API token** — MailerLite → Integrations → API → generate a token.
- **MailerLite Group ID** — the target group (e.g. "Letters from Marie"); its ID from the group's
  page/URL or the API. Both are set as env vars locally and in Netlify (Site settings →
  Environment variables); the token is a secret and is never committed.
