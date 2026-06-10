import React, { useState } from "react";
import { IMAGES } from "../data";

interface AboutProps {
  onNavigate?: (page: "home" | "about" | "events" | "team" | "blog" | "games") => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section className="bg-about py-24 relative" id="about">
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
      <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="liquid-glass-strong rounded-3xl p-8 md:p-16 transform transition-all hover:shadow-xl duration-300 scroll-reveal-left">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6 font-bold leading-tight">Who We Are</h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant mb-6 leading-relaxed">
              Asian Heritage Collective is a Michigan nonprofit that runs cultural programs for Asian youth — music, art, language tutoring, and community service. We started in 2023 because a lot of students were checking out of heritage education entirely, and we thought there was a better way to do it.
            </p>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-6">
              Most of what we do is hands-on. Students perform traditional music in front of real audiences, learn calligraphy and traditional crafts, and tutor younger kids in Chinese. The goal is to make cultural engagement something students actually want to do, not something they're obligated to sit through.
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate("about")}
                className="bg-primary text-on-primary px-6 py-3 rounded-full font-body font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
              >
                Read Our Detailed Journey
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 scroll-reveal-right">
            <div
              className="overflow-hidden rounded-2xl shadow-lg border-2 border-white/40 group cursor-zoom-in aspect-square"
              onClick={() => setLightboxSrc(IMAGES.cultural_performance)}
            >
              <img
                alt="Cultural performance"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.cultural_performance}
              />
            </div>
            <div
              className="overflow-hidden rounded-2xl shadow-lg border-2 border-white/40 mt-8 group cursor-zoom-in aspect-square"
              onClick={() => setLightboxSrc(IMAGES.auburn_hills_event)}
            >
              <img
                alt="Auburn Hills Public Library Event"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.auburn_hills_event}
              />
            </div>
            <div
              className="overflow-hidden rounded-2xl shadow-lg border-2 border-white/40 col-span-2 group cursor-zoom-in"
              onClick={() => setLightboxSrc(IMAGES.large_crowd_performance)}
            >
              <img
                alt="Large crowd at Eastern Market performance"
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectPosition: "center 20%" }}
                referrerPolicy="no-referrer" loading="lazy"
                src={IMAGES.large_crowd_performance}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
