import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/your-journey" },
  title: "Navigating & honouring your unique journey · Dr Marie Meechan, PhD",
  description:
    "Specialist support for IVF, IUI, ICSI, recurrent loss, donor decisions and the grief that often goes unseen. Dr Marie Meechan, PhD — Edinburgh and online.",
};

export default function YourJourneyPage() {
  return (
    <>
      {/* Hero */}
      <section className="section--hero section--parchment">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <span className="eyebrow" style={{ margin: 0 }}>
              Your journey
            </span>
            <h1>Navigating and honouring your unique journey</h1>
            <p className="lead" style={{ maxWidth: "34rem" }}>
              Wherever you are in your fertility journey, beginning, mid-treatment, between cycles,
              or sitting with a loss that no one else seems to see, there is space here for it.
            </p>
            <div className="cta-row">
              <Link className="btn btn--primary" href="/contact">
                Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </Link>
              <Link className="btn btn--secondary" href="/letters">
                Or read the letters
              </Link>
            </div>
          </div>
          <figure className="media media--hero media--portrait reveal" style={{ margin: 0 }}>
            <Image
              src="/assets/img/marie-coffee-window.jpg"
              alt="Dr Marie Meechan in a cobalt blazer, holding a coffee and looking out of a window in warm wood-panelled light."
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
              priority
            />
          </figure>
        </div>
      </section>

      {/* The losses that go unseen */}
      <section className="section--blush">
        <div className="container container--medium">
          <div className="section-head reveal">
            <span className="eyebrow">The losses that often go unseen</span>
            <h2>Some losses carry a name. Others do not.</h2>
          </div>
          <div className="prose stack stack-4 reveal" style={{ maxWidth: "42rem" }}>
            <p>
              The pregnancy that did not hold. The embryo that never implanted. The transfer that
              failed. The future you imagined, slipping a little further out of reach with every
              cycle. These are real losses, even when no one around you treats them as such.
            </p>
            <p>
              There is a name for this, disenfranchised grief. Grief for losses that society does
              not recognise, leaving us to carry them in silence. In my counselling room, we do not
              valorise the wounds. We give voice to what has felt unspeakable. We name your losses,
              and we let them be losses.
            </p>
          </div>
        </div>
      </section>

      {/* What we work on */}
      <section className="section--parchment">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0 }}>
                What we work on together
              </span>
              <h2>Whatever is in your way, we move through it together</h2>
            </div>
            <ul className="leaf-list">
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Coming to terms with a diagnosis, named or unexplained</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Endometriosis and polycystic ovary syndrome (PCOS)</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Decision points around IUI, IVF, ICSI</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>The emotional weight of medical cycles</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Recurrent loss and recurrent miscarriage</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Donor conception, surrogacy, adoption decisions</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Male factor and shared decisions in couples</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Faith, culture, and family dynamics around fertility</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Knowing when, and how, to step away from treatment</span>
              </li>
            </ul>
            <p style={{ maxWidth: "34rem" }}>
              Endometriosis and polycystic ovary syndrome (PCOS) are among the most common
              companions on this road, hormonal conditions of a woman&rsquo;s reproductive years,
              mostly of the ovaries, and closely bound up with fertility and, for many, with
              infertility. If you are carrying one of them, it is named here too, and held.
            </p>
          </div>
          <figure className="media media--portrait reveal" style={{ margin: 0 }}>
            <Image
              src="/assets/img/marie-armchair-notebook.jpg"
              alt="Dr Marie Meechan sitting in a leather armchair beside a palm and a warm lamp, holding a notebook and pen."
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
            />
          </figure>
        </div>
      </section>

      {/* How I think about the journey */}
      <section className="section--blush">
        <div className="container container--medium">
          <div className="section-head reveal">
            <span className="eyebrow">How I think about the journey</span>
            <h2>Not a fixed condition, a fluid season, with its own weather</h2>
          </div>
          <div className="prose stack stack-4 reveal" style={{ maxWidth: "42rem" }}>
            <p>
              Through my research and my own experience, I have come to see fertility impairment not
              as a fixed condition or a single diagnosis, but as a fluid season of life, one with
              its own particular weather.
            </p>
            <p>
              There are processes within it: the affirming of a diagnosis, the onboarding of a
              medical pathway, the acknowledging and naming of emotion through cycles, the
              management of multiple losses, the coaching through informed choice, and for some the
              re-evaluation of treatment itself. We do not march through these in order. We move
              through them as your journey requires, and I walk with you.
            </p>
          </div>
        </div>
      </section>

      {/* A note on language */}
      <section className="section--parchment">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">A note on language</span>
            <h2>A few terms I may introduce, with care, and only when they help</h2>
          </div>
          <div className="grid grid-3 reveal">
            <div className="card">
              <span className="tag">
                <i
                  className="ph-light ph-bookmark-simple"
                  aria-hidden="true"
                  style={{ fontSize: "14px" }}
                />{" "}
              </span>
              <h3
                className="mt-6"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Reproductive loss
              </h3>
              <p className="mt-4">
                Any pregnancy that does not reach the point where a baby could survive, through
                miscarriage, stillbirth, failed transfer, or an IVF cycle that did not produce a
                viable embryo. Whether you saw a heartbeat or only hoped for one, the loss is real.
              </p>
              <p className="mt-4">
                I may gently name what sits alongside it too, the chronic sorrow that returns in
                waves, and the ambiguous, nonfinite losses that carry no clear ending.
                <span
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "var(--color-rose)",
                    marginTop: "var(--space-2)",
                  }}
                >
                  Doka 2002; Charon 2006; Boss, Roos and Harris 2021
                </span>
              </p>
            </div>
            <div className="card">
              <span className="tag">
                <i
                  className="ph-light ph-bookmark-simple"
                  aria-hidden="true"
                  style={{ fontSize: "14px" }}
                />{" "}
              </span>
              <h3
                className="mt-6"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Disenfranchised grief
              </h3>
              <p className="mt-4">
                Grief for losses that society fails to recognise. Coined by Kenneth Doka in 2002,
                this term has been my anchor for years. It speaks to the loss of hopes, dreams and
                expectations that may not have a tangible form, but carry tangible weight.
              </p>
            </div>
            <div className="card">
              <span className="tag">
                <i
                  className="ph-light ph-bookmark-simple"
                  aria-hidden="true"
                  style={{ fontSize: "14px" }}
                />{" "}
              </span>
              <h3
                className="mt-6"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Fluid season
              </h3>
              <p className="mt-4">
                My own term for the experience of being inside fertility impairment. Not a fixed
                condition, not an illness, not a state to be cured. A season with its own weather,
                its own length, its own way through.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section--blush">
        <div className="container">
          <div className="pullquote reveal">
            <span className="quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote style={{ fontSize: "32px" }}>
              After years of trying to conceive, I felt hopeless about motherhood. Dr Marie&rsquo;s
              coaching and psychotherapy gave me the tools and mindset I needed. Not only am I now
              expecting my first baby, I&rsquo;m finally feeling confident about becoming a mother.
            </blockquote>
            <cite>Female client · online sessions</cite>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section--parchment">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <h2 className="reveal" style={{ maxWidth: "34rem" }}>
            If any of this feels like the conversation you have needed to have, let us start it.
          </h2>
          <div className="cta-row cta-row--center reveal">
            <Link className="btn btn--primary" href="/contact">
              Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
            </Link>
            <Link className="btn btn--secondary" href="/letters">
              Subscribe to the newsletter{" "}
              <i className="ph-light ph-envelope-simple" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
