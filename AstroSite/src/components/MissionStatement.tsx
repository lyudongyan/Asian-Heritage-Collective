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
  const [active, setActive] = useState<number | null>(null);

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
      const scrollable = Math.max(viewport * 1.35, rect.height - viewport * 0.72);
      const progress = Math.max(0, Math.min(1, (viewport * 0.56 - rect.top) / scrollable));
      words.forEach((word, index) => {
        const stagger = index / Math.max(1, words.length - 1);
        const local = Math.max(0, Math.min(1, (progress - stagger * 0.42) / 0.42));
        const eased = local < .5 ? 4 * local * local * local : 1 - Math.pow(-2 * local + 2, 3) / 2;
        word.style.transform = `translate3d(0, ${(-Math.min(118, viewport * 0.14) * (1 - eased)).toFixed(1)}px, 0)`;
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
          <span className="mission-lead">We exist to</span>
          {clauses.map((clause, clauseIndex) => (
            <div className="mission-unit" key={clause.text} onMouseLeave={() => setActive(null)}>
              <button
                type="button"
                className={`mission-clause ${active === clauseIndex ? "is-active" : ""}`}
                onMouseEnter={() => setActive(clauseIndex)}
                onFocus={() => setActive(clauseIndex)}
                onClick={() => setActive(clauseIndex)}
                aria-expanded={active === clauseIndex}
                aria-describedby={`mission-explanation-${clauseIndex}`}
              >
                {clause.text.split(" ").map((word, wordPosition, words) => {
                  const index = wordIndex++;
                  return <span className={wordPosition === words.length - 1 ? "last-word" : undefined} key={`${word}-${index}`} data-mission-word>{word}</span>;
                })}
                <span className="mission-punctuation" aria-hidden="true">{clauseIndex < clauses.length - 1 ? "," : "."}</span>
              </button>
              <div
                className={`mission-inline-explanation liquid-surface ${active === clauseIndex ? "is-open" : ""}`}
                data-glass
                aria-hidden={active !== clauseIndex}
              >
                <p id={`mission-explanation-${clauseIndex}`}>{clause.explanation}</p>
              </div>
            </div>
          ))}
        </blockquote>
      </div>
    </section>
  );
}
