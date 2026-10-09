// Phone browsers collapse the URL bar while you scroll, which changes
// window.innerHeight and fires "resize". CSS `svh` doesn't move, so the pinned sections
// are sized with it; the scroll maths must use the same height or progress jumps.

const probes = {};

// A hidden element sized in the given viewport unit, read back in px.
function measure(unit) {
  let el = probes[unit];
  if (!el || !el.isConnected) {
    el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = `position:fixed;top:0;left:0;width:0;height:100${unit};visibility:hidden;pointer-events:none`;
    document.body.appendChild(el);
    probes[unit] = el;
  }
  // 0 where the unit isn't supported
  return el.offsetHeight || window.innerHeight;
}

/** The small-viewport height (px): what `100svh` is, steady while the URL bar moves. */
export function getViewportH() {
  return measure("svh");
}

/** The large-viewport height (px): what `100lvh` is, the screen with the URL bar hidden. */
export function getLargeViewportH() {
  return measure("lvh");
}

// Touch devices: a height-only change of this size or less is the URL bar, not a resize.
const BAR_JITTER = 150;

/** Like window "resize", but skips the URL bar showing / hiding on touch devices. */
export function onRealResize(fn) {
  const touch = window.matchMedia("(pointer: coarse)");
  let w = window.innerWidth;
  let h = window.innerHeight;
  const handler = (e) => {
    const nw = window.innerWidth;
    const nh = window.innerHeight;
    const barOnly = touch.matches && nw === w && Math.abs(nh - h) <= BAR_JITTER;
    w = nw;
    h = nh;
    if (!barOnly) fn(e);
  };
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}
