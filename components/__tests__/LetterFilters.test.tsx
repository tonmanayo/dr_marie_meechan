import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LetterFilters, type LetterPost } from "@/components/LetterFilters";

const POSTS: LetterPost[] = [
  {
    slug: "a",
    topic: "loss",
    topicLabel: "Loss & grief",
    img: "/x.png",
    alt: "",
    title: "Loss post",
    excerpt: "",
    meta: "",
  },
  {
    slug: "b",
    topic: "beyond",
    topicLabel: "Beyond fertility",
    img: "/y.png",
    alt: "",
    title: "Beyond post",
    excerpt: "",
    meta: "",
  },
];

test("filters posts by topic", async () => {
  const user = userEvent.setup();
  render(<LetterFilters posts={POSTS} />);
  await user.click(screen.getByRole("button", { name: "Beyond fertility" }));
  expect(screen.getByText("Loss post").closest("a")).toHaveStyle({ display: "none" });
  expect(screen.getByText("Beyond post").closest("a")).not.toHaveStyle({ display: "none" });
});
