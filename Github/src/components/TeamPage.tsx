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
    bio: "Lyudong founded AHC in 2023 and has led the organization since its first event. His interests span art, writing, biology, and Chinese language, and he has played piano since childhood. He built AHC out of a genuine frustration with how cultural education was being delivered to young people and a belief that it could be done better. He handles strategic direction, fundraising, and community partnerships.",
    contribution: "Strategic direction, fundraising, board advocacy, and community partnership management."
  },
  {
    id: 2,
    name: "Zeyad Karachiwala",
    title: "Director of Operations",
    primaryBg: "from-sky-100 to-sky-200 text-sky-950",
    primaryImg: IMAGES.zeyad_karichiwala_1,
    secondaryImg: IMAGES.zeyad_karichiwala_2,
    bio: "Zeyad is of Indian and Egyptian descent and brings a detail-oriented approach to everything he handles at AHC. Outside the organization he cooks and plays trumpet. As Director of Operations, he manages the logistics, compliance, and coordination that keep events running smoothly.",
    contribution: "Daily operations, compliance, logistical planning, and volunteer coordination."
  },
  {
    id: 3,
    name: "Jerry Mao",
    title: "Music Department Head",
    primaryBg: "from-emerald-100 to-emerald-200 text-emerald-950",
    primaryImg: IMAGES.jerry_mao_1,
    secondaryImg: IMAGES.jerry_mao_2,
    bio: "Jerry swims, codes, and has studied Chinese seriously alongside his other interests. He plays violin and directs AHC's music program, overseeing rehearsals, score selection, and performance coordination. He has performed at major AHC events including the Eastern Market showcase.",
    contribution: "Musical score curation, student rehearsals, performance coaching, and orchestral coordination."
  },
  {
    id: 4,
    name: "Joanne Lien",
    title: "Volunteer Department Head",
    primaryBg: "from-pink-100 to-pink-200 text-pink-950",
    primaryImg: IMAGES.joanne_lien_1,
    secondaryImg: IMAGES.joanne_lien_2,
    bio: "Joanne is Taiwanese and has been involved in volunteer work for most of her life, including with the Red Cross. She plays flute and has a genuine instinct for organizing people. At AHC she runs the volunteer pipeline: recruiting, training, and matching members with service opportunities.",
    contribution: "Volunteer recruitment, training, screening, and service hour certification."
  },
  {
    id: 5,
    name: "Sunny Ishihara",
    title: "Art Department Head",
    primaryBg: "from-amber-100 to-amber-200 text-amber-950",
    primaryImg: IMAGES.sunny_ishihara_1,
    secondaryImg: IMAGES.sunny_ishihara_2,
    bio: "Sunny is Japanese, studies Japanese language, and is an award-winning pianist. She brings both technical discipline and creative range to AHC's arts programming, coordinating workshops, seasonal craft activities, and exhibition design across events.",
    contribution: "Workshop coordination, exhibition design, traditional craft programming, and art supplies sourcing."
  },
  {
    id: 6,
    name: "Peter Wang",
    title: "Marketing Head",
    primaryBg: "from-indigo-100 to-indigo-200 text-indigo-950",
    primaryImg: IMAGES.peter_wang_1,
    secondaryImg: IMAGES.peter_wang_2,
    bio: "Peter is Chinese, plays clarinet, and has been active in volunteer work alongside his studies. He plays tennis and leads AHC's marketing and outreach, managing promotional materials, press communications, and audience development across Michigan.",
    contribution: "Campaign coordination, public relations, press copy, and outreach tracking."
  },
  {
    id: 7,
    name: "Yewon Lee",
    title: "Social Media Manager",
    primaryBg: "from-violet-100 to-violet-200 text-violet-950",
    primaryImg: IMAGES.yewon_lee_1,
    secondaryImg: IMAGES.yewon_lee_2,
    bio: "Yewon is Korean with a strong background in visual art, which directly shapes how she approaches AHC's social presence. She handles short-form video content, reels, and the week-to-week content calendar that keeps AHC visible online.",
    contribution: "TikTok and Instagram content, video production, and content calendar management."
  },
  {
    id: 8,
    name: "Raina Li",
    title: "Digital Media Manager",
    primaryBg: "from-rose-100 to-rose-200 text-rose-950",
    primaryImg: IMAGES.raina_li_1,
    secondaryImg: IMAGES.raina_li_2,
    bio: "Raina is Chinese with a focus in digital art and design. At AHC she maintains visual consistency across print and digital materials — newsletters, digital flyers, and branding assets.",
    contribution: "Newsletter editorial, branding assets, digital layout, and newsroom copy."
  },
  {
    id: 9,
    name: "Leila Karachiwala",
    title: "Visual Design",
    primaryBg: "from-teal-100 to-teal-200 text-teal-950",
    primaryImg: IMAGES.leila_karichiwala_1,
    secondaryImg: IMAGES.leila_karichiwala_2,
    bio: "Leila is of Indian and Egyptian descent and is involved in her school's Asian Student Association, giving her a close-to-the-ground sense of what resonates with the students AHC is trying to reach. She designs the posters, banners, and illustrated materials that give AHC's events their visual identity.",
    contribution: "Illustration, typography, banner design, and poster layouts."
  },
  {
    id: 10,
    name: "Akira Kongkanand",
    title: "Blog Writer",
    primaryBg: "from-amber-100 to-amber-200 text-amber-950",
    primaryImg: IMAGES.akira_kongkanand_1,
    secondaryImg: IMAGES.akira_kongkanand_2,
    bio: "Akira is Japanese and brings a math and engineering mindset to writing — which tends to produce clear, precise prose. He covers cultural history, community stories, and organizational milestones for AHC's blog and manages historical documentation for the org.",
    contribution: "Blog writing, cultural research, community interviews, and historical documentation."
  },
  {
    id: 11,
    name: "Kelvin Shu",
    title: "Music Arranger & Composer",
    primaryBg: "from-blue-100 to-blue-200 text-blue-950",
    primaryImg: IMAGES.kelvin_shu,
    secondaryImg: IMAGES.kelvin_shu,
    bio: "Kelvin's focus is traditional Chinese classical music, and he competes in Science Olympiad alongside his studies in Chinese language. At AHC he arranges folk and classical scores for student ensembles, handles microtonal transcription, and prepares rehearsal materials for the music department.",
    contribution: "Score arrangement, microtonal transcription, composition, and rehearsal preparation."
  },
  {
    id: 12,
    name: "Josh",
    title: "Member",
    primaryBg: "from-green-100 to-green-200 text-green-950",
    primaryImg: IMAGES.josh_1,
    secondaryImg: IMAGES.josh_2,
    bio: "Josh is Chinese, studies computer science, and plays soccer. His title and full name will be updated shortly.",
    contribution: "Role TBD."
  },
  {
    id: 13,
    name: "Anthony Zhang",
    title: "Member",
    primaryBg: "from-orange-100 to-orange-200 text-orange-950",
    primaryImg: IMAGES.anthony_zhang_1,
    secondaryImg: IMAGES.anthony_zhang_2,
    bio: "Anthony swims, plays violin, and has a strong interest in Chinese language and culture. He comes from a background in robotics and engineering. His title will be updated shortly.",
    contribution: "Role TBD."
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
            Meet the people who run AHC and keep everything moving.
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
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mt-4">
              <div className="w-full md:w-1/3 shrink-0">
                <div className="w-40 h-40 md:w-full md:h-48 overflow-hidden rounded-2xl border-2 border-primary/20 transform hover:scale-[1.01] transition-transform mx-auto">
                  <img
                    alt={`${selectedMember.name} profile`}
                    className="w-full h-full object-cover object-top"
                    src={selectedMember.primaryImg}
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
