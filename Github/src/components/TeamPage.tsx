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
  primaryImg: string; // Primary unique photo
  secondaryImg: string; // Secondary unique photo for popup bios
  bio: string;
  contribution: string;
}

const MASTER_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Lyudong Yan",
    title: "Executive Director",
    primaryBg: "from-red-100 to-red-200 text-red-950",
    primaryImg: IMAGES.lyudong_yan_1,
    secondaryImg: IMAGES.lyudong_yan_2,
    bio: "Lyudong Yan brings visionary leadership to the Asian Heritage Collective, steering strategic development and fostering community relationships across Michigan. Passionate about linking heritage literacy with modern youth development, Lyudong works to expand free cultural workshops.",
    contribution: "Executive oversight, strategic fundraising, board advocacy, and community partnership management."
  },
  {
    id: 2,
    name: "Zeyad Karichiwala",
    title: "Director of Operations",
    primaryBg: "from-sky-100 to-sky-200 text-sky-950",
    primaryImg: IMAGES.zeyad_karichiwala_1,
    secondaryImg: IMAGES.zeyad_karichiwala_2,
    bio: "Zeyad Karichiwala oversees daily logistics, operational systems, and legal compliance, ensuring that all our workshops, performances, and public events run seamlessly and safely across our various sites.",
    contribution: "Daily operations, compliance auditing, logistical planning, and volunteer coordination."
  },
  {
    id: 3,
    name: "Jerry Mao",
    title: "Music Department Head",
    primaryBg: "from-emerald-100 to-emerald-200 text-emerald-950",
    primaryImg: IMAGES.jerry_mao_1,
    secondaryImg: IMAGES.jerry_mao_2,
    bio: "Jerry Mao directs the traditional music programs, bridging classical ensembles with contemporary fusion and designing interactive microtonal classes that introduce young string players to traditional Asian instruments.",
    contribution: "Musical score curation, student rehearsal schedules, performance coaching, and orchestral synchronization."
  },
  {
    id: 4,
    name: "Joanne Lien",
    title: "Volunteer Department Head",
    primaryBg: "from-pink-100 to-pink-200 text-pink-950",
    primaryImg: IMAGES.joanne_lien_1,
    secondaryImg: IMAGES.joanne_lien_2,
    bio: "Joanne Lien manages the volunteer recruitment and training pipelines, matching enthusiastic student applicants and community mentors with local senior hubs, schools, and cultural workshops.",
    contribution: "Volunteer alignment, training workshops, screening systems, and service hour certification."
  },
  {
    id: 5,
    name: "Sunny Ishihara",
    title: "Art Department Head",
    primaryBg: "from-amber-100 to-amber-200 text-amber-950",
    primaryImg: IMAGES.sunny_ishihara_1,
    secondaryImg: IMAGES.sunny_ishihara_2,
    bio: "Sunny Ishihara coordinates the physical visual arts portfolio, planning traditional brush-painting, calligraphy sessions, and seasonal cultural craft workshops that spark creative pride in our students.",
    contribution: "Curating workshops, exhibition stage design, traditional scroll calibrations, and art supplies sourcing."
  },
  {
    id: 6,
    name: "Peter Wang",
    title: "Marketing Head",
    primaryBg: "from-indigo-100 to-indigo-200 text-indigo-950",
    primaryImg: IMAGES.peter_wang_1,
    secondaryImg: IMAGES.peter_wang_2,
    bio: "Peter Wang leads our strategic marketing initiatives, building awareness for our public showcases, designing promotional materials, and growing our local subscriber audience across midtown Detroit.",
    contribution: "Campaign coordination, public relations scheduling, press release copy, and outreach tracking."
  },
  {
    id: 7,
    name: "Yewon Lee",
    title: "Social Media Manager",
    primaryBg: "from-violet-100 to-violet-200 text-violet-950",
    primaryImg: IMAGES.yewon_lee_1,
    secondaryImg: IMAGES.yewon_lee_2,
    bio: "Yewon Lee produces short-form video campaigns and captures weekly reels to spotlight our performance students, community cooks, and traditional workshop showcases on social platforms.",
    contribution: "TikTok & Instagram reels creation, content calendar scheduling, and public comments interaction."
  },
  {
    id: 8,
    name: "Raina Li",
    title: "Digital Media Manager",
    primaryBg: "from-rose-100 to-rose-200 text-rose-950",
    primaryImg: IMAGES.raina_li_1,
    secondaryImg: IMAGES.raina_li_2,
    bio: "Raina Li develops our graphic guidelines, promotional digital flyers, and monthly newsletters, maintaining high visual consistency across both print and web platforms.",
    contribution: "Newsletter editorial, branding assets creation, digital layout mockups, and newsroom copy."
  },
  {
    id: 9,
    name: "Leila Karichiwala",
    title: "Visual Design",
    primaryBg: "from-teal-100 to-teal-200 text-teal-950",
    primaryImg: IMAGES.leila_karichiwala_1,
    secondaryImg: IMAGES.leila_karichiwala_2,
    bio: "Leila Karichiwala crafts beautiful illustrations, promotional flyers, and poster backdrops that give all our public cultural festivals their cohesive, traditional-meets-modern look.",
    contribution: "Illustration drawing, typography selection, banner design, and poster layouts."
  },
  {
    id: 10,
    name: "Akira Kongkanand",
    title: "Blog Writer",
    primaryBg: "from-amber-100 to-amber-200 text-amber-950",
    primaryImg: IMAGES.akira_kongkanand_1,
    secondaryImg: IMAGES.akira_kongkanand_2,
    bio: "Akira Kongkanand serves as the Blog Writer for the Asian Heritage Collective, chronicling the rich histories, personal narratives, and cultural milestones of our vibrant community. With a deep passion for storytelling and heritage education, Akira crafts high-impact essays that bring our archives to life.",
    contribution: "Researching cultural timelines, conducting community interviews, writing monthly blog articles, and managing historical newsletters."
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
            Exactly 10 dedicated directors, heads, and staff members working across midtown Michigan to expand traditional education and community impact.
          </p>
        </div>

        {/* 9-member interactive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                    src={member.primaryImg}
                    alt={`${member.name} placeholder`}
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
              <div className="w-full md:w-1/3 shrink-0 flex flex-row md:flex-col gap-3">
                <div className="flex-1 md:w-full h-32 md:h-36 overflow-hidden rounded-2xl border-2 border-primary/20 transform hover:scale-[1.01] transition-transform">
                  <img
                    alt={`${selectedMember.name} profile`}
                    className="w-full h-full object-cover object-top"
                    src={selectedMember.primaryImg}
                  />
                </div>
                <div className="flex-1 md:w-full h-32 md:h-28 overflow-hidden rounded-2xl border-2 border-primary/20 transform hover:scale-[1.01] transition-transform">
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
                    Background Biography
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
