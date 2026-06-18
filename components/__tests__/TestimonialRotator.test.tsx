import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestimonialRotator } from "@/components/TestimonialRotator";

const ITEMS = [
  { quote: "First quote", cite: "Client A" },
  { quote: "Second quote", cite: "Client B" },
];

test("renders a dot per testimonial and activates the clicked one", async () => {
  const user = userEvent.setup();
  render(<TestimonialRotator items={ITEMS} />);
  const dots = screen.getAllByRole("button", { name: /Show testimonial/ });
  expect(dots).toHaveLength(2);
  await user.click(dots[1]);
  expect(dots[1]).toHaveClass("is-active");
});
