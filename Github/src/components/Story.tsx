import React, { useState } from "react";
import { IMAGES } from "../data";

export default function Story() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[2000] bg-black/85 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
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
      {/* Mission Impact Quote Hero Section */}
      <section className="relative py-36 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Crowd watching performers"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply filter contrast-125"
            referrerPolicy="no-referrer" loading="lazy"
            src={IMAGES.crowd_watching}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-tertiary/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 container mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="liquid-glass-strong rounded-3xl p-10 md:p-20 max-w-5xl mx-auto !bg-white/10 !border-white/20 shadow-2xl backdrop-blur-md scroll-reveal">
            <span className="material-symbols-outlined text-6xl text-white/80 mb-6 block drop-shadow-md select-none animate-bounce">
              format_quote
            </span>
            <h2 className="font-headline text-2xl md:text-4xl text-white mb-8 text-balance font-bold leading-snug drop-shadow-lg">
              "Foster youth cultural development by empowering young people to learn about their heritage, strengthen their identity, and serve their communities."
            </h2>
            <p className="font-body text-sm md:text-base text-white/90 uppercase tracking-widest font-bold drop-shadow-md">
              — AHC MISSION
            </p>
          </div>
        </div>
      </section>

      {/* Founding Story Section */}
      <section className="bg-story py-24 relative" id="story">
        <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
            <div className="lg:w-1/2 liquid-glass-strong rounded-3xl p-8 md:p-12 shadow-md hover:shadow-lg transition-shadow duration-300 scroll-reveal-right">
              <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-6">Our Founding Story</h2>
              <p className="font-body text-base md:text-lg text-on-surface-variant mb-6 leading-relaxed">
                AHC started in October 2023, when Lyudong Yan founded a small music ensemble with a straightforward goal: give Asian youth in Michigan a real reason to engage with their heritage. He had watched students lose interest in traditional cultural education because it felt disconnected from anything meaningful. Language schools felt like chores. Cultural programming felt obligatory. He wanted to build something different.
              </p>
              <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                What began as a music group grew quickly. As more students joined and more community organizations reached out, AHC expanded into arts, tutoring, and volunteer programming. Today the organization runs events across Michigan, has reached thousands of people directly, and continues to grow — still built around the same idea that cultural education works best when it's something people actually want to show up for.
              </p>
            </div>
            <div className="lg:w-1/2 relative min-h-[500px] w-full scroll-reveal-left">
              <img
                alt="Students preparing food"
                className="absolute top-0 left-0 w-3/4 rounded-3xl shadow-xl border-4 border-white/50 transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10 cursor-zoom-in"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.founding_story_left}
                onClick={() => setLightboxSrc(IMAGES.founding_story_left)}
              />
              <img
                alt="Elderly viewing stand"
                className="absolute bottom-0 right-0 w-2/3 rounded-3xl shadow-xl border-4 border-white/50 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20 cursor-zoom-in"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.elderly_viewing}
                onClick={() => setLightboxSrc(IMAGES.elderly_viewing)}
              />
              <img
                alt="Meet the team"
                className="absolute bottom-16 left-4 w-1/2 rounded-3xl shadow-xl border-4 border-white/50 transform -rotate-1 hover:rotate-0 transition-transform duration-500 z-30 cursor-zoom-in"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.meet_the_team}
                onClick={() => setLightboxSrc(IMAGES.meet_the_team)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
