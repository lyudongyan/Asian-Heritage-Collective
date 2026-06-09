import React, { useState, useRef, useEffect } from "react";
import { IMAGES } from "../data";

interface AboutPageProps {
  onBack: () => void;
}

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

function MissionBreakdown() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveIdx(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <span className={`text-primary border-b border-primary/40 px-0.5 rounded transition-all duration-300 font-bold ${isActive ? "bg-primary/10" : "hover:bg-primary/5"}`}>
          {text}
        </span>
        {isActive && (
          <span className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-72 md:w-80 p-4 rounded-xl liquid-glass text-left font-body text-xs md:text-sm text-on-surface-variant shadow-lg border border-primary/10 transition-all duration-300 pointer-events-auto leading-relaxed select-text font-normal italic">
            {item.tooltip}
          </span>
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="mt-8 mb-12 max-w-3xl mx-auto text-center p-6 bg-white/40 rounded-2xl border border-primary/5 shadow-inner">
      <span className="text-primary/60 font-body text-[10px] font-mono uppercase tracking-widest block mb-4">
        Interactive Mission Breakdown (Hover or tap a clause below)
      </span>
      <h3 className="font-headline text-lg md:text-2xl text-on-surface-variant leading-relaxed font-medium">
        "
        {renderSpan(0, "Foster youth cultural development")}
        {" by "}
        {renderSpan(1, "empowering young people")}
        {" to "}
        {renderSpan(2, "learn about their heritage")}
        {", "}
        {renderSpan(3, "strengthen their identity")}
        {", and "}
        {renderSpan(4, "serve their communities")}
        ."
      </h3>
    </div>
  );
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-about animate-fade-in relative select-text">
      {/* Decorative ambient elements */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px] relative z-10">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Homepage
        </button>

        {/* Editorial Quote Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-primary font-body text-xs font-bold uppercase tracking-widest block mb-4">
            Our Mission
          </span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary font-bold italic leading-tight mb-8">
            "Foster youth cultural development by empowering young people to learn about their heritage, strengthen their identity, and serve their communities."
          </h2>
          <div className="w-16 h-[2px] bg-primary/30 mx-auto" />
          
          {/* Mission Statement Breakdown Visual Component */}
          <MissionBreakdown />
        </div>

        {/* Staggered Lorem Ipsum Blocks with Unique Images */}
        <div className="space-y-24">
          {/* Block 1: Left Text, Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in">
              <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">
                Cultivating Cultural Identity
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                For a lot of Asian-American students, cultural education means Saturday language school and a few holidays. AHC tries to go further. Through traditional music, calligraphy, origami, painting, and Chinese language tutoring, we give students actual engagement with their heritage rather than a surface-level familiarity with it.
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                We also create opportunities for students to put that knowledge in front of people. Members have performed classical Chinese pieces for audiences of thousands, led calligraphy sessions open to the public, and given presentations on Asian history and culture at schools and libraries across Michigan.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl border-4 border-white/50 transform hover:scale-[1.02] transition-transform duration-500">
              <img
                alt="Cultivating Identity"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.founding_story_left}
              />
            </div>
          </div>

          {/* Block 2: Right Text, Left Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
            <div className="lg:order-2 space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">
                Community at the Core
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Our volunteer work is straightforward: show up, contribute something real, and leave a place better than you found it. AHC members have prepared over 300 meals for homeless individuals and veterans through Grace Centers of Hope, run craft and cultural activity booths at public libraries, and brought music and art programming to community organizations across Michigan.
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                We approach service as the natural extension of what we do. If you spend time learning about your culture, the next step is sharing it with the people around you.
              </p>
            </div>
            <div className="lg:order-1 overflow-hidden rounded-3xl shadow-xl border-4 border-white/50 transform hover:scale-[1.02] transition-transform duration-500">
              <img
                alt="Advocacy and Service"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.community_engagement}
              />
            </div>
          </div>

          {/* Block 3: Left Text, Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">
                Where Tradition Meets Now
              </h3>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                AHC takes art forms that have existed for centuries and puts them in front of real audiences in real places. We've performed at Eastern Market for crowds of 2,500, run public calligraphy sessions, and brought origami and craft workshops to kids who had never tried them before.
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                The point is making these things accessible and enjoyable for people who might otherwise never encounter them, including the young people in our own organization.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl border-4 border-white/50 transform hover:scale-[1.02] transition-transform duration-500">
              <img
                alt="Intersection of Art"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.cultural_performance}
              />
            </div>
          </div>
        </div>

        {/* Closing paragraph block */}
        <div className="mt-24 text-center max-w-3xl mx-auto liquid-glass-strong p-8 md:p-12 rounded-3xl shadow-md border border-primary/10">
          <h3 className="font-headline text-xl font-bold text-primary mb-4">Our Commitment</h3>
          <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
            Asian Heritage Collective is a registered 501(c)(3) nonprofit. Every program we run — tutoring, workshops, performances, community events — is offered free to participants. We operate through sponsorships, partnerships with local organizations, and the volunteer hours of our members. Our finances are publicly documented, and we hold the Candid Silver Seal of Transparency for 2026.
          </p>
          <button
            onClick={onBack}
            className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-full font-body text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 shadow-md"
          >
            Explore Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
