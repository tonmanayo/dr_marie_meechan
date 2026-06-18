/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/navigation is not available in jsdom; provide a default mock.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// next/link → plain anchor in tests.
vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => {
    const { href, ...rest } = props;
    return (
      <a href={typeof href === "string" ? href : "#"} {...rest}>
        {children}
      </a>
    );
  },
}));
