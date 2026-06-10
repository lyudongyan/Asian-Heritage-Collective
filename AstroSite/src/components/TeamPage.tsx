import React, { useState, useEffect } from "react";
import { IMAGES } from "../data";
import { Eyebrow, SplitWords } from "./ui";
import Footer from "./Footer";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  primaryImg: string;
  bio: string;
  contribution: string;
}

const MASTER_TEAM: TeamMember[] = [
  { id: 1, name: "Lyudong Yan", title: "Executive Director", primaryImg: IMAGES.lyudong_yan_1, bio: "Lyudong founded AHC in 2023 and has led the organization since its first event. His interests span art, writing, biology, and Chinese language, and he has played piano since childhood. He built AHC out of a genuine frustration with how cultural education was being delivered to young people and a belief that it could be done better. He handles strategic direction, fundraising, and community partnerships.", contribution: "Strategic direction, fundraising, board advocacy, and community partnership management." },
  { id: 2, name: "Zeyad Karachiwala", title: "Director of Operations", primaryImg: IMAGES.zeyad_karichiwala_1, bio: "Zeyad is of Indian and Egyptian descent and brings a detail-oriented approach to everything he handles at AHC. Outside the organization he cooks and plays trumpet. As Director of Operations, he manages the logistics, compliance, and coordination that keep events running smoothly.", contribution: "Daily operations, compliance, logistical planning, and volunteer coordination." },
  { id: 3, name: "Jerry Mao", title: "Music Department Head", primaryImg: IMAGES.jerry_mao_1, bio: "Jerry swims, codes, and has studied Chinese seriously alongside his other interests. He plays violin and directs AHC's music program, overseeing rehearsals, score selection, and performance coordination. He has performed at major AHC events including the Eastern Market showcase.", contribution: "Musical score curation, student rehearsals, performance coaching, and orchestral coordination." },
  { id: 4, name: "Joanne Lien", title: "Volunteer Department Head", primaryImg: IMAGES.joanne_lien_1, bio: "Joanne is Taiwanese and has been involved in volunteer work for most of her life, including with the Red Cross. She plays flute and has a genuine instinct for organizing people. At AHC she runs the volunteer pipeline: recruiting, training, and matching members with service opportunities.", contribution: "Volunteer recruitment, training, screening, and service hour certification." },
  { id: 5, name: "Sunny Ishihara", title: "Art Department Head", primaryImg: IMAGES.sunny_ishihara_1, bio: "Sunny is Japanese, studies Japanese language, and is an award-winning pianist. She brings both technical discipline and creative range to AHC's arts programming, coordinating workshops, seasonal craft activities, and exhibition design across events.", contribution: "Workshop coordination, exhibition design, traditional craft programming, and art supplies sourcing." },
  { id: 6, name: "Peter Wang", title: "Marketing Head", primaryImg: IMAGES.peter_wang_1, bio: "Peter is Chinese, plays clarinet, and has been active in volunteer work alongside his studies. He plays tennis and leads AHC's marketing and outreach, managing promotional materials, press communications, and audience development across Michigan.", contribution: "Campaign coordination, public relations, press copy, and outreach tracking." },
  { id: 7, name: "Yewon Lee", title: "Social Media Manager", primaryImg: IMAGES.yewon_lee_1, bio: "Yewon is Korean with a strong background in visual art, which directly shapes how she approaches AHC's social presence. She handles short-form video content, reels, and the week-to-week content calendar that keeps AHC visible online.", contribution: "TikTok and Instagram content, video production, and content calendar management." },
  { id: 8, name: "Raina Li", title: "Digital Media Manager", primaryImg: IMAGES.raina_li_1, bio: "Raina is Chinese with a focus in digital art and design. At AHC she maintains visual consistency across print and digital materials — newsletters, digital flyers, and branding assets.", contribution: "Newsletter editorial, branding assets, digital layout, and newsroom copy." },
  { id: 9, name: "Leila Karachiwala", title: "Visual Design", primaryImg: IMAGES.leila_karichiwala_1, bio: "Leila is of Indian and Egyptian descent and is involved in her school's Asian Student Association. She designs the posters, banners, and illustrated materials that give AHC's events their visual identity.", contribution: "Illustration, typography, banner design, and poster layouts." },
  { id: 10, name: "Akira Kongkanand", title: "Blog Writer", primaryImg: IMAGES.akira_kongkanand_1, bio: "Akira is Japanese and brings a math and engineering mindset to writing — which tends to produce clear, precise prose. He covers cultural history, community stories, and organizational milestones for AHC's blog and manages historical documentation for the org.", contribution: "Blog writing, cultural research, community interviews, and historical documentation." },
  { id: 11, name: "Kelvin Shu", title: "Music Arranger & Composer", primaryImg: IMAGES.kelvin_shu, bio: "Kelvin's focus is traditional Chinese classical music, and he competes in Science Olympiad alongside his studies in Chinese language. At AHC he arranges folk and classical scores for student ensembles, handles microtonal transcription, and prepares rehearsal materials for the music department.", contribution: "Score arrangement, microtonal transcription, composition, and rehearsal preparation." },
  { id: 12, name: "Josh", title: "Member", primaryImg: IMAGES.josh_1, bio: "Josh is Chinese, studies computer science, and plays soccer. His title and full name will be updated shortly.", contribution: "Role TBD." },
  { id: 13, name: "Anthony Zhang", title: "Member", primaryImg: IMAGES.anthony_zhang_1, bio: "Anthony swims, plays violin, and has a strong interest in Chinese language and culture. He comes from a background in robotics and engineering. His title will be updated shortly.", contribution: "Role TBD." },
  { id: 14, name: "Eric Zeng", title: "Member", primaryImg: IMAGES.eric_zeng_1, bio: "Eric studies computer science and is passionate about cultural heritage, engineering, and community service. He works on developing creative outreach programs at AHC.", contribution: "Role TBD." },
];

const GROUPS: { label: string; blurb: string; ids: number[] }[] = [
  {
    label: "Directors & Department Heads",
    blurb: "The students who set direction and run the departments — music, volunteering, arts, and marketing.",
    ids: [1, 2, 3, 4, 5, 6],
  },
  {
    label: "Creative & Media",
    blurb: "The people behind AHC's writing, design, social presence, and original music arrangements.",
    ids: [7, 8, 9, 10, 11],
  },
  {
    label: "Members",
    blurb: "Newer members already contributing — roles and titles coming soon.",
    ids: [12, 13, 14],
  },
];

function MemberCard({ member, onSelect }: { member: TeamMember; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="liquid-glass-strong rounded-3xl p-6 text-left border border-primary/5 hover:border-primary/25 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group flex flex-col gap-4 w-full"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/60 shadow-inner shrink-0 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300">
          <img src={member.primaryImg} alt={member.name} className="w-full h-full object-cover object-top" loading="lazy" />
        </div>
        <div className="min-w-0">
          <h4 className="font-headline text-lg font-bold text-primary leading-tight group-hover:text-primary-container transition-colors truncate">
            {member.name}
          </h4>
          <p className="font-body text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mt-1 leading-tight">
            {member.title}
          </p>
        </div>
      </div>
      <p className="font-body text-xs text-on-surface-variant/90 leading-relaxed line-clamp-2">
        {member.bio}
      </p>
      <span className="font-body text-[10px] font-bold text-primary uppercase tracking-widest inline-flex items-center gap-1.5 group-hover:gap-3 transition-all mt-auto">
        Full biography
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </span>
    </button>
  );
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Scroll-reveal observer
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

  // Close modal on Escape
  useEffect(() => {
    if (!selectedMember) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedMember(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedMember]);

  return (
    <>
      <div className="pt-36 pb-24 min-h-screen bg-surface select-text relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[480px] bg-gradient-to-b from-primary-fixed/40 to-transparent pointer-events-none" />
        <span
          aria-hidden="true"
          data-parallax="0.1"
          className="text-watermark font-headline text-[15rem] absolute top-12 right-[-1rem] leading-none pointer-events-none hidden xl:block"
        >
          团队
        </span>

        <div className="container mx-auto px-6 md:px-12 max-w-[1280px] relative">
          {/* Header */}
          <header className="max-w-2xl mb-20 animate-slide-up-fade">
            <Eyebrow className="mb-6">The People</Eyebrow>
            <h1 className="font-headline text-4xl md:text-6xl text-primary font-bold leading-[1.05] mb-6">
              <SplitWords>
                Run by students. <em className="italic">Taken seriously.</em>
              </SplitWords>
            </h1>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
              Every program, performance, and service event at AHC is planned and
              run by the people on this page. Meet the team that keeps everything
              moving.
            </p>
          </header>

          {/* Groups */}
          <div className="space-y-20">
            {GROUPS.map((group) => {
              const members = group.ids
                .map((id) => MASTER_TEAM.find((m) => m.id === id))
                .filter((m): m is TeamMember => Boolean(m));
              return (
                <section key={group.label}>
                  <div className="flex items-end justify-between gap-6 flex-wrap mb-8 scroll-reveal">
                    <div>
                      <h2 className="font-headline text-2xl md:text-3xl text-primary font-bold">
                        {group.label}
                      </h2>
                      <p className="font-body text-sm text-on-surface-variant mt-1.5 max-w-xl">
                        {group.blurb}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member, i) => (
                      <div key={member.id} className={`scroll-reveal ${i % 3 === 1 ? "scroll-reveal-delay-1" : i % 3 === 2 ? "scroll-reveal-delay-2" : ""}`}>
                        <MemberCard member={member} onSelect={() => setSelectedMember(member)} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 liquid-glass-strong rounded-3xl p-10 text-center border border-primary/10 scroll-reveal relative overflow-hidden">
            <span
              aria-hidden="true"
              className="text-watermark font-headline text-[7rem] absolute -bottom-8 -left-2 leading-none pointer-events-none"
            >
              加入
            </span>
            <h3 className="font-headline text-2xl text-primary font-bold mb-3">
              Your name could be on this page.
            </h3>
            <p className="font-body text-sm text-on-surface-variant mb-6 max-w-md mx-auto">
              We're always looking for motivated students to get involved — in
              music, art, tutoring, writing, design, or service.
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

        {/* Biography modal */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="liquid-glass-strong rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative select-text animate-pop-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors p-2"
                aria-label="Close biography"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mt-4">
                <div className="w-full md:w-1/3 shrink-0">
                  <div className="w-40 h-40 md:w-full md:h-48 overflow-hidden rounded-2xl border-2 border-primary/20 mx-auto shadow-md">
                    <img alt={selectedMember.name} className="w-full h-full object-cover object-top" src={selectedMember.primaryImg} />
                  </div>
                </div>
                <div className="flex-1 space-y-5 text-left">
                  <div>
                    <h3 className="font-headline text-2xl text-primary font-bold leading-snug">{selectedMember.name}</h3>
                    <Eyebrow className="mt-2">{selectedMember.title}</Eyebrow>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {selectedMember.bio}
                  </p>
                  <div className="border-t border-primary/10 pt-4">
                    <h4 className="text-[10px] font-bold text-on-surface-variant font-body uppercase tracking-[0.2em] mb-1.5">
                      Focus at AHC
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

      <Footer />
    </>
  );
}
