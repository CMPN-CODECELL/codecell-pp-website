import CodeOfConduct from "../../views/CodeOfConduct/CodeOfConduct";
import JsonLd from "../../components/Seo/JsonLd";
import { OG_IMAGE, SITE_URL, SITE_ID } from "../../lib/site";

const description =
  "The CodeCell++ VESIT code of conduct: the standards of respectful, inclusive and safe behaviour expected at all CodeCell events, workshops and hackathons.";

export const metadata = {
  title: "Code of Conduct",
  description,
  alternates: { canonical: "/code-of-conduct" },
  openGraph: {
    title: "Code of Conduct | CodeCell++ VESIT",
    description,
    url: "/code-of-conduct",
    images: [OG_IMAGE],
  },
  twitter: { title: "Code of Conduct | CodeCell++ VESIT", description, images: [OG_IMAGE] },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/code-of-conduct#webpage`,
    url: `${SITE_URL}/code-of-conduct`,
    name: "Code of Conduct",
    description,
    isPartOf: { "@id": SITE_ID },
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
        name: "Code of Conduct",
        item: `${SITE_URL}/code-of-conduct`,
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <CodeOfConduct />
    </>
  );
}
