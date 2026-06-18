import Link from "next/link";
import { RotatingTagline } from "@/components/RotatingTagline";
import { TestimonialRotator, type Testimonial } from "@/components/TestimonialRotator";
import { Faq, type FaqEntry } from "@/components/Faq";
import { FormWithSuccess } from "@/components/FormWithSuccess";

export const metadata = {
  title: "Dr Marie Meechan, PhD · The Fertility Psychotherapist — Edinburgh & worldwide online",
  description:
    "Specialist online fertility counselling and coaching with Dr Marie Meechan, PhD. Edinburgh-based, supporting you worldwide through every season of your fertility journey.",
};

const TAGLINE = [
  "A space to know that you are not alone.",
  "A space to honour grief.",
  "A space to find hope.",
  "A space to make meaning of your experiences.",
  "A space to walk forward toward your goals and your dreams.",
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I came to Marie when I was at the end of my tether with fertility challenges. The way she guided me through every hurdle transformed everything. I'm now the mother of a healthy baby girl and am pregnant again — this time without IVF. Her door really is always open.",
    cite: "Female client · Edinburgh",
    big: true,
  },
  {
    quote:
      "Marie made me feel truly seen. She's the first therapist who just got infertility language. I didn't need to spell it out.",
    cite: "Female client · after loss",
  },
  {
    quote: "Marie was the first person who asked how I was doing. Not how my wife was. How I was.",
    cite: "The partner · Edinburgh",
  },
];

const FAQ: FaqEntry[] = [
  {
    q: "What is fertility counselling — and is it the same as therapy?",
    a: (
      <p>
        Fertility counselling is therapy with a specialism. It holds the emotional weight of your
        fertility journey — the grief, the anxiety, the identity questions — alongside the medical
        and practical decisions you may be facing. I will also coach you through specific parts of
        the journey when that is what you need. Together, we work through whatever is in your way
        and build a path forward that feels like yours.
      </p>
    ),
  },
  {
    q: "Do I have to have had IVF or fertility treatment to come and see you?",
    a: (
      <p>
        No. I will meet you wherever you are on your fertility journey, whether it has involved
        medical intervention or not.
      </p>
    ),
  },
  {
    q: "I'm not sure I'm “bad enough” to need counselling. Is that normal?",
    a: (
      <p>
        Counselling is never about being bad enough, having tried hard enough, or having suffered
        enough. There is no threshold. If you are managing fertility impairment, you are most likely
        carrying unresolved grief, anxiety, shame, or simply the weight of needing to be met. You do
        not need to be in crisis to benefit from this work.
      </p>
    ),
  },
  {
    q: "Do you work with men and couples, or just women?",
    a: (
      <p>
        I work with women, men, and couples of all kinds — heterosexual, same-sex, lesbian, gay. I
        also support trans and asexual individuals, and anyone navigating fertility impairment in
        any form.
      </p>
    ),
  },
  {
    q: "Where are you based, and do you offer online sessions?",
    a: (
      <p>
        I am based in Edinburgh. I offer in-person sessions, walk-and-talk sessions across the city,
        and online sessions worldwide.
      </p>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section--hero section--parchment">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <p className="hero-kicker eyebrow" style={{ marginBottom: 0 }}>
              Dr Marie Meechan, PhD · The Fertility Psychotherapist
            </p>
            <RotatingTagline lines={TAGLINE} />
            <div className="stack stack-4">
              <p
                className="lead"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.3rem,2vw,1.6rem)",
                  lineHeight: 1.4,
                }}
              >
                You are in the right place. I see you. I hear you. You are held.
              </p>
              <p>
                Whatever season of your fertility journey you have arrived in, trying, treating,
                grieving, mothering, or rebuilding without children, you do not have to explain
                yourself first.
              </p>
            </div>
            <div className="cta-row">
              <Link className="btn btn--primary" href="/contact">
                Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </Link>
              <Link className="btn btn--secondary" href="/about">
                Meet Marie
              </Link>
            </div>
            <p
              className="small"
              style={{
                color: "var(--color-rose)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              <i className="ph-light ph-phone-call" aria-hidden="true" /> Begins with a free 15–20
              minute introductory call
            </p>
          </div>
          <figure className="media media--hero media--portrait reveal" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/marie-hero.jpg"
              alt="Dr Marie Meechan standing in a softly lit, wood-panelled room, holding a cup of coffee and smiling gently."
            />
          </figure>
        </div>
      </section>

      {/* Section one */}
      <section className="section--parchment">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0 }}>
                What makes this different
              </span>
              <h2>I speak the language of fertility impairment</h2>
            </div>
            <div className="prose stack stack-4">
              <p>
                I spent twelve years living with unexplained infertility. I know the silence. I know
                the shame. I know the strange, invisible grief of a future you can feel slipping but
                cannot name.
              </p>
              <p>
                I also have a PhD in Counselling Studies on Fertility Impairment from the University
                of Edinburgh, where I spent years researching the very thing I had lived through. So
                when you sit across from me, you are not having to translate. You are not starting
                from the beginning. I understand it from the inside, and I have the research to hold
                it.
              </p>
              <p>
                That is what specialist fertility psychotherapy means to me. Not a sub-speciality.
                Not an add-on. A practice built entirely around the people the rest of the system
                tends to overlook.
              </p>
            </div>
            <Link className="arrow-link" href="/about">
              Meet Marie <i className="ph-light ph-arrow-right" aria-hidden="true" />
            </Link>
          </div>
          <figure className="media media--portrait reveal" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/marie-writing.jpg"
              alt="Dr Marie Meechan sitting in a warm leather armchair, writing in a notebook beside a softly glowing lamp and palm."
            />
          </figure>
        </div>
      </section>

      {/* Section two */}
      <section className="section--blush">
        <div className="container split">
          <figure className="media media--portrait reveal" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/marie-cafe-books.jpg"
              alt="Dr Marie Meechan at a marble cafe table with a cappuccino and a stack of her fertility and grief research books."
            />
          </figure>
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0 }}>
                How I work
              </span>
              <h2>My approach is integrative</h2>
            </div>
            <div className="prose stack stack-4">
              <p>
                In the emotional work, I follow your lead, gently, at your pace, with no agenda but
                yours. When we are navigating the practical, the medical, the decision-points, I
                move closer to coaching: directive when it helps, alongside you when it
                doesn&apos;t.
              </p>
              <p>
                You are held throughout. You will leave each session with something to take with
                you, a breathing technique, a journaling prompt, a reframed thought, an affirmation.
                You will not leave empty-handed.
              </p>
            </div>
            <Link className="arrow-link" href="/sessions">
              Read more about how sessions work{" "}
              <i className="ph-light ph-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section three */}
      <section className="section--parchment">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Who I work with</span>
            <h2>Wherever you are now, there is a place here for you</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              I work with women, men, and couples of all kinds — heterosexual, same-sex, lesbian,
              gay. I support trans and asexual individuals, and anyone navigating fertility
              impairment in any form.
            </p>
          </div>
          <div className="chooser reveal">
            <Link className="chooser__card chooser__card--blush" href="/your-journey">
              <span className="eyebrow" style={{ margin: 0 }}>
                For the season of
              </span>
              <h3>Navigating &amp; honouring your unique journey</h3>
              <p style={{ margin: 0 }}>
                For trying, treating, deciding, grieving and the losses that often go unseen.
              </p>
              <span className="arrow-link" style={{ marginTop: "8px" }}>
                Explore <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </span>
            </Link>
            <Link className="chooser__card chooser__card--horizon" href="/becoming-belonging">
              <span className="eyebrow" style={{ margin: 0 }}>
                For the season after
              </span>
              <h3>Becoming &amp; belonging</h3>
              <p style={{ margin: 0 }}>
                Motherhood that still aches or a meaningful life rebuilt without children.
              </p>
              <span className="arrow-link" style={{ marginTop: "8px" }}>
                Explore <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Rotating testimonial */}
      <section className="section--blush">
        <div className="container">
          <TestimonialRotator items={TESTIMONIALS} />
        </div>
      </section>

      {/* CTA */}
      <section className="section--parchment">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal">When you are ready</span>
          <h2 className="reveal" style={{ maxWidth: "30rem" }}>
            It is not easy to reach out. Let us just start by talking.
          </h2>
          <p className="lead reveal" style={{ maxWidth: "34rem" }}>
            A free 15-to-20 minute introductory call. No obligation. No pressure.
          </p>
          <div className="cta-row cta-row--center reveal">
            <Link className="btn btn--primary" href="/contact">
              Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
            </Link>
            <Link className="link" href="/contact" style={{ fontSize: "1rem" }}>
              Or send a message
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section--parchment section--tight">
        <div
          className="container container--medium center stack stack-6"
          style={{ alignItems: "center" }}
        >
          <span className="eyebrow reveal">Letters from Marie</span>
          <h2 className="reveal" style={{ maxWidth: "30rem" }}>
            An occasional letter, for when reading is the gentlest first step
          </h2>
          <p className="lead reveal" style={{ maxWidth: "34rem" }}>
            No schedule. No spam. A few words in your inbox only when I have something I want to
            say.
          </p>
          <div
            className="card reveal"
            style={{ width: "100%", maxWidth: "32rem", textAlign: "left" }}
          >
            <FormWithSuccess
              formClassName="stack stack-4"
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
                <label htmlFor="nl-name">First name</label>
                <input
                  id="nl-name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="What may I call you?"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="nl-email">
                  Email address <span className="req">required</span>
                </label>
                <input
                  id="nl-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="consent">
                <input id="nl-consent" name="consent" type="checkbox" required />
                <label htmlFor="nl-consent">
                  I would like to receive occasional letters from Marie by email, and I agree to the{" "}
                  <a href="#">
                    {/* TODO: privacy page */}
                    privacy promise
                  </a>
                  . You can unsubscribe at any time.
                </label>
              </div>
              <button
                className="btn btn--primary"
                type="submit"
                style={{ alignSelf: "flex-start" }}
              >
                Subscribe to the newsletter{" "}
                <i className="ph-light ph-envelope-simple" aria-hidden="true" />
              </button>
            </FormWithSuccess>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section--blush">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Frequently asked</span>
            <h2>The questions people often arrive with</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>
    </>
  );
}
