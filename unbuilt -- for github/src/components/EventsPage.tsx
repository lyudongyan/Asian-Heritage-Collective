import React, { useState } from "react";
import { IMAGES } from "../data";

interface EventsPageProps {
  onBack: () => void;
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  img: string;
}

const PAST_EVENTS_LIST: EventItem[] = [
  {
    id: "evt-1",
    title: "Chamber Music Showcase & Cultural Concert",
    date: "February 12, 2026",
    location: "Kitchen Commons, Eastern Market",
    desc: "A classical and traditional fusion performance. Local youth artists collaborated across cello, violin, and traditional flutes to bring ancient melodies to a vibrant, multi-ethnic audience.",
    img: IMAGES.cello_player
  },
  {
    id: "evt-2",
    title: "Culinary Heritage: Civic Cooking Seminar",
    date: "April 5, 2026",
    location: "Detroit Community Kitchen",
    desc: "Youth volunteers gathered under Mr. Yan's coordination to prepare traditional stuffed dumplings and healthy veggie meals, recording senior citizens' migration recipes for a public community cookbook.",
    img: IMAGES.community_engagement
  },
  {
    id: "evt-3",
    title: "Spring Calligraphy Expo & Wisdom Tracer",
    date: "May 2, 2026",
    location: "Oakland Heritage Hall",
    desc: "An immersive, hands-on ink calligraphy workshop where participants explored the aesthetics of traditional character brushes, practicing master stokes and learning the deep meaning behind five core proverbs.",
    img: IMAGES.founding_story_left
  },
  {
    id: "evt-4",
    title: "Michigan Folk Performance & Festival",
    date: "June 22, 2025",
    location: "Metropolitan Civic Arena",
    desc: "Our resident performers held a magnificent stage showcase celebrating the Dragon Boat and Duanwu traditions, highlighting instrument duets, folk stories, and rich, historical attire.",
    img: IMAGES.cultural_performance
  }
];

const GALLERY_IMAGES = [
  { url: IMAGES.eastern_market, title: "Eastern Market Cultural Space", desc: "Our collaborative venue welcoming families and performers of all walks." },
  { url: IMAGES.michigan_women, title: "Michigan Chinese Women Association", desc: "A chamber performance highlighting historical woodwinds and orchestral sweeps." },
  { url: IMAGES.oakland_church, title: "Traditional Scribe Display", desc: "Artistic exhibit boards showing volunteer initiatives and calligraphies." },
  { url: IMAGES.cello_player, title: "Heritage Cello Performance", desc: "Blending classic Western strings with traditional Chinese scores." },
  { url: IMAGES.team_performance, title: "Chamber Ensembles", desc: "Members presenting folk music with cello, string arrangements, and flute solos." },
  { url: IMAGES.elderly_viewing, title: "Generational Interlocking", desc: "Elders guiding student brushes, reinforcing family linkages and heritage preservation." },
  { url: IMAGES.crowd_watching, title: "Audiences in Awe", desc: "Dozens of regional viewers admiring the live show in community spaces." },
  { url: IMAGES.community_engagement, title: "Kitchen Preparations", desc: "Students working together hand-crafting meals and recording ancestral stories." }
];

export default function EventsPage({ onBack }: EventsPageProps) {
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; desc: string } | null>(null);

  return (
    <>
    <div className="pt-32 pb-24 min-h-screen bg-impact animate-fade-in relative select-text">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Homepage
        </button>

        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-body text-xs font-bold uppercase tracking-widest block mb-1">
            Historic Archive
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">
            Past Events &amp; Celebrations
          </h2>
          <p className="font-body text-sm md:text-base text-on-surface-variant mt-2 leading-relaxed">
            Take a stroll through our timeline of historic assemblies, performances, workshops, and communal cooking programs.
          </p>
        </div>

        {/* Detailed Timeline Sections */}
        <div className="space-y-12 max-w-5xl mx-auto mb-24">
          {PAST_EVENTS_LIST.map((evt, idx) => (
            <div
              key={evt.id}
              className="liquid-glass-strong rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border border-primary/5 hover:border-primary/15 transition-all shadow-sm hover:shadow-md"
            >
              <div className="w-full md:w-1/3 h-52 overflow-hidden rounded-2xl border border-white/50 shrink-0 transform hover:scale-[1.02] transition-all">
                <img
                  alt={evt.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" loading="lazy"
                  src={evt.img}
                />
              </div>
              <div className="flex-1 space-y-3 text-left">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">
                    {evt.date}
                  </span>
                  <span className="text-on-surface-variant/70 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span> {evt.location}
                  </span>
                </div>
                <h3 className="font-headline text-xl md:text-2xl text-primary font-bold">
                  {evt.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery at the bottom */}
        <div className="mt-20 border-t border-primary/15 pt-16">
          <div className="text-center mb-10">
            <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold">
              Captured Moments Gallery
            </h3>
            <p className="font-body text-xs text-on-surface-variant/80 mt-1 max-w-md mx-auto">
              Hover and click any photograph to expand the view and discover the story behind each snapshot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GALLERY_IMAGES.map((item, index) => (
              <div
                key={index}
                onClick={() => setLightboxImg(item)}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-white/50 transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/35"
              >
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer" loading="lazy"
                  src={item.url}
                />
                {/* Backdrop Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-left select-none">
                  <h4 className="text-white font-headline text-sm font-bold leading-tight">{item.title}</h4>
                  <p className="text-white/80 font-body text-[10px] line-clamp-2 mt-1 leading-normal">{item.desc}</p>
                  <span className="text-secondary-fixed text-[9px] font-bold uppercase tracking-wider mt-2 block">
                    Click to Expand →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

      {/* Lightbox Modal — rendered outside scroll container so it's screen-centered */}
      {lightboxImg && (
        <div
          className="fixed bg-black/90 backdrop-blur-md flex items-center justify-center"
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 animate-pop-in select-text"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-12 right-0 text-white hover:text-secondary-fixed transition-colors p-2 flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wider z-10"
            >
              <span className="material-symbols-outlined text-2xl">close</span> Close
            </button>
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="max-h-[60vh] w-full bg-black/40 flex items-center justify-center overflow-hidden">
                <img
                  alt={lightboxImg.title}
                  className="max-h-[60vh] max-w-full object-contain"
                  referrerPolicy="no-referrer"
                  src={lightboxImg.url}
                />
              </div>
              <div className="p-6 bg-neutral-950 border-t border-neutral-900 text-left">
                <h4 className="font-headline text-2xl text-white font-bold mb-2">
                  {lightboxImg.title}
                </h4>
                <p className="font-body text-sm text-neutral-400 leading-relaxed">
                  {lightboxImg.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
