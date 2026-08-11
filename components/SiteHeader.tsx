"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";

const LOGO = "/assets/img/logo-stacked-bold.png";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isCurrent = (href: string) => pathname === href;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const links = NAV.map((n) => (
    <Link
      key={n.key}
      href={n.href}
      className={isCurrent(n.href) ? "is-current" : undefined}
      aria-current={isCurrent(n.href) ? "page" : undefined}
      onClick={() => setOpen(false)}
    >
      {n.label}
    </Link>
  ));

  return (
    <>
      <header className="site-header">
        <div className="container site-header__row">
          <Link
            className="brand"
            href="/"
            aria-label="Dr Marie Meechan, The Fertility Psychotherapist — home"
          >
            <Image
              src={LOGO}
              alt="Dr Marie Meechan, The Fertility Psychotherapist"
              width={1043}
              height={831}
              priority
            />
          </Link>
          <nav className="nav" aria-label="Primary">
            {links}
          </nav>
          <div className="header-actions">
            <Link className="btn btn--primary" href="/contact">
              Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
            </Link>
            <button
              className="burger"
              type="button"
              aria-label="Open menu"
              aria-expanded={open ? "true" : "false"}
              onClick={() => setOpen(true)}
            >
              <i className="ph-light ph-list" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="container mobile-menu__top">
          <Image src={LOGO} alt="" width={1043} height={831} />
          <button
            className="mobile-menu__close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <i className="ph-light ph-x" aria-hidden="true" />
          </button>
        </div>
        <nav className="container" aria-label="Mobile">
          {links}
          <Link className="btn btn--primary" href="/contact" onClick={() => setOpen(false)}>
            Book a session <i className="ph-light ph-arrow-right" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </>
  );
}
