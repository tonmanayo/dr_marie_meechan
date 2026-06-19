import { vi } from "vitest";
import { letterToPost } from "@/lib/sanity/letter-to-post";
import type { LetterListItem } from "@/lib/sanity/queries";

vi.mock("@/lib/sanity/image", () => ({ urlForImage: () => "https://cdn.example/x.png" }));

test("maps a Sanity letter to a LetterPost for LetterFilters", () => {
  const letter: LetterListItem = {
    slug: "a",
    title: "T",
    topic: "loss",
    heroImage: { _type: "image" } as never,
    alt: "alt text",
    excerpt: "an excerpt",
    readTime: "5 min read",
    publishedAt: "2024-01-01T00:00:00Z",
  };
  expect(letterToPost(letter)).toEqual({
    slug: "a",
    topic: "loss",
    topicLabel: "Loss & grief",
    img: "https://cdn.example/x.png",
    alt: "alt text",
    title: "T",
    excerpt: "an excerpt",
    meta: "A letter · 5 min read",
  });
});
