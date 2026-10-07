"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Starfield from "../../components/SyrusComponents/Starfield/Starfield";
import SyrusFooter from "../../components/SyrusComponents/SyrusFooter/SyrusFooter";
import SyrusScrollToTop from "../../components/SyrusComponents/SyrusScrollToTop/SyrusScrollToTop";
import "../Syrus/Syrus.css";
import styles from "./Shortlist.module.css";

const DOMAINS = ["Fintech", "Sustainability"];

export default function Shortlist({ problemStatements }) {
  const [activeId, setActiveId] = useState(problemStatements[0].id);
  const tabRefs = useRef({});

  // Open the tab named in the URL hash (#fintech-ps-4) so a PS can be linked directly.
  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (problemStatements.some((p) => p.id === fromHash)) setActiveId(fromHash);
  }, [problemStatements]);

  const select = (id) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const onKeyDown = (e) => {
    const i = problemStatements.findIndex((p) => p.id === activeId);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % problemStatements.length;
    if (e.key === "ArrowLeft") next = (i - 1 + problemStatements.length) % problemStatements.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = problemStatements.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = problemStatements[next].id;
    select(id);
    tabRefs.current[id]?.focus();
  };

  // Keep the selected tab visible in the scrollable tab strip on small screens.
  useEffect(() => {
    tabRefs.current[activeId]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeId]);

  const active = problemStatements.find((p) => p.id === activeId);
  const published = active.teams !== null;

  return (
    <div className="syrus-page">
      <Starfield />

      <header className={styles.bar}>
        <Link href="/syrus" className={styles.logo} aria-label="Back to Syrus 7.0">
          syrus
        </Link>
        <Link href="/syrus" className={styles.back}>
          <span aria-hidden="true">&larr;</span> Back to Syrus
        </Link>
      </header>

      <main className={`syrus-container ${styles.main}`}>
        <section className={styles.head}>
          <p className={styles.eyebrow}>Day 1 &middot; Syrus 7.0</p>
          <h1 className={styles.title}>shortlisted teams</h1>
          <span className={styles.rule} aria-hidden="true" />
        </section>

        <div className={styles.tabsWrap}>
          {DOMAINS.map((domain) => (
            <div key={domain} className={styles.group}>
              <span className={styles.groupLabel}>{domain}</span>
              <div
                className={styles.tabs}
                role="tablist"
                aria-label={`${domain} problem statements`}
                onKeyDown={onKeyDown}
              >
                {problemStatements
                  .filter((p) => p.domain === domain)
                  .map((p) => {
                    const selected = p.id === activeId;
                    return (
                      <button
                        key={p.id}
                        ref={(el) => {
                          tabRefs.current[p.id] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`tab-${p.id}`}
                        aria-selected={selected}
                        aria-controls="shortlist-panel"
                        tabIndex={selected ? 0 : -1}
                        className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                        onClick={() => select(p.id)}
                      >
                        {p.short}
                        {p.teams === null && (
                          <span className={styles.soon} title="Coming soon" aria-label="coming soon" />
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <section
          id="shortlist-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className={`syrus-panel ${styles.panel}`}
        >
          <div className={styles.panelHead}>
            <h2 className={styles.psTitle}>{active.title}</h2>
            {published && (
              <span className={styles.count}>
                {active.teams.length} {active.teams.length === 1 ? "team" : "teams"}
              </span>
            )}
          </div>

          {!published && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Shortlist coming soon</p>
              <p className={styles.emptyText}>
                The shortlisted teams for {active.title} will be announced here shortly. Check
                back in a little while.
              </p>
            </div>
          )}

          {published && active.teams.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No teams listed</p>
              <p className={styles.emptyText}>No teams have been listed for this problem statement.</p>
            </div>
          )}

          {published && active.teams.length > 0 && (
            <>
              <ol className={styles.list}>
                {active.teams.map((t, i) => (
                  <li key={`${t.team}-${i}`} className={styles.row}>
                    <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.team}>{t.team}</span>
                    <span className={styles.leader}>
                      <span className={styles.leaderTag}>Leader</span>
                      {t.leader || "\u2014"}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>
      </main>

      <SyrusFooter />
      <SyrusScrollToTop />
    </div>
  );
}
