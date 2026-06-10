import React from "react";
import { PARTNERS, IMAGES } from "../data";
import { Eyebrow } from "./ui";

export default function Partnership() {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section
      className="relative py-24 overflow-hidden texture-grain"
      id="partnership"
    >
      {/* Dark image backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          alt=""
          aria-hidden="true"
          data-parallax="0.05"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply filter contrast-125 scale-125"
          loading="lazy"
          src={IMAGES.community_engagement}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-secondary/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 scroll-reveal">
            <div>
              <Eyebrow light className="mb-5">05 · Partners</Eyebrow>
              <h2 className="font-headline text-3xl md:text-5xl text-white font-bold drop-shadow-md leading-tight max-w-xl">
                We don't do this <em className="italic">alone</em>.
              </h2>
            </div>
            <p className="font-body text-sm md:text-base text-white/85 max-w-sm drop-shadow-sm leading-relaxed">
              Working with local organizations to bring cultural programming
              to more people across Michigan.
            </p>
          </div>
        </div>

        {/* Logo marquee */}
        <div className="relative overflow-hidden py-2">
          <div className="flex w-max animate-marquee gap-6 px-3">
            {loop.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="liquid-glass-dark rounded-2xl px-6 py-5 flex items-center gap-5 w-[300px] shrink-0 group hover:bg-white/10 transition-colors duration-300"
              >
                <div className="h-14 w-20 flex items-center justify-center bg-white/95 p-2 rounded-xl shrink-0 shadow-inner">
                  <img
                    alt={partner.name}
                    className="max-h-10 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    src={partner.img}
                  />
                </div>
                <span className="font-body text-xs font-bold tracking-wide text-white leading-snug">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#570004]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#6b3a00]/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
