import React, { useState } from "react";
import { IMAGES } from "../data";

interface TeamPageProps {
  onBack: () => void;
}

interface TeamMember {
  id: number;
  name: string;
  title: string;
  primaryBg: string; // Gradient color for profile card badge
  secondaryImg: string; // Secondary unique photo for popup bios
  bio: string;
  contribution: string;
}

const MASTER_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Lyman Yan-Garrison IV",
    title: "Executive Chairman & Co-Founder",
    primaryBg: "from-amber-100 to-amber-200 text-amber-900",
    secondaryImg: IMAGES.founding_story_left,
    bio: "Dr. Yan-Garrison is a distinguished historian of East Asian diaspora movements. With more than fifteen years spent consulting regional schools, he pivoted rote instruction toward community-focused projects.",
    contribution: "Strategic planning, intergenerational storytelling workshops, and board advocacy."
  },
  {
    id: 2,
    name: "Professor Wei-Liang Huang-Chen",
    title: "Educational Curriculum Director",
    primaryBg: "from-rose-100 to-rose-200 text-rose-900",
    secondaryImg: IMAGES.elderly_viewing,
    bio: "Wei-Liang focuses on the intersection of heritage literacy and secondary pedagogical methodology. She designed our signature ink calligraphy tracing systems.",
    contribution: "Syllabus oversight, teacher workshops, and proverb selection masterclass."
  },
  {
    id: 3,
    name: "Xin-Yi Elizabeth Li-Montgomery",
    title: "Chief Performing Arts Director",
    primaryBg: "from-emerald-100 to-emerald-200 text-emerald-950",
    secondaryImg: IMAGES.cello_player,
    bio: "A world-renowned guzheng soloist. Xin-Yi coordinates orchestral collaborations across Michigan and runs youth workshops for wind-bells and stringed instruments.",
    contribution: "Concert management, Guzheng synthesis curves, and stage directing."
  },
  {
    id: 4,
    name: "Marcus Sun-Shin Takahashi",
    title: "Community Outreach & Civic Lead",
    primaryBg: "from-cyan-100 to-cyan-200 text-cyan-950",
    secondaryImg: IMAGES.community_engagement,
    bio: "Marcus directs our volunteer integration networks in midtown Detroit, linking food history classes with local senior shelters.",
    contribution: "Local partner alignments, kitchen operations, and volunteer tracing."
  },
  {
    id: 5,
    name: "Juliana Kaelani Cho-Chaudhry",
    title: "Culinary Heritage Culinary Lead",
    primaryBg: "from-orange-100 to-orange-200 text-orange-950",
    secondaryImg: IMAGES.eastern_market,
    bio: "Juliana documents family recipes from elders, creating dynamic community cookbooks and organizing cross-cultural baking seminars.",
    contribution: "Baking schedules, family interviewing systems, and nutrition checklists."
  },
  {
    id: 6,
    name: "Dr. Arthur Ramesh Chandra-Sen",
    title: "Civic Policy & Heritage Advisor",
    primaryBg: "from-indigo-100 to-indigo-200 text-indigo-900",
    secondaryImg: IMAGES.crowd_watching,
    bio: "Arthur coordinates with regional legislative councils to sponsor cultural appreciation programs for diverse public educational systems.",
    contribution: "Grant writing, civic compliance, and high-school outreach structures."
  },
  {
    id: 7,
    name: "Sienna Mae Ling-Vanderbilt",
    title: "Digital Media & Archive Manager",
    primaryBg: "from-purple-100 to-purple-200 text-purple-900",
    secondaryImg: IMAGES.michigan_women,
    bio: "Sienna specializes in video-documentaries capturing traditional performance guilds and cataloging our photographic database.",
    contribution: "Video shoots, social amplification, layout mockups, and newsroom copy."
  },
  {
    id: 8,
    name: "Benjamin Zhi-Yong Patel-Nguyen",
    title: "Director of Philanthropic Grants",
    primaryBg: "from-violet-100 to-violet-200 text-violet-900",
    secondaryImg: IMAGES.oakland_church,
    bio: "Benjamin manages grant compliance and matches our projects with foundational endowment awards to ensure all events remain free.",
    contribution: "Endowment strategies, Candid audit submissions, and investor reports."
  },
  {
    id: 9,
    name: "Katherine Yoshiko Nakajima-Smith",
    title: "Volunteer Coordinator & Staff Lead",
    primaryBg: "from-pink-100 to-pink-200 text-pink-900",
    secondaryImg: IMAGES.team_performance,
    bio: "Katherine ensures all student program applicants find their ideal fit across mentoring, arts, music, or food preparation sectors.",
    contribution: "Student screening, tutor matching lists, and onboarding events."
  },
  {
    id: 10,
    name: "Master Chen-Wei Ronald Tsao",
    title: "Traditional Scribe & Brush Coach",
    primaryBg: "from-amber-200 to-orange-100 text-amber-950",
    secondaryImg: IMAGES.founding_story_left,
    bio: "A lifelong scholar of ink calligraphy. Master Tsao conducts weekend workshops teaching brush velocity and historical text alignment.",
    contribution: "In-presents feedback lists, scroll calibrations, and ink analysis."
  },
  {
    id: 11,
    name: "Leilani Xiao-He Henderson-Reyes",
    title: "Co-Director of Youth Activities",
    primaryBg: "from-teal-100 to-teal-200 text-teal-950",
    secondaryImg: IMAGES.community_engagement,
    bio: "Leilani implements interactive games and arts for elementary and middle school attendees to spark initial ethnic pride.",
    contribution: "Storybook creation, holiday craft kits, and playground games."
  },
  {
    id: 12,
    name: "Rohan Jin-Sheng Subramanian",
    title: "Music Technology Specialist",
    primaryBg: "from-blue-100 to-blue-200 text-blue-900",
    secondaryImg: IMAGES.cello_player,
    bio: "Rohan engineered our virtual pentatonic oscillators and oversees audio recording equipment for our concerts and digital hubs.",
    contribution: "Web audio setups, microtonal tunings, sound board setups."
  },
  {
    id: 13,
    name: "Audrey Sophia Wu-Blankenship",
    title: "Public Relations & Media Liaison",
    primaryBg: "from-red-100 to-red-200 text-red-900",
    secondaryImg: IMAGES.eastern_market,
    bio: "Audrey coordinates interviews with regional news directors and schedules folk showcases in regional festivals.",
    contribution: "Press release copy, radio bookings, and digital banners."
  },
  {
    id: 14,
    name: "Raymond Jae-Woo Park-Kovacs",
    title: "Senior Food Program Specialist",
    primaryBg: "from-lime-100 to-lime-200 text-lime-950",
    secondaryImg: IMAGES.community_engagement,
    bio: "Raymond organizes safe sourcing of traditional baking components, enforcing healthy preparation codes in community kitchens.",
    contribution: "Sourcing local gardens, menu analysis, and hygiene rules."
  },
  {
    id: 15,
    name: "Dr. Mei-Lin Cynthia Sterling-Zhao",
    title: "Academic Research Representative",
    primaryBg: "from-fuchsia-100 to-fuchsia-200 text-fuchsia-950",
    secondaryImg: IMAGES.elderly_viewing,
    bio: "Cynthia measures student retention metrics across our narrative curriculum, publishing analytical impact papers.",
    contribution: "Data surveys, engagement tracking forms, and educational statistics."
  },
  {
    id: 16,
    name: "Jonathan Seung-Il Takahashi-Vance",
    title: "Social Impact Integration Expert",
    primaryBg: "from-yellow-101 to-yellow-200 text-yellow-950",
    secondaryImg: IMAGES.crowd_watching,
    bio: "Jonathan bridges high school clubs with the leadership track of our collective, helping teens write scholarship applications.",
    contribution: "Scholarship mentoring, youth leadership development, and service credits."
  },
  {
    id: 17,
    name: "Professor Amara Priya Gupta-Song",
    title: "Linguistic Senior Consultant",
    primaryBg: "from-sky-100 to-sky-200 text-sky-950",
    secondaryImg: IMAGES.founding_story_left,
    bio: "A language development specialist tracking HSK benchmark parameters. Amara builds conversational games for beginners.",
    contribution: "Pinyin alignment, vocabulary drills, and flashcard layouts."
  },
  {
    id: 18,
    name: "Christian Ming-De O'Connor-Sun",
    title: "Legal Counsel & Governance Officer",
    primaryBg: "from-emerald-200 to-emerald-300 text-emerald-950",
    secondaryImg: IMAGES.oakland_church,
    bio: "Christian ensures compliance across state charitable registrations and monitors fair-wage community agreements.",
    contribution: "Tax status maintenance, liability releases, and board codes."
  },
  {
    id: 19,
    name: "Victoria Keiko Ishii-Rosenberg",
    title: "Exhibition Creative Coordinator",
    primaryBg: "from-amber-100 to-orange-200 text-amber-900",
    secondaryImg: IMAGES.michigan_women,
    bio: "Victoria designs physical displays inside markets and malls, choosing typography and red silk accents for folk events.",
    contribution: "Stage framing, visual displays, and catalog curation."
  },
  {
    id: 20,
    name: "Devendra Rajiv Nair-Cheung",
    title: "Treasurer & Financial Strategist",
    primaryBg: "from-neutral-100 to-neutral-200 text-neutral-900",
    secondaryImg: IMAGES.team_performance,
    bio: "Devendra oversees accounting, bookkeeping, and provides periodic transparent dashboard updates to donors.",
    contribution: "Tax returns, quarterly reports, and payment system management."
  },
  {
    id: 21,
    name: "Serena Joy Cho-Westerberg",
    title: "Digital Humanities Archivist",
    primaryBg: "from-rose-200 to-pink-200 text-rose-950",
    secondaryImg: IMAGES.elderly_viewing,
    bio: "Serena digitizes ancestral stories told by workshop elders to safeguard folklore definitions for future digital historians.",
    contribution: "Audio transcription, folklore translation indexes, and storage servers."
  },
  {
    id: 22,
    name: "Master Xian-Gong Stephen Wang",
    title: "Master Flautist & Folk Consultant",
    primaryBg: "from-violet-200 to-indigo-100 text-violet-950",
    secondaryImg: IMAGES.cello_player,
    bio: "A traditional flute educator. Stephen leads wind instrumental projects and designs collaborative scores with string cello groups.",
    contribution: "Dizi flutes tutoring, notation sheets, and ensemble structures."
  },
  {
    id: 23,
    name: "Lydia Chae-Won Kim-Fitzpatrick",
    title: "Civic Partnership Coordinator",
    primaryBg: "from-orange-200 to-red-100 text-orange-950",
    secondaryImg: IMAGES.eastern_market,
    bio: "Lydia acts as our lead contact for Detroit area markets and community community gardens, setting local events schedules.",
    contribution: "Site permits, vendor scheduling, and local event setups."
  },
  {
    id: 24,
    name: "Preeti Lakshmi Sharma-Song",
    title: "Board Secretary & Advocacy Officer",
    primaryBg: "from-teal-200 to-sky-100 text-teal-980",
    secondaryImg: IMAGES.team_performance,
    bio: "Preeti coordinates internal operations, schedules monthly steering committee sessions, and maintains meeting registers.",
    contribution: "Bylaws records, director alignments, and civic reports."
  }
];

export default function TeamPage({ onBack }: TeamPageProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-surface select-text relative animate-fade-in">
      {/* Background aesthetics */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="mb-8 font-body text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 bg-white/40 px-5 py-2.5 rounded-full border border-primary/10 transition-all hover:scale-[1.02] active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Homepage
        </button>

        {/* Top Banner section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-body text-xs font-bold uppercase tracking-widest block mb-1">
            Trust &amp; Alignment
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">
            Meet the Team
          </h2>
          <p className="font-body text-sm md:text-base text-on-surface-variant mt-2 leading-relaxed">
            Exactly 24 dedicated directors, specialists, and advisors working across midtown Michigan to expand traditional education and community impact.
          </p>
        </div>

        {/* 24-member interactive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MASTER_TEAM.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="liquid-glass-strong rounded-2xl p-6 text-center border border-primary/5 hover:border-primary/25 cursor-pointer transform hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between items-center h-[260px]"
            >
              <div className="flex flex-col items-center gap-4 w-full">
                {/* Profile Picture Placeholder */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={IMAGES.john_pork}
                    alt="Profile placeholder"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-1 w-full text-center">
                  <h4 className="font-headline text-md font-bold text-primary leading-tight group-hover:text-primary-container transition-colors line-clamp-2 px-1">
                    {member.name}
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant font-medium leading-tight px-1 line-clamp-2">
                    {member.title}
                  </p>
                </div>
              </div>

              <span className="font-body text-[10px] font-bold text-primary uppercase tracking-wider group-hover:underline block mt-3 shrink-0">
                Read Biography →
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Member Details Pop-up Dialogue */}
      {selectedMember && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-bright border border-outline/20 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative select-text animate-pop-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors p-2"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {/* Content layout */}
            <div className="flex flex-col md:flex-row gap-6 items-start mt-4">
              <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-3">
                <div className="h-36 overflow-hidden rounded-2xl border-2 border-primary/20 transform hover:scale-[1.01] transition-transform">
                  <img
                    alt={`${selectedMember.name} profile`}
                    className="w-full h-full object-cover object-top"
                    src={IMAGES.john_pork}
                  />
                </div>
                <div className="h-28 overflow-hidden rounded-2xl border-2 border-primary/20 transform hover:scale-[1.01] transition-transform">
                  <img
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer" loading="lazy"
                    src={selectedMember.secondaryImg}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4 text-left">
                <div>
                  <h3 className="font-headline text-2xl text-primary font-bold leading-snug">
                    {selectedMember.name}
                  </h3>
                  <p className="font-body text-xs text-secondary font-bold uppercase tracking-widest mt-1">
                    {selectedMember.title}
                  </p>
                </div>

                <div className="border hover:border-primary/10 p-4 rounded-xl bg-primary/5">
                  <h4 className="text-xs font-bold text-primary font-body uppercase tracking-wider mb-1.5">
                    Background Biogaphy
                  </h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-on-surface-variant font-body uppercase tracking-wider">
                    Core Operational Focus
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant/80 italic leading-relaxed">
                    {selectedMember.contribution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
