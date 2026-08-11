import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/becoming-belonging" },
  title: "Becoming & belonging · Dr Marie Meechan, PhD — The Fertility Psychotherapist",
  description:
    "Specialist support for the season after fertility treatment — postnatal anxiety, IVF motherhood, and involuntary childlessness. Dr Marie Meechan, PhD.",
};

export default function BecomingBelongingPage() {
  return (
    <>
      {/* Hero */}
      <section className="section--hero section--parchment">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal" style={{ margin: 0 }}>
            Becoming &amp; belonging
          </span>
          <h1 className="reveal" style={{ maxWidth: "24rem", width: "484px" }}>
            Finding meaning, whatever shape your life takes next
          </h1>
          <div className="reveal stack stack-4" style={{ alignItems: "center", maxWidth: "40rem" }}>
            <p
              className="lead"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem,2vw,1.6rem)",
                lineHeight: 1.4,
                margin: "0 auto",
              }}
            >
              Some of you will arrive here as new mothers. Some of you will arrive here knowing your
              path has taken an unexpected turn and you are rebuilding.
            </p>
            <p style={{ margin: "0 auto" }}>
              Both of you belong here. Both of you have somewhere to land.
            </p>
          </div>
        </div>
      </section>

      {/* Chooser */}
      <section className="section--blush section--tight">
        <div className="container">
          <div className="chooser reveal">
            <a
              className="chooser__card chooser__card--blush"
              href="#mother"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <span className="eyebrow" style={{ margin: 0 }}>
                Strand one
              </span>
              <h3>I am a mother now, and I am still struggling</h3>
              <span className="arrow-link" style={{ marginTop: "4px" }}>
                Enter this strand <i className="ph-light ph-arrow-down" aria-hidden="true" />
              </span>
            </a>
            <a className="chooser__card chooser__card--horizon" href="#without-children">
              <span className="eyebrow" style={{ margin: 0 }}>
                Strand two
              </span>
              <h3>My path forward is without children, and I am rebuilding</h3>
              <span className="arrow-link" style={{ marginTop: "4px" }}>
                Enter this strand <i className="ph-light ph-arrow-down" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Strand one */}
      <section className="section--parchment" id="mother" style={{ scrollMarginTop: "90px" }}>
        <div className="container split">
          <figure className="media media--portrait reveal" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/rest-golden.png"
              alt="A person lying down with eyes closed, dappled golden light across their face."
            />
          </figure>
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0 }}>
                For the struggling mother
              </span>
              <h2>No one warned you that the hardest part might come now</h2>
            </div>
            <div className="prose stack stack-4">
              <p>
                You waited. You hoped. You held on through cycles and losses and treatments that
                took something out of you. You finally hold them in your arms.
              </p>
              <p>
                The pressure to be the perfect mother to the miracle baby is its own kind of weight,
                it&rsquo;s invisible to the world, deeply familiar to you. The anxiety that does not
                quiet down. The body that does not feel like yours. The grief, even now, for the
                version of motherhood you imagined before all of this.
              </p>
              <p>
                I work with women in this season too. I have lived it myself. You are not failing.
                You are still in the journey and it just looks different now.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  marginBottom: "var(--space-4)",
                }}
              >
                In this strand, we work on
              </h3>
              <ul className="leaf-list">
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Postnatal depression after IVF or assisted conception</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Heightened anxiety in motherhood</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Postnatal recovery, physical, emotional, identity</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>The pressure of &ldquo;the perfect mother to the miracle baby&rdquo;</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Embodied motherhood and the mind-body connection</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>
                    Adoption, surrogacy, same-sex parenthood and the journey does not end at arrival
                  </span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>
                    Life after IVF or endometriosis surgery for everyone whose family came through
                    treatment
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strand two */}
      <section style={{ background: "#DCE6EE", scrollMarginTop: "90px" }} id="without-children">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0, color: "#5E7C92" }}>
                For those building a life without children
              </span>
              <h2>
                Your path forward is not the one you imagined. That does not make it smaller. It
                does not make it less.
              </h2>
            </div>
            <div className="prose stack stack-4">
              <p>
                There is grief here, and it is allowed to be grief. There is also rebuilding, slow,
                quiet, unglamorous work that asks you to redefine what a meaningful life can look
                like, on your terms, on your timeline.
              </p>
              <p>
                You do not have to make peace with this on a schedule. You do not have to perform
                acceptance. You can grieve and rebuild at the same time. We will hold both,
                together.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  marginBottom: "var(--space-4)",
                }}
              >
                In this strand, we work on
              </h3>
              <ul className="leaf-list">
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" style={{ color: "#5E7C92" }} />
                  <span>Navigating life without children, not by choice</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" style={{ color: "#5E7C92" }} />
                  <span>Identity shifts beyond fertility</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" style={{ color: "#5E7C92" }} />
                  <span>Holding space for what comes next</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" style={{ color: "#5E7C92" }} />
                  <span>Rebuilding identity and purpose</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" style={{ color: "#5E7C92" }} />
                  <span>Honouring grief while creating a future</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" style={{ color: "#5E7C92" }} />
                  <span>Living fully, differently than expected</span>
                </li>
              </ul>
            </div>
          </div>
          <figure className="media media--portrait reveal" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/couple-beach.png"
              alt="A couple standing together on a beach at sunset, looking out toward the horizon."
            />
          </figure>
        </div>
      </section>

      {/* Featured testimonial */}
      <section className="section--parchment">
        <div className="container">
          <div className="pullquote reveal">
            <span className="quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote style={{ fontSize: "32px" }}>
              After years of IVF attempts, we felt we had exhausted all possibilities. Marie coached
              us through the options for building a family walking us through each with such care
              and expertise which led us to realise that adoption was our path forward. What struck
              us most was how she honoured both our grief and our hope. Today, we are parents to two
              beautiful siblings. Marie did not just guide us through the obstacles, she helped us
              see each obstacle as part of our story, not the end of it.
            </blockquote>
            <cite>Couple · Edinburgh</cite>
          </div>
        </div>
      </section>

      {/* Closing + CTA */}
      <section className="section--blush">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <p
            className="display reveal"
            style={{ fontSize: "clamp(1.8rem,4vw,3rem)", maxWidth: "24rem" }}
          >
            Whichever shore you have reached, you are not alone on it.
          </p>
          <div className="reveal stack stack-4" style={{ alignItems: "center" }}>
            <p style={{ margin: "0 auto" }}>Let us start with a conversation.</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn--primary" href="/contact">
                Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </Link>
              <Link className="btn btn--secondary" href="/letters">
                Subscribe to the newsletter{" "}
                <i className="ph-light ph-envelope-simple" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
