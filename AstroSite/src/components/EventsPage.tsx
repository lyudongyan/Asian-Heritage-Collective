import React, { useEffect } from "react";
import { PAST_EVENTS, type PastEvent } from "../data/pastEvents";
import { Eyebrow, SplitWords } from "./ui";

// Resolve gallery images from filenames at build time (Vite)
const allImages = import.meta.glob<{ default: { src: string } }>(
  "../assets/images/*",
  { eager: true }
);

function imgSrc(filename: string): string {
  return allImages[`../assets/images/${filename}`]?.default?.src ?? "";
}

function yearOf(evt: PastEvent): string {
  const match = evt.date.match(/(\d{4})\s*$/);
  return match ? match[1] : evt.date;
}

export default function EventsPage() {
  // Scroll-reveal observer for static page
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Group events by year, preserving order
  const groups: { year: string; events: PastEvent[] }[] = [];
  for (const evt of PAST_EVENTS) {
    const year = yearOf(evt);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.events.push(evt);
    else groups.push({ year, events: [evt] });
  }

  return (
    <div className="pt-36 pb-24 min-h-screen bg-impact relative select-text overflow-hidden">
      <span
        aria-hidden="true"
        data-parallax="0.1"
        className="text-watermark font-headline text-[13rem] absolute top-16 right-0 leading-none pointer-events-none hidden xl:block"
      >
        档案
      </span>

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative">
        {/* Header */}
        <header className="max-w-2xl mb-20 animate-slide-up-fade">
          <Eyebrow className="mb-6">The Archive</Eyebrow>
          <h1 className="font-headline text-4xl md:text-6xl text-primary font-bold leading-[1.05] mb-6">
            <SplitWords>
              Eight events. <em className="italic">Thousands of people.</em>
            </SplitWords>
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            Performances, workshops, meal services, and library programs —
            everything AHC has put in front of a Michigan audience since its
            first open house.
          </p>
        </header>

        {/* Year-grouped timeline */}
        <div className="relative">
          {/* spine */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-0 w-px bg-primary/20" aria-hidden="true" />

          {groups.map((group) => (
            <div key={group.year} className="relative mb-4">
              {/* Year marker */}
              <div className="flex items-center gap-5 mb-8 scroll-reveal">
                <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary border-4 border-white shadow-md shrink-0 relative z-10" />
                <span className="font-headline text-3xl md:text-4xl font-bold text-primary">
                  {group.year}
                </span>
              </div>

              {/* Event cards */}
              <div className="space-y-8 pl-8 md:pl-14 pb-8">
                {group.events.map((evt) => (
                  <a
                    key={evt.id}
                    href={`/events/${evt.id}`}
                    className="liquid-glass-strong rounded-3xl p-5 md:p-7 flex flex-col md:flex-row gap-7 items-stretch border border-primary/5 hover:border-primary/25 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 no-underline group scroll-reveal block"
                  >
                    <div className="w-full md:w-[280px] h-48 md:h-auto overflow-hidden rounded-2xl border border-white/50 shrink-0 relative">
                      <img
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        src={imgSrc(evt.imageFile)}
                      />
                      {evt.imageFiles.length > 1 && (
                        <span className="absolute bottom-3 right-3 liquid-glass rounded-full px-3 py-1 font-mono text-[10px] font-bold text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">photo_library</span>
                          {evt.imageFiles.length}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-3 text-left py-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">
                          {evt.date}
                        </span>
                        <span className="text-on-surface-variant/70 text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          {evt.location}
                        </span>
                      </div>
                      <h3 className="font-headline text-xl md:text-2xl text-primary font-bold leading-snug group-hover:text-primary-container transition-colors">
                        {evt.title}
                      </h3>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                        {evt.desc}
                      </p>
                      <span className="font-body text-[10px] font-bold text-primary uppercase tracking-widest inline-flex items-center gap-1.5 mt-1 group-hover:gap-3 transition-all">
                        View Details &amp; Gallery
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 liquid-glass-strong rounded-3xl p-10 text-center border border-primary/10 scroll-reveal">
          <h3 className="font-headline text-2xl text-primary font-bold mb-3">
            Want to be at the next one?
          </h3>
          <p className="font-body text-sm text-on-surface-variant mb-6 max-w-md mx-auto">
            Every event on this page was planned and run by students. Join us
            and help build the next chapter of the archive.
          </p>
          <a
            href="/#apply"
            className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-body font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-md active:scale-95 inline-flex items-center gap-2 no-underline"
          >
            Apply to Join
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
