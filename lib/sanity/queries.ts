import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

export type LetterTopic = "loss" | "beyond";

export type LetterListItem = {
  slug: string;
  title: string;
  topic: LetterTopic;
  heroImage: SanityImageSource;
  alt: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
};

export type LetterDoc = LetterListItem & {
  body: PortableTextBlock[];
  closingHeading?: string;
  seoDescription?: string;
};

const fetchOpts = { next: { tags: ["letter"] as string[] } };

const listQuery = groq`*[_type == "letter"] | order(publishedAt desc){
  "slug": slug.current, title, topic, heroImage, "alt": heroImage.alt, excerpt, readTime, publishedAt
}`;

const slugsQuery = groq`*[_type == "letter" && defined(slug.current)].slug.current`;

const bySlugQuery = groq`*[_type == "letter" && slug.current == $slug][0]{
  "slug": slug.current, title, topic, heroImage, "alt": heroImage.alt, excerpt, readTime, publishedAt,
  body, closingHeading, seoDescription
}`;

// Each query is resilient: if Sanity is unconfigured, unreachable, or the
// dataset isn't readable yet, we degrade to empty rather than failing the build.
export async function getLetters(): Promise<LetterListItem[]> {
  if (!client) return [];
  try {
    return await client.fetch<LetterListItem[]>(listQuery, {}, fetchOpts);
  } catch {
    return [];
  }
}

export async function getLetterSlugs(): Promise<string[]> {
  if (!client) return [];
  try {
    return await client.fetch<string[]>(slugsQuery, {}, fetchOpts);
  } catch {
    return [];
  }
}

export async function getLetter(slug: string): Promise<LetterDoc | null> {
  if (!client) return null;
  try {
    return await client.fetch<LetterDoc | null>(bySlugQuery, { slug }, fetchOpts);
  } catch {
    return null;
  }
}
