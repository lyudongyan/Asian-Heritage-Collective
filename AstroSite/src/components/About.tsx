import React, { useState } from "react";
import { IMAGES } from "../data";
import { Eyebrow, Lightbox, SplitWords } from "./ui";

export default function About() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section className="bg-about py-28 relative overflow-hidden" id="about">
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      {/* Decorative watermark */}
      <span
        aria-hidden="true"
        data-parallax="0.12"
        className="text-watermark font-headline text-[14rem] absolute -top-10 -left-6 leading-none pointer-events-none hidden xl:block"
      >
        01
      </span>

      <div className="container mx-auto px-6 md:px-12 max-w-[1280px] relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">
          {/* Editorial text column */}
          <div className="scroll-reveal-left">
            <Eyebrow className="mb-6">01 · Who We Are</Eyebrow>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-[1.1] mb-8 text-balance">
              <SplitWords>
                Culture you can <em className="italic">do</em>, not just sit
                through.
              </SplitWords>
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant mb-5 leading-relaxed">
              Asian Heritage Collective is a Michigan nonprofit that runs
              cultural programs for Asian youth — music, art, language
              tutoring, and community service. We started in 2023 because a
              lot of students were checking out of heritage education
              entirely, and we thought there was a better way to do it.
            </p>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-10">
              Most of what we do is hands-on. Students perform traditional
              music in front of real audiences, learn calligraphy and
              traditional crafts, and tutor younger kids in Chinese. The goal
              is to make cultural engagement something students actually want
              to do — not something they're obligated to sit through.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="/about"
                className="bg-primary text-on-primary px-7 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-md active:scale-95 inline-flex items-center gap-2 no-underline"
              >
                Our Detailed Journey
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="font-headline text-3xl font-bold text-primary">'23</span>
                <span className="font-body text-[11px] uppercase tracking-widest text-on-surface-variant font-bold leading-tight">
                  founded as a<br />music ensemble
                </span>
              </div>
            </div>
          </div>

          {/* Offset photo collage */}
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[480px] md:h-[560px] scroll-reveal-right">
            <button
              className="col-span-7 row-span-6 overflow-hidden rounded-3xl shadow-xl border-2 border-white/50 group cursor-zoom-in relative"
              onClick={() => setLightboxSrc(IMAGES.cultural_performance)}
              aria-label="Expand cultural performance photo"
            >
              <img
                alt="Students performing traditional Chinese music"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                src={IMAGES.cultural_performance}
              />
            </button>
            <button
              className="col-span-5 row-span-3 mt-8 overflow-hidden rounded-3xl shadow-lg border-2 border-white/50 group cursor-zoom-in"
              onClick={() => setLightboxSrc(IMAGES.auburn_hills_event)}
              aria-label="Expand Auburn Hills library event photo"
            >
              <img
                alt="Origami workshop at Auburn Hills Public Library"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                src={IMAGES.auburn_hills_event}
              />
            </button>
            <button
              className="col-span-5 row-span-3 -mt-2 overflow-hidden rounded-3xl shadow-lg border-2 border-white/50 group cursor-zoom-in"
              onClick={() => setLightboxSrc(IMAGES.large_crowd_performance)}
              aria-label="Expand Eastern Market crowd photo"
            >
              <img
                alt="Crowd of thousands at Eastern Market performance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ objectPosition: "center 20%" }}
                loading="lazy"
                src={IMAGES.large_crowd_performance}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
