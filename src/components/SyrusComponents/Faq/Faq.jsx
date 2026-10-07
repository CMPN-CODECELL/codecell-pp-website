import { useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { ChevronIcon } from "../icons";
import styles from "./Faq.module.css";
import { FAQ_DATA } from "./faqData";


export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq-section"
      className={`syrus-section ${styles.section}`}
      aria-labelledby="faq-title"
    >
      <img
          src="/syrus-characters/mandalorian.webp"
          alt=""
          aria-hidden="true"
          className={styles.character}
          loading="lazy"
        />
      <div className="syrus-container">
        <SectionHeading id="faq-title">faqs</SectionHeading>

        <div className={styles.list} data-reveal>
          {FAQ_DATA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className={styles.item}>
                <h3 className={styles.q}>
                  <button
                    type="button"
                    className={styles.btn}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.num} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.text}>{item.question}</span>
                    <ChevronIcon
                      className={`${styles.chev} ${isOpen ? styles.chevOpen : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.a}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
