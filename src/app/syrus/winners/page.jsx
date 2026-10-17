import { notFound } from "next/navigation";
import Winners from "../../../views/Winners/Winners";
import JsonLd from "../../../components/Seo/JsonLd";
import { loadWinners } from "../../../lib/shortlist";
import { WINNERS_PAGE_ENABLED } from "../../../components/SyrusComponents/syrusConfig";
import { SITE_URL, SITE_ID, OG_IMAGE } from "../../../lib/site";

const description =
  "The winning teams of Syrus 7.0, the CodeCell++ VESIT hackathon: 1st, 2nd and 3rd place for every FinTech and Sustainability problem statement.";

const liveMetadata = {
  title: "Syrus 7.0 Winners",
  description,
  alternates: { canonical: "/syrus/winners" },
  openGraph: {
    title: "Syrus 7.0 Winners | CodeCell++ VESIT",
    description,
    url: "/syrus/winners",
    images: [OG_IMAGE],
  },
  twitter: {
    title: "Syrus 7.0 Winners | CodeCell++ VESIT",
    description,
    images: [OG_IMAGE],
  },
};

// While the page is switched off, don't advertise its title/description.
export const metadata = WINNERS_PAGE_ENABLED
  ? liveMetadata
  : { title: "Page not found", robots: { index: false, follow: false } };

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/syrus/winners#webpage`,
    url: `${SITE_URL}/syrus/winners`,
    name: "Syrus 7.0 Winners",
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
      { "@type": "ListItem", position: 3, name: "Winners", item: `${SITE_URL}/syrus/winners` },
    ],
  },
];

export default function Page() {
  // Page is switched off in syrusConfig.js: visitors get the normal 404.
  if (!WINNERS_PAGE_ENABLED) notFound();
  const problemStatements = loadWinners();
  return (
    <>
      <JsonLd data={schema} />
      <noscript>
        <style>{`.syrus-page [data-slot]{opacity:1!important;visibility:visible!important}.syrus-page [data-slot] [data-saber]{transform:none!important}`}</style>
      </noscript>
      <Winners problemStatements={problemStatements} />
    </>
  );
}
