import React, { useState } from "react";
import { IMAGES, PROGRAMS, STATS_NUMERIC } from "../data";
import { Eyebrow, Lightbox, CountUp, SplitWords } from "./ui";

export default function WhatWeDo() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <section className="bg-impact py-28 relative overflow-hidden" id="programs">
        <span
          aria-hidden="true"
          data-parallax="0.12"
          className="text-watermark font-headline text-[14rem] absolute -top-8 -left-6 leading-none pointer-events-none hidden xl:block"
        >
          03
        </span>

        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          {/* Heading */}
          <div className="max-w-2xl mb-16 scroll-reveal">
            <Eyebrow className="mb-6">03 · Programs</Eyebrow>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-[1.1] mb-5">
              <SplitWords>
                Four ways in. <em className="italic">All hands-on.</em>
              </SplitWords>
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
              Making culture learning meaningful and relevant — every program
              is free to participants and run by students who've done the work
              themselves.
            </p>
          </div>

          {/* Program cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {PROGRAMS.map((prog, index) => (
              <div
                key={prog.title}
                className={`liquid-glass-strong rounded-3xl p-8 group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden scroll-reveal scroll-reveal-delay-${index + 1}`}
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 group-hover:scale-150 transition-all duration-700" />
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:rotate-6 transition-all duration-300 mb-6 relative">
                  <span className="material-symbols-outlined text-3xl select-none">{prog.icon}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-primary/40 tracking-widest block mb-1.5">
                  0{index + 1}
                </span>
                <h3 className="font-headline text-xl md:text-2xl text-primary mb-3 font-bold relative">
                  {prog.title}
                </h3>
                <p className="font-body text-sm md:text-[15px] text-on-surface-variant leading-relaxed relative">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Wide performance image with caption */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/30 mb-20 scroll-reveal-scale group cursor-zoom-in"
            onClick={() => setLightboxSrc(IMAGES.team_performance)}
          >
            <img
              alt="AHC ensemble performing together"
              className="w-full h-[300px] md:h-[420px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
              loading="lazy"
              src={IMAGES.team_performance}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#150005]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between gap-6">
              <div>
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/70 font-bold block mb-2">
                  The ensemble that started it all
                </span>
                <p className="font-headline text-xl md:text-2xl text-white font-bold max-w-xl leading-snug">
                  From living-room rehearsals to audiences of 2,500.
                </p>
              </div>
              <span className="material-symbols-outlined text-white/70 text-3xl shrink-0 group-hover:scale-110 transition-transform hidden sm:block">zoom_in</span>
            </div>
          </div>

          {/* Impact stats — animated count-up */}
          <div id="impact" className="scroll-reveal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {STATS_NUMERIC.map((stat, i) => (
                <div
                  key={stat.label}
                  className="liquid-glass-strong rounded-3xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg relative overflow-hidden group"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-4 font-headline text-6xl text-primary/5 font-bold select-none group-hover:text-primary/10 transition-colors"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="font-headline text-5xl md:text-6xl font-bold text-primary mb-3">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </div>
                  <div className="font-body text-xs font-bold text-primary uppercase tracking-widest mb-2">
                    {stat.label}
                  </div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed max-w-[230px] mx-auto">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Deep links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/events"
                className="bg-primary text-on-primary px-7 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-md active:scale-95 inline-flex items-center justify-center gap-2 no-underline w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-sm select-none">calendar_today</span>
                Browse Past Events
              </a>
              <a
                href="/team"
                className="bg-white/70 hover:bg-white text-primary px-7 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-widest border border-primary/25 transition-all shadow-sm active:scale-95 inline-flex items-center justify-center gap-2 no-underline w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-sm select-none">groups</span>
                Meet the Team
              </a>
              <a
                href="/games"
                className="bg-white/70 hover:bg-white text-secondary px-7 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-widest border border-secondary/25 transition-all shadow-sm active:scale-95 inline-flex items-center justify-center gap-2 no-underline w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-sm select-none">videogame_asset</span>
                Play Cultural Games
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
