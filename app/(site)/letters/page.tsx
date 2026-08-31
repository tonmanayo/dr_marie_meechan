import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FormWithSuccess } from "@/components/FormWithSuccess";
import { LetterFilters } from "@/components/LetterFilters";
import { getLetters } from "@/lib/sanity/queries";
import { letterToPost } from "@/lib/sanity/letter-to-post";
import { letterCollectionLd } from "@/components/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/letters" },
  title: "Letters from Marie · Dr Marie Meechan, PhD — The Fertility Psychotherapist",
  description:
    "Writing, reflections and research notes on fertility, loss and beyond — by Dr Marie Meechan, PhD. Subscribe to receive new letters by email.",
};

export default async function LettersPage() {
  const posts = (await getLetters()).map(letterToPost);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(letterCollectionLd(posts)) }}
      />
      {/* Hero with subscribe */}
      <section className="section--hero section--blush">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <span className="eyebrow" style={{ margin: 0 }}>
              Letters from Marie
            </span>
            <h1>
              An occasional letter on fertility, grief, and the seasons of becoming and unbecoming
            </h1>
            <div className="prose stack stack-4" style={{ maxWidth: "34rem" }}>
              <p>
                I write when I have something I want to say. There is no schedule. Subscribe below
                if you would like a letter in your inbox when one arrives.
              </p>
            </div>
            <div
              className="card"
              style={{ background: "var(--color-bg)", borderColor: "rgba(201,145,138,0.4)" }}
            >
              <span className="eyebrow">Receive a letter when I write one</span>
              <FormWithSuccess
                action="/api/subscribe"
                formClassName="stack stack-4 mt-4"
                successStyle={{
                  textAlign: "left",
                  alignItems: "flex-start",
                  padding: "var(--space-4) 0",
                }}
                success={
                  <>
                    <i className="ph-light ph-envelope-open" aria-hidden="true" />
                    <p style={{ margin: 0 }}>
                      Thank you. You will receive a letter the next time I write one.
                    </p>
                  </>
                }
              >
                <div className="field">
                  <label htmlFor="sub-name">First name</label>
                  <input
                    id="sub-name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="What may I call you?"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="sub-email">
                    Email address <span className="req">required</span>
                  </label>
                  <input
                    id="sub-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="consent">
                  <input id="sub-consent" name="consent" type="checkbox" required />
                  <label htmlFor="sub-consent">
                    I would like to receive occasional letters from Marie by email, and I agree to
                    the <Link href="/privacy-policy">privacy promise</Link>. You can unsubscribe at
                    any time.
                  </label>
                </div>
                <button
                  className="btn btn--primary"
                  type="submit"
                  style={{ alignSelf: "flex-start" }}
                >
                  Subscribe
                </button>
              </FormWithSuccess>
            </div>
          </div>
          <figure className="media media--hero media--portrait reveal" style={{ margin: 0 }}>
            <Image
              src="/assets/img/marie-writing-cafe.jpg"
              alt="Dr Marie Meechan writing in a notebook at a marble cafe table, a cappuccino and her fertility and grief research books beside her."
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
              priority
            />
          </figure>
        </div>
      </section>

      {/* Filters + posts */}
      <section className="section--parchment">
        <div className="container">
          <LetterFilters posts={posts} />

          <div
            className="notice reveal mt-12"
            style={{ textAlign: "center", background: "var(--color-blush)" }}
          >
            <p style={{ margin: "0 auto" }}>
              More letters are on their way. Subscribe above to receive the next one in your inbox.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--blush">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal">When reading is not enough</span>
          <h2 className="reveal" style={{ maxWidth: "30rem" }}>
            If a letter speaks to something you are carrying, we can talk about it together.
          </h2>
          <Link className="btn btn--primary reveal" href="/contact">
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
