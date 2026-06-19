/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { PortableLetterBody } from "@/components/PortableLetterBody";

const value = [
  {
    _type: "block",
    _key: "a",
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: "s1", text: "A heading", marks: [] }],
  },
  {
    _type: "block",
    _key: "b",
    style: "normal",
    markDefs: [],
    children: [
      { _type: "span", _key: "s2", text: "Body ", marks: [] },
      { _type: "span", _key: "s3", text: "emphasis", marks: ["em"] },
    ],
  },
  { _type: "pullquote", _key: "c", text: "A quote." },
];

test("renders h2, paragraph with em, and a pullquote with design classes", () => {
  const { container } = render(<PortableLetterBody value={value as any} />);
  expect(screen.getByText("A heading").tagName).toBe("H2");
  expect(screen.getByText("emphasis").tagName).toBe("EM");
  const pq = container.querySelector(".pullquote");
  expect(pq).not.toBeNull();
  expect(pq?.querySelector(".quote-mark")).not.toBeNull();
  expect(pq?.querySelector("blockquote")?.textContent).toBe("A quote.");
});
