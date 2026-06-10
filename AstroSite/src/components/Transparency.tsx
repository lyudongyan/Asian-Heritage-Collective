import React from "react";
import { IMAGES } from "../data";
// @ts-ignore
import candidBronzeImg from "../assets/images/candid_bronze_2024_1779673220744.webp";

export default function Transparency() {
  return (
    <section className="bg-surface py-20 relative border-y border-outline-variant/30" id="impact">
      <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl m-4 md:text-4xl text-primary font-bold">Transparency, Integrity, &amp; Honesty</h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed mt-4">
            Asian Heritage Collective is invested in maintaining full transparency, integrity, and honesty in how it operates.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            <div className="liquid-glass-strong rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-outline/10 hover:scale-105 transition-transform duration-300">
                <img
                  alt="Candid Bronze Seal 2024"
                  className="h-32 object-contain"
                  referrerPolicy="no-referrer"
                  src={candidBronzeImg}
                />
              </div>
              <h3 className="font-headline text-2xl text-primary font-bold mb-2">2024 Candid Bronze</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Asian Heritage Collective received the Bronze seal in its founding year, 2024.
              </p>
            </div>
            <div className="liquid-glass-strong rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-outline/10 hover:scale-105 transition-transform duration-300">
                <img
                  alt="Candid Silver Seal 2026"
                  className="h-32 object-contain"
                  referrerPolicy="no-referrer"
                  src={IMAGES.candid_silver}
                />
              </div>
              <h3 className="font-headline text-2xl text-primary font-bold mb-2">2026 Candid Silver</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Asian Heritage Collective holds the Silver Seal of Transparency, renewed for 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
