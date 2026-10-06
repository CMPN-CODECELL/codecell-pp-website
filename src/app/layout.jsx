import SplashGate from "../components/SplashGate/SplashGate";
import Toasts from "../components/Seo/Toasts";
import JsonLd from "../components/Seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  ORG_NAME,
  ORG_ID,
  SITE_ID,
  ORG_ALTERNATE_NAMES,
  SOCIAL_LINKS,
  ADDRESS,
  OG_IMAGE,
} from "../lib/site";
import "./globalStyles";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040b15",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CodeCell++ VESIT | CodeCell VESIT – Coding Club & Syrus Hackathon",
    template: "%s | CodeCell++ VESIT",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: ORG_NAME, url: SITE_URL }],
  creator: ORG_NAME,
  publisher: ORG_NAME,
  alternates: { canonical: "/" },
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: "CodeCell++ VESIT | CodeCell VESIT – Coding Club & Syrus Hackathon",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCell++ VESIT | CodeCell VESIT",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/codecell-logo.webp" }],
  },
  // Paste the code Google Search Console gives you here (or set the env var):
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization"],
    "@id": ORG_ID,
    name: ORG_NAME,
    alternateName: ORG_ALTERNATE_NAMES,
    url: SITE_URL,
    logo: `${SITE_URL}/codecell-logo.webp`,
    image: `${SITE_URL}/codecell-logo.webp`,
    description: DEFAULT_DESCRIPTION,
    sameAs: SOCIAL_LINKS,
    address: ADDRESS,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Vivekanand Education Society's Institute of Technology (VESIT)",
      alternateName: "VESIT",
      address: ADDRESS,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: ORG_ALTERNATE_NAMES,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Same Google Fonts the old site pulled in through CSS @import. */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Sofia&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Jersey+25&display=swap" />
        <JsonLd data={siteSchema} />
      </head>
      <body suppressHydrationWarning>
        <SplashGate>{children}</SplashGate>
        <Toasts />
      </body>
    </html>
  );
}
