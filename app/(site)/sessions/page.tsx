import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq, type FaqEntry } from "@/components/Faq";
import { faqPageLd } from "@/components/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/sessions" },
  title: "How sessions work · Dr Marie Meechan, PhD — The Fertility Psychotherapist",
  description:
    "Online and Edinburgh-based fertility counselling sessions with Dr Marie Meechan, PhD. £90 per session, packages from £499. Free 15-minute introductory call.",
};

const FAQ: FaqEntry[] = [
  {
    q: "How do I know if I am ready to start counselling?",
    a: (
      <p>
        There is no perfect time. You are ready whenever you decide to take the step and I will meet
        you exactly where you are, whenever that is. You do not need to have it figured out. We work
        through the confusion and uncertainty together.
      </p>
    ),
  },
  {
    q: "What if I start sessions and don't feel it is working?",
    a: (
      <p>
        Please tell me. Our work together should feel supportive, and if it is not, we adjust. We
        can change the approach, explore what you need differently, or talk about what is missing.
        Your progress and comfort matter most to me.
      </p>
    ),
  },
  {
    q: "Can I do sessions online if I'm not in Edinburgh?",
    a: (
      <p>
        Yes, wherever you are in the world. If you are in Edinburgh, you can choose between online,
        in-person, or walk-and-talk. Whatever works best for you.
      </p>
    ),
  },
  {
    q: "What is the difference between counselling and coaching, and which do I need?",
    a: (
      <p>
        I work integratively, drawing on both. The counselling helps you explore your feelings and
        make meaning of them. The coaching brings in my expertise on fertility treatments, medical
        interventions, and the different paths to parenting, adoption, surrogacy, donor conception.
        You may need more of one than the other depending on the particular season of your journey,
        and we shape that as we go.
      </p>
    ),
  },
  {
    q: "Is everything I share completely confidential?",
    a: (
      <p>
        Yes. Everything you share stays within our therapeutic relationship. The only exception is
        when I consult with my clinical supervisor for further insight on your care and that
        supervision is itself confidential between us.
      </p>
    ),
  },
  {
    q: "Do you offer evening or weekend sessions?",
    a: (
      <p>
        I work Monday to Friday, with evening availability on Thursdays from 5pm to 9pm if that
        suits your schedule better.
      </p>
    ),
  },
];

export default function SessionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(FAQ)) }}
      />
      {/* Hero */}
      <section className="section--hero section--parchment">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal" style={{ margin: 0 }}>
            Sessions
          </span>
          <h1 className="reveal">How sessions work</h1>
          <p className="lead reveal" style={{ maxWidth: "42rem" }}>
            Whether we meet in my counselling room in Edinburgh, walk side by side, or sit together
            over Zoom, sessions are 60 minutes, gentle, and shaped around you. Here is what to
            expect.
          </p>
        </div>
      </section>

      {/* First session */}
      <section className="section--blush">
        <div className="container split">
          <figure className="media media--portrait reveal" style={{ margin: 0 }}>
            <Image
              src="/assets/img/marie-bench-books.jpg"
              alt="Dr Marie Meechan sitting on a leather bench in a cobalt blazer, smiling warmly, her research on infertility resting beside her."
              fill
              sizes="(max-width: 64rem) 100vw, 50vw"
            />
          </figure>
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0 }}>
                What a first session looks like
              </span>
              <h2>The focus is entirely you</h2>
            </div>
            <div className="prose stack stack-4">
              <p>
                We begin with the essentials, confidentiality and a little housekeeping on how my
                supervision works. Then the focus is entirely you.
              </p>
              <p>
                I will meet you exactly where you are on your journey. I will ask about your hopes,
                your worries, the decisions ahead of you, the ones already behind you. Whether you
                are navigating fertility treatment, recovering from loss, or somewhere else
                entirely, my role is to make sense of where you are right now without imposing a
                framework on top of your experience.
              </p>
              <p>
                The tone is collaborative and gentle. We walk this together, shoulder to shoulder.
                And before you leave, you will have something to take with you, a breathing
                technique, a journaling prompt, a reframed thought, an affirmation we have worked on
                together. You will not leave empty-handed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro call + formats + frequency */}
      <section className="section--parchment">
        <div className="container">
          <div className="grid grid-2 reveal">
            <div className="card">
              <div className="icon-badge">
                <i className="ph-light ph-phone-call" aria-hidden="true" />
              </div>
              <span className="eyebrow">Free introductory call</span>
              <h3 className="mt-4">No pressure to go further</h3>
              <p className="mt-4">
                Before our first full session, you are welcome to a free 15-to-20 minute
                introductory call. A chance for us to connect and see if we are a good fit,
                completely judgement-free. Some people prefer to skip this and go straight to a
                first session. Either is great by me.
              </p>
            </div>
            <div className="card">
              <div className="icon-badge">
                <i className="ph-light ph-map-pin" aria-hidden="true" />
              </div>
              <span className="eyebrow">In person - Edinburgh</span>
              <h3 className="mt-4">A held, dedicated space</h3>
              <p className="mt-4">
                A space away from home best for people who want clear separation between this work
                and the rest of their week.{" "}
              </p>
            </div>
            <div className="card">
              <div className="icon-badge">
                <i className="ph-light ph-person-simple-walk" aria-hidden="true" />
              </div>
              <span className="eyebrow">Walk and talk - Edinburgh</span>
              <h3 className="mt-4">Side by side, in the open air</h3>
              <p className="mt-4">
                For those who find it easier to open up while moving. We walk a quiet route
                together, shoulder to shoulder, letting the conversation unfold at its own pace.
                Weather permitting, and always optional.
              </p>
            </div>
            <div className="card">
              <div className="icon-badge">
                <i className="ph-light ph-monitor" aria-hidden="true" />
              </div>
              <span className="eyebrow">Online - worldwide</span>
              <h3 className="mt-4">Wherever you are</h3>
              <p className="mt-4">
                Secure video sessions, anywhere in the world, across time zones. Best for people
                outside Edinburgh, or anyone who feels more comfortable with a screen between us.
              </p>
            </div>
          </div>
          <div
            className="notice reveal mt-12"
            style={{ display: "flex", gap: "var(--space-6)", alignItems: "flex-start" }}
          >
            <i
              className="ph-light ph-calendar-heart"
              aria-hidden="true"
              style={{ fontSize: "32px", color: "var(--color-accent)", flexShrink: 0 }}
            />
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                Session frequency
              </h3>
              <p className="mt-4" style={{ maxWidth: "none" }}>
                Weekly is the rhythm I usually recommend. It gives the work continuity and lets us
                go deeper. Fortnightly works for some seasons too. Most clients begin with a
                6-session or 12-session package, and we reassess together along the way. You are
                never locked in. We adjust based on what is serving you best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="section--blush">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">What is the cost?</span>
            <h2>Fees &amp; Packages</h2>
          </div>
          <div className="grid grid-2 reveal" style={{ maxWidth: "60rem", margin: "0 auto" }}>
            <div className="fee-card">
              <span className="eyebrow">Individual</span>
              <div className="fee-card__price mt-4">
                <span className="amt">£90</span> <span className="per">/ 60 minutes</span>
              </div>
              <div className="mt-8">
                <div className="fee-line">
                  <span>6-session package</span>
                  <span>
                    <strong
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontSize: "1.4rem",
                      }}
                    >
                      £499
                    </strong>{" "}
                    <span className="save">save £41</span>
                  </span>
                </div>
                <div className="fee-line">
                  <span>12-session package</span>
                  <span>
                    <strong
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontSize: "1.4rem",
                      }}
                    >
                      £899
                    </strong>{" "}
                    <span className="save">save £181</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="fee-card">
              <span className="eyebrow">Couples</span>
              <div className="fee-card__price mt-4">
                <span className="amt">£110</span> <span className="per">/ 60 minutes</span>
              </div>
              <div className="mt-8">
                <div className="fee-line">
                  <span>6-session package</span>
                  <span>
                    <strong
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontSize: "1.4rem",
                      }}
                    >
                      £599
                    </strong>{" "}
                    <span className="save">save £61</span>
                  </span>
                </div>
                <div className="fee-line">
                  <span>12-session package</span>
                  <span>
                    <strong
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontSize: "1.4rem",
                      }}
                    >
                      £950
                    </strong>{" "}
                    <span className="save">save £370</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="reveal"
            style={{ maxWidth: "48rem", margin: "var(--space-12) auto 0", textAlign: "center" }}
          >
            <p style={{ margin: "0 auto" }}>
              If you do not complete a package, the remaining balance is refunded in full. No
              questions, no fuss.
            </p>
            <p
              style={{
                margin: "var(--space-4) auto 0",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.3rem",
                color: "var(--color-ink)",
              }}
            >
              And if cost is the barrier between you and starting, please ask. I would rather work
              something out with you than have you turn away.
            </p>
          </div>
        </div>
      </section>

      {/* Between sessions + couples */}
      <section className="section--parchment">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "var(--space-12)" }}>
            <div className="card card--blush reveal">
              <div className="icon-badge">
                <i className="ph-light ph-chat-circle-dots" aria-hidden="true" />
              </div>
              <span className="eyebrow">Between sessions</span>
              <h3 className="mt-4">You are not alone between sessions either</h3>
              <p className="mt-4" style={{ maxWidth: "none" }}>
                I am reachable on email or WhatsApp for the moments that arise, within reason, and
                with care for both of us. Continuity is built into how I work.
              </p>
            </div>
            <div className="card card--blush reveal">
              <div className="icon-badge">
                <i className="ph-light ph-hand-heart" aria-hidden="true" />
              </div>
              <span className="eyebrow">Couples sessions</span>
              <h3 className="mt-4">The same 60 minutes, the focus shared</h3>
              <p className="mt-4" style={{ maxWidth: "none" }}>
                We explore things as a couple, move between each of your perspectives, and make sure
                you both get what you need. Which might mean equal time, or one of you needing more
                focus depending on what comes up that day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who I work with */}
      <section className="section--blush">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Who I work with</span>
            <h2>Whoever you are, whatever you are navigating</h2>
          </div>
          <div className="grid grid-2" style={{ gap: "var(--space-16)" }}>
            <div className="reveal">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  marginBottom: "var(--space-6)",
                }}
              >
                Whoever you are
              </h3>
              <ul className="leaf-list">
                <li>
                  <i
                    className="ph-light ph-leaf"
                    aria-hidden="true"
                    style={{ color: "rgb(196, 123, 90)" }}
                  />
                  <span>Women, men, couples - heterosexual, same-sex, lesbian, gay</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Trans and asexual individuals</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Anyone navigating fertility impairment, in any form</span>
                </li>
              </ul>
            </div>
            <div className="reveal">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  marginBottom: "var(--space-6)",
                }}
              >
                Whatever you are navigating
              </h3>
              <ul className="leaf-list">
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Unexplained infertility, secondary infertility, age-related concerns</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>
                    IUI, IVF, ICSI and the emotional weight of cycles, cancellations, failed
                    transfers
                  </span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>
                    Endometriosis, PCOS, male factor, recurrent miscarriage, recurrent pregnancy
                    loss
                  </span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Donor gametes, donor conception, surrogacy, adoption</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Fertility preservation before chemotherapy or other medical treatment</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Faith and religious questions around reproductive medicine</span>
                </li>
                <li>
                  <i className="ph-light ph-leaf" aria-hidden="true" />
                  <span>Identity shifts, including involuntary childlessness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section--parchment">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Frequently asked</span>
            <h2>Before you begin</h2>
          </div>
          <Faq items={FAQ} />
          <div className="center mt-12 reveal">
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
