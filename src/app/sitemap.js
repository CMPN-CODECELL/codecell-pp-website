import { SITE_URL } from "../lib/site";
import { WINNERS_PAGE_ENABLED } from "../components/SyrusComponents/syrusConfig";

export const dynamic = "force-static";

export default function sitemap() {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/syrus", priority: 0.9, changeFrequency: "weekly" },
    { path: "/syrus/shortlist", priority: 0.8, changeFrequency: "daily" },
    ...(WINNERS_PAGE_ENABLED
      ? [{ path: "/syrus/winners", priority: 0.8, changeFrequency: "daily" }]
      : []),
    { path: "/team", priority: 0.6, changeFrequency: "monthly" },
    { path: "/code-of-conduct", priority: 0.3, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
