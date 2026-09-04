/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/navigation is not available in jsdom; provide a default mock.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// next/image → plain <img> in tests (strip next-only props, resolve static imports).
const NEXT_IMAGE_ONLY_PROPS = ["fill", "priority", "sizes", "quality", "loader", "placeholder"];
vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: any) => {
    const resolved = typeof src === "object" && src !== null ? src.src : src;
    const domProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !NEXT_IMAGE_ONLY_PROPS.includes(key)),
    );
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={resolved} alt={alt ?? ""} {...domProps} />;
  },
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

// next/script → render nothing in tests (we only assert consent behaviour).
vi.mock("next/script", () => ({
  default: () => null,
}));
