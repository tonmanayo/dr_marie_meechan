import type { MetadataRoute } from "next";

const BASE_URL = "https://www.drmariemeechan.co.uk";

// Allow all crawlers (including AI assistants) across the whole site; only the
// POST-only API route is off-limits since it is not a page. The sitemap and
// canonical host are advertised here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
