import timelineEvents from "../../assets/data/timelineEvents";
import tracks from "../../assets/data/tracks";
import { FAQ_DATA } from "../SyrusComponents/Faq/faqData";

// A plain-text copy of the key Syrus 7.0 facts for search engines and screen
// readers. Parts of the animated page (the timeline, the closed FAQ answers) only
// fill in after JavaScript runs, so this makes sure the same information is in the
// page HTML itself. It is generated from the same data the visible sections use.
export default function SyrusSummary() {
  return (
    <section className="sr-only" aria-label="Syrus 7.0 at a glance">
      <h2>Syrus 7.0 – the CodeCell++ VESIT hackathon</h2>
      <p>
        Syrus 7.0 is the annual hackathon organised by CodeCell++ (CodeCell VESIT)
        at Vivekanand Education Society&apos;s Institute of Technology, Chembur,
        Mumbai, on 9–10 October 2026. Teams of 2–4 build projects across two
        domains, FinTech and Sustainability. Entry is free for VESIT students.
      </p>
      <h2>Syrus 7.0 timeline</h2>
      <ol>
        {timelineEvents.map((e) => (
          <li key={e.title + e.date}>
            {e.date}
            {e.time ? `, ${e.time}` : ""}: {e.title}. {e.description}
          </li>
        ))}
      </ol>
      <h2>Syrus 7.0 domains</h2>
      <ul>
        {tracks.map((t) => (
          <li key={t.id}>
            {t.title}: {t.description}
          </li>
        ))}
      </ul>
      <h2>Syrus 7.0 frequently asked questions</h2>
      <dl>
        {FAQ_DATA.map((f) => (
          <div key={f.question}>
            <dt>{f.question}</dt>
            <dd>{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
