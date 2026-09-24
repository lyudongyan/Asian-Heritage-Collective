export interface EventImage {
  file: string; // filename in src/assets/images/
  alt: string;
}

export interface PastEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  imageFile: string;           // main cover image filename
  imageFiles: string[];        // gallery image filenames (including main)
}

export const PAST_EVENTS: PastEvent[] = [
  {
    id: "evt-4",
    title: "Auburn Hills Public Library — API Heritage Month",
    date: "May 2026",
    location: "Auburn Hills Public Library, Michigan",
    desc: "For Asian Pacific Islander Heritage Month, AHC hosted an origami workshop with 20 participants alongside a presentation on Asian heritage history. The event reached an audience largely new to AHC's work.",
    imageFile: "auburn_hills_event.webp",
    imageFiles: ["auburn_hills_event.webp", "auburn_hills_presenters.webp", "ahpl_full_table_view.jpg"],
  },
  {
    id: "evt-6",
    title: "Baldwin Public Library — API Heritage Month",
    date: "February - May 2026",
    location: "Baldwin Public Library, Michigan",
    desc: "AHC assembled 30 craft kits and set up a cultural display at Baldwin Public Library for API Heritage Month. Visitors could take kits home, extending the reach of the activity well beyond the day itself.",
    imageFile: "baldwin_pl_event.jpeg",
    imageFiles: ["baldwin_pl_event.jpeg"],
  },
  {
    id: "evt-3",
    title: "Detroit Eastern Market Performance",
    date: "April 2026",
    location: "Detroit Eastern Market",
    desc: "AHC performed traditional Chinese music for a crowd of 2,500. Alongside the performance, we ran a free public calligraphy activity with 60 participants and sold Chinese fans, raising $100 for the Association of Chinese Americans. One of our largest public appearances to date.",
    imageFile: "eastern_market_performance.webp",
    imageFiles: ["eastern_market_performance.webp", "eastern_market_event.webp", "eastern_market.webp"],
  },
  {
    id: "evt-8",
    title: "International Academy International Food Night",
    date: "April 2026",
    location: "International Academy, Michigan",
    desc: "AHC members contributed three dishes and performed live music for an audience of 450. One of our highest-attendance events and a strong showcase of what AHC brings to multicultural community programming.",
    imageFile: "international_food_night.png",
    imageFiles: ["international_food_night.png"],
  },
  {
    id: "evt-5",
    title: "Grace Centers of Hope — Volunteer Meal Service",
    date: "March 2026",
    location: "Grace Centers of Hope, Michigan",
    desc: "Six AHC members prepared 300 meals for homeless individuals and veterans served by Grace Centers of Hope. A straightforward service event, and one of the ones we're most proud of.",
    imageFile: "community_engagement.webp",
    imageFiles: ["community_engagement.webp", "crowd_watching.webp"],
  },
  {
    id: "evt-7",
    title: "Annual Music Banquet — San Marino Club",
    date: "January 2026",
    location: "San Marino Club, Michigan",
    desc: "AHC performed for a 90-person audience at the Annual Music Banquet. The performance was well received, and our performers were formally recognized with honors for their contribution to the evening.",
    imageFile: "san_marino_performance.jpg",
    imageFiles: ["san_marino_performance.jpg"],
  },
  {
    id: "evt-2",
    title: "Michigan Chinese Women's Association Annual Banquet",
    date: "September 2025",
    location: "Michigan",
    desc: "AHC ran a sticker-making activity for 10 children and performed traditional music for 400 banquet guests. Pieces performed included the Butterfly Lovers Violin Concerto and Colorful Clouds Chasing the Moon. One of AHC's first large-audience performances.",
    imageFile: "mcwa_banquet.webp",
    imageFiles: ["mcwa_banquet.webp", "michigan_women.webp", "cello_player.webp", "mcwa_banquet_crowd_view.jpeg"],
  },
  {
    id: "evt-1",
    title: "Oakland Chinese Church Annual Open House",
    date: "August 2025",
    location: "Oakland Chinese Church, Michigan",
    desc: "AHC brought sticker-making, badminton, and a cultural intro presentation to OCC's annual open house, welcoming 35 attendees. Brady Morishita of OCC noted the event went excellently and thanked AHC for hosting. An early demonstration of what AHC's community programming could look like at its best.",
    imageFile: "open_house_event.webp",
    imageFiles: ["open_house_event.webp", "oakland_church.webp"],
  },
];
