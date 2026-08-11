import { describe, it, expect } from "vitest";
import type { FaqEntry } from "../Faq";
import { nodeToText, faqPageLd, articleLd, letterCollectionLd, SITE_URL } from "../schema";

describe("nodeToText", () => {
  it("returns plain strings unchanged", () => {
    expect(nodeToText("Hello")).toBe("Hello");
  });

  it("flattens the text out of JSX elements", () => {
    expect(nodeToText(<p>A real loss.</p>)).toBe("A real loss.");
  });

  it("concatenates nested and sibling nodes", () => {
    expect(
      nodeToText(
        <p>
          Within <strong>24</strong> working hours.
        </p>,
      ),
    ).toBe("Within 24 working hours.");
  });

  it("ignores null/boolean nodes", () => {
    expect(nodeToText(null)).toBe("");
    expect(nodeToText(false)).toBe("");
  });
});

describe("faqPageLd", () => {
  const items: FaqEntry[] = [
    { q: "How quickly will you respond?", a: <p>Within 24 working hours.</p> },
  ];

  it("produces a FAQPage with a Question/Answer pair per entry", () => {
    const ld = faqPageLd(items);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(1);
    expect(ld.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "How quickly will you respond?",
      acceptedAnswer: { "@type": "Answer", text: "Within 24 working hours." },
    });
  });
});

describe("articleLd", () => {
  const ld = articleLd({
    slug: "petri-dish-loss",
    headline: "The petri dish loss",
    description: "A failed IVF transfer is a real loss.",
    image: "/assets/img/hands-mug-wide.png",
  });

  it("builds an Article with an absolute image URL and no datePublished", () => {
    expect(ld["@type"]).toBe("Article");
    expect(ld.headline).toBe("The petri dish loss");
    expect(ld.image).toBe(`${SITE_URL}/assets/img/hands-mug-wide.png`);
    expect(ld.mainEntityOfPage).toBe(`${SITE_URL}/letters/petri-dish-loss`);
    expect(ld).not.toHaveProperty("datePublished");
  });

  it("references the site-wide author/publisher @ids", () => {
    expect(ld.author).toEqual({ "@id": `${SITE_URL}/#marie` });
    expect(ld.publisher).toEqual({ "@id": `${SITE_URL}/#practice` });
  });
});

describe("letterCollectionLd", () => {
  it("lists each letter as an Article in the Blog", () => {
    const ld = letterCollectionLd([
      {
        slug: "petri-dish-loss",
        title: "The petri dish loss",
        excerpt: "On the losses that have no funeral.",
        img: "/assets/img/hands-mug-wide.png",
      },
    ]);
    expect(ld["@type"]).toBe("Blog");
    expect(ld.blogPost).toHaveLength(1);
    expect(ld.blogPost[0]).toMatchObject({
      "@type": "Article",
      headline: "The petri dish loss",
      url: `${SITE_URL}/letters/petri-dish-loss`,
    });
  });
});
