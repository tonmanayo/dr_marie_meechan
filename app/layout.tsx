import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";

const SITE_URL = "https://www.drmariemeechan.co.uk";
const SITE_TITLE =
  "Dr Marie Meechan, PhD · The Fertility Psychotherapist — Edinburgh & worldwide online";
const SITE_DESCRIPTION =
  "Specialist online fertility counselling and coaching with Dr Marie Meechan, PhD. Edinburgh-based, supporting you worldwide through every season of your fertility journey.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Dr Marie Meechan, PhD",
  robots: { index: true, follow: true },
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Dr Marie Meechan, PhD",
    locale: "en_GB",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Site-wide structured data (schema.org) for search engines and AI crawlers.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#practice`,
      name: "Dr Marie Meechan, PhD — The Fertility Psychotherapist",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: "hello@drmariemeechan.co.uk",
      telephone: "+447852813610",
      priceRange: "££",
      address: {
        "@type": "PostalAddress",
        streetAddress: "37 Mayfield Gardens",
        addressLocality: "Edinburgh",
        postalCode: "EH9 2BX",
        addressCountry: "GB",
      },
      areaServed: ["Edinburgh", "United Kingdom", "Online worldwide"],
      founder: { "@id": `${SITE_URL}/#marie` },
      sameAs: ["https://www.drmariemeechan.co.uk"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#marie`,
      name: "Dr Marie Meechan",
      honorificPrefix: "Dr",
      jobTitle: "Fertility Psychotherapist",
      url: `${SITE_URL}/about`,
      worksFor: { "@id": `${SITE_URL}/#practice` },
      hasCredential:
        "PhD in Counselling Studies (University of Edinburgh); Registered member, British Association for Counselling and Psychotherapy (BACP)",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Dr Marie Meechan, PhD",
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <link rel="stylesheet" href="/assets/css/tokens.css" />
        <link rel="stylesheet" href="/assets/css/site.css" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
