import Syrus from "../../views/Syrus/Syrus";
import JsonLd from "../../components/Seo/JsonLd";
import SyrusSummary from "../../components/Seo/SyrusSummary";
import { FAQ_DATA } from "../../components/SyrusComponents/Faq/faqData";
import { REGISTER_URL } from "../../components/SyrusComponents/syrusConfig";
import {
  OG_IMAGE,
  SITE_URL,
  ORG_ID,
  SITE_ID,
  ORG_NAME,
  ADDRESS,
} from "../../lib/site";

const description =
  "Syrus 7.0 is the annual hackathon by CodeCell++ VESIT, Mumbai: 9–10 October 2026 at VESIT, Chembur. Two domains (FinTech and Sustainability), teams of 2–4, free entry, workshops, mentors and prizes.";

export const metadata = {
  title: "Syrus 7.0 Hackathon – VESIT Mumbai (9–10 Oct 2026)",
  description,
  keywords: [
    "Syrus",
    "Syrus 7.0",
    "Syrus hackathon",
    "Syrus VESIT",
    "Syrus 7.0 VESIT",
    "VESIT hackathon",
    "CodeCell hackathon",
    "hackathon Mumbai 2026",
    "FinTech hackathon",
    "Sustainability hackathon",
    "CodeCell VESIT",
  ],
  alternates: { canonical: "/syrus" },
  openGraph: {
    title: "Syrus 7.0 Hackathon by CodeCell++ VESIT",
    description,
    url: "/syrus",
    images: [OG_IMAGE],
  },
  twitter: { title: "Syrus 7.0 Hackathon by CodeCell++ VESIT", description, images: [OG_IMAGE] },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_URL}/syrus#event`,
    name: "Syrus 7.0 Hackathon",
    alternateName: ["Syrus", "Syrus 7.0", "Syrus Hackathon VESIT"],
    description,
    url: `${SITE_URL}/syrus`,
    startDate: "2026-10-09",
    endDate: "2026-10-10",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    location: {
      "@type": "Place",
      name: "Vivekanand Education Society's Institute of Technology (VESIT)",
      address: ADDRESS,
    },
    organizer: { "@type": "Organization", "@id": ORG_ID, name: ORG_NAME, url: SITE_URL },
    offers: {
      "@type": "Offer",
      url: REGISTER_URL,
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/syrus#webpage`,
    url: `${SITE_URL}/syrus`,
    name: "Syrus 7.0 Hackathon",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": `${SITE_URL}/syrus#event` },
    inLanguage: "en-IN",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Syrus 7.0",
        item: `${SITE_URL}/syrus`,
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Syrus />
      <SyrusSummary />
    </>
  );
}
