import React from "react";
import { IMAGES } from "../data";
// @ts-ignore
import bgVideo from "../assets/videos/ahc_background_video.mp4";

export default function Hero() {
  return (
    <section className="bg-hero relative min-h-[100vh] flex items-center justify-center pt-32 overflow-hidden pb-20">
      {/* Tinted Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-35 pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Abstract shapes for depth */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/40 rounded-full blur-3xl mix-blend-overlay"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-overlay"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-5xl">
        <div className="mb-8 inline-block animate-fade-in">
          <img
            alt="Asian Heritage Collective Logo"
            className="h-48 md:h-64 object-contain mx-auto drop-shadow-2xl hover:scale-[1.03] transition-all duration-300"
            referrerPolicy="no-referrer"
            src={IMAGES.logo}
          />
        </div>

        <div className="liquid-glass-strong rounded-3xl p-8 md:p-12 max-w-4xl mx-auto transform transition-all hover:scale-[1.01] duration-500 shadow-xl border border-white/40 relative">
          <span className="material-symbols-outlined text-5xl text-primary/30 mb-2 block select-none">
            format_quote
          </span>
          <h1 className="font-headline text-4xl md:text-6xl text-primary font-bold mb-6 text-balance tracking-tight leading-tight">
            Heritage inspires the aspiring
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed italic">
            "Foster youth cultural development by empowering young people to learn about their heritage, strengthen their identity, and serve their communities."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-body font-bold text-sm uppercase tracking-wider hover:bg-primary-container transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center active:scale-95"
              href="#apply"
            >
              Apply to Join
            </a>
            <a
              className="liquid-glass text-primary px-8 py-4 rounded-full font-body font-bold text-sm uppercase tracking-wider hover:bg-white/80 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2 active:scale-95"
              href="#about"
            >
              Explore More{" "}
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
