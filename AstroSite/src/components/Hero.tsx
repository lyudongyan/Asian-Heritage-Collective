import React from "react";
import { IMAGES } from "../data";
import { Eyebrow, SplitWords } from "./ui";
// @ts-ignore
import bgVideo from "../assets/videos/ahc_background_video.mp4";

const HERO_CHIPS = [
  { value: "2,500", label: "largest live audience", icon: "music_note", cls: "animate-float" },
  { value: "6,200+", label: "people reached", icon: "diversity_3", cls: "animate-float-slow [animation-delay:1.2s]" },
  { value: "3,600+", label: "service hours", icon: "volunteer_activism", cls: "animate-float [animation-delay:2.4s]" },
];

export default function Hero() {
  return (
    <section className="bg-hero texture-grain relative min-h-screen flex items-center overflow-hidden">
      {/* Tinted background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        data-scrub-video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Depth: gradient frame + glow blobs */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#150005]/80 via-transparent to-[#150005]/95 pointer-events-none" />
      <div data-parallax="0.18" className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-primary-container/30 rounded-full blur-3xl mix-blend-screen pointer-events-none z-[1]" />
      <div data-parallax="-0.12" className="absolute bottom-0 right-0 w-[560px] h-[560px] bg-secondary-container/15 rounded-full blur-3xl mix-blend-screen pointer-events-none z-[1]" />

      {/* 传承 — "heritage passed down" watermark */}
      <div
        aria-hidden="true"
        className="absolute right-[-2rem] top-1/2 -translate-y-1/2 hidden lg:flex flex-col leading-none z-[1] pointer-events-none select-none"
      >
        <span className="text-watermark-light font-headline text-[19rem] animate-float-slow">传</span>
        <span className="text-watermark-light font-headline text-[19rem] animate-float-slow [animation-delay:1.5s] -mt-16">承</span>
      </div>

      <div data-scrub className="relative z-10 container mx-auto px-6 md:px-12 max-w-[1280px] pt-36 pb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          {/* Left: editorial headline block */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8 animate-slide-up-fade">
              <img
                src={IMAGES.logo}
                alt="Asian Heritage Collective logo"
                className="h-14 w-14 object-contain rounded-2xl bg-white/10 p-1.5 border border-white/20 shadow-lg"
              />
              <Eyebrow light>Michigan 501(c)(3) Nonprofit · Est. 2023</Eyebrow>
            </div>

            <h1 className="font-headline text-5xl md:text-6xl xl:text-7xl text-white font-bold tracking-tight leading-[1.05] mb-8">
              <SplitWords>
                Heritage inspires{" "}
                <em className="italic text-primary-fixed-dim">the aspiring.</em>
              </SplitWords>
            </h1>

            <p className="font-body text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-xl animate-slide-up-fade delay-200">
              We're a youth-led collective empowering young people to learn
              about their heritage, strengthen their identity, and serve their
              communities — through music, art, language, and showing up.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-fade delay-300">
              <a
                href="#apply"
                className="bg-white text-primary px-8 py-4 rounded-full font-body font-bold text-sm uppercase tracking-wider hover:bg-primary-fixed transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center active:scale-95"
              >
                Apply to Join
              </a>
              <a
                href="#about"
                className="liquid-glass-dark text-white px-8 py-4 rounded-full font-body font-bold text-sm uppercase tracking-wider hover:bg-white/15 transition-all text-center flex items-center justify-center gap-2 active:scale-95"
              >
                See What We Do
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </a>
            </div>
          </div>

          {/* Right: floating glass stat chips */}
          <div className="hidden lg:flex flex-col gap-6 items-start relative">
            {HERO_CHIPS.map((chip, i) => (
              <div
                key={chip.label}
                className={`liquid-glass-dark rounded-2xl px-7 py-5 flex items-center gap-5 shadow-2xl ${chip.cls}`}
                style={{ marginLeft: `${i * 3.5}rem` }}
              >
                <span className="material-symbols-outlined text-3xl text-primary-fixed-dim select-none">
                  {chip.icon}
                </span>
                <div>
                  <div className="font-headline text-3xl font-bold text-white leading-none">
                    {chip.value}
                  </div>
                  <div className="font-body text-[11px] uppercase tracking-widest text-white/60 font-bold mt-1.5">
                    {chip.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <span className="material-symbols-outlined text-xl animate-cue">arrow_downward</span>
      </a>
    </section>
  );
}
