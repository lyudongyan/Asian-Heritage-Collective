import React, { useEffect, useRef, useState } from "react";
import { IMAGES, MILESTONES, type Milestone } from "../data";
import Footer from "./Footer";
import MissionStatement from "./MissionStatement";

const pillars = [
  {
    title: "Learn by doing",
    copy: "Language tutoring, music, calligraphy, origami, painting, and cultural workshops give students a practical way into their heritage.",
    image: IMAGES.auburn_hills_event,
  },
  {
    title: "Share it publicly",
    copy: "Students perform, teach, and lead programs for libraries, schools, cultural organizations, and public audiences across Michigan.",
    image: IMAGES.cultural_performance,
  },
  {
    title: "Serve the community",
    copy: "AHC members turn what they learn into volunteer work, from cultural activities to preparing meals for people who need them.",
    image: IMAGES.community_engagement,
  },
];

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <article className="timeline-card liquid-surface liquid-light reveal" data-glass>
      <div className={`timeline-image ${milestone.fit === "contain" ? "is-contained" : ""}`}>
        <img src={milestone.img} alt={milestone.title} loading="lazy" />
      </div>
      <div className="timeline-copy">
        <time>{milestone.date}</time>
        <h3>{milestone.title}</h3>
        <p>{milestone.desc}</p>
      </div>
    </article>
  );
}

function RoadmapTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<{ path: string; width: number; height: number } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const build = () => {
      const wrapRect = wrap.getBoundingClientRect();
      const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-timeline-node]"));
      if (nodes.length < 2 || !wrapRect.width) return;
      const points = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - wrapRect.left, y: rect.top + rect.height / 2 - wrapRect.top };
      });
      let path = `M ${points[0].x},${points[0].y}`;
      points.slice(1).forEach((point, index) => {
        const previous = points[index];
        const middle = (previous.y + point.y) / 2;
        path += ` C ${previous.x},${middle} ${point.x},${middle} ${point.x},${point.y}`;
      });
      setGeometry({ path, width: wrapRect.width, height: wrapRect.height });
    };
    build();
    const observer = new ResizeObserver(build);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap || !geometry) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight * .78 - rect.top) / (rect.height + innerHeight * .18)));
      path.style.strokeDashoffset = matchMedia("(prefers-reduced-motion: reduce)").matches ? "0" : `${length * (1 - progress)}`;
    };
    const requestPaint = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    addEventListener("scroll", requestPaint, { passive: true });
    addEventListener("resize", requestPaint, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", requestPaint);
      removeEventListener("resize", requestPaint);
    };
  }, [geometry]);

  return (
    <div className="timeline" ref={wrapRef}>
      {geometry && (
        <svg className="timeline-path" width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
          <path ref={pathRef} d={geometry.path} />
        </svg>
      )}
      {MILESTONES.map((milestone, index) => (
        <div className={`timeline-row ${index % 2 ? "is-right" : "is-left"}`} key={`${milestone.date}-${milestone.title}`}>
          <div className="timeline-card-slot"><MilestoneCard milestone={milestone} /></div>
          <div className="timeline-marker-column">
            <span className="timeline-node" data-timeline-node />
            <time>{milestone.date}</time>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <section className="page-shell about-hero-shell">
        <div className="page-width about-hero">
          <div className="about-hero-copy liquid-surface liquid-dark reveal in-view" data-glass>
            <h1>About</h1>
            <p>AHC began in 2023 with a frustration: cultural education felt like an obligation when it could have felt alive.</p>
          </div>
          <div className="about-hero-image reveal in-view">
            <img src={IMAGES.founding_story_left} alt="AHC students at a community program" />
          </div>
        </div>
      </section>

      <MissionStatement compact />

      <section className="about-story">
        <div className="page-width story-grid">
          {pillars.map((pillar) => (
            <article className="story-panel image-card reveal" data-viewport-card key={pillar.title} style={{ backgroundImage: `url(${pillar.image})` }}>
              <div className="image-shade" />
              <div className="story-panel-copy liquid-surface liquid-dark" data-glass>
                <h2>{pillar.title}</h2>
                <p>{pillar.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="milestones" id="milestones">
        <div className="page-width">
          <header className="section-heading reveal">
            <p className="section-label">Since 2023</p>
            <h2>From a small ensemble to a statewide community.</h2>
          </header>
          <RoadmapTimeline />
        </div>
      </section>

      <Footer />
    </main>
  );
}
