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
