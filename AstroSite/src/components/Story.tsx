import React, { useState } from "react";
import { IMAGES } from "../data";
import { Eyebrow, Lightbox, SplitWords } from "./ui";

export default function Story() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      {/* ── Mission band ───────────────────────────────────── */}
      <section className="relative py-32 md:py-40 flex items-center justify-center overflow-hidden texture-grain">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            aria-hidden="true"
            data-parallax="0.05"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply filter contrast-125 scale-125"
            loading="lazy"
            src={IMAGES.crowd_watching}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-tertiary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-aurora opacity-50 mix-blend-multiply" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <div className="scroll-reveal">
            <Eyebrow light className="mb-8 justify-center">Our Mission</Eyebrow>
            <blockquote className="font-headline text-3xl md:text-5xl text-white font-bold leading-snug text-balance drop-shadow-lg">
              "Foster youth cultural development by empowering young people to{" "}
              <span className="hl text-white">learn about their heritage</span>,{" "}
              <span className="hl text-white">strengthen their identity</span>, and{" "}
              <span className="hl text-white">serve their communities</span>."
            </blockquote>
            <a
              href="/about"
              className="inline-flex items-center gap-2 mt-10 font-body text-sm font-bold text-white/80 hover:text-white transition-colors no-underline group"
            >
              What every word means to us
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Founding story ─────────────────────────────────── */}
      <section className="bg-story py-28 relative overflow-hidden" id="story">
        <span
          aria-hidden="true"
          data-parallax="0.12"
          className="text-watermark font-headline text-[14rem] absolute -top-8 right-0 leading-none pointer-events-none hidden xl:block"
        >
          02
        </span>

        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row-reverse gap-14 items-center">
            <div className="lg:w-1/2 scroll-reveal-right">
              <Eyebrow className="mb-6">02 · Our Story</Eyebrow>
              <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-[1.1] mb-8">
                <SplitWords>
                  It started with a few instruments and a{" "}
                  <em className="italic">stubborn idea</em>.
                </SplitWords>
              </h2>
              <p className="font-body text-base md:text-lg text-on-surface-variant mb-5 leading-relaxed">
                AHC started in October 2023, when Lyudong Yan founded a small
                music ensemble with a straightforward goal: give Asian youth in
                Michigan a real reason to engage with their heritage. He had
                watched students lose interest in traditional cultural
                education because it felt disconnected from anything
                meaningful. Language schools felt like chores. Cultural
                programming felt obligatory. He wanted to build something
                different.
              </p>
              <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-8">
                What began as a music group grew quickly. As more students
                joined and more community organizations reached out, AHC
                expanded into arts, tutoring, and volunteer programming. Today
                the organization runs events across Michigan, has reached
                thousands of people directly, and continues to grow — still
                built around the same idea: cultural education works best when
                it's something people actually want to show up for.
              </p>
              <a
                href="/about#milestones"
                className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary hover:text-primary-container transition-colors no-underline group"
              >
                Trace the full milestone roadmap
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            <div className="lg:w-1/2 relative min-h-[460px] md:min-h-[520px] w-full scroll-reveal-left">
              <img
                alt="Students preparing food at a service event"
                className="absolute top-0 left-0 w-3/4 rounded-3xl shadow-xl border-4 border-white/50 transform -rotate-3 hover:rotate-0 hover:z-40 transition-all duration-500 z-10 cursor-zoom-in"
                loading="lazy"
                src={IMAGES.founding_story_left}
                onClick={() => setLightboxSrc(IMAGES.founding_story_left)}
              />
              <img
                alt="Elderly audience members watching a performance"
                className="absolute bottom-0 right-0 w-2/3 rounded-3xl shadow-xl border-4 border-white/50 transform rotate-3 hover:rotate-0 hover:z-40 transition-all duration-500 z-20 cursor-zoom-in"
                loading="lazy"
                src={IMAGES.elderly_viewing}
                onClick={() => setLightboxSrc(IMAGES.elderly_viewing)}
              />
              <img
                alt="AHC team members together"
                className="absolute bottom-16 left-4 w-1/2 rounded-3xl shadow-xl border-4 border-white/50 transform -rotate-1 hover:rotate-0 hover:z-40 transition-all duration-500 z-30 cursor-zoom-in"
                loading="lazy"
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
