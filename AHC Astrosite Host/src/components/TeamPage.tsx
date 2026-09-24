import React, { useEffect, useState } from "react";
import { IMAGES } from "../data";
import Footer from "./Footer";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  contribution: string;
}

const members: TeamMember[] = [
  { id: 1, name: "Lyudong Yan", title: "Executive Director", image: IMAGES.lyudong_yan_1, bio: "Lyudong founded AHC in 2023 and has led the organization since its first event. His interests span art, writing, biology, and Chinese language, and he has played piano since childhood. He built AHC out of a genuine frustration with how cultural education was being delivered to young people and a belief that it could be done better.", contribution: "Strategic direction, fundraising, board advocacy, and community partnership management." },
  { id: 2, name: "Zeyad Karachiwala", title: "Director of Operations", image: IMAGES.zeyad_karichiwala_1, bio: "Zeyad is of Indian and Egyptian descent and brings a detail-oriented approach to everything he handles at AHC. Outside the organization he cooks and plays trumpet.", contribution: "Daily operations, compliance, logistical planning, and volunteer coordination." },
  { id: 3, name: "Jerry Mao", title: "Music Department Head", image: IMAGES.jerry_mao_1, bio: "Jerry swims, codes, and has studied Chinese seriously alongside his other interests. He plays violin and directs AHC's music program.", contribution: "Musical score curation, student rehearsals, performance coaching, and orchestral coordination." },
  { id: 4, name: "Joanne Lien", title: "Volunteer Department Head", image: IMAGES.joanne_lien_1, bio: "Joanne is Taiwanese and has been involved in volunteer work for most of her life, including with the Red Cross. She plays flute and organizes AHC's volunteer pipeline.", contribution: "Volunteer recruitment, training, screening, and service hour certification." },
  { id: 5, name: "Sunny Ishihara", title: "Art Department Head", image: IMAGES.sunny_ishihara_1, bio: "Sunny is Japanese, studies Japanese language, and is an award-winning pianist. She brings technical discipline and creative range to AHC's arts programming.", contribution: "Workshop coordination, exhibition design, traditional craft programming, and art supplies sourcing." },
  { id: 6, name: "Peter Wang", title: "Marketing Head", image: IMAGES.peter_wang_1, bio: "Peter is Chinese, plays clarinet, and has been active in volunteer work alongside his studies. He plays tennis and leads AHC's marketing and outreach.", contribution: "Campaign coordination, public relations, press copy, and outreach tracking." },
  { id: 7, name: "Yewon Lee", title: "Social Media Manager", image: IMAGES.yewon_lee_1, bio: "Yewon is Korean with a strong background in visual art, which shapes how she approaches AHC's social presence.", contribution: "TikTok and Instagram content, video production, and content calendar management." },
  { id: 8, name: "Raina Li", title: "Digital Media Manager", image: IMAGES.raina_li_1, bio: "Raina is Chinese with a focus in digital art and design. She maintains visual consistency across AHC's print and digital materials.", contribution: "Newsletter editorial, branding assets, digital layout, and newsroom copy." },
  { id: 9, name: "Leila Karachiwala", title: "Visual Design", image: IMAGES.leila_karichiwala_1, bio: "Leila is of Indian and Egyptian descent and is involved in her school's Asian Student Association.", contribution: "Illustration, typography, banner design, and poster layouts." },
  { id: 10, name: "Akira Kongkanand", title: "Blog Writer", image: IMAGES.akira_kongkanand_1, bio: "Akira is Japanese and brings a math and engineering mindset to clear, precise writing.", contribution: "Blog writing, cultural research, community interviews, and historical documentation." },
  { id: 11, name: "Kelvin Shu", title: "Music Arranger & Composer", image: IMAGES.kelvin_shu, bio: "Kelvin focuses on traditional Chinese classical music and competes in Science Olympiad alongside his Chinese-language studies.", contribution: "Score arrangement, microtonal transcription, composition, and rehearsal preparation." },
  { id: 12, name: "Josh", title: "Member", image: IMAGES.josh_1, bio: "Josh is Chinese, studies computer science, and plays soccer. His title and full name will be updated shortly.", contribution: "Role to be announced." },
  { id: 13, name: "Anthony Zhang", title: "Member", image: IMAGES.anthony_zhang_1, bio: "Anthony swims, plays violin, and has a strong interest in Chinese language and culture. He comes from a background in robotics and engineering.", contribution: "Role to be announced." },
  { id: 14, name: "Eric Zeng", title: "Member", image: IMAGES.eric_zeng_1, bio: "Eric studies computer science and is passionate about cultural heritage, engineering, and community service.", contribution: "Developing creative outreach programs at AHC." },
];

const groups = [
  { title: "Directors and Department Heads", ids: [1, 2, 3, 4, 5, 6] },
  { title: "Creative and Media", ids: [7, 8, 9, 10, 11] },
  { title: "Members", ids: [12, 13, 14] },
];

export default function TeamPage() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <main className="page-shell">
      <header className="page-hero page-width">
        <h1>Team</h1>
        <p>Students run every AHC program, performance, partnership, and service project.</p>
      </header>

      <section className="page-width team-groups">
        {groups.map((group) => (
          <div className="team-group" key={group.title}>
            <h2>{group.title}</h2>
            <div className="team-grid">
              {group.ids.map((id) => {
                const member = members.find((candidate) => candidate.id === id)!;
                return (
                  <button className="member-card reveal" type="button" key={member.id} onClick={() => setSelected(member)}>
                    <img src={member.image} alt="" loading="lazy" />
                    <div className="member-copy">
                      <h3>{member.name}</h3>
                      <p>{member.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {selected && (
        <div className="member-dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <section className="member-dialog liquid-surface liquid-light" data-glass role="dialog" aria-modal="true" aria-labelledby="member-name">
            <button className="dialog-close" type="button" aria-label="Close profile" onClick={() => setSelected(null)}>×</button>
            <h2 id="member-name">{selected.name}</h2>
            <p className="role">{selected.title}</p>
            <p>{selected.bio}</p>
            <p><strong>At AHC:</strong> {selected.contribution}</p>
          </section>
        </div>
      )}

      <Footer />
    </main>
  );
}
