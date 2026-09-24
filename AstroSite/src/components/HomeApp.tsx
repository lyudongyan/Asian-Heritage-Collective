import React from "react";
import heroVideo from "../assets/videos/ahc_background_video.mp4";
import { IMAGES, PROGRAMS, STATS_NUMERIC } from "../data";
import Footer from "./Footer";
import MissionStatement from "./MissionStatement";

const programImages = [
  IMAGES.auburn_hills_event,
  IMAGES.cultural_performance,
  IMAGES.team_performance,
  IMAGES.community_engagement,
];

function Hero() {
  return (
    <section className="home-hero image-section" id="home">
      <video autoPlay muted loop playsInline poster={IMAGES.large_crowd_performance} aria-hidden="true">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="image-shade" />
      <div className="hero-layout page-width">
        <div className="hero-panel liquid-surface liquid-dark" data-glass>
          <h1>Make language learning worth showing up for.</h1>
          <p>
            Asian Heritage Collective gives young people a reason to learn, create,
            perform, and serve together.
          </p>
          <div className="button-row">
            <a className="button button-light" href="#join">Join AHC</a>
            <a className="button button-glass" href="/about">Why we started</a>
          </div>
        </div>

        <div className="hero-stats" aria-label="AHC impact">
          {STATS_NUMERIC.map((stat) => (
            <div className="stat-glass liquid-surface liquid-dark" data-glass key={stat.label}>
              <strong>{stat.value}{stat.suffix}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section className="section programs-section" id="programs">
      <div className="page-width">
        <header className="section-heading reveal">
          <p className="section-label">What we do</p>
          <h2>Culture becomes real when students do something with it.</h2>
        </header>
        <div className="program-grid">
          {PROGRAMS.map((program, index) => (
            <article
              className="program-card image-card reveal"
              key={program.title}
              style={{ backgroundImage: `url(${programImages[index]})` }}
            >
              <div className="image-shade" />
              <div className="program-copy liquid-surface liquid-dark" data-glass>
                <h3>{program.title}</h3>
                <p>{program.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchoolService() {
  return (
    <section
      className="school-section image-section"
      style={{ backgroundImage: `url(${IMAGES.meet_the_team})` }}
    >
      <div className="image-shade" />
      <div className="page-width school-layout">
        <div className="school-card liquid-surface liquid-light reveal" data-glass>
          <img
            className="school-logo"
            src="https://www.acsgd.org/logo.png"
            alt="The American Chinese School of Greater Detroit"
          />
          <p>
            AHC members volunteer with the school, helping make Chinese language
            learning more active and engaging for younger students.
          </p>
          <a className="text-link" href="https://www.acsgd.org/" target="_blank" rel="noreferrer">
            Visit the school website
          </a>
        </div>
      </div>
    </section>
  );
}

function Explore() {
  const cards = [
    {
      href: "/events",
      title: "Events",
      copy: "Performances, workshops, library programs, and volunteer service across Michigan.",
      image: IMAGES.eastern_market_performance,
    },
    {
      href: "/blog",
      title: "Student Blogs",
      copy: "Students write about language, identity, family, food, and finding their way back.",
      image: IMAGES.chinese_school_blog,
    },
    {
      href: "/team",
      title: "Team",
      copy: "Meet the students who run AHC's programs, performances, and community work.",
      image: IMAGES.team_performance,
    },
  ];

  return (
    <section className="section explore-section">
      <div className="page-width">
        <header className="section-heading reveal">
          <p className="section-label">Explore AHC</p>
          <h2>See the work and the people behind it.</h2>
        </header>
        <div className="explore-grid">
          {cards.map((card) => (
            <a
              className="explore-card image-card reveal"
              href={card.href}
              key={card.title}
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="image-shade" />
              <div className="explore-copy liquid-surface liquid-dark" data-glass>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <span>View page</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Join() {
  return (
    <section
      className="join-section image-section"
      id="join"
      style={{ backgroundImage: `url(${IMAGES.community_engagement})` }}
    >
      <div className="image-shade" />
      <div className="page-width join-layout">
        <div className="join-copy liquid-surface liquid-dark reveal" data-glass>
          <p className="section-label">Join AHC</p>
          <h2>Bring what you care about.</h2>
          <p>
            Students can teach, perform, create, volunteer, or help build the next program.
          </p>
        </div>
        <form className="join-form liquid-surface liquid-light reveal" data-glass action="https://formspree.io/f/xgoqpveq" method="POST">
          <label>
            Name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label>
            What would you like to do?
            <textarea name="message" rows={4} required />
          </label>
          <button className="button button-primary" type="submit">Send application</button>
        </form>
      </div>
    </section>
  );
}

export default function HomeApp() {
  return (
    <main>
      <Hero />
      <MissionStatement />
      <Programs />
      <SchoolService />
      <Explore />
      <Join />
      <Footer />
    </main>
  );
}
