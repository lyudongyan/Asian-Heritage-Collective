import React, { useEffect, useRef, useState } from "react";

const clauses = [
  {
    text: "make language learning something young people choose",
    explanation: "Students learn more when culture feels active, social, and worth returning to.",
  },
  {
    text: "turn heritage into something they can practice",
    explanation: "Tutoring, music, art, and public programs move culture beyond memorization.",
  },
  {
    text: "give that learning back to the community",
    explanation: "Members teach, perform, volunteer, and create opportunities for other people.",
  },
];

export default function MissionStatement({ compact = false }: { compact?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const words = Array.from(section.querySelectorAll<HTMLElement>("[data-mission-word]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (reduceMotion.matches) {
        words.forEach((word) => {
          word.style.removeProperty("transform");
          word.style.removeProperty("opacity");
          word.style.removeProperty("filter");
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport * 0.82 - rect.top) / Math.max(viewport * 0.9, rect.height * 0.72)));
      words.forEach((word, index) => {
        const stagger = index / Math.max(1, words.length - 1);
        const local = Math.max(0, Math.min(1, (progress - stagger * 0.3) / 0.48));
        const eased = 1 - Math.pow(1 - local, 4);
        word.style.transform = `translate3d(0, ${(-Math.min(340, viewport * 0.42) * (1 - eased)).toFixed(1)}px, 0) rotate(${((1 - eased) * (index % 2 ? 2.2 : -2.2)).toFixed(2)}deg)`;
        word.style.opacity = local.toFixed(3);
        word.style.filter = local > 0.98 ? "none" : `blur(${((1 - eased) * 7).toFixed(2)}px)`;
      });
    };

    const requestPaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint, { passive: true });
    reduceMotion.addEventListener("change", requestPaint);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      reduceMotion.removeEventListener("change", requestPaint);
    };
  }, []);

  let wordIndex = 0;
  return (
    <section ref={sectionRef} className={`mission-drop ${compact ? "is-compact" : ""}`} aria-labelledby="mission-heading">
      <div className="mission-sticky">
        <p className="section-label" id="mission-heading">Our mission</p>
        <blockquote>
          We exist to{" "}
          {clauses.map((clause, clauseIndex) => (
            <React.Fragment key={clause.text}>
              <button
                type="button"
                className={`mission-clause ${active === clauseIndex ? "is-active" : ""}`}
                onMouseEnter={() => setActive(clauseIndex)}
                onFocus={() => setActive(clauseIndex)}
                onClick={() => setActive(clauseIndex)}
                aria-describedby={`mission-explanation-${clauseIndex}`}
              >
                {clause.text.split(" ").map((word, wordPosition, words) => {
                  const index = wordIndex++;
                  return <span className={wordPosition === words.length - 1 ? "last-word" : undefined} key={`${word}-${index}`} data-mission-word>{word}</span>;
                })}
                <span className="mission-punctuation" aria-hidden="true">{clauseIndex < clauses.length - 1 ? "," : "."}</span>
              </button>
              {" "}
            </React.Fragment>
          ))}
        </blockquote>
        <div className="mission-explanation liquid-surface" data-glass aria-live="polite">
          {clauses.map((clause, index) => (
            <p id={`mission-explanation-${index}`} key={clause.text} hidden={index !== active}>
              {clause.explanation}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
