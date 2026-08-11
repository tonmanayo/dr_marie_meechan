import type { Metadata } from "next";
import { Faq, type FaqEntry } from "@/components/Faq";
import { FormWithSuccess } from "@/components/FormWithSuccess";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact · Dr Marie Meechan, PhD — The Fertility Psychotherapist",
  description:
    "Get in touch with Dr Marie Meechan — fertility psychotherapist, Edinburgh and online. 24-hour response, free 15-minute introductory call, complete confidentiality.",
};

const FAQ: FaqEntry[] = [
  {
    q: "How quickly will you respond to my enquiry?",
    a: (
      <p>
        Within 24 working hours. If you call me directly, we can book your complimentary
        consultation right away.
      </p>
    ),
  },
  {
    q: "Will I need to explain everything in my first message, or can I just say I'm interested?",
    a: (
      <p>
        Either is good for me. Some people share their full story upfront — it gives me helpful
        context. Others prefer to simply say they are interested, and we explore everything in our
        first conversation. I am ready to meet you wherever you are.
      </p>
    ),
  },
  {
    q: "Is there a free initial consultation or introductory call?",
    a: (
      <p>
        Yes. I offer a complimentary call of around 15 to 20 minutes. It is a chance for us to
        connect and see if we are a good fit — judgement-free, with no pressure whatsoever to move
        forward.
      </p>
    ),
  },
  {
    q: "What if I contact you and then decide I'm not ready — is that okay?",
    a: (
      <p>
        Absolutely. My door will be open whenever you are ready to take that next step. No pressure,
        no judgement.
      </p>
    ),
  },
  {
    q: "Is my enquiry confidential even before I become a client?",
    a: (
      <p>
        Yes. Everything you share with me, even before you become a client, is completely
        confidential and protected. Your privacy matters from the very first message.
      </p>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section--hero section--parchment">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal" style={{ margin: 0 }}>
            Contact
          </span>
          <h1 className="reveal">I would love to hear from you</h1>
          <div
            className="prose stack stack-4 reveal"
            style={{ maxWidth: "40rem", alignItems: "center" }}
          >
            <p style={{ margin: "0 auto" }}>
              Reaching out takes courage and you have just taken that step.
            </p>
            <p style={{ margin: "0 auto" }}>
              You are not alone. I respond to all enquiries within 24 hours, and everything you
              share with me is completely confidential, from the very first message.
            </p>
          </div>
        </div>
      </section>

      {/* Two options */}
      <section className="section--blush section--tight">
        <div className="container">
          <div className="option-grid reveal">
            <a
              className="card card--link"
              href="#message"
              style={{ background: "var(--color-bg)" }}
            >
              <div className="icon-badge">
                <i className="ph-light ph-chat-circle-text" aria-hidden="true" />
              </div>
              <span className="eyebrow">Option one</span>
              <h3 className="mt-4">Send a message</h3>
              <p className="mt-4">
                A simple form. Tell me as much, or as little, as you would like.
              </p>
              <span className="arrow-link mt-6">
                Write to Marie <i className="ph-light ph-arrow-down" aria-hidden="true" />
              </span>
            </a>
            <div className="card" style={{ background: "var(--color-bg)" }}>
              <div className="icon-badge">
                <i className="ph-light ph-phone" aria-hidden="true" />
              </div>
              <span className="eyebrow">Option two</span>
              <h3 className="mt-4">Call</h3>
              <p className="mt-4">Available during weekday hours. Tap to call me directly.</p>
              <a className="arrow-link mt-6" href="tel:+447852813610">
                +44 7852 813610 <i className="ph-light ph-phone-call" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form + what happens next */}
      <section className="section--parchment" id="message" style={{ scrollMarginTop: "90px" }}>
        <div className="container split" style={{ alignItems: "flex-start" }}>
          <div className="reveal">
            <span className="eyebrow">Send a message</span>
            <h2 className="mt-4" style={{ marginBottom: "var(--space-8)" }}>
              Tell me as much, or as little, as you would like
            </h2>
            <FormWithSuccess
              formClassName="form"
              netlifyForm="contact"
              success={
                <>
                  <i className="ph-light ph-check-circle" aria-hidden="true" />
                  <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                    Thank you. Your message is here.
                  </h3>
                  <p style={{ margin: 0 }}>
                    I respond to all enquiries within 24 hours. Take gentle care of yourself in the
                    meantime.
                  </p>
                </>
              }
            >
              <div className="field">
                <label htmlFor="c-name">
                  Your name <span className="req">(required)</span>
                </label>
                <input id="c-name" name="name" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="c-email">
                  Email address <span className="req">(required)</span>
                </label>
                <input id="c-email" name="email" type="email" required />
              </div>
              <div className="field">
                <label htmlFor="c-format">How would you like to meet?</label>
                <select id="c-format" name="format">
                  <option>I&rsquo;m not sure yet</option>
                  <option>In person — Edinburgh</option>
                  <option>Online — worldwide</option>
                  <option>Walk-and-talk — Edinburgh</option>
                  <option>Free introductory call first</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-msg">What brings you here</label>
                <textarea
                  id="c-msg"
                  name="message"
                  placeholder="There is no script. Say as much or as little as feels right."
                ></textarea>
                <span className="hint">
                  You do not need to explain everything. &ldquo;I&rsquo;m interested&rdquo; is
                  enough.
                </span>
              </div>
              <button
                className="btn btn--primary"
                type="submit"
                style={{ alignSelf: "flex-start" }}
              >
                Send message <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </button>
              <p className="form-note">
                Everything you share is confidential, from the very first message.
              </p>
            </FormWithSuccess>
          </div>

          <div className="stack stack-8 reveal">
            <div>
              <span className="eyebrow">What happens next</span>
              <div className="steps mt-8">
                <div className="step">
                  <span className="step__num">01</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                      We connect
                    </h3>
                    <p className="mt-4" style={{ maxWidth: "none" }}>
                      Whether we have a complimentary 15-to-20 minute call first or dive straight
                      into a first session, we will explore your goals, your hopes, and where you
                      are right now.
                    </p>
                  </div>
                </div>
                <div className="step">
                  <span className="step__num">02</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                      We make a plan
                    </h3>
                    <p className="mt-4" style={{ maxWidth: "none" }}>
                      From there, we will create a plan that honours your unique journey with no
                      pressure to decide anything today.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card card--blush"
              style={{ padding: "var(--space-12)", marginTop: "var(--space-8)" }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "1.7rem",
                  lineHeight: 1.2,
                  color: "var(--color-ink)",
                  margin: 0,
                }}
              >
                Where to find me
              </h3>
              <address className="mt-4" style={{ fontStyle: "normal", lineHeight: 1.8 }}>
                The Fertility Psychotherapist
                <br />
                37 Mayfield Gardens
                <br />
                Edinburgh EH9 2BX
                <br />
                United Kingdom
              </address>
              <p
                className="mt-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--color-ink)",
                }}
              >
                <i
                  className="ph-light ph-globe-simple"
                  aria-hidden="true"
                  style={{ color: "var(--color-rose)" }}
                />{" "}
                Online sessions worldwide
              </p>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--color-ink)",
                }}
              >
                <i
                  className="ph-light ph-envelope-simple"
                  aria-hidden="true"
                  style={{ color: "var(--color-rose)" }}
                />{" "}
                <a className="link" href="mailto:hello@drmariemeechan.co.uk">
                  hello@drmariemeechan.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section--blush">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Frequently asked</span>
            <h2>Before you reach out</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>
    </>
  );
}
