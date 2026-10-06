import Landing from "../views/Landing/Landing";
import JsonLd from "../components/Seo/JsonLd";
import { SITE_URL, SITE_NAME, ORG_ID, SITE_ID } from "../lib/site";

export const metadata = {
  title: {
    absolute:
      "CodeCell++ VESIT | CodeCell VESIT – Coding Club & Syrus Hackathon",
  },
  alternates: { canonical: "/" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "CodeCell++ VESIT – Coding Club of VESIT Mumbai",
  isPartOf: { "@id": SITE_ID },
  about: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

export default function Page() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <Landing />
      {/* Text version of what the page is, for crawlers and screen readers. */}
      <p className="sr-only">
        {SITE_NAME} (also known as CodeCell and CodeCell VESIT) is the coding and
        tech community of the Computer Engineering department at VESIT, Chembur,
        Mumbai. We run the Syrus hackathon, workshops, coding contests and tech
        events for student developers.
      </p>
    </>
  );
}
