import { render, screen } from "@testing-library/react";

function Hello() {
  return <p>hello</p>;
}

test("test harness renders components", () => {
  render(<Hello />);
  expect(screen.getByText("hello")).toBeInTheDocument();
});
