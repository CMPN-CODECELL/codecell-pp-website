import React from "react";
import "./Loading.css";

// `leaving` fades the splash out (see SplashGate). On its own it is the same
// full-screen logo as before.
const Loading = ({ leaving = false }) => {
  return (
    <div className={`loading${leaving ? " loading-leaving" : ""}`} aria-hidden="true">
      <img
        src="/CodecellLogoRevolving.webp"
        alt=""
        width="1200"
        height="675"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
};

export default Loading;
