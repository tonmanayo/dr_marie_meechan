import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/SiteFooter";

test("renders contact email and key explore links", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("link", { name: /hello@drmariemeechan\.co\.uk/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "About Marie" })).toHaveAttribute("href", "/about");
});
