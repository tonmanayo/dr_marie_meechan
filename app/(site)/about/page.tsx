import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq, type FaqEntry } from "@/components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Meet Dr Marie · Dr Marie Meechan, PhD — The Fertility Psychotherapist",
  description:
    "Dr Marie Meechan, PhD: specialist fertility psychotherapist in Edinburgh. Twelve years of lived experience, doctoral research, and a practice built around your whole journey.",
};

const FAQ: FaqEntry[] = [
  {
    q: "Have you personally experienced fertility impairment?",
    a: (
      <p>
        Yes, I have. I lived with unexplained (in)fertility for twelve years. That&rsquo;s not just
        my credential &mdash; it&rsquo;s my compass. It&rsquo;s why I understand the weight of your
        story in a way only lived experience can teach. When you work with me, you&rsquo;re not just
        getting expertise. You&rsquo;re getting someone who knows what it feels like to be where you
        are right now. That understanding shapes everything I do.
      </p>
    ),
  },
  {
    q: "What qualifications do you have, and are you accredited?",
    a: (
      <p>
        I hold a PhD and an MSc in Counselling Studies, both from the University of Edinburgh, with
        a focus on fertility impairment, as well as a Diploma in Counselling and Psychotherapy and
        the COSCA Counselling Certificate. I am a registered member of the British Association for
        Counselling and Psychotherapy (BACP).
      </p>
    ),
  },
  {
    q: "What does your PhD research mean for the way you work with clients?",
    a: (
      <p>
        It means I work with the whole picture. Fertility impairment is not only medical, and not
        only emotional &mdash; it is both, layered together, and my research showed me how to hold
        both at once. In practice, that often means helping clients name and mark losses that
        society does not recognise: the embryos that did not implant, the pregnancies that were
        imagined but never came. Naming these losses and giving them their proper grief is one of
        the most healing things we can do together.
      </p>
    ),
  },
  {
    q: "How is fertility counselling different from general counselling or CBT?",
    a: (
      <p>
        General counselling and CBT are valuable, but they are not built for the specific weight of
        fertility impairment &mdash; the medical complexity, the disenfranchised grief, the
        rollercoaster of hope and loss, the shame that society has yet to fully name. As a
        specialist, I bring both clinical training and lived experience to the work, and I stay
        current with the realities of reproductive medicine. You do not have to teach me what an FET
        is, or what it feels like when one fails. We can begin where you actually are.
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section--hero section--parchment">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <span className="eyebrow" style={{ margin: 0 }}>
              About Marie
            </span>
            <h1>Meet Dr Marie</h1>
            <p
              className="lead"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.4rem,2.2vw,1.8rem)",
                lineHeight: 1.35,
                maxWidth: "30rem",
              }}
            >
              I spent twelve years navigating fertility impairment myself. That is why I know this
              support matters.
            </p>
            <div className="cta-row">
              <Link className="btn btn--primary" href="/contact">
                Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </Link>
              <Link className="btn btn--secondary" href="/sessions">
                How sessions work
              </Link>
            </div>
          </div>
          <figure className="media media--hero media--video reveal" style={{ margin: 0 }}>
            {}
            <video
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              playsInline
              preload="metadata"
              poster="/assets/img/marie-armchair.jpg"
              aria-label="A short introduction from Dr Marie Meechan"
            >
              <source src="/assets/img/marie-intro.mp4" type="video/mp4" />
            </video>
          </figure>
        </div>
      </section>

      {/* Why this is my life's work */}
      <section className="section--blush">
        <div className="container container--medium">
          <div className="section-head reveal">
            <span className="eyebrow">Why this is my life&rsquo;s work</span>
            <h2>I became passionate about this work because I lived it</h2>
          </div>
          <div className="prose stack stack-4 reveal" style={{ maxWidth: "42rem" }}>
            <p>
              Twelve years of unexplained (in)fertility. A long stretch of liminal space, of
              confused loss, of disenfranchised grief.
            </p>
            <p>
              It drove me to learn everything I could, so that no one else would have to wait as
              long as I did to be understood. I qualified as a psychotherapist in 2011, completed an
              MSc at the University of Edinburgh in 2021, and a PhD in Counselling Studies in 2025.
              All of it focused on the under-researched intersection of fertility impairment, grief,
              and the therapeutic work that supports people through it.
            </p>
            <p>
              All of that, while running my private practice. Honoured to bring my clients&rsquo;
              stories into my research, and grateful every time one of them said the words I had
              once needed to hear myself: I am not alone anymore.
            </p>
          </div>
        </div>
      </section>

      {/* PhD in plain language + How I work in the room */}
      <section className="section--parchment">
        <div className="container">
          <div className="grid grid-2" style={{ gap: "var(--space-16)" }}>
            <div className="stack stack-4 reveal">
              <span className="eyebrow" style={{ margin: 0 }}>
                My PhD, in plain language
              </span>
              <h2>Both the medical and the emotional, held together</h2>
              <div className="prose stack stack-4">
                <p>
                  My doctoral research showed something I already knew from my own life: fertility
                  counselling must hold both the medical and the emotional. The shame, the grief,
                  the loss of hope, the courage it takes to rebuild hope again after each loss, all
                  of it is part of the journey, and none of it is well served by a purely medical
                  approach.
                </p>
                <p>
                  What that means for you, sitting opposite me: I am trained to walk you through
                  both. I speak the language of fertility impairment, fluently. I will not judge you
                  when you describe the loss of an embryo, the silence of a failed transfer, or the
                  confusing grief of a pregnancy that was never confirmed. I have researched it,
                  written about it, lived it, and held space for many others through it.
                </p>
              </div>
            </div>
            <div className="stack stack-4 reveal">
              <span className="eyebrow" style={{ margin: 0 }}>
                How I work in the room
              </span>
              <h2>Client-centred to feel, a coach to decide</h2>
              <div className="prose stack stack-4">
                <p>
                  I am client-centred in the emotional work, and psychodynamic in my approach,
                  meaning I follow you, help you explore what sits beneath the surface, and support
                  you in making meaning of your experiences.
                </p>
                <p>
                  When the work shifts to practical decisions, IVF, ICSI, surrogacy, adoption, when
                  to pause and when to stop. I become more directive, more of a coach, walking
                  shoulder-to-shoulder with you through the choices. You are held throughout. You
                  receive both the space to feel and the guidance to act.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="section--blush">
        <div className="container split">
          <div className="stack stack-6 reveal">
            <div className="eyebrow-h">
              <span className="eyebrow" style={{ margin: 0 }}>
                Qualifications
              </span>
              <h2>Trained, researched, and accountable</h2>
            </div>
            <ul className="leaf-list">
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>PhD in Counselling Studies &mdash; University of Edinburgh, 2025</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>MSc in Counselling Studies &mdash; University of Edinburgh, 2021</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>Diploma in Counselling and Psychotherapy (DipCouns)</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>COSCA Counselling Certificate</span>
              </li>
              <li>
                <i className="ph-light ph-leaf" aria-hidden="true" />
                <span>
                  Registered member, British Association for Counselling and Psychotherapy (BACP)
                </span>
              </li>
            </ul>
            <div className="notice" style={{ background: "var(--color-bg)" }}>
              <p style={{ maxWidth: "none" }}>
                My BACP membership means I work to a strict code of ethics and ongoing professional
                standards. Protection and reassurance for you, from the very first message.
              </p>
            </div>
            <div className="card card--parchment">
              <span className="eyebrow">Beyond the room</span>
              <p className="mt-4" style={{ maxWidth: "none" }}>
                Alongside my private practice, I give talks to groups and organisations. I write,
                research, and am developing a training programme for fellow counsellors and
                healthcare professionals working with fertility impairment.
              </p>
              <Link className="arrow-link mt-6" href="/training">
                For professionals - training &amp; speaking - coming soon{" "}
                <i className="ph-light ph-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="stack stack-6 reveal">
            <figure className="media media--portrait" style={{ margin: 0 }}>
              <Image
                src="/assets/img/marie-books-coffee.jpg"
                alt="Dr Marie Meechan reading at a table, a cappuccino resting on a stack of her fertility and grief research books."
                fill
                sizes="(max-width: 64rem) 100vw, 50vw"
              />
            </figure>
          </div>
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
              Dr Marie completely transformed my whole approach to my infertility diagnosis. Her
              integrated style of counselling and coaching helped me understand the emotional and
              psychological pieces I didn&rsquo;t even know were holding me back. She really does
              understand the layers of loss that come with this. She taught me how to mark my losses
              along the way, and brought clarity, meaning and hope, even in the moments it all felt
              hopeless. And she walked forward with me into my new identity with confidence.
            </blockquote>
            <cite>Female client · Edinburgh</cite>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section--blush">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Frequently asked</span>
            <h2>A little more about me and my work</h2>
          </div>
          <Faq items={FAQ} />
          <div className="center mt-12 reveal">
            <Link className="btn btn--primary" href="/contact">
              Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
