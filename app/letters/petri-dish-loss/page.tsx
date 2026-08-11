import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articleLd } from "@/components/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/letters/petri-dish-loss" },
  title: "The petri dish loss · Letters from Marie · Dr Marie Meechan, PhD",
  description:
    "A failed IVF transfer is a real loss, even when the world doesn't always treat it that way. Dr Marie Meechan, fertility psychotherapist, on the grief that begins in the clinic.",
};

export default function PetriDishLossPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleLd({
              slug: "petri-dish-loss",
              headline: "The petri dish loss: grieving the embryo that never implanted",
              description: metadata.description ?? "",
              image: "/assets/img/hands-mug-wide.png",
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
          <h1 style={{ maxWidth: "20ch" }}>
            The petri dish loss: grieving the embryo that never implanted
          </h1>
          <span className="post-card__meta">A letter · 6 min read</span>
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
              src="/assets/img/hands-mug-wide.png"
              alt="Hands wrapped around a warm ceramic mug in soft light."
              fill
              sizes="(max-width: 48rem) 100vw, 720px"
            />
          </figure>

          <article className="article-body stack stack-6 reveal">
            <p>I want to begin with something that often goes unsaid.</p>
            <p>
              When an embryo does not implant, when a transfer fails, when a cycle ends in a
              negative test, when what was briefly a possibility becomes a loss, that is a
              bereavement.
            </p>
            <p>
              Not a bereavement that the world around you will necessarily recognise. Not one that
              comes with condolence cards or time off work. But a bereavement nonetheless. A real
              one.
            </p>
            <p>
              And if you have ever sat with the strange grief of that, in the clinic car park, or
              alone at home, or trying to explain to someone why you can&rsquo;t quite pull yourself
              together, I want you to know that what you felt was not an overreaction. It was grief.
              And grief is what it deserved.
            </p>

            <h2>What we are actually losing</h2>
            <p>
              There is a tendency, in the language of IVF, to speak in careful, measured terms. A
              failed transfer. An unsuccessful cycle. Embryos that &ldquo;didn&rsquo;t make
              it.&rdquo; This language has a purpose, it is clinical, neutral, precise. It does not
              make assumptions about what you were feeling.
            </p>
            <p>
              But it can also, unintentionally, create a kind of distance between the experience and
              its emotional weight.
            </p>
            <p>
              When you go through IVF, you invest in what that embryo represents. The hope of it.
              The future of it. The version of your life in which it works. That investment is not
              trivial. It is made over months or years of appointments, of hormones, of decisions,
              of hope carefully rationed and carefully held.
            </p>
            <p>
              The loss is not just the embryo. It is the version of the future you had already,
              quietly, begun to imagine.
            </p>
            <p>
              When a transfer fails, you lose the embryo. But you also lose the particular future
              you had attached to it. And you grieve it in the same moment that the world expects
              you to regroup, to consider next steps, to think about whether you want to try again.
            </p>
            <p>That is an enormous thing to be asked of someone in grief.</p>

            <h2>The complication of invisible beginnings</h2>
            <p>
              One of the things that makes this grief particularly hard to navigate is that so much
              of it happens in private. Many people undergoing IVF have not told their family, their
              colleagues, their friends. They are carrying the hope and the fear and the waiting
              alone, or with one other person. And so when it does not work, there is no one to tell
              who already knows.
            </p>
            <p>
              Grief ordinarily moves through relationship, through the telling of it, through the
              witnessing of it. Disenfranchised grief, grief that is not socially recognised, often
              has nowhere to go. It can turn inward. It can become difficult to name even to
              yourself.
            </p>
            <p>
              I have sat with many people who arrived in my consulting room not sure whether they
              were &ldquo;allowed&rdquo; to be as affected as they were. Who had been told, kindly
              but unhelpfully, that at least you know you can get eggs, or at least you have a
              frozen embryo, or at least you can try again.
            </p>

            <div className="pullquote" style={{ margin: "var(--space-4) auto" }}>
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>
                At least is not a comfort in grief. It is a redirection away from it.
              </blockquote>
            </div>

            <h2>What this grief needs</h2>
            <p>
              This grief is ambiguous, complex, and confusing. In my fertility impairment
              experiences, I would ask myself after a failed transfer or another negative pregnancy
              test, why am I suffering in this alone, feeling utterly devastated, and why do the
              medical professionals not talk about the psychological impact of this, or understand
              when I try to talk about it? Over the years as a patient in reproductive medicine, I
              felt unheard; silenced. It was only during my research years later that I learned
              about this type of fragmented grief being disenfranchised; chronic sorrow, nonfinite
              loss.
            </p>
            <p>
              This grief needs a safe space for you to be heard, seen, understood, to be able to
              mark these losses in a way that is right for you. In my practice we will move forward
              together; we don&rsquo;t just move on as society expects us to. You are grieving the
              loss of a dream, a future planned around your baby that never was.
            </p>
            <p>
              It needs space. It needs time. It needs to be spoken rather than swallowed. And it
              benefits, I believe, from being witnessed by someone who understands not just the
              clinical process but the emotional terrain, who knows that a failed transfer is not
              just a medical outcome, but a human one.
            </p>
            <p>
              If you are grieving something that has not been named, or that has been minimised by
              the people around you, even with the best intentions, I want you to know that what you
              are carrying is real.
            </p>
            <p>And you do not have to make it smaller in order to be easier to support.</p>
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
            If this is a loss you are carrying, you do not have to make it smaller to be met.
          </h2>
          <Link className="btn btn--primary reveal" href="/contact">
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
