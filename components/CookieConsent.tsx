"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

// Google Analytics 4 measurement ID. This is a public, client-side identifier.
const GA_ID = "G-C4YEDHHTE4";
const COOKIE = "dmm_analytics_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Event the footer link dispatches to reopen the banner. */
export const OPEN_COOKIE_SETTINGS = "dmm:open-cookie-settings";
/** Event dispatched when the stored choice changes, so the store re-reads. */
const CONSENT_CHANGED = "dmm:consent-changed";

type Choice = "granted" | "denied";
// "none" = decided nothing yet (client); "unknown" = not yet known (SSR/hydration).
type Snapshot = Choice | "none" | "unknown";

function readConsent(): Choice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(granted|denied)`));
  return match ? (match[1] as Choice) : null;
}

function writeConsent(choice: Choice) {
  document.cookie = `${COOKIE}=${choice}; max-age=${ONE_YEAR}; path=/; SameSite=Lax`;
}

// The stored choice is external client state — read it with useSyncExternalStore
// so there is no setState-in-effect and no hydration mismatch. During SSR and
// the hydration render the snapshot is "unknown", so the banner is never emitted
// server-side (no flash for returning visitors); after hydration the real cookie
// value is read.
function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGED, callback);
  return () => window.removeEventListener(CONSENT_CHANGED, callback);
}
function getSnapshot(): Snapshot {
  return readConsent() ?? "none";
}
function getServerSnapshot(): Snapshot {
  return "unknown";
}

/**
 * Cookie-consent banner + gated Google Analytics.
 *
 * Nothing from Google loads until the visitor explicitly accepts — the strictest
 * reading of UK PECR/GDPR and consistent with the Privacy & Cookies Policy, which
 * promises consent before any tracking. The choice is remembered for a year and
 * can be changed via the "Cookie preferences" link in the footer.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const onReopen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, onReopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, onReopen);
  }, []);

  function choose(choice: Choice) {
    const hadAnalytics = typeof window !== "undefined" && "gtag" in window;
    writeConsent(choice);
    setReopened(false);
    window.dispatchEvent(new Event(CONSENT_CHANGED));
    // If consent is withdrawn after GA has already loaded this session, reload so
    // the analytics scripts are not present at all.
    if (choice === "denied" && hadAnalytics) window.location.reload();
  }

  const showBanner = consent === "none" || reopened;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            id="ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
          <div className="cookie-banner__inner">
            <p className="cookie-banner__text">
              I use a little analytics to understand how this site is used, so I can keep making it
              better. It is entirely your choice, and you can change your mind any time. See the{" "}
              <Link href="/privacy-policy">Privacy &amp; Cookies Policy</Link>.
            </p>
            <div className="cookie-banner__actions">
              <button type="button" className="btn btn--secondary" onClick={() => choose("denied")}>
                Decline
              </button>
              <button type="button" className="btn btn--primary" onClick={() => choose("granted")}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
