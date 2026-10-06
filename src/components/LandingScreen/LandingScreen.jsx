import React from "react";
import Button from "react-bootstrap/Button";
import dynamic from "next/dynamic";

// The 3D logo only exists in the browser (WebGL), so it is loaded there and
// skipped when the page is built.
const CodecellModel = dynamic(() => import("../CodecellModel/CodecellModel"), {
  ssr: false,
});
import GlassContainer from "../GlassContainer/GlassContainer";
const VESITLogo = "/VESIT.png";
import "../misc/SyrusCta/SyrusCta.css";
import "./LandingScreen.css";

const LandingScreen = ({ events = [] }) => {
  const hasEvents = Array.isArray(events) && events.length > 0;

  return (
    <div className="landing-screen" id="landing-screen">
      <div className="info-section">
        <div className="codecell-college-wrapper">
          <img src={VESITLogo} alt="" className="codecell-college-logo" />
          <div className="codecell-college-name">
            Vivekanand Education Society's Institute of Technology
          </div>
        </div>
        <GlassContainer>
          <div className="codecell-info">
            <h1 className="codecell-title">
              CodeCell++ <span>VESIT</span>
            </h1>
            <div className="codecell-subtitle">
              Tinkerers from Computer Engineering
            </div>
          </div>
        </GlassContainer>
        <div className="landing-buttons">
          {/* {hasEvents && (
            <Button className="upcoming-button" href="#upcoming-events">
              Upcoming <br />
              Events
            </Button>
          )} */}
          <Button className="syrus-cta syrus-button-landing" href="/syrus">
            SYRUS 7.0
          </Button>
        </div>
      </div>
      <div className="codecell-model">
        <CodecellModel />
      </div>
    </div>
  );
};

export default LandingScreen;
