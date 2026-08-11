import Image from "next/image";
import Link from "next/link";

const LOGO = "/assets/img/logo-stacked-bold.png";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Image
            src={LOGO}
            alt="Dr Marie Meechan, The Fertility Psychotherapist"
            width={1043}
            height={831}
          />
          <p>Specialist psychotherapy for your whole self — not just your fertility.</p>
        </div>
        <div className="footer-col">
          <span className="eyebrow">Explore</span>
          <Link href="/about">About Marie</Link>
          <Link href="/sessions">How sessions work</Link>
          <Link href="/your-journey">Your journey</Link>
          <Link href="/becoming-belonging">Becoming & belonging</Link>
          <Link href="/letters">Letters from Marie</Link>
        </div>
        <div className="footer-col">
          <span className="eyebrow">Begin</span>
          <Link href="/contact">Send a message</Link>
          <Link href="/contact">Book a session</Link>
          <Link href="/contact">Free introductory call</Link>
        </div>
        <div className="footer-col">
          <span className="eyebrow">Find Marie</span>
          <a href="mailto:hello@drmariemeechan.co.uk">
            <i className="ph-light ph-envelope-simple" aria-hidden="true" />{" "}
            hello@drmariemeechan.co.uk
          </a>
          <a href="https://intherapywithmarie.com">
            <i className="ph-light ph-globe-simple" aria-hidden="true" /> intherapywithmarie.com
          </a>
          <Link href="/contact">
            <i className="ph-light ph-map-pin" aria-hidden="true" /> 37 Mayfield Gardens, Edinburgh
          </Link>
          <span
            className="footer-col"
            style={{
              gap: 4,
              marginTop: 8,
              color: "var(--color-ink)",
              fontSize: ".9rem",
              opacity: 0.85,
            }}
          >
            In person in Edinburgh · Online worldwide
          </span>
        </div>
      </div>
      <div className="container site-footer__fine">
        <span>© 2026 Dr Marie Meechan, PhD · The Fertility Psychotherapist</span>
        <span>Registered member, British Association for Counselling and Psychotherapy (BACP)</span>
        <span style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <Link className="link" href="/privacy-policy">
            Privacy &amp; Cookies
          </Link>
          <Link className="link" href="/terms-of-use">
            Terms of Use
          </Link>
        </span>
      </div>
    </footer>
  );
}
