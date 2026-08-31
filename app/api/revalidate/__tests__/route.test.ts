import { vi, beforeEach } from "vitest";

const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({ revalidateTag: (t: string, p: string) => revalidateTag(t, p) }));

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
  expect(revalidateTag).toHaveBeenCalledWith("letter", "max");
});
