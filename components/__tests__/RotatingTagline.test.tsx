import { render, screen } from "@testing-library/react";
import { RotatingTagline } from "@/components/RotatingTagline";

const LINES = ["One line.", "Two line.", "Three line."];

test("renders all lines and an aria-label of the full text", () => {
  render(<RotatingTagline lines={LINES} />);
  LINES.forEach((l) => expect(screen.getByText(l)).toBeInTheDocument());
  expect(screen.getByLabelText(LINES.join(" "))).toBeInTheDocument();
});
