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
    title: "Oakland Chinese Church Annual Open House",
    date: "August 2025",
    location: "Oakland Chinese Church, Michigan",
    desc: "AHC brought sticker-making, badminton, and a cultural intro presentation to OCC's annual open house, welcoming 35 attendees. Brady Morishita of OCC noted the event went excellently and thanked AHC for hosting. An early demonstration of what AHC's community programming could look like at its best.",
    img: IMAGES.oakland_church
  },
  {
    id: "evt-2",
    title: "Michigan Chinese Women's Association Annual Banquet",
    date: "September 2025",
    location: "Michigan",
    desc: "AHC ran a sticker-making activity for 10 children and performed traditional music for 400 banquet guests. Pieces performed included the Butterfly Lovers Violin Concerto and Colorful Clouds Chasing the Moon. One of AHC's first large-audience performances.",
    img: IMAGES.michigan_women
  },
  {
    id: "evt-3",
    title: "Detroit Eastern Market Performance",
    date: "April 2026",
    location: "Detroit Eastern Market",
    desc: "AHC performed traditional Chinese music for a crowd of 2,500. Alongside the performance, we ran a free public calligraphy activity with 60 participants and sold Chinese fans, raising $100 for the Association of Chinese Americans. One of our largest public appearances to date.",
    img: IMAGES.eastern_market
  },
  {
    id: "evt-4",
    title: "Auburn Hills Public Library — API Heritage Month",
    date: "May 2026",
    location: "Auburn Hills Public Library, Michigan",
    desc: "For Asian Pacific Islander Heritage Month, AHC hosted an origami workshop with 20 participants alongside a presentation on Asian heritage history. The event reached an audience largely new to AHC's work.",
    img: IMAGES.auburn_hills_event
  },
  {
    id: "evt-5",
    title: "Grace Centers of Hope — Volunteer Meal Service",
    date: "March 2026",
    location: "Grace Centers of Hope, Michigan",
    desc: "Six AHC members prepared 300 meals for homeless individuals and veterans served by Grace Centers of Hope. A straightforward service event, and one of the ones we're most proud of.",
    img: IMAGES.community_engagement
  },
  {
    id: "evt-6",
    title: "Baldwin Public Library — API Heritage Month",
    date: "February - May 2026",
    location: "Baldwin Public Library, Michigan",
    desc: "AHC assembled 30 craft kits and set up a cultural display at Baldwin Public Library for API Heritage Month. Visitors could take kits home, extending the reach of the activity well beyond the day itself.",
    img: IMAGES.community_engagement
  },
  {
    id: "evt-7",
    title: "Annual Music Banquet — San Marino Club",
    date: "January 2026",
    location: "San Marino Club, Michigan",
    desc: "AHC performed for a 90-person audience at the Annual Music Banquet. The performance was well received, and our performers were formally recognized with honors for their contribution to the evening.",
    img: IMAGES.team_performance
  },
  {
    id: "evt-8",
    title: "International Academy International Food Night",
    date: "April 2026",
    location: "International Academy, Michigan",
    desc: "AHC members contributed three dishes and performed live music for an audience of 450. One of our highest-attendance events and a strong showcase of what AHC brings to multicultural community programming.",
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
  { url: IMAGES.community_engagement, title: "Kitchen Preparations", desc: "Students working together hand-crafting meals and recording ancestral stories." },
  { url: IMAGES.auburn_hills_event, title: "Auburn Hills Library Workshop", desc: "Our young volunteers and performers sharing traditional music and heritage crafts with children and families." },
  { url: IMAGES.auburn_hills_presenters, title: "Auburn Hills AHC Presenters", desc: "Our talented presenters speaking about community, heritage literacy, and building a stronger cultural future." }
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
