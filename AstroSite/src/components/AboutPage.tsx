import React from "react";
import { IMAGES } from "../data";
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

export default function AboutPage() {
  return (
    <main>
      <section
        className="about-hero-full image-section"
        style={{ backgroundImage: `url(${IMAGES.founding_story_left})` }}
      >
        <div className="about-hero-shade" />
        <div className="page-width about-hero-content">
          <p className="section-label">About AHC</p>
          <h1>Culture should feel alive.</h1>
          <p>AHC began in 2023 with a frustration: cultural education felt like an obligation when it could have felt active, social, and worth returning to.</p>
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

      <Footer />
    </main>
  );
}
