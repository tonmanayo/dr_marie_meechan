import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "@/components/Faq";

const ITEMS = [
  { q: "Question one?", a: <p>Answer one.</p> },
  { q: "Question two?", a: <p>Answer two.</p> },
];

test("opens an item and closes siblings", async () => {
  const user = userEvent.setup();
  render(<Faq items={ITEMS} />);
  const [q1, q2] = screen.getAllByRole("button");
  expect(q1).toHaveAttribute("aria-expanded", "false");
  await user.click(q1);
  expect(q1).toHaveAttribute("aria-expanded", "true");
  await user.click(q2);
  expect(q1).toHaveAttribute("aria-expanded", "false");
  expect(q2).toHaveAttribute("aria-expanded", "true");
});
