import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, afterEach } from "vitest";
import { FormWithSuccess } from "@/components/FormWithSuccess";

afterEach(() => {
  vi.unstubAllGlobals();
});

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
