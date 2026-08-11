import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articleLd } from "@/components/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/letters/disenfranchised-grief" },
  title: "What disenfranchised grief actually means · Letters from Marie · Dr Marie Meechan, PhD",
  description:
    "Disenfranchised grief is grief that society doesn't recognise or validate. Psychotherapist Dr Marie Meechan explains what it means in the context of fertility loss.",
};

export default function DisenfranchisedGriefPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleLd({
              slug: "disenfranchised-grief",
              headline: "What disenfranchised grief actually means, and why I keep saying it",
              description: metadata.description ?? "",
              image: "/assets/img/flowers-linen-wide.png",
            }),
          ),
        }}
      />
      {/* Article hero */}
      <section className="section--hero section--blush">
        <div
          className="container container--medium center stack stack-6 reveal"
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <Link className="arrow-link" href="/letters" style={{ alignSelf: "center" }}>
            <i className="ph-light ph-arrow-left" aria-hidden="true" /> Letters from Marie
          </Link>
          <span className="eyebrow" style={{ margin: 0 }}>
            Loss &amp; grief
          </span>
          <h1 style={{ maxWidth: "18ch" }}>
            What disenfranchised grief actually means, and why I keep saying it
          </h1>
          <span className="post-card__meta">A letter · 5 min read</span>
        </div>
      </section>

      {/* Article body */}
      <section className="section--parchment">
        <div className="container container--medium">
          <figure
            className="media media--landscape reveal"
            style={{ margin: "0 auto var(--space-16)" }}
          >
            <Image
              src="/assets/img/flowers-linen-wide.png"
              alt="Dried flowers resting on soft linen in warm light."
              fill
              sizes="(max-width: 48rem) 100vw, 720px"
            />
          </figure>

          <article className="article-body stack stack-6 reveal">
            <p>
              If you have spent any time with me, in a session, reading my research, or simply on
              this website, you will have noticed that I return to a particular phrase again and
              again.
            </p>
            <p>
              <em>Disenfranchised grief.</em>
            </p>
            <p>
              I am aware that it sounds clinical. I am aware it has the weight of academic language.
              And yet I keep using it, because I have not found a better pair of words to describe
              something that so many of the people I work with have lived through without ever
              having had a name for it.
            </p>
            <p>So let me tell you what it means. And let me tell you why I think it matters.</p>

            <h2>The grief that doesn&rsquo;t get a card</h2>
            <p>
              The term was first introduced by Kenneth Doka in 1989. His observation was simple and,
              I think, quietly devastating: that not all grief is treated equally. Some losses are
              socially recognised, we build rituals around them, we send flowers, we give people
              time off work. Other losses are not. They are grieved in private, often alone, and
              frequently in the company of a subtle but insistent message that says: you
              shouldn&rsquo;t be this upset about this.
            </p>

            <div className="pullquote" style={{ margin: "var(--space-4) auto" }}>
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>
                Disenfranchised grief is grief that has not been granted permission by the world
                around it.
              </blockquote>
            </div>

            <p>
              You shouldn&rsquo;t be this upset about this. And yet you are. And you are not wrong
              to be.
            </p>
            <p>
              In the context of fertility impairment and reproductive loss, this shows up
              everywhere. The embryo that didn&rsquo;t implant. The cycle that failed before anyone
              outside the clinic ever knew it had started. The years of trying that ended not with a
              pregnancy but with a decision, quietly made, to stop. The grief of childlessness, not
              chosen, but arrived at.
            </p>
            <p>
              None of these come with a funeral. None of them trigger the usual social scaffolding
              of bereavement. And yet for the people living through them, the loss is real, the pain
              is real, and the absence of acknowledgement can make it worse.
            </p>

            <h2>Why the lack of recognition hurts twice</h2>
            <p>
              When grief is not recognised, something complicated happens. People often begin to
              doubt their own experience. Was I too attached? Am I being dramatic? Should I be over
              this by now?
            </p>
            <p>
              These questions are not signs of weakness. They are the natural result of living in a
              world that has not given your loss a name.
            </p>
            <p>
              Part of my work, in sessions, in research, and in writing like this, is to offer that
              name back. Not because a word fixes anything, but because being seen and named can be
              a beginning. It can be the difference between carrying something in silence and being
              able to say: this is what I am carrying, and it is real. I know this intimately from
              my own experiences. It is a loss of hopes and dreams; the loss of a much longed-for
              child that never was.
            </p>

            <h2>The reason I keep saying it</h2>
            <p>
              I use the term disenfranchised grief not to distance us from the experience but to
              validate it. When I say it in a session, I am not offering a diagnosis. I am offering
              recognition.
            </p>
            <p>
              You are not too sensitive. You are not overreacting. You have lost something real, and
              you have likely lost it without the support that other kinds of loss bring with them.
            </p>
            <p>That matters. And I think you deserve to hear it said plainly.</p>
            <p>
              If this resonates with you, if you have been carrying something that has never quite
              been named, I would gently invite you to read more, or to reach out. You do not have
              to keep doing this alone.
            </p>
          </article>
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
            If this names something you are carrying, we can sit with it together.
          </h2>
          <Link className="btn btn--primary reveal" href="/contact">
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
