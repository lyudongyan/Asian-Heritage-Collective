import React, { useState, useEffect } from "react";
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
  images: string[];
}

const PAST_EVENTS_LIST: EventItem[] = [
  {
    id: "evt-4",
    title: "Auburn Hills Public Library — API Heritage Month",
    date: "May 2026",
    location: "Auburn Hills Public Library, Michigan",
    desc: "For Asian Pacific Islander Heritage Month, AHC hosted an origami workshop with 20 participants alongside a presentation on Asian heritage history. The event reached an audience largely new to AHC's work.",
    img: IMAGES.auburn_hills_event,
    images: [IMAGES.auburn_hills_event, IMAGES.auburn_hills_presenters, IMAGES.ahpl_full_table_view]
  },
  {
    id: "evt-6",
    title: "Baldwin Public Library — API Heritage Month",
    date: "February - May 2026",
    location: "Baldwin Public Library, Michigan",
    desc: "AHC assembled 30 craft kits and set up a cultural display at Baldwin Public Library for API Heritage Month. Visitors could take kits home, extending the reach of the activity well beyond the day itself.",
    img: IMAGES.baldwin_pl_event,
    images: [IMAGES.baldwin_pl_event]
  },
  {
    id: "evt-3",
    title: "Detroit Eastern Market Performance",
    date: "April 2026",
    location: "Detroit Eastern Market",
    desc: "AHC performed traditional Chinese music for a crowd of 2,500. Alongside the performance, we ran a free public calligraphy activity with 60 participants and sold Chinese fans, raising $100 for the Association of Chinese Americans. One of our largest public appearances to date.",
    img: IMAGES.eastern_market_performance,
    images: [IMAGES.eastern_market_performance, IMAGES.eastern_market_event, IMAGES.eastern_market]
  },
  {
    id: "evt-8",
    title: "International Academy International Food Night",
    date: "April 2026",
    location: "International Academy, Michigan",
    desc: "AHC members contributed three dishes and performed live music for an audience of 450. One of our highest-attendance events and a strong showcase of what AHC brings to multicultural community programming.",
    img: IMAGES.international_food_night,
    images: [IMAGES.international_food_night]
  },
  {
    id: "evt-5",
    title: "Grace Centers of Hope — Volunteer Meal Service",
    date: "March 2026",
    location: "Grace Centers of Hope, Michigan",
    desc: "Six AHC members prepared 300 meals for homeless individuals and veterans served by Grace Centers of Hope. A straightforward service event, and one of the ones we're most proud of.",
    img: IMAGES.community_engagement,
    images: [IMAGES.community_engagement, IMAGES.crowd_watching]
  },
  {
    id: "evt-7",
    title: "Annual Music Banquet — San Marino Club",
    date: "January 2026",
    location: "San Marino Club, Michigan",
    desc: "AHC performed for a 90-person audience at the Annual Music Banquet. The performance was well received, and our performers were formally recognized with honors for their contribution to the evening.",
    img: IMAGES.san_marino_performance,
    images: [IMAGES.san_marino_performance]
  },
  {
    id: "evt-2",
    title: "Michigan Chinese Women's Association Annual Banquet",
    date: "September 2025",
    location: "Michigan",
    desc: "AHC ran a sticker-making activity for 10 children and performed traditional music for 400 banquet guests. Pieces performed included the Butterfly Lovers Violin Concerto and Colorful Clouds Chasing the Moon. One of AHC's first large-audience performances.",
    img: IMAGES.mcwa_banquet,
    images: [IMAGES.mcwa_banquet, IMAGES.michigan_women, IMAGES.cello_player, IMAGES.mcwa_banquet_crowd_view]
  },
  {
    id: "evt-1",
    title: "Oakland Chinese Church Annual Open House",
    date: "August 2025",
    location: "Oakland Chinese Church, Michigan",
    desc: "AHC brought sticker-making, badminton, and a cultural intro presentation to OCC's annual open house, welcoming 35 attendees. Brady Morishita of OCC noted the event went excellently and thanked AHC for hosting. An early demonstration of what AHC's community programming could look like at its best.",
    img: IMAGES.open_house_event,
    images: [IMAGES.open_house_event, IMAGES.oakland_church]
  }
];

export default function EventsPage({ onBack }: EventsPageProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Smooth scroll to top of page when event detail is opened or changed
  useEffect(() => {
    if (selectedEventId !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedEventId]);

  // Render detail view if an event is selected
  if (selectedEventId !== null) {
    const eventIndex = PAST_EVENTS_LIST.findIndex((e) => e.id === selectedEventId);
    const evt = PAST_EVENTS_LIST[eventIndex];

    if (evt) {
      return (
        <div className="pt-32 pb-24 min-h-screen bg-about relative select-text">
          <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-4xl animate-fade-in">
            {/* Back button */}
            <button
              onClick={() => setSelectedEventId(null)}
              className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Events
            </button>

            {/* Event detail card */}
            <article key={evt.id} className="liquid-glass-strong rounded-3xl p-6 md:p-10 border border-primary/5 shadow-sm space-y-8 text-left">
              {/* Header */}
              <div className="space-y-4 animate-slide-up-fade">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">
                    {evt.date}
                  </span>
                  <span className="text-on-surface-variant/70 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span> {evt.location}
                  </span>
                </div>
                <h1 className="font-headline text-3xl md:text-5xl text-primary font-bold leading-tight">
                  {evt.title}
                </h1>
              </div>

              {/* Main Cover Image */}
              <div className="w-full h-64 md:h-[450px] overflow-hidden rounded-2xl border border-white/50 shadow-inner animate-slide-up-fade delay-100">
                <img
                  alt={evt.title}
                  className="w-full h-full object-cover"
                  src={evt.img}
                />
              </div>

              {/* Description */}
              <div className="space-y-4 animate-slide-up-fade delay-200">
                <h3 className="font-headline text-xl text-primary font-bold">Event Summary</h3>
                <p className="font-body text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {evt.desc}
                </p>
              </div>

              {/* Event Gallery */}
              {evt.images.length > 0 && (
                <div className="space-y-4 border-t border-primary/10 pt-8 mt-8 animate-slide-up-fade delay-300">
                  <h3 className="font-headline text-xl text-primary font-bold">Event Photos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {evt.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImg(img)}
                        className="group relative h-48 rounded-xl overflow-hidden shadow-sm border border-white/50 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
                      >
                        <img
                          alt={`${evt.title} gallery image ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={img}
                        />
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="border-t border-primary/10 pt-8 mt-12 flex items-center justify-between gap-4 animate-slide-up-fade delay-400">
                {eventIndex > 0 ? (
                  <button
                    onClick={() => setSelectedEventId(PAST_EVENTS_LIST[eventIndex - 1].id)}
                    className="font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Previous Event
                  </button>
                ) : (
                  <div />
                )}

                {eventIndex < PAST_EVENTS_LIST.length - 1 ? (
                  <button
                    onClick={() => setSelectedEventId(PAST_EVENTS_LIST[eventIndex + 1].id)}
                    className="font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  >
                    Next Event
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </article>
          </div>

          {/* Lightbox Modal inside selected view */}
          {lightboxImg && (
            <div
              className="fixed bg-black/90 backdrop-blur-md flex items-center justify-center"
              style={{ position: "fixed", inset: 0, zIndex: 9999 }}
              onClick={() => setLightboxImg(null)}
            >
              <div
                className="relative w-full max-w-4xl mx-4 animate-pop-in"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightboxImg(null)}
                  className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors p-2 flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wider z-10"
                >
                  <span className="material-symbols-outlined text-2xl">close</span> Close
                </button>
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="max-h-[70vh] w-full bg-black/40 flex items-center justify-center overflow-hidden">
                    <img
                      alt="Enlarged view"
                      className="max-h-[70vh] max-w-full object-contain"
                      src={lightboxImg}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  // Events list view
  return (
    <div className="pt-32 pb-24 min-h-screen bg-impact relative select-text">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px] animate-fade-in">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
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
            Take a stroll through our archive of historic assemblies, performances, workshops, and communal cooking programs.
          </p>
        </div>

        {/* Detailed Events Sections */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {PAST_EVENTS_LIST.map((evt) => (
            <div
              key={evt.id}
              onClick={() => setSelectedEventId(evt.id)}
              className="liquid-glass-strong rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border border-primary/5 hover:border-primary/25 cursor-pointer transform hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="w-full md:w-1/3 h-52 overflow-hidden rounded-2xl border border-white/50 shrink-0 transform group-hover:scale-[1.02] transition-all">
                <img
                  alt={evt.title}
                  className="w-full h-full object-cover"
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
                <span className="font-body text-[10px] font-bold text-primary uppercase tracking-wider block mt-2 hover:underline">
                  View Event Details &amp; Gallery →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
