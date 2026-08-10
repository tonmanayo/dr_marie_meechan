# MailerLite Newsletter Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the newsletter signup form (homepage + `/letters`) add the subscriber to a MailerLite group via a secure server route, instead of only showing a front-end success state.

**Architecture:** A `POST /api/subscribe` route handler (Netlify serverless function via the existing `@netlify/plugin-nextjs`) calls the MailerLite API with a secret Bearer token. The shared `FormWithSuccess` component gains an optional `action` prop; when set it POSTs the form's `email`/`name` as JSON to that endpoint and shows the existing success panel on 2xx or a graceful error otherwise. The two newsletter forms pass `action="/api/subscribe"`. Contact/training forms (no `action`) are unchanged.

**Tech Stack:** Next.js 16 (App Router route handler), TypeScript, Vitest + RTL, MailerLite new API (`connect.mailerlite.com`), Netlify.

## Global Constraints

- **Base branch:** `main` (the live Phase 1 site); feature branch `mailerlite-newsletter`. Do NOT touch the Sanity work (separate `phase-2-blog` branch).
- **Node:** use Node ≥ 22 in this repo (`nvm use 22.19.0`) — Node 16 cannot run the tooling/hooks.
- **Secret safety:** `MAILERLITE_API_TOKEN` is read only server-side (inside the route handler) and never returned to the client or logged in full. `.env.local` is never committed.
- **MailerLite endpoint:** `POST https://connect.mailerlite.com/api/subscribers`; headers `Authorization: Bearer ${MAILERLITE_API_TOKEN}`, `Content-Type: application/json`, `Accept: application/json`; body `{ email, fields: { name }, groups: ["${MAILERLITE_GROUP_ID}"] }`. Do NOT set `status` (account opt-in setting governs).
- **Scope:** newsletter forms only. Contact form untouched.
- **Gate must stay green with NO secret set** (route runs only at request time, not build).

## File structure

```
app/api/subscribe/route.ts            # NEW: POST handler → MailerLite
app/api/subscribe/__tests__/route.test.ts  # NEW
components/FormWithSuccess.tsx         # MODIFY: add optional `action` prop
components/__tests__/FormWithSuccess.test.tsx  # MODIFY: add action success/error tests
app/page.tsx                          # MODIFY: newsletter FormWithSuccess → action="/api/subscribe"
app/letters/page.tsx                  # MODIFY: newsletter FormWithSuccess → action="/api/subscribe"
.env.example                          # NEW: document env vars
.gitignore                            # MODIFY: allow committing .env.example
```

---

## Task 1: Subscribe API route + env scaffolding

**Files:**

- Create: `app/api/subscribe/route.ts`, `app/api/subscribe/__tests__/route.test.ts`, `.env.example`
- Modify: `.gitignore`

**Interfaces:**

- Produces: `POST /api/subscribe` accepting JSON `{ email: string, name?: string }`; returns `200 { ok: true }` on success, `400 { ok: false }` for a bad/missing email, `500`/`502 { ok: false }` on config/upstream errors. `FormWithSuccess` (Task 2) POSTs to it.

- [ ] **Step 1: env scaffolding**

Create `.env.example`:

```
# MailerLite newsletter integration (server-side only)
# Get a token: MailerLite → Integrations → API → generate.
MAILERLITE_API_TOKEN=
# The target group's ID (e.g. "Letters from Marie").
MAILERLITE_GROUP_ID=
```

In `.gitignore`, the line `.env*` (≈ line 34) ignores all env files. Add an exception immediately after it so the example can be committed:

```
.env*
!.env.example
```

Optionally create `.env.local` (gitignored) with the two keys blank for local runs.

- [ ] **Step 2: Write the failing test** `app/api/subscribe/__tests__/route.test.ts`

```ts
import { vi, beforeEach, afterEach } from "vitest";

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("MAILERLITE_API_TOKEN", "test-token");
  vi.stubEnv("MAILERLITE_GROUP_ID", "group-123");
  fetchMock.mockReset();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

import { POST } from "@/app/api/subscribe/route";

function req(body: unknown) {
  return new Request("http://localhost/api/subscribe", {
    method: "POST",
    body: JSON.stringify(body),
  }) as never;
}

test("rejects an invalid email with 400 and does not call MailerLite", async () => {
  const res = await POST(req({ email: "nope", name: "Jane" }));
  expect(res.status).toBe(400);
  expect(fetchMock).not.toHaveBeenCalled();
});

test("posts to MailerLite with bearer token, name field, and group; returns ok", async () => {
  fetchMock.mockResolvedValue({ ok: true, status: 201 });
  const res = await POST(req({ email: "jane@example.com", name: "Jane" }));
  expect(res.status).toBe(200);
  await expect(res.json()).resolves.toEqual({ ok: true });
  expect(fetchMock).toHaveBeenCalledWith(
    "https://connect.mailerlite.com/api/subscribers",
    expect.objectContaining({ method: "POST" }),
  );
  const init = fetchMock.mock.calls[0][1] as RequestInit;
  const headers = init.headers as Record<string, string>;
  expect(headers.Authorization).toBe("Bearer test-token");
  const sent = JSON.parse(init.body as string);
  expect(sent.email).toBe("jane@example.com");
  expect(sent.fields).toEqual({ name: "Jane" });
  expect(sent.groups).toEqual(["group-123"]);
});

test("returns a generic error when MailerLite responds non-2xx", async () => {
  fetchMock.mockResolvedValue({ ok: false, status: 422 });
  const res = await POST(req({ email: "jane@example.com", name: "Jane" }));
  expect(res.status).toBe(502);
  await expect(res.json()).resolves.toEqual({ ok: false });
});

test("returns 500 when the API token env is missing", async () => {
  vi.stubEnv("MAILERLITE_API_TOKEN", "");
  const res = await POST(req({ email: "jane@example.com", name: "Jane" }));
  expect(res.status).toBe(500);
  expect(fetchMock).not.toHaveBeenCalled();
});
```

- [ ] **Step 3: Run to verify it fails** — `npm test -- subscribe` → FAIL (cannot find `@/app/api/subscribe/route`).

- [ ] **Step 4: Implement `app/api/subscribe/route.ts`**

```ts
import { type NextRequest, NextResponse } from "next/server";

const MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: unknown; name?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const token = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!token || !groupId) {
    console.error("[subscribe] missing MAILERLITE_API_TOKEN or MAILERLITE_GROUP_ID");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const res = await fetch(MAILERLITE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: name ? { name } : undefined,
        groups: [groupId],
      }),
    });
    if (!res.ok) {
      console.error(`[subscribe] MailerLite responded ${res.status}`);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
```

- [ ] **Step 5: Run to verify it passes** — `npm test -- subscribe` → all 4 pass.

- [ ] **Step 6: Gate + commit**

Run: `npm run typecheck && npm run lint && npm run format:check` (0 errors; run `npm run format` if needed).

```bash
git add app/api/subscribe .env.example .gitignore
git commit -m "feat: add /api/subscribe route posting to MailerLite"
```

---

## Task 2: Extend `FormWithSuccess` with an optional `action`

**Files:**

- Modify: `components/FormWithSuccess.tsx`
- Modify: `components/__tests__/FormWithSuccess.test.tsx`

**Interfaces:**

- Consumes: the `POST /api/subscribe` contract from Task 1 (JSON `{ email, name }` → `{ ok }`).
- Produces: `FormWithSuccess` now accepts `action?: string`. With `action`, submit POSTs `{ email, name }` (read from the form's `name="email"`/`name="name"` fields) to it and shows success on 2xx, error otherwise. Without `action`, behaviour is unchanged.

- [ ] **Step 1: Add failing tests** — add to `components/__tests__/FormWithSuccess.test.tsx`. **Merge** these imports into the file's existing import lines rather than duplicating them (the file already imports `render`/`screen` from `@testing-library/react`; add `userEvent`, and `vi`/`afterEach` from `vitest`, only if not already imported):

```tsx
import { vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("with action: POSTs email+name and shows success on ok", async () => {
  const fetchMock = vi.fn((_url: string, _init?: RequestInit) =>
    Promise.resolve({ ok: true, status: 200 } as Response),
  );
  vi.stubGlobal("fetch", fetchMock);
  const user = userEvent.setup();
  render(
    <FormWithSuccess action="/api/subscribe" success={<p>Thank you.</p>}>
      <input name="name" aria-label="name" defaultValue="Jane" />
      <input name="email" aria-label="email" defaultValue="jane@example.com" />
      <button type="submit">Subscribe</button>
    </FormWithSuccess>,
  );
  await user.click(screen.getByRole("button", { name: "Subscribe" }));
  expect(await screen.findByText("Thank you.")).toBeVisible();
  expect(fetchMock).toHaveBeenCalledWith(
    "/api/subscribe",
    expect.objectContaining({ method: "POST" }),
  );
  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body).toEqual({ email: "jane@example.com", name: "Jane" });
});

test("with action: shows a graceful error when the request fails", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve({ ok: false, status: 500 } as Response)),
  );
  const user = userEvent.setup();
  render(
    <FormWithSuccess action="/api/subscribe" success={<p>Thank you.</p>}>
      <input name="email" aria-label="email" defaultValue="jane@example.com" />
      <button type="submit">Subscribe</button>
    </FormWithSuccess>,
  );
  await user.click(screen.getByRole("button", { name: "Subscribe" }));
  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  expect(screen.queryByText("Thank you.")).not.toBeVisible();
});
```

(The existing "without action shows success" test must keep passing — do not change it.)

- [ ] **Step 2: Run to verify the new tests fail** — `npm test -- FormWithSuccess` → the two new tests FAIL (no `action` handling yet).

- [ ] **Step 3: Implement — replace `components/FormWithSuccess.tsx` with:**

```tsx
"use client";

import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

export function FormWithSuccess({
  formClassName,
  children,
  success,
  successStyle,
  action,
}: {
  formClassName?: string;
  children: ReactNode;
  success: ReactNode;
  successStyle?: CSSProperties;
  action?: string;
}) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  function showSuccess() {
    setDone(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    if (!action) {
      showSuccess();
      return;
    }
    const data = new FormData(e.currentTarget);
    setError(false);
    setSubmitting(true);
    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          name: String(data.get("name") ?? ""),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      showSuccess();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <form
        className={formClassName}
        onSubmit={onSubmit}
        aria-busy={submitting}
        style={done ? { display: "none" } : undefined}
      >
        {children}
        {error && (
          <p
            role="alert"
            className="small"
            style={{ color: "var(--color-rose)", marginTop: "8px" }}
          >
            Sorry — something went wrong. Please try again in a moment.
          </p>
        )}
      </form>
      <div
        className="form-success"
        ref={successRef}
        hidden={!done}
        tabIndex={-1}
        style={successStyle}
      >
        {success}
      </div>
    </div>
  );
}
```

Notes: children/markup are unchanged (no wrapper element added around them, so the design's `.stack` gap layout is preserved); the error `<p>` is appended inside the form. The `submitting` guard prevents double submits. `var(--color-rose)` is an existing design token used elsewhere for accent text.

- [ ] **Step 4: Run to verify all pass** — `npm test -- FormWithSuccess` → existing + 2 new tests PASS.

- [ ] **Step 5: Gate + commit**

Run: `npm run typecheck && npm run lint && npm run format:check` (0 errors; `npm run format` if needed).

```bash
git add components/FormWithSuccess.tsx components/__tests__/FormWithSuccess.test.tsx
git commit -m "feat: add optional POST action to FormWithSuccess"
```

---

## Task 3: Wire the two newsletter forms to `/api/subscribe`

**Files:**

- Modify: `app/page.tsx` (homepage newsletter form, the `<FormWithSuccess>` at ~line 321)
- Modify: `app/letters/page.tsx` (letters newsletter form, the `<FormWithSuccess>` at ~line 73)

**Interfaces:**

- Consumes: `FormWithSuccess` `action` prop (Task 2) and the `/api/subscribe` route (Task 1). The forms' inputs already have `name="name"` and `name="email"` — do not rename them.

- [ ] **Step 1: Homepage** — in `app/page.tsx`, add `action="/api/subscribe"` to the newsletter `<FormWithSuccess ...>` opening tag (the one whose `success` panel says "Thank you. You will receive a letter the next time I write one."). Leave `formClassName`, `success`, `successStyle`, and all children exactly as-is.

- [ ] **Step 2: Letters** — in `app/letters/page.tsx`, add `action="/api/subscribe"` to the newsletter `<FormWithSuccess ...>` opening tag (the subscribe form under "Receive a letter when I write one"). Leave everything else as-is.

- [ ] **Step 3: Verify** — do NOT add `action` to the contact (`app/contact/page.tsx`) or training (`app/training/page.tsx`) forms. Confirm:

```bash
grep -rn 'action="/api/subscribe"' app/ | sort
```

Expected: exactly two matches — `app/page.tsx` and `app/letters/page.tsx`.

- [ ] **Step 4: Build + gate**

Run: `npm run build && npm test && npm run typecheck && npm run lint && npm run format:check` — all pass. The build lists `/api/subscribe` as a dynamic route (`ƒ`).

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/letters/page.tsx
git commit -m "feat: wire newsletter forms to /api/subscribe (MailerLite)"
```

---

## Task 4: Final verification + go-live handoff (manual)

- [ ] **Step 1: Full local gate** — `npm run typecheck && npm run lint && npm run format:check && npm test && npm run build`. All pass; `/api/subscribe` present as a dynamic route.

- [ ] **Step 2: Local smoke test (optional, needs real creds)** — put a real `MAILERLITE_API_TOKEN` + `MAILERLITE_GROUP_ID` in `.env.local`, run `npm run dev`, submit the homepage newsletter form, and confirm the subscriber appears in the MailerLite group. (Without creds, the route returns 500 and the form shows the graceful error — expected.)

- [ ] **Step 3: Handoff — the client/user must:**
  1. Provide/confirm the **MailerLite API token** and **Group ID**.
  2. In **Netlify → Site settings → Environment variables**, add `MAILERLITE_API_TOKEN` (secret) and `MAILERLITE_GROUP_ID`, then redeploy.
  3. After deploy, submit the live newsletter form and confirm the subscriber lands in the MailerLite group (and, if double opt-in is on in MailerLite, that the confirmation email is received).

- [ ] **Step 4: Finish the branch** — use superpowers:finishing-a-development-branch (push + PR, or merge to `main`, per the user's choice).

---

## Spec coverage check

- Server route calling MailerLite with secret token → Task 1. ✓
- Adds to a specific group; honors account opt-in (no `status`) → Task 1. ✓
- `FormWithSuccess` optional `action`; success/error states; other forms unaffected → Task 2. ✓
- Newsletter forms (home + letters) wired; contact untouched → Task 3. ✓
- Env vars documented + gitignored; secret server-only → Tasks 1, 4. ✓
- Tests (route: payload/token/group/success/error/missing-env; form: success/error/no-action) → Tasks 1, 2. ✓
- Gate green without secret (route runs at request time) → Global Constraints, Tasks 1, 4. ✓

```

```
