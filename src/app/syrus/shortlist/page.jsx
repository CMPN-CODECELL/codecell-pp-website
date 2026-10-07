import Shortlist from "../../../views/Shortlist/Shortlist";
import JsonLd from "../../../components/Seo/JsonLd";
import { loadDay1Shortlist } from "../../../lib/shortlist";
import { SITE_URL, SITE_ID, OG_IMAGE } from "../../../lib/site";

const description =
  "Teams shortlisted for Day 1 of Syrus 7.0, the CodeCell++ VESIT hackathon, listed by problem statement across the FinTech and Sustainability domains.";

export const metadata = {
  title: "Syrus 7.0 Day 1 Shortlisted Teams",
  description,
  alternates: { canonical: "/syrus/shortlist" },
  openGraph: {
    title: "Syrus 7.0 Day 1 Shortlisted Teams | CodeCell++ VESIT",
    description,
    url: "/syrus/shortlist",
    images: [OG_IMAGE],
  },
  twitter: {
    title: "Syrus 7.0 Day 1 Shortlisted Teams | CodeCell++ VESIT",
    description,
    images: [OG_IMAGE],
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/syrus/shortlist#webpage`,
    url: `${SITE_URL}/syrus/shortlist`,
    name: "Syrus 7.0 Day 1 Shortlisted Teams",
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": `${SITE_URL}/syrus#event` },
    inLanguage: "en-IN",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Syrus 7.0", item: `${SITE_URL}/syrus` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Day 1 Shortlist",
        item: `${SITE_URL}/syrus/shortlist`,
      },
    ],
  },
];

export default function Page() {
  const problemStatements = loadDay1Shortlist();
  return (
    <>
      <JsonLd data={schema} />
      <Shortlist problemStatements={problemStatements} />
    </>
  );
}
