import Link from "next/link";

export function NotFoundContent() {
  return (
    <section className="section--hero section--parchment">
      <div
        className="container container--medium center stack stack-6"
        style={{ alignItems: "center" }}
      >
        <span className="eyebrow">Page not found</span>
        <h1>This page seems to have wandered off</h1>
        <p className="lead" style={{ maxWidth: "34rem" }}>
          The page you were looking for isn&rsquo;t here. Let&rsquo;s get you back to safe ground.
        </p>
        <div className="cta-row cta-row--center">
          <Link className="btn btn--primary" href="/">
            Return home <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
          <Link className="link" href="/contact" style={{ fontSize: "1rem" }}>
            Or get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
