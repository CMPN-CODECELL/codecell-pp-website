// Single place for the site's public details. Change SITE_URL (or set
// NEXT_PUBLIC_SITE_URL) when the domain changes; everything else follows.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://codecell-pp-cmpn.vesit.ves.ac.in"
).replace(/\/$/, "");

export const SITE_NAME = "CodeCell++ VESIT";

export const ORG_NAME = "CodeCell++ VESIT";
export const ORG_ALTERNATE_NAMES = [
  "CodeCell",
  "CodeCell++",
  "CodeCell VESIT",
  "CodeCell VESIT Mumbai",
  "VESIT CodeCell",
  "VESIT CodeCell++",
  "Vesit Tinkers CodeCell",
];

export const SOCIAL_LINKS = [
  "https://www.linkedin.com/company/vesit-tinkers-codecell-computer-department",
  "https://www.instagram.com/codecell_vesit/",
  "https://github.com/CMPN-CODECELL",
  "https://discord.com/invite/muCduvJMFQ",
];

export const DEFAULT_DESCRIPTION =
  "CodeCell++ (CodeCell VESIT) is the coding and tech community of the Computer Engineering department at Vivekanand Education Society's Institute of Technology (VESIT), Chembur, Mumbai. Join Syrus hackathons, workshops, and coding events.";

export const KEYWORDS = [
  "CodeCell",
  "CodeCell VESIT",
  "CodeCell++",
  "CodeCell++ VESIT",
  "CodeCell VESIT Mumbai",
  "VESIT CodeCell",
  "VESIT coding club",
  "VESIT hackathon",
  "Syrus hackathon",
  "Syrus 7.0",
  "VESIT Computer Engineering",
  "VESIT Tinkers",
  "coding club Mumbai",
  "hackathon Mumbai",
  "student developer community",
  "tech events VESIT",
  "coding workshops",
];

export const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Hashu Adwani Memorial Complex, Collector's Colony",
  addressLocality: "Chembur, Mumbai",
  addressRegion: "Maharashtra",
  postalCode: "400074",
  addressCountry: "IN",
};

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

// Preview image for link shares (WhatsApp, LinkedIn, X, Google Discover).
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "CodeCell++ VESIT – coding club of VESIT Mumbai and the Syrus 7.0 hackathon",
};
