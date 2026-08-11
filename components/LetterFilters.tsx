"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type LetterPost = {
  slug: string;
  topic: "loss" | "beyond";
  topicLabel: string;
  img: string;
  alt: string;
  title: string;
  excerpt: string;
  meta: string;
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "loss", label: "Loss & grief" },
  { key: "beyond", label: "Beyond fertility" },
] as const;

export function LetterFilters({ posts }: { posts: LetterPost[] }) {
  const [active, setActive] = useState<string>("all");

  return (
    <>
      <div
        className="chips reveal"
        style={{ marginBottom: "var(--space-12)" }}
        role="tablist"
        aria-label="Filter letters by topic"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`chip${active === f.key ? " is-active" : ""}`}
            type="button"
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="post-grid">
        {posts.map((p) => {
          const show = active === "all" || p.topic === active;
          return (
            <Link
              key={p.slug}
              className="post-card reveal"
              href={`/letters/${p.slug}`}
              style={show ? undefined : { display: "none" }}
            >
              <figure className="media media--landscape" style={{ margin: 0 }}>
                <Image src={p.img} alt={p.alt} fill sizes="(max-width: 64rem) 100vw, 33vw" />
              </figure>
              <span className="post-card__topic">{p.topicLabel}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="post-card__meta">{p.meta}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
