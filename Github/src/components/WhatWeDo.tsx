import React, { useState } from "react";
import { IMAGES, PROGRAMS } from "../data";

interface WhatWeDoProps {
  onNavigate?: (page: "home" | "about" | "events" | "team" | "blog" | "games") => void;
}

export default function WhatWeDo({ onNavigate }: WhatWeDoProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[2000] bg-black/85 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setLightboxSrc(null)}
        >
          <div className="relative flex items-center justify-center w-full h-full p-6" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxSrc}
              alt="Expanded view"
              className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl border-4 border-white/20 object-contain animate-pop-in"
            />
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all z-10"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
        </div>
      )}
      <section className="bg-impact py-24 relative animate-fade-in" id="programs">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-4">What We Do</h2>
          <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
            Making culture learning meaningful and relevant.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2 w-full scroll-reveal-left">
            <div className="relative w-full h-[380px] sm:h-[520px]">
              <img
                alt="Team Performance"
                className="absolute top-0 left-0 w-full h-[240px] sm:h-[340px] rounded-3xl shadow-xl object-cover z-10 border border-white/20 hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
                src={IMAGES.team_performance}
              />
              <div className="absolute bottom-0 right-0 w-2/3 h-36 sm:h-52 bg-white/90 p-2.5 rounded-3xl shadow-2xl z-20 border border-white/40 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  alt="Cello player"
                  className="w-full h-full rounded-2xl object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  src={IMAGES.cello_player}
                  onClick={() => setLightboxSrc(IMAGES.cello_player)}
                />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full liquid-glass-strong rounded-3xl p-8 md:p-12 hover:shadow-xl transition-shadow scroll-reveal-right">
            <ul className="space-y-8">
              {PROGRAMS.map((prog, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="bg-primary/10 p-4 rounded-full text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl select-none">{prog.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl md:text-2xl text-primary mb-2 font-bold">{prog.title}</h3>
                    <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" id="impact">
          {/* Stat Card 1 */}
          <div className="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg scroll-reveal">
            <div className="font-headline text-5xl md:text-6xl font-bold text-primary mb-2">
              6200<span className="text-primary/60">+</span>
            </div>
            <div className="font-body text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Individuals Directly Impacted
            </div>
          </div>
          {/* Stat Card 2 */}
          <div className="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg scroll-reveal scroll-reveal-delay-2">
            <div className="font-headline text-5xl md:text-6xl font-bold text-primary mb-2">51.4k</div>
            <div className="font-body text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Digital Content Impacts
            </div>
          </div>
          {/* Stat Card 3 */}
          <div className="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg scroll-reveal scroll-reveal-delay-4">
            <div className="font-headline text-5xl md:text-6xl font-bold text-primary mb-2">
              3600<span className="text-primary/60">+</span>
            </div>
            <div className="font-body text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Volunteer &amp; Service Hours
            </div>
          </div>
        </div>

        {/* Dynamic deep links banner */}
        {onNavigate && (
          <div className="liquid-glass-strong rounded-3xl p-8 text-center max-w-4xl mx-auto border border-primary/10">
            <h3 className="font-headline text-xl md:text-2xl text-primary font-bold mb-3">Explore Our Active Communities</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6 max-w-xl mx-auto">
              Our initiatives reach deep into regional history. Select a portal below to experience minigames, timeline histories, or meet our active board members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate("games")}
                className="bg-primary text-on-primary px-6 py-3 rounded-full font-body font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm select-none">videogame_asset</span>
                Play Interactive Games
              </button>
              <button
                onClick={() => onNavigate("events")}
                className="bg-white hover:bg-neutral-50 text-primary px-6 py-3 rounded-full font-body font-bold text-xs uppercase tracking-widest border border-primary/25 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm select-none">calendar_today</span>
                Past Events Archive
              </button>
              <button
                onClick={() => onNavigate("team")}
                className="bg-white hover:bg-neutral-50 text-secondary px-6 py-3 rounded-full font-body font-bold text-xs uppercase tracking-widest border border-secondary/25 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm select-none">groups</span>
                Meet the 24 Directors
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
