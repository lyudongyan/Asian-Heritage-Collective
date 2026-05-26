import React, { useState } from "react";
import { IMAGES } from "../data";

interface BlogPageProps {
  onBack: () => void;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  img: string;
  tag: string;
}

const TEN_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Reviving Language through Active Storytelling",
    date: "May 12, 2026",
    author: "Dr. Lyman Yan-Garrison IV",
    excerpt: "How traditional memorization failed our children, and how storytelling and performance brought Chinese back to life.",
    content: "For years, Chinese school was seen as a weekend chore of memorizing stroke orders and characters. Mr. Yan noticed a sharp, alarming drop in student engagement. By transitioning classes towards modern role-play, short performances of Chinese myths, and active storybook writing, we saw an immediate 40% jump in vocabulary retention and children actually asking to join! Understanding heritage shouldn't be a test of rote memory, but an exploration of living narrative.\n\nWe focus on conversational bridges, making sure vocabulary words are instantly put into action inside theater skits, rather than stored silently on lined paper.",
    img: IMAGES.cultural_performance,
    tag: "Language"
  },
  {
    id: 2,
    title: "Preserving the Craft of Calligraphy in a Digital Era",
    date: "April 18, 2026",
    author: "Master Chen-Wei Ronald Tsao",
    excerpt: "In a world of fast-moving keyboards, the calligraphy brush offers a slow, therapeutic connection to history.",
    content: "At our recent spring workshop, over forty youth held a traditional ink brush for the first time. The slow, intentional breathing and muscle control required to paint standard characters sparked a deep curiosity. Many participants noted it felt like a screenless meditation. This craft connects modern fingers directly with historical minds.\n\nWriting characters is a study of visual balance and ink saturation. In our latest curriculum, we teach how the brush stroke mirrors physical posture and emotional tranquility.",
    img: IMAGES.founding_story_left,
    tag: "Traditional Art"
  },
  {
    id: 3,
    title: "Culinary Heritage: Dumplings, Culture, and Classrooms",
    date: "March 5, 2026",
    author: "Juliana Kaelani Cho-Chaudhry",
    excerpt: "Inside our food history session: learning cultural migration patterns through family recipes.",
    content: "Recipes are active living maps of migration. At our latest community service event, youth pairs interviewed local senior citizens of Asian descent, documenting family recipes and baking traditional stuffed dumplings. The outcome was a beautifully compiled community cookbook distributed across regional schools, bridging generations over a kitchen table.\n\nFood forms the social bedrock of memory. When a child folds a dumpling pleat beside a grandmother, they absorb not just a cooking instruction, but chapters of immigrant perseverance other textbooks ignore.",
    img: IMAGES.community_engagement,
    tag: "Culinary Art"
  },
  {
    id: 4,
    title: "The Intergenerational Bridge: Learning from Our Elders",
    date: "January 28, 2026",
    author: "Dr. Mei-Lin Cynthia Sterling-Zhao",
    excerpt: "Exploring our oral history project tracking the stories of Detroit's earliest Asian elders.",
    content: "Our oral history program pairs teenage students with senior residents to record, transcribe, and translate historical diaries and memory recollections. The mutual empathy built during these three-hour dialogue series is breathtaking.\n\nOlder participants feel recognized, while our youth gain perspective on community struggle and political adaptation, finding their own anchor points in a complex modern landscape.",
    img: IMAGES.elderly_viewing,
    tag: "Civic History"
  },
  {
    id: 5,
    title: "Folk Instrumental Fusion: Classic Strings Meet Guzheng Melodies",
    date: "November 14, 2025",
    author: "Xin-Yi Elizabeth Li-Montgomery",
    excerpt: "How our chamber orchestra blends classic cellos with Guzhengs to create modern masterpieces.",
    content: "Why limit traditional music to museum cases? By arranging folk scores that pair classical cellos, violins, and woodwinds, we create rich acoustics that resonate with both classic Western listeners and Eastern string enthusiasts.\n\nOur latest public performance proved that musical heritage is not a static rulebook, but a flowing river that grows wilder and more beautiful when tributary streams merge.",
    img: IMAGES.cello_player,
    tag: "Music"
  },
  {
    id: 6,
    title: "Eastern Market: Creating a Shared Hub for Heritage",
    date: "September 8, 2025",
    author: "Marcus Sun-Shin Takahashi",
    excerpt: "Highlighting our collaborative venue where families and performing artists assemble.",
    content: "Eastern Market has always been the heart of Detroit commerce. By setting our 'Kitchen Commons' performative stage in its center, we introduce thousands of weekend morning shoppers to live folk workshops, Guzheng sweeps, and ink drawings.\n\nFood, commerce, and culture are naturally linked. Our public hub establishes active visibility for Asian-American initiatives in places with shared, inclusive communal histories.",
    img: IMAGES.eastern_market,
    tag: "Community Space"
  },
  {
    id: 7,
    title: "Bridging the Midwest: The Role of Women-Led Cultural Alliances",
    date: "July 24, 2025",
    author: "Raymond Jae-Woo Park-Kovacs",
    excerpt: "Honoring our partnership with the ACA Michigan Chinese Women Association and their history.",
    content: "Behind many permanent public institutions are decades of quiet organizer effort led by women. Our latest exhibit documents the foundational classes and charitable galas orchestrated by Michigan groups over thirty years.\n\nTheir commitment built the initial infrastructure for language tutoring, immigrant civic guidance, and artistic showcase networks that we enjoy and expand today.",
    img: IMAGES.michigan_women,
    tag: "Advocacy"
  },
  {
    id: 8,
    title: "Sourcing Scribes: Constructing Curated Art Display Boards",
    date: "June 2, 2025",
    author: "Victoria Keiko Ishii-Rosenberg",
    excerpt: "A behind-the-scenes look at how we design graphic exhibits that command focus.",
    content: "Good exhibition design bridges visual art and accessibility. We walk through how we build wooden frames, custom backlights, and red silk draperies to transform community centers into sacred educational halls.\n\nBy matching traditional calligraphies with clean modern typography, we display history with the respect it commands.",
    img: IMAGES.oakland_church,
    tag: "Design"
  },
  {
    id: 9,
    title: "Audience Perspectives: Why Live Performance Moves Us",
    date: "April 15, 2025",
    author: "Jonathan Seung-Il Takahashi-Vance",
    excerpt: "What survey responses teach us about the profound emotional impact of live folk instruments.",
    content: "When analyzing visitor reviews, a consistent trend emerges: parents and children alike report feeling 'deep comfort' and 'belonging' when hearing Guzheng chords in public plazas.\n\nThis psychological response shows that music bypasses cognitive boundaries, evoking shared comfort and familial memory sheets even in listeners without prior exposure to the scale.",
    img: IMAGES.crowd_watching,
    tag: "Research"
  },
  {
    id: 10,
    title: "Ensuring Financial Transparency in Minor NPO Sectors",
    date: "February 28, 2025",
    author: "Devendra Rajiv Nair-Cheung",
    excerpt: "How we achieve the Candid Silver Mark through complete open-ledger accounting systems.",
    content: "Trust is the primary currency of a non-profit association. We outline why we maintain open Ledgers detailing every public grant and corporate sponsorship.\n\nBy detailing exactly how funds are funneled directly into materials for child pens, ink stone blocks, instrument tuning, and senior kitchens, we guarantee our supporters that their investment yields direct civic return.",
    img: IMAGES.team_performance,
    tag: "Transparency"
  }
];

export default function BlogPage({ onBack }: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
    <div className="pt-32 pb-24 min-h-screen bg-[#faf8f6] select-text relative animate-fade-in text-left">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Homepage
        </button>

        {/* Header Title */}
        <div className="max-w-xl mb-16">
          <span className="text-primary font-body text-xs font-bold uppercase tracking-widest block mb-1">
            Community Newsroom
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">
            Living Heritage Blog
          </h2>
          <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
            Read stories, historical essays, and development research written by our directors, traditional artists, and volunteers.
          </p>
        </div>

        {/* Blog layout grid - exactly 10 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEN_BLOGS.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-primary/25 shadow-sm hover:shadow-xl cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 w-full overflow-hidden relative border-b border-neutral-50">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer" loading="lazy"
                    src={post.img}
                  />
                  <span className="absolute top-4 left-4 bg-primary text-on-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md font-mono">
                    {post.tag}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex gap-2 items-center text-[11px] text-on-surface-variant/70 font-semibold font-mono">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span>{post.author}</span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-primary group-hover:text-primary-container leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant/85 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs text-primary font-bold font-body group-hover:underline inline-block uppercase tracking-wider">
                  Read Full Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Dynamic Pop-up Modal */}
    {selectedPost && (
      <div
        className="fixed bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        style={{ position: "fixed", inset: 0, zIndex: 9999 }}
        onClick={() => setSelectedPost(null)}
      >
        <div
          className="bg-white border rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative select-text animate-pop-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-primary transition-colors p-2 z-10 bg-white/80 rounded-full shadow-sm animate-fade-in"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Banner picture */}
          <div className="h-64 w-full overflow-hidden relative">
            <img
              alt={selectedPost.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer" loading="lazy"
              src={selectedPost.img}
            />
            <span className="absolute bottom-4 left-4 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg">
              {selectedPost.tag}
            </span>
          </div>

          {/* Article content */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex gap-2 items-center text-xs text-on-surface-variant/70 font-semibold font-mono">
                <span>{selectedPost.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                <span>By {selectedPost.author}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary font-bold leading-snug">
                {selectedPost.title}
              </h3>
            </div>

            <div className="p-4 border-l-4 border-primary/20 bg-primary/5 rounded-r-xl italic font-body text-sm text-on-surface-variant/90 leading-relaxed">
              "{selectedPost.excerpt}"
            </div>

            <div className="font-body text-sm md:text-base text-on-surface-variant/95 leading-relaxed whitespace-pre-line space-y-4">
              {selectedPost.content}
            </div>

            <div className="border-t border-neutral-100 pt-6 flex justify-between items-center text-xs">
              <span className="font-semibold text-on-surface-variant/70 font-mono">
                Category: {selectedPost.tag}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-primary text-on-primary px-5 py-2 rounded-full font-body font-bold text-xs uppercase tracking-wider hover:bg-primary-container active:scale-95 transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
