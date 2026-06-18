import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "After the miracle baby · Letters from Marie · Dr Marie Meechan, PhD",
  description:
    "If IVF brought you your baby and you still don't feel okay, you are not alone. Dr Marie Meechan on postnatal anxiety after fertility treatment, and why it makes complete sense.",
};

export default function AfterTheMiracleBabyPage() {
  return (
    <>
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
            Beyond fertility
          </span>
          <h1 style={{ maxWidth: "20ch" }}>
            After the miracle baby: nobody told me motherhood would feel like this
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/heart-sunset-wide.png"
              alt="A person standing in golden light with hands resting gently over their heart."
            />
          </figure>

          <article className="article-body stack stack-6 reveal">
            <p>There is a story we tell ourselves about the end of fertility treatment.</p>
            <p>
              It goes like this: you go through the hard part, and then, if you are lucky, if it
              works, you arrive somewhere warm and safe, and the hard part is over.
            </p>
            <p>Nobody tells you that having the baby does not always turn off the fear.</p>

            <h2>The version of you that arrived at motherhood</h2>
            <p>
              If you reached parenthood through IVF or other assisted reproduction, or after
              miscarriage, or after years of trying, you did not arrive there the same way as
              someone who conceived without difficulty.
            </p>
            <p>
              You arrived there shaped by all of it. By the waiting and the hoping and the loss and
              the trying again. By the appointments and the injections and the uncertainty. By the
              times it didn&rsquo;t work before the time it did.
            </p>
            <p>
              That history does not disappear the moment your baby is placed in your arms. In many
              cases, it follows you in.
            </p>
            <p>
              The relief can be real and the anxiety can be real at the same time. One does not
              cancel out the other.
            </p>
            <p>
              This is not a failure. It is not ingratitude. It is not a sign that you don&rsquo;t
              deserve what you have. It is what happens when a nervous system that has been braced
              for a very long time does not immediately know how to stop bracing.
            </p>

            <h2>What postnatal anxiety can look like after fertility treatment</h2>
            <p>
              The postnatal anxiety I see in people who have come through fertility treatment often
              has its own particular shape. It is not always the generalised worry about parenthood
              that new parents commonly describe. It can be something more specific.
            </p>
            <p>
              A hypervigilance around the baby&rsquo;s health and safety. A difficulty believing
              that the good thing is real, or that it will last. A sense of waiting for something to
              go wrong, because for so long, something did go wrong. A strange grief that sits
              alongside the joy, unexplained and unwelcome.
            </p>
            <p>
              Sometimes there is guilt about feeling anything other than grateful. A sense that you
              fought so hard for this that you have forfeited the right to find it hard, as I
              struggled with in my own experience.
            </p>
            <p>
              You have not forfeited anything. Struggling and being grateful can coexist. They do,
              for many people.
            </p>

            <h2>Why this doesn&rsquo;t always get named</h2>
            <p>
              Part of why this experience can be so isolating is that it exists in a cultural blind
              spot. The narrative of fertility treatment, when it ends well, is one of resolution.
              You got your baby. The story is over.
            </p>
            <p>
              The people around you, who witnessed the struggle, who celebrated the news, may not
              realise that something harder is still happening. They may not have the language for
              it. They may assume that the arrival of the baby closed the chapter.
            </p>
            <p>
              And so you may find yourself in the strange position of feeling unable to say: I am
              struggling. Because the answer you fear is: but you got what you wanted.
            </p>

            <div className="pullquote" style={{ margin: "var(--space-4) auto" }}>
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>
                You are allowed to have got what you wanted and still be struggling. These are not
                contradictions.
              </blockquote>
            </div>

            <h2>What I want you to know</h2>
            <p>
              If this resonates with you, if you are sitting in a season that was supposed to feel
              like relief but doesn&rsquo;t quite, I want you to know that what you are experiencing
              is real, it is recognised, and it is not your fault.
            </p>
            <p>
              There is specialist support for this. You do not have to navigate it with a GP who
              does not know your history, or with a therapist who has never worked with reproductive
              loss. There are people, I am one of them, who understand the particular path you took
              to get here, and can sit with you in what it has left behind.
            </p>
            <p>
              You do not have to earn the right to support by having it hard enough. Having it at
              all is enough.
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
            You do not have to earn the right to support. Having it at all is enough.
          </h2>
          <Link className="btn btn--primary reveal" href="/contact">
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
