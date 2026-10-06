import Team from "../../views/Team/Team";
import JsonLd from "../../components/Seo/JsonLd";
import { OG_IMAGE, SITE_URL, ORG_ID, SITE_ID } from "../../lib/site";

const description =
  "Meet the CodeCell++ team at VESIT Mumbai: the core members, heads and volunteers who run CodeCell's hackathons, workshops and coding events.";

export const metadata = {
  title: "Meet the CodeCell++ Team",
  description,
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet the CodeCell++ Team | CodeCell VESIT",
    description,
    url: "/team",
    images: [OG_IMAGE],
  },
  twitter: { title: "Meet the CodeCell++ Team | CodeCell VESIT", description, images: [OG_IMAGE] },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/team#webpage`,
    url: `${SITE_URL}/team`,
    name: "Meet the CodeCell++ Team",
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
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
        name: "Team",
        item: `${SITE_URL}/team`,
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Team />
    </>
  );
}
