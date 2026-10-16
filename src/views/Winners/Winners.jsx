"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Starfield, { starState } from "../../components/SyrusComponents/Starfield/Starfield";
import SyrusFooter from "../../components/SyrusComponents/SyrusFooter/SyrusFooter";
import SyrusScrollToTop from "../../components/SyrusComponents/SyrusScrollToTop/SyrusScrollToTop";
import "../Syrus/Syrus.css";
import base from "../Shortlist/Shortlist.module.css";
import styles from "./Winners.module.css";

const DOMAINS = ["Fintech", "Sustainability"];

const PLACES = {
  1: { label: "Winner" },
  2: { label: "1st Runner-up" },
  3: { label: "2nd Runner-up" },
};

// Announcement timeline (ms from the moment a problem statement is opened).
const T = {
  warpUp: 520,
  warpDown: 680,
  firstReveal: 1900, //   lowest place appears
  step: 1000, //          gap between the other places
  suspense: 1500, //      pause before 1st place
};

/** Length of the longest word in a team name; the card sizes the name so that word always fits. */
const longestWord = (name) => Math.max(6, ...name.split(/\s+/).map((w) => w.length));

const isNarrow = () => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Winners({ problemStatements }) {
  const [activeId, setActiveId] = useState(problemStatements[0].id);
  const [revealed, setRevealed] = useState([]); //  ranks that are on screen
  const [phase, setPhase] = useState("idle"); //     idle | running | done
  const [flash, setFlash] = useState(0); //          bumps to retrigger the white-out
  const tabRefs = useRef({});
  const stageRef = useRef(null);
  const slotRefs = useRef({});
  const timers = useRef([]);
  const warpRaf = useRef(0);
  const played = useRef(new Set());

  const active = problemStatements.find((p) => p.id === activeId);
  const teams = active.teams;
  const announced = teams !== null && teams.length > 0;
  const single = announced && teams.length === 1;

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    cancelAnimationFrame(warpRaf.current);
    starState.warp = 0;
  }, []);

  /** Hyperspace pulse: stars streak up to `peak`, then settle again. */
  const warpPulse = useCallback((peak) => {
    const start = performance.now();
    const total = T.warpUp + T.warpDown;
    const ease = (t) => t * t * (3 - 2 * t);
    const frame = (now) => {
      const el = now - start;
      if (el >= total) {
        starState.warp = 0;
        return;
      }
      starState.warp =
        el < T.warpUp ? peak * ease(el / T.warpUp) : peak * (1 - ease((el - T.warpUp) / T.warpDown));
      warpRaf.current = requestAnimationFrame(frame);
    };
    warpRaf.current = requestAnimationFrame(frame);
  }, []);

  const showAll = useCallback((list) => {
    setRevealed(list.map((t) => t.rank));
    setPhase("done");
  }, []);

  const play = useCallback(
    (ps) => {
      stop();
      const list = ps.teams || [];
      if (!list.length) {
        setRevealed([]);
        setPhase("idle");
        return;
      }
      if (reducedMotion()) {
        showAll(list);
        return;
      }
      setRevealed([]);
      setPhase("running");
      const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

      warpPulse(0.8);
      at(T.warpUp - 80, () => setFlash((n) => n + 1));
      // Bring the podium into view just before the first card appears.
      at(T.firstReveal - 450, () =>
        stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );

      // Lowest place first, 1st place last.
      const order = [...list].reverse();
      let t = T.firstReveal;
      order.forEach((team, i) => {
        const isLast = i === order.length - 1;
        if (isLast && order.length > 1) t += T.suspense - T.step;
        const when = t;
        at(when, () => {
          setRevealed((r) => [...r, team.rank]);
          // Cards are stacked on phones: follow the announcement down (and back up to 1st).
          if (isNarrow()) {
            slotRefs.current[team.rank]?.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
        t += T.step;
      });
      at(t + 500, () => {
        setPhase("done");
        played.current.add(ps.id);
      });
    },
    [stop, warpPulse, showAll],
  );

  // New tab: announce it the first time, show it straight away on revisits.
  useEffect(() => {
    const ps = problemStatements.find((p) => p.id === activeId);
    if (played.current.has(activeId) || !ps.teams?.length) {
      stop();
      showAll(ps.teams || []);
      setPhase(ps.teams?.length ? "done" : "idle");
    } else {
      play(ps);
    }
    return stop;
  }, [activeId, problemStatements, play, showAll, stop]);

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

  useEffect(() => {
    tabRefs.current[activeId]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeId]);

  const skip = () => {
    stop();
    played.current.add(activeId);
    showAll(teams);
  };

  const running = phase === "running";
  const done = phase === "done";

  return (
    <div className="syrus-page">
      <Starfield />

      {/* White-out used for the jump to lightspeed and when 1st place lands. */}
      <div key={flash} className={`${styles.flash} ${flash ? styles.flashOn : ""}`} aria-hidden="true" />

      <header className={base.bar}>
        <Link href="/syrus" className={base.logo} aria-label="Back to Syrus 7.0">
          syrus
        </Link>
        <nav className={base.barLinks} aria-label="Syrus pages">
          <Link href="/syrus/shortlist" className={base.back}>
            Shortlist
          </Link>
          <Link href="/syrus" className={base.back}>
            <span aria-hidden="true">&larr;</span> Back to Syrus
          </Link>
        </nav>
      </header>

      <main className={`syrus-container ${base.main}`}>
        <section className={base.head}>
          <p className={styles.eyebrow}>Syrus 7.0</p>
          <h1 className={base.title}>the winners</h1>
          <span className={base.rule} aria-hidden="true" />
        </section>

        <div className={base.tabsWrap}>
          {DOMAINS.map((domain) => (
            <div key={domain} className={base.group}>
              <span className={base.groupLabel}>{domain}</span>
              <div
                className={base.tabs}
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
                        aria-controls="winners-panel"
                        tabIndex={selected ? 0 : -1}
                        className={`${base.tab} ${selected ? base.tabActive : ""}`}
                        onClick={() => select(p.id)}
                      >
                        {p.short}
                        {p.teams === null && (
                          <span className={base.soon} title="Coming soon" aria-label="coming soon" />
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <section
          id="winners-panel"
          ref={stageRef}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className={styles.stage}
          data-phase={phase}
        >
          <h2 className={styles.psTitle}>{active.title}</h2>

          {announced ? (
            <>
              <p className={styles.caption} aria-live="polite">
                <span className={`${styles.captionText} ${running ? styles.captionOn : ""}`}>
                  {single ? "And the winner is" : "And the winners are"}&hellip;
                </span>
                <span className={`${styles.captionText} ${done ? styles.captionOn : ""}`}>
                  The Force is strong with {single ? "this team" : "these teams"}
                </span>
              </p>

              <ol className={styles.podium} data-count={teams.length}>
                {teams.map((t) => {
                  const place = PLACES[t.rank];
                  const shown = revealed.includes(t.rank);
                  return (
                    <li
                      key={`${active.id}-${t.rank}`}
                      ref={(el) => {
                        slotRefs.current[t.rank] = el;
                      }}
                      data-slot
                      className={`${styles.slot} ${styles[`rank${t.rank}`]} ${shown ? styles.shown : ""}`}
                    >
                      {t.rank === 1 && <span className={styles.glow} aria-hidden="true" />}
                      <div className={styles.cardWrap}>
                        <article className={`syrus-panel ${styles.card}`}>
                          <p className={styles.place}>{place.label}</p>
                          <h3 className={styles.team} style={{ "--chars": longestWord(t.team) }}>
                            {t.team}
                          </h3>
                          <span className={styles.saber} data-saber aria-hidden="true" />
                          <p className={styles.leader}>
                            <span className={styles.leaderTag}>Team leader</span>
                            {t.leader || "\u2014"}
                          </p>
                        </article>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className={styles.controls}>
                {running && (
                  <button type="button" className={styles.skip} onClick={skip}>
                    Skip
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className={styles.sealed}>
              <span className={styles.holocron} aria-hidden="true" />
              <p className={styles.sealedTitle}>Winners coming soon</p>
              <p className={styles.sealedText}>
                The winners of {active.title} will be revealed here. Check back shortly.
              </p>
            </div>
          )}
        </section>

        {/* Plain list of every result for search engines. The tabs show the same data. */}
        <div className="syrus-sr-only" aria-hidden="true">
          <h2>Syrus 7.0 winners by problem statement</h2>
          {problemStatements
            .filter((p) => p.teams?.length)
            .map((p) => (
              <section key={p.id}>
                <h3>{p.title}</h3>
                <ol>
                  {p.teams.map((t) => (
                    <li key={t.rank}>
                      {PLACES[t.rank].label}: {t.team}, led by {t.leader}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
        </div>
      </main>

      <SyrusFooter />
      <SyrusScrollToTop />
    </div>
  );
}
