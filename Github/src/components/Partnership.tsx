import React from "react";
import { PARTNERS, IMAGES } from "../data";

export default function Partnership() {
  return (
    <section className="relative py-24 overflow-hidden flex items-center justify-center font-sans" id="partnership">
      {/* Liquid glass image background wrapper */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Community engagement"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply filter contrast-125"
          referrerPolicy="no-referrer" loading="lazy"
          src={IMAGES.community_engagement}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
        {/* Main Central Card Backplate (Same style concept as quote section) */}
        <div className="liquid-glass-strong rounded-3xl p-10 md:p-14 max-w-5xl mx-auto !bg-white/10 !border-white/20 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="font-headline text-3xl md:text-4xl text-white font-bold drop-shadow-md">
              Partnerships &amp; Sponsorships
            </h2>
            <p className="font-body text-sm md:text-base text-white/95 mt-2 max-w-xl mx-auto drop-shadow-sm">
              Working with local organizations to bring cultural programming to more people across Michigan.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl">
              {PARTNERS.map((partner, index) => (
                <div
                  key={index}
                  className="liquid-glass rounded-2xl p-6 flex flex-col items-center gap-4 group hover:liquid-glass-strong transition-all duration-300 w-full sm:w-56 shadow-md !bg-white/15 !border-white/20 backdrop-blur-sm"
                >
                  <div className="h-16 flex items-center justify-center bg-white/95 p-3 rounded-xl w-full shadow-inner">
                    <img
                      alt={partner.name}
                      className="h-10 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                      referrerPolicy="no-referrer" loading="lazy"
                      src={partner.img}
                    />
                  </div>
                  <span className="text-[11px] font-body font-bold text-center tracking-wider text-white select-none transition-colors max-w-[170px]">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
