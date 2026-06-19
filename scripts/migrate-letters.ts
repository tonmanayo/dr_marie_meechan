import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";
import { parse } from "node-html-parser";

const SRC_DIR = "/Users/tonymack/Downloads/Dr marie Meechan Website V1";
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local");
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  token: TOKEN,
  useCdn: false,
});

type Source = {
  file: string;
  slug: string;
  topic: "loss" | "beyond";
  excerpt: string;
  heroImage: string;
  publishedAt: string;
};

const SOURCES: Source[] = [
  {
    file: "letter-disenfranchised-grief.html",
    slug: "disenfranchised-grief",
    topic: "loss",
    excerpt:
      "The grief society does not make room for, and how naming it begins to lift its weight.",
    heroImage: "flowers-linen-wide.png",
    publishedAt: "2026-03-01T09:00:00Z",
  },
  {
    file: "letter-petri-dish-loss.html",
    slug: "petri-dish-loss",
    topic: "loss",
    excerpt:
      "On the losses that have no funeral, no card, no casserole, and why they are losses all the same.",
    heroImage: "hands-mug-wide.png",
    publishedAt: "2026-02-01T09:00:00Z",
  },
  {
    file: "letter-after-the-miracle-baby.html",
    slug: "after-the-miracle-baby",
    topic: "beyond",
    excerpt:
      "When the longed-for arrival brings its own grief and anxiety, and why that does not mean you are failing.",
    heroImage: "heart-sunset-wide.png",
    publishedAt: "2026-01-01T09:00:00Z",
  },
];

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function spansFor(el: any): unknown[] {
  const spans: unknown[] = [];
  for (const node of el.childNodes) {
    if (node.nodeType === 3) {
      const text = node.rawText.replace(/\s+/g, " ");
      if (text) spans.push({ _type: "span", _key: key(), text, marks: [] });
    } else {
      const tag = node.rawTagName?.toLowerCase();
      const marks = tag === "em" ? ["em"] : tag === "strong" ? ["strong"] : [];
      const text = node.text.replace(/\s+/g, " ");
      if (text) spans.push({ _type: "span", _key: key(), text, marks });
    }
  }
  return spans;
}

function bodyFor(html: string): unknown[] {
  const root = parse(html);
  const article = root.querySelector(".article-body");
  if (!article) throw new Error("no .article-body");
  const blocks: unknown[] = [];
  for (const node of article.childNodes) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tag: string | undefined = (node as any).rawTagName?.toLowerCase();
    if (!tag) continue;
    if (tag === "p") {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: spansFor(node),
      });
    } else if (tag === "h2") {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "h2",
        markDefs: [],
        children: spansFor(node),
      });
    } else if (tag === "div") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bq = (node as any).querySelector("blockquote");
      if (bq)
        blocks.push({
          _type: "pullquote",
          _key: key(),
          text: bq.text.replace(/\s+/g, " ").trim(),
        });
    }
  }
  return blocks;
}

async function run() {
  for (const s of SOURCES) {
    const html = readFileSync(resolve(SRC_DIR, s.file), "utf8");
    const root = parse(html);
    const title = root.querySelector("h1")!.text.trim();
    const readTime = (root.querySelector(".post-card__meta")?.text ?? "A letter · 5 min read")
      .replace(/^A letter ·\s*/, "")
      .trim();
    const closingHeading = root.querySelectorAll("section")[2]?.querySelector("h2")?.text.trim();
    const seoDescription =
      root.querySelector('meta[name="description"]')?.getAttribute("content") ?? s.excerpt;
    const heroAlt = root.querySelectorAll("img")[0]?.getAttribute("alt") ?? "";

    const imgBuf = readFileSync(resolve(SRC_DIR, "assets/img", s.heroImage));
    const asset = await client.assets.upload("image", imgBuf, { filename: s.heroImage });

    const doc = {
      _id: `letter-${s.slug}`,
      _type: "letter",
      title,
      slug: { _type: "slug", current: s.slug },
      topic: s.topic,
      heroImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: heroAlt },
      excerpt: s.excerpt,
      readTime,
      publishedAt: s.publishedAt,
      body: bodyFor(html),
      closingHeading,
      seoDescription,
    };

    await client.createOrReplace(doc);
    console.log(`migrated: ${s.slug} (${(doc.body as unknown[]).length} blocks)`);
  }
  console.log("done");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
