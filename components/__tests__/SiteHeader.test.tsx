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
