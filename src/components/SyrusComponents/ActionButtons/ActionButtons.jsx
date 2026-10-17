import Link from "next/link";
import {
  PRIMARY_ACTION,
  REGISTER_URL,
  SHORTLIST_URL,
  WINNERS_URL,
  JOIN_GROUP_URL,
} from "../syrusConfig";
import { WhatsAppIcon, MentorIcon } from "../icons";
import styles from "./ActionButtons.module.css";

/**
 * The two call-to-action buttons shown in the Hero and in the Navbar.
 * Which one is the main button is set by PRIMARY_ACTION in syrusConfig.js.
 *
 * compact: icon-only on very small screens (used in the Navbar).
 */
export default function ActionButtons({ onCallMentor, compact = false }) {
  const isMentor = PRIMARY_ACTION === "mentor";
  // "winners" / "shortlist" turn the main button into an in-site link.
  const pageLink = {
    winners: {
      href: WINNERS_URL,
      label: "View Winners",
      short: "Winners",
      aria: "View the winning teams",
    },
    shortlist: {
      href: SHORTLIST_URL,
      label: "View Shortlist",
      short: "Shortlist",
      aria: "View the shortlisted teams",
    },
  }[PRIMARY_ACTION];

  return (
    <div className={`${styles.row} ${compact ? styles.compact : ""}`}>
      {/* Main button ("View Winners") is commented out for now.
          Remove the comment wrapper around this block to bring it back.
      {isMentor ? (
        <button
          type="button"
          className="syrus-btn syrus-btn--primary"
          onClick={onCallMentor}
          aria-label="Call a Mentor"
        >
          <MentorIcon className={styles.icon} />
          <span className={styles.label}>Call a Mentor</span>
        </button>
      ) : pageLink ? (
        <Link
          className={`syrus-btn syrus-btn--primary ${styles.register}`}
          href={pageLink.href}
          aria-label={pageLink.aria}
        >
          <span className={styles.registerFull}>{pageLink.label}</span>
          <span className={styles.registerShort} aria-hidden="true">
            {pageLink.short}
          </span>
        </Link>
      ) : (
        <a
          className={`syrus-btn syrus-btn--primary ${styles.register}`}
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Register now on Unstop"
        >
          <span className={styles.registerFull}>Register Now</span>
          <span className={styles.registerShort} aria-hidden="true">
            Register
          </span>
        </a>
      )}
      */}

      <a
        className="syrus-btn syrus-btn--ghost"
        href={JOIN_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join the WhatsApp group"
      >
        <WhatsAppIcon className={styles.icon} />
        <span className={styles.label}>Join Group</span>
      </a>
    </div>
  );
}
