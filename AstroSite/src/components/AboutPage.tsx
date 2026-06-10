import React, { useState, useRef, useEffect } from "react";
import { IMAGES, MILESTONES, type Milestone } from "../data";
import { Eyebrow, Lightbox, SplitWords } from "./ui";
import Footer from "./Footer";

const MISSION_CLAUSES = [
  {
    text: "Foster youth cultural development",
    tooltip: "Cultural development means more than knowing facts about where your family is from. It means actively participating, building real skills, and having enough familiarity with your heritage that you can actually do something with it."
  },
  {
    text: "empowering young people",
    tooltip: "We give students real activities, real responsibilities, and real opportunities to contribute. The emphasis is on doing things, not observing them."
  },
  {
    text: "learn about their heritage",
    tooltip: "Language tutoring, calligraphy, traditional music, history presentations. Hands-on, specific, and concrete."
  },
  {
    text: "strengthen their identity",
    tooltip: "For a lot of second-generation students, cultural identity is genuinely complicated. We want students to leave AHC more grounded in who they are."
  },
  {
    text: "serve their communities",
    tooltip: "Members bring what they've learned back through performances, volunteer work, and public programming. Learning and giving back are not treated as separate things here."
  }
];

const PILLARS = [
  {
    num: "01",
    eyebrow: "Identity",
    title: "Cultivating cultural identity",
    img: IMAGES.founding_story_left,
    alt: "Students engaged in a cultural program",
    paras: [
      "For a lot of Asian-American students, cultural education means Saturday language school and a few holidays. AHC tries to go further. Through traditional music, calligraphy, origami, painting, and Chinese language tutoring, we give students actual engagement with their heritage rather than a surface-level familiarity with it.",
      "We also create opportunities for students to put that knowledge in front of people. Members have performed classical Chinese pieces for audiences of thousands, led calligraphy sessions open to the public, and given presentations on Asian history and culture at schools and libraries across Michigan.",
    ],
  },
  {
    num: "02",
    eyebrow: "Service",
    title: "Community at the core",
    img: IMAGES.community_engagement,
    alt: "AHC members volunteering in the community",
    paras: [
      "Our volunteer work is straightforward: show up, contribute something real, and leave a place better than you found it. AHC members have prepared over 300 meals for homeless individuals and veterans through Grace Centers of Hope, run craft and cultural activity booths at public libraries, and brought music and art programming to community organizations across Michigan.",
      "We approach service as the natural extension of what we do. If you spend time learning about your culture, the next step is sharing it with the people around you.",
    ],
  },
  {
    num: "03",
    eyebrow: "Access",
    title: "Where tradition meets now",
    img: IMAGES.cultural_performance,
    alt: "A traditional performance in front of a live audience",
    paras: [
      "AHC takes art forms that have existed for centuries and puts them in front of real audiences in real places. We've performed at Eastern Market for crowds of 2,500, run public calligraphy sessions, and brought origami and craft workshops to kids who had never tried them before.",
      "The point is making these things accessible and enjoyable for people who might otherwise never encounter them, including the young people in our own organization.",
    ],
  },
];

/* ── Compact milestone card ────────────────────────────────── */
function MilestoneCard({
  m,
  index,
  onZoom,
}: {
  m: Milestone;
  index: number;
  onZoom: (src: string) => void;
}) {
  return (
    <article className="liquid-glass-strong rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full md:max-w-[320px] group">
      <div
        className={`h-28 overflow-hidden shrink-0 cursor-zoom-in ${
          m.fit === "contain"
            ? "bg-white flex items-center justify-center p-2.5"
            : "bg-white/60"
        }`}
        onClick={() => onZoom(m.img)}
      >
        <img
          src={m.img}
          alt={m.title}
          loading="lazy"
          className={
            m.fit === "contain"
              ? "h-full w-auto object-contain group-hover:scale-105 transition-transform duration-700"
              : "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          }
        />
      </div>
      <div className="p-4">
        <h4 className="font-headline text-base font-bold text-primary mb-1.5 leading-snug">
          {index + 1}. {m.title}
        </h4>
        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
          {m.desc}
        </p>
      </div>
    </article>
  );
}

/* ── Roadmap: one continuous curve, drawn by scroll ────────── */
function RoadmapTimeline({ onZoom }: { onZoom: (src: string) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geom, setGeom] = useState<{ d: string; w: number; h: number } | null>(null);

  // Measure node positions and build one smooth path through all of them
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const build = () => {
      const wr = wrap.getBoundingClientRect();
      if (wr.width === 0) return;
      const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-node]"));
      if (nodes.length < 2) return;
      const pts = nodes.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - wr.left,
          y: r.top + r.height / 2 - wr.top,
        };
      });
      let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const my = ((a.y + b.y) / 2).toFixed(1);
        d += ` C ${a.x.toFixed(1)},${my} ${b.x.toFixed(1)},${my} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
      }
      setGeom({ d, w: wr.width, h: wr.height });
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Draw the path progressively as the section scrolls through the viewport
  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap || !geom) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }
    let ticking = false;
    const update = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geom]);

  return (
    <>
      {/* Desktop: winding road */}
      <div ref={wrapRef} className="relative hidden md:block">
        {geom && (
          <svg
            className="absolute inset-0 pointer-events-none z-0"
            width={geom.w}
            height={geom.h}
            viewBox={`0 0 ${geom.w} ${geom.h}`}
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d={geom.d}
              fill="none"
              stroke="rgba(87, 0, 4, 0.32)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}
        {MILESTONES.map((m, i) => {
          const left = i % 2 === 0;
          return (
            <div
              key={m.date + m.title}
              className="grid grid-cols-[1fr_6rem_1fr] relative"
            >
              {left ? (
                <div className="py-4 flex justify-end scroll-reveal-left">
                  <MilestoneCard m={m} index={i} onZoom={onZoom} />
                </div>
              ) : (
                <div />
              )}

              <div className="relative">
                <span
                  data-node
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10 ${
                    left ? "left-0" : "left-full"
                  }`}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 z-10 font-mono text-[11px] font-bold text-primary whitespace-nowrap ${
                    left ? "left-0 ml-5" : "right-0 mr-5"
                  }`}
                >
                  {m.date}
                </span>
              </div>

              {!left ? (
                <div className="py-4 flex justify-start scroll-reveal-right">
                  <MilestoneCard m={m} index={i} onZoom={onZoom} />
                </div>
              ) : (
                <div />
              )}
            </div>
          );
        })}

        {/* Dashed continuation + invitation */}
        <div className="flex flex-col items-center mt-2">
          <span
            className="h-12 border-l-2 border-dashed border-primary/30"
            aria-hidden="true"
          />
          <a
            href="/#apply"
            className="mt-4 liquid-glass-strong inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-bold text-primary hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline"
          >
            The next milestone could be yours
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Mobile: stacked chronological list with spine */}
      <div className="md:hidden relative pl-8">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px bg-primary/25"
          aria-hidden="true"
        />
        <div className="space-y-8">
          {MILESTONES.map((m, i) => (
            <div key={m.date + m.title} className="relative scroll-reveal">
              <span className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-[3px] border-white shadow" />
              <span className="font-mono text-[11px] font-bold text-primary inline-block mb-2">
                {m.date}
              </span>
              <MilestoneCard m={m} index={i} onZoom={onZoom} />
            </div>
          ))}
        </div>
        <div className="mt-8 scroll-reveal">
          <a
            href="/#apply"
            className="liquid-glass-strong inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-bold text-primary no-underline"
          >
            The next milestone could be yours
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default function AboutPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close mission tooltips on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveIdx(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const renderSpan = (idx: number, text: string) => {
    const isActive = activeIdx === idx;
    const item = MISSION_CLAUSES[idx];

    return (
      <span
        key={idx}
        className="relative inline-block group cursor-pointer"
        onMouseEnter={() => setActiveIdx(idx)}
        onMouseLeave={() => setActiveIdx(null)}
        onClick={(e) => {
          e.stopPropagation();
          setActiveIdx(activeIdx === idx ? null : idx);
        }}
      >
        <span
          className={`hl px-0.5 rounded transition-all duration-300 ${
            isActive ? "text-secondary-fixed" : "text-white"
          }`}
        >
          {text}
        </span>
        {isActive && (
          <span className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-3 w-72 md:w-80 p-5 rounded-2xl liquid-glass-strong text-left font-body text-xs md:text-sm text-on-surface shadow-2xl pointer-events-auto leading-relaxed select-text font-normal not-italic animate-pop-in">
            {item.tooltip}
          </span>
        )}
      </span>
    );
  };

  return (
    <>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      {/* ── Mission hero: dark aurora band with interactive statement ── */}
      <section className="bg-aurora texture-grain relative pt-44 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#150005]/60 via-transparent to-[#150005]/70 pointer-events-none" />
        <span
          aria-hidden="true"
          data-parallax="0.1"
          className="text-watermark-light font-headline text-[17rem] absolute -top-10 right-[-2rem] leading-none pointer-events-none hidden xl:block"
        >
          使命
        </span>

        <div
          ref={containerRef}
          className="relative z-10 container mx-auto px-6 md:px-12 max-w-4xl text-center"
        >
          <Eyebrow light className="mb-8 justify-center animate-slide-up-fade">
            Why AHC Exists
          </Eyebrow>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-snug text-balance mb-8 animate-slide-up-fade delay-100 drop-shadow-lg">
            "{renderSpan(0, "Foster youth cultural development")}
            {" by "}
            {renderSpan(1, "empowering young people")}
            {" to "}
            {renderSpan(2, "learn about their heritage")}
            {", "}
            {renderSpan(3, "strengthen their identity")}
            {", and "}
            {renderSpan(4, "serve their communities")}."
          </h1>
          <p className="font-body text-[11px] text-white/55 tracking-[0.25em] uppercase font-bold animate-slide-up-fade delay-200">
            Every phrase is doing work — tap one to see what it means to us
          </p>
        </div>
      </section>

      {/* ── Three pillars ─────────────────────────────────────── */}
      <div className="bg-about relative overflow-hidden select-text">
        <div className="absolute top-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] relative z-10 py-28 space-y-28">
          {PILLARS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={p.num}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                <div className={`${flip ? "lg:order-2 scroll-reveal-right" : "scroll-reveal-left"} space-y-6`}>
                  <Eyebrow>{p.num} · {p.eyebrow}</Eyebrow>
                  <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold leading-[1.12]">
                    <SplitWords>{p.title}</SplitWords>
                  </h2>
                  {p.paras.map((para) => (
                    <p key={para.slice(0, 24)} className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
                <div className={`${flip ? "lg:order-1 scroll-reveal-left" : "scroll-reveal-right"} relative`}>
                  <span
                    aria-hidden="true"
                    data-parallax="0.08"
                    className="text-watermark font-headline text-[9rem] absolute -top-16 -left-4 leading-none pointer-events-none hidden lg:block"
                  >
                    {p.num}
                  </span>
                  <div
                    className="overflow-hidden rounded-3xl shadow-xl border-4 border-white/50 hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in relative"
                    onClick={() => setLightboxSrc(p.img)}
                  >
                    <img alt={p.alt} className="w-full h-[400px] object-cover" loading="lazy" src={p.img} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* ── Milestone roadmap ───────────────────────────── */}
          <div id="milestones" className="scroll-mt-28">
            <div className="max-w-2xl mb-12 scroll-reveal">
              <Eyebrow className="mb-6">04 · Milestones</Eyebrow>
              <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold leading-[1.12] mb-4">
                <SplitWords>From ensemble to organization</SplitWords>
              </h2>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Every stop on this road actually happened — from the first
                rehearsal in October 2023 to a crowd of 2,500 in the heart of
                Detroit.
              </p>
            </div>
            <RoadmapTimeline onZoom={setLightboxSrc} />
          </div>

          {/* ── Commitment card ─────────────────────────────── */}
          <div className="scroll-reveal max-w-3xl mx-auto">
            <div className="liquid-glass-strong p-8 md:p-12 rounded-3xl shadow-md border border-primary/10 text-center relative overflow-hidden">
              <span
                aria-hidden="true"
                className="text-watermark font-headline text-[8rem] absolute -bottom-10 -right-2 leading-none pointer-events-none"
              >
                信
              </span>
              <Eyebrow className="mb-5 justify-center">Our Commitment</Eyebrow>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-5">
                Free to participants. <em className="italic">Accountable to everyone.</em>
              </h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed relative z-10">
                Asian Heritage Collective is a registered 501(c)(3) nonprofit. Every
                program we run — tutoring, workshops, performances, community events —
                is offered free to participants. We operate through sponsorships,
                partnerships with local organizations, and the volunteer hours of our
                members. Our finances are publicly documented, and we hold the Candid
                Silver Seal of Transparency for 2026.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8 relative z-10">
                <a
                  href="/#apply"
                  className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-body text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 shadow-md no-underline inline-flex items-center gap-2"
                >
                  Join Us
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
                <a
                  href="/#transparency"
                  className="liquid-glass text-primary px-8 py-3.5 rounded-full font-body text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all active:scale-95 no-underline"
                >
                  See the Numbers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
