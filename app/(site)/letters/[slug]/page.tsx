import { notFound } from "next/navigation";
import Link from "next/link";
import { getLetter, getLetterSlugs } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { TOPIC_LABELS } from "@/lib/sanity/topics";
import { PortableLetterBody } from "@/components/PortableLetterBody";

const DEFAULT_CLOSING =
  "If this speaks to something you are carrying, we can talk about it together.";

export async function generateStaticParams() {
  const slugs = await getLetterSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const letter = await getLetter(slug);
  if (!letter) return {};
  return {
    title: `${letter.title} · Letters from Marie · Dr Marie Meechan, PhD`,
    description: letter.seoDescription ?? letter.excerpt,
  };
}

export default async function LetterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const letter = await getLetter(slug);
  if (!letter) notFound();

  return (
    <>
      <section className="section--hero section--blush">
        <div
          className="container container--medium center stack stack-6 reveal"
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <Link className="arrow-link" href="/letters" style={{ alignSelf: "center" }}>
            <i className="ph-light ph-arrow-left" aria-hidden="true" /> Letters from Marie
          </Link>
          <span className="eyebrow" style={{ margin: 0 }}>
            {TOPIC_LABELS[letter.topic] ?? letter.topic}
          </span>
          <h1 style={{ maxWidth: "18ch" }}>{letter.title}</h1>
          <span className="post-card__meta">A letter · {letter.readTime}</span>
        </div>
      </section>

      <section className="section--parchment">
        <div className="container container--medium">
          <figure
            className="media media--landscape reveal"
            style={{ margin: "0 auto var(--space-16)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={urlForImage(letter.heroImage)} alt={letter.alt} />
          </figure>
          <article className="article-body stack stack-6 reveal">
            <PortableLetterBody value={letter.body} />
          </article>
        </div>
      </section>

      <section className="section--blush">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal">When reading is not enough</span>
          <h2 className="reveal" style={{ maxWidth: "30rem" }}>
            {letter.closingHeading ?? DEFAULT_CLOSING}
          </h2>
          <Link className="btn btn--primary reveal" href="/contact">
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
