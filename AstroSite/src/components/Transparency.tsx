import React from "react";
import { IMAGES } from "../data";
import { Eyebrow, SplitWords } from "./ui";
// @ts-ignore
import candidBronzeImg from "../assets/images/candid_bronze_2024_1779673220744.webp";

const SEALS = [
  {
    img: candidBronzeImg,
    year: "2024",
    name: "Candid Bronze",
    desc: "Earned in AHC's founding year as a registered nonprofit.",
  },
  {
    img: IMAGES.candid_silver,
    year: "2026",
    name: "Candid Silver",
    desc: "The Silver Seal of Transparency, renewed for 2026.",
  },
];

export default function Transparency() {
  return (
    <section className="bg-surface py-24 relative border-y border-outline-variant/30" id="transparency">
      <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div className="scroll-reveal-left">
            <Eyebrow className="mb-6">04 · Accountability</Eyebrow>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-[1.1] mb-6">
              <SplitWords>
                Transparent <em className="italic">by default</em>.
              </SplitWords>
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-8">
              Asian Heritage Collective is invested in maintaining full
              transparency, integrity, and honesty in how it operates. Our
              programs are free to participants, our finances are publicly
              documented, and our transparency rating has gone up every time
              it's been reviewed.
            </p>
            <p className="font-body text-sm text-on-surface-variant/80">
              Registered 501(c)(3) nonprofit — EIN 39-4558056.
            </p>
          </div>

          {/* Seal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 scroll-reveal-right">
            {SEALS.map((seal, i) => (
              <div
                key={seal.name}
                className={`liquid-glass-strong rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${i === 1 ? "sm:mt-10" : ""}`}
              >
                <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm border border-outline/10 hover:scale-105 transition-transform duration-300">
                  <img
                    alt={`${seal.name} Seal ${seal.year}`}
                    className="h-28 object-contain"
                    loading="lazy"
                    src={typeof seal.img === "string" ? seal.img : (seal.img as any).src}
                  />
                </div>
                <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">
                  {seal.year}
                </span>
                <h3 className="font-headline text-xl text-primary font-bold mb-2">
                  {seal.name}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {seal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
