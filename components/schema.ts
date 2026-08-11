import { isValidElement, type ReactNode } from "react";
import type { FaqEntry } from "./Faq";

// Canonical origin — keep in step with SITE_URL in app/layout.tsx.
export const SITE_URL = "https://www.drmariemeechan.co.uk";

// @id anchors defined in the site-wide @graph (see app/layout.tsx).
const MARIE = { "@id": `${SITE_URL}/#marie` };
const PRACTICE = { "@id": `${SITE_URL}/#practice` };
const WEBSITE = { "@id": `${SITE_URL}/#website` };

/**
 * Flatten a ReactNode into its plain text, so JSX FAQ answers can be reused as
 * schema.org text without maintaining a duplicate copy of the wording.
 */
export function nodeToText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement(node)) {
    return nodeToText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/** Build a schema.org FAQPage from a list of FAQ entries. */
export function faqPageLd(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: nodeToText(item.q).trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: nodeToText(item.a).trim(),
      },
    })),
  };
}

/**
 * Build a schema.org Article for a single "Letter from Marie".
 * datePublished is intentionally omitted — the letters are evergreen and carry
 * no reliable publication date.
 */
export function articleLd(input: {
  slug: string;
  headline: string;
  description: string;
  image: string;
}) {
  const url = `${SITE_URL}/letters/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: input.headline,
    description: input.description,
    image: `${SITE_URL}${input.image}`,
    inLanguage: "en-GB",
    author: MARIE,
    publisher: PRACTICE,
    isPartOf: WEBSITE,
  };
}

/** Build a schema.org Blog collection for the /letters index. */
export function letterCollectionLd(
  posts: { slug: string; title: string; excerpt: string; img: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/letters#blog`,
    name: "Letters from Marie",
    url: `${SITE_URL}/letters`,
    inLanguage: "en-GB",
    publisher: PRACTICE,
    blogPost: posts.map((post) => ({
      "@type": "Article",
      "@id": `${SITE_URL}/letters/${post.slug}#article`,
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/letters/${post.slug}`,
      image: `${SITE_URL}${post.img}`,
      author: MARIE,
    })),
  };
}
