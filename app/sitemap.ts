import type { MetadataRoute } from "next";

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
  { path: "/letters/after-the-miracle-baby", changeFrequency: "yearly", priority: 0.5 },
  { path: "/letters/disenfranchised-grief", changeFrequency: "yearly", priority: 0.5 },
  { path: "/letters/petri-dish-loss", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ENTRIES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
