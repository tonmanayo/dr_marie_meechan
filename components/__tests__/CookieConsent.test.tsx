import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieConsent, OPEN_COOKIE_SETTINGS } from "../CookieConsent";

function clearConsentCookie() {
  document.cookie = "dmm_analytics_consent=; max-age=0; path=/";
}

describe("CookieConsent", () => {
  beforeEach(() => {
    clearConsentCookie();
  });

  it("shows the banner when no choice has been made", async () => {
    render(<CookieConsent />);
    expect(await screen.findByRole("dialog", { name: /cookie consent/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decline" })).toBeInTheDocument();
  });

  it("Accept stores consent and hides the banner", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(await screen.findByRole("button", { name: "Accept" }));
    expect(document.cookie).toContain("dmm_analytics_consent=granted");
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: /cookie consent/i })).not.toBeInTheDocument(),
    );
  });

  it("Decline stores a denied choice", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(await screen.findByRole("button", { name: "Decline" }));
    expect(document.cookie).toContain("dmm_analytics_consent=denied");
  });

  it("does not show the banner when a choice already exists", async () => {
    document.cookie = "dmm_analytics_consent=granted; path=/";
    render(<CookieConsent />);
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /cookie consent/i })).not.toBeInTheDocument();
    });
  });

  it("reopens the banner when the settings event fires", async () => {
    document.cookie = "dmm_analytics_consent=denied; path=/";
    render(<CookieConsent />);
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: /cookie consent/i })).not.toBeInTheDocument(),
    );
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
    expect(await screen.findByRole("dialog", { name: /cookie consent/i })).toBeInTheDocument();
  });
});
