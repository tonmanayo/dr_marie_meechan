/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react";
import { RevealObserver } from "@/components/RevealObserver";

test("falls back to making .reveal elements visible without IntersectionObserver", () => {
  const original = (globalThis as any).IntersectionObserver;
  delete (globalThis as any).IntersectionObserver;
  document.body.innerHTML = `<div class="reveal" data-testid="r"></div>`;
  render(<RevealObserver />);
  expect(document.querySelector(".reveal")).toHaveClass("is-visible");
  (globalThis as any).IntersectionObserver = original;
});
