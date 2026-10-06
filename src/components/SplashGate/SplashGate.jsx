"use client";

import { Fragment, useEffect, useState } from "react";
import Loading from "../misc/Loading/Loading";

const SPLASH_MS = 1000; // how long the logo splash is shown, counted from page load
const FADE_MS = 450;

/**
 * The CodeCell logo splash. The page itself is rendered on the server, so search
 * engines and slow connections get the full content straight away; this just covers
 * it with the splash for the first second (the CSS in Loading.css also removes the
 * splash on its own if JavaScript is slow or turned off).
 *
 * When the splash ends the page is mounted fresh, so entrance animations and
 * scroll-triggered effects start then, as they did when the splash gated the page.
 */
export default function SplashGate({ children }) {
  const [phase, setPhase] = useState("splash"); // "splash" | "fading" | "done"
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const wait = Math.max(0, SPLASH_MS - performance.now());
    const t1 = window.setTimeout(() => {
      if (wait > 0) setEpoch((e) => e + 1);
      setPhase("fading");
    }, wait);
    const t2 = window.setTimeout(() => setPhase("done"), wait + FADE_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {phase !== "done" && <Loading leaving={phase === "fading"} />}
      <Fragment key={epoch}>{children}</Fragment>
    </>
  );
}
