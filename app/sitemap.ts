import type { MetadataRoute } from "next";
import { getLetterSlugs } from "@/lib/sanity/queries";

const BASE_URL = "https://www.drmariemeechan.co.uk";

type Entry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

// Every public route on the site. Keep in sync when pages are added or removed.
const ENTRIES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/sessions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/your-journey", changeFrequency: "monthly", priority: 0.8 },
  { path: "/becoming-belonging", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/training", changeFrequency: "monthly", priority: 0.7 },
  { path: "/letters", changeFrequency: "weekly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  // Individual letters are authored in Sanity — pull their slugs at build time.
  const letterSlugs = await getLetterSlugs();
  const letterEntries: Entry[] = letterSlugs.map((slug) => ({
    path: `/letters/${slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...ENTRIES, ...letterEntries].map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
