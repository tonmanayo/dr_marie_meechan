import type { Metadata } from "next";
import { FormWithSuccess } from "@/components/FormWithSuccess";

export const metadata: Metadata = {
  title: "Training & speaking · Dr Marie Meechan, PhD — The Fertility Psychotherapist",
  description:
    "CPD training and speaking for counsellors, NHS teams and reproductive health professionals. Specialist fertility psychotherapy framework, by Dr Marie Meechan, PhD.",
  // Unlisted page — kept out of search indexes (source had <meta name="robots" content="noindex">).
  robots: { index: false },
};

export default function TrainingPage() {
  return (
    <>
      {/* build note: hidden until launch */}
      <div
        style={{
          background: "var(--color-ink)",
          color: "var(--color-bg)",
          textAlign: "center",
          padding: "10px 16px",
          fontSize: "0.8rem",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ opacity: 0.9 }}>
          Unlisted page — kept hidden from navigation until you are ready to launch it.
        </span>
      </div>

      {/* Hero */}
      <section className="section--hero section--parchment">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal" style={{ margin: 0 }}>
            For fellow professionals
          </span>
          <h1 className="reveal" style={{ maxWidth: "24rem" }}>
            Training and speaking for fellow professionals
          </h1>
          <p className="lead reveal" style={{ maxWidth: "44rem" }}>
            For counsellors, healthcare professionals, and reproductive health teams who want to
            build specialist understanding of fertility impairment — grounded in research, lived
            experience, and clinical practice.
          </p>
          <a className="btn btn--primary reveal" href="#enquiry">
            Make an enquiry <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Who this is for */}
      <section className="section--blush">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0 }}>
                Who this is for
              </span>
              <h2>Built for the people working alongside the system</h2>
            </div>
            <ul className="leaf-list">
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Trainee counsellors and psychotherapists looking to specialise</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>BACP-registered practitioners adding fertility specialism to their work</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>NHS clinicians and IVF clinic teams</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Fertility nurses, embryologists, and clinic administrative teams</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>
                  Anyone working alongside individuals or couples in the reproductive medicine
                  system
                </span>
              </li>
            </ul>
          </div>
          <figure className="media media--portrait reveal" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/reading-tea.png"
              alt="A practitioner reading quietly with a cup of tea, in soft natural light."
            />
          </figure>
        </div>
      </section>

      {/* What is covered */}
      <section className="section--parchment">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">What is covered</span>
            <h2>A therapeutic framework of six processes — flexible, never linear</h2>
            <p>
              Developed over years of clinical practice and doctoral research, designed to be shaped
              around the person in front of you.
            </p>
          </div>
          <div className="grid grid-3 reveal">
            <div className="card">
              <span className="step__num">01</span>
              <h3
                className="mt-4"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Affirming
              </h3>
              <p className="mt-4">
                Acknowledging the diagnosis and supporting normalisation of the patient&rsquo;s
                emotional response.
              </p>
            </div>
            <div className="card">
              <span className="step__num">02</span>
              <h3
                className="mt-4"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Onboarding the medical journey
              </h3>
              <p className="mt-4">
                Understanding the emotional and social texture of treatment, not just the clinical
                pathway.
              </p>
            </div>
            <div className="card">
              <span className="step__num">03</span>
              <h3
                className="mt-4"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Acknowledging, naming, validating
              </h3>
              <p className="mt-4">
                The emotional toll of medical cycles, including the rollercoaster of hope and
                anguish.
              </p>
            </div>
            <div className="card">
              <span className="step__num">04</span>
              <h3
                className="mt-4"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Managing multiple losses
              </h3>
              <p className="mt-4">
                Disenfranchised grief, non-finite loss, chronic sorrow, ambiguous loss.
              </p>
            </div>
            <div className="card">
              <span className="step__num">05</span>
              <h3
                className="mt-4"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Guiding and coaching
              </h3>
              <p className="mt-4">
                Psychoeducation around assisted reproductive technologies, informed decision-making,
                treatment fatigue.
              </p>
            </div>
            <div className="card">
              <span className="step__num">06</span>
              <h3
                className="mt-4"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Re-evaluating commitments
              </h3>
              <p className="mt-4">Supporting the move to ending treatment and redefining family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks + Speaking */}
      <section className="section--blush">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "var(--space-16)" }}>
            <div className="reveal stack stack-6">
              <div className="eyebrow-h">
                <span className="eyebrow" style={{ margin: 0 }}>
                  Frameworks I draw on
                </span>
                <h2>Grounded in established theory</h2>
              </div>
              <ul className="leaf-list">
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>My own Wheel of Therapeutic Infertility Processes</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>
                    The Compass of Shame (Nathanson, 1992) applied to fertility impairment
                  </span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Disenfranchised grief (Doka, 2002)</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>
                    Ambiguous loss, chronic sorrow, non-finite loss (Boss, Roos, Harris, 2021)
                  </span>
                </li>
              </ul>
            </div>
            <div className="reveal stack stack-6">
              <div className="eyebrow-h">
                <span className="eyebrow" style={{ margin: 0 }}>
                  Speaking
                </span>
                <h2>Talks, CPD, panels and podcasts</h2>
              </div>
              <div className="prose stack stack-4">
                <p>
                  I am available for keynote talks at conferences on fertility, loss, and
                  reproductive medicine; CPD sessions for NHS and clinic teams; panel work; and
                  podcast guest appearances.
                </p>
                <p>
                  Recent topics include: disenfranchised grief in fertility care, the Compass of
                  Shame in clinical practice, and holding both the medical and the emotional in
                  fertility counselling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="section--parchment" id="enquiry" style={{ scrollMarginTop: "90px" }}>
        <div className="container container--medium">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Get in touch</span>
            <h2>Training &amp; speaking enquiries</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              For training and speaking enquiries, please use the form below or email directly. I
              will respond within three working days.
            </p>
          </div>
          <div
            style={{ position: "relative", maxWidth: "42rem", margin: "0 auto" }}
            className="reveal"
          >
            <FormWithSuccess
              formClassName="form"
              success={
                <>
                  <i className="ph-light ph-check-circle" aria-hidden="true" />
                  <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                    Thank you for your enquiry.
                  </h3>
                  <p style={{ margin: 0 }}>I will respond within three working days.</p>
                </>
              }
            >
              <div className="grid grid-2" style={{ gap: "var(--space-6)" }}>
                <div className="field">
                  <label htmlFor="t-name">
                    Your name <span className="req">(required)</span>
                  </label>
                  <input id="t-name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="t-org">Organisation</label>
                  <input id="t-org" type="text" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="t-email">
                  Email address <span className="req">(required)</span>
                </label>
                <input id="t-email" type="email" required />
              </div>
              <div className="field">
                <label htmlFor="t-type">What are you enquiring about?</label>
                <select id="t-type">
                  <option>CPD training for a team</option>
                  <option>Keynote or conference talk</option>
                  <option>Panel appearance</option>
                  <option>Podcast guest appearance</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="t-msg">A little about your enquiry</label>
                <textarea id="t-msg"></textarea>
              </div>
              <button
                className="btn btn--primary"
                type="submit"
                style={{ alignSelf: "flex-start" }}
              >
                Send enquiry <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </button>
            </FormWithSuccess>
          </div>
        </div>
      </section>
    </>
  );
}
