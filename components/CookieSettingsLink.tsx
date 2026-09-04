"use client";

import { OPEN_COOKIE_SETTINGS } from "./CookieConsent";

/** Footer link that reopens the cookie-consent banner so a choice can be changed. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="link"
      style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
    >
      Cookie preferences
    </button>
  );
}
