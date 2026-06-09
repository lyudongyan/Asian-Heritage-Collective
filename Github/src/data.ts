// @ts-ignore
import logoImg from "./assets/images/logo.webp";
// @ts-ignore
import culturalPerformanceImg from "./assets/images/cultural_performance.webp";
// @ts-ignore
import communityEngagementImg from "./assets/images/community_engagement.webp";
// @ts-ignore
import crowdWatchingImg from "./assets/images/crowd_watching.webp";
// @ts-ignore
import foundingStoryLeftImg from "./assets/images/founding_story_left.webp";
// @ts-ignore
import elderlyViewingImg from "./assets/images/elderly_viewing.webp";
// @ts-ignore
import teamPerformanceImg from "./assets/images/team_performance.webp";
// @ts-ignore
import celloPlayerImg from "./assets/images/cello_player.webp";
// @ts-ignore
import candidBronzeImg from "./assets/images/candid_bronze_2024_1779673220744.webp";
// @ts-ignore
import candidSilverImg from "./assets/images/candid_silver.webp";
// @ts-ignore
import easternMarketImg from "./assets/images/eastern_market.webp";
// @ts-ignore
import michiganWomenImg from "./assets/images/michigan_women.webp";
// @ts-ignore
import oaklandChurchImg from "./assets/images/oakland_church.webp";
// @ts-ignore
import largeCrowdPerformanceImg from "./assets/images/large_crowd_performance.webp";
// @ts-ignore
import meetTheTeamImg from "./assets/images/meet_the_team.webp";
// @ts-ignore
import ahcBannerImg from "./assets/images/ahc_banner.webp";
// @ts-ignore
import acaLogoImg from "./assets/images/aca_logo.webp";
// @ts-ignore
import mdcacLogoImg from "./assets/images/mdcac_logo.webp";
// @ts-ignore
import lyudongYanImg from "./assets/images/lyudong_yan.webp";
// @ts-ignore
import zeyadKarachiwalaImg from "./assets/images/zeyad_karachiwala.webp";
// @ts-ignore
import jerryMaoImg from "./assets/images/jerry_mao.webp";
// @ts-ignore
import joanneLienImg from "./assets/images/joanne_lien.webp";
// @ts-ignore
import sunnyIshiharaImg from "./assets/images/sunny_ishihara.webp";
// @ts-ignore
import peterWangImg from "./assets/images/peter_wang.webp";
// @ts-ignore
import kelvinShuImg from "./assets/images/kelvin_shu.webp";
// @ts-ignore
import auburnHillsEventImg from "./assets/images/auburn_hills_event.webp";
// @ts-ignore
import auburnHillsPresentersImg from "./assets/images/auburn_hills_presenters.webp";

const defaultProfileIcon = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%238a2387"/><stop offset="50%" stop-color="%23e94057"/><stop offset="100%" stop-color="%23f27121"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/><path d="M50 50c8.28 0 15-6.72 15-15s-6.72-15-15-15-15 6.72-15 15 6.72 15 15 15zm0 8c-11.05 0-30 5.52-30 16.5V78h60v-3.5c0-10.98-18.95-16.5-30-16.5z" fill="white"/></svg>`;

export const IMAGES = {
  logo: logoImg,
  cultural_performance: culturalPerformanceImg,
  community_engagement: communityEngagementImg,
  crowd_watching: crowdWatchingImg,
  founding_story_left: foundingStoryLeftImg,
  elderly_viewing: elderlyViewingImg,
  team_performance: teamPerformanceImg,
  cello_player: celloPlayerImg,
  candid_bronze: candidBronzeImg,
  candid_silver: candidSilverImg,
  eastern_market: easternMarketImg,
  michigan_women: michiganWomenImg,
  oakland_church: oaklandChurchImg,
  large_crowd_performance: largeCrowdPerformanceImg,
  meet_the_team: meetTheTeamImg,
  ahc_banner: ahcBannerImg,
  john_pork: defaultProfileIcon,
  akira_kongkanand_1: defaultProfileIcon,
  akira_kongkanand_2: defaultProfileIcon,
  aca_logo: acaLogoImg,
  mdcac_logo: mdcacLogoImg,
  lyudong_yan_1: lyudongYanImg,
  lyudong_yan_2: lyudongYanImg,
  zeyad_karichiwala_1: zeyadKarachiwalaImg,
  zeyad_karichiwala_2: zeyadKarachiwalaImg,
  jerry_mao_1: jerryMaoImg,
  jerry_mao_2: jerryMaoImg,
  joanne_lien_1: joanneLienImg,
  joanne_lien_2: joanneLienImg,
  sunny_ishihara_1: sunnyIshiharaImg,
  sunny_ishihara_2: sunnyIshiharaImg,
  peter_wang_1: peterWangImg,
  peter_wang_2: peterWangImg,
  yewon_lee_1: defaultProfileIcon,
  yewon_lee_2: defaultProfileIcon,
  raina_li_1: defaultProfileIcon,
  raina_li_2: defaultProfileIcon,
  leila_karichiwala_1: defaultProfileIcon,
  leila_karichiwala_2: defaultProfileIcon,
  kelvin_shu: kelvinShuImg,
  auburn_hills_event: auburnHillsEventImg,
  auburn_hills_presenters: auburnHillsPresentersImg,
  josh_1: defaultProfileIcon,
  josh_2: defaultProfileIcon,
  anthony_zhang_1: defaultProfileIcon,
  anthony_zhang_2: defaultProfileIcon,
};

export interface ProgramItem {
  icon: string;
  title: string;
  desc: string;
}

export const PROGRAMS: ProgramItem[] = [
  {
    icon: "school",
    title: "Education",
    desc: "Chinese language tutoring from elementary level through HSK Level 4, plus AP Chinese prep. Every tutor has scored a 5 out of 5 on the exam they teach."
  },
  {
    icon: "palette",
    title: "Arts",
    desc: "Workshops in calligraphy, painting, origami, and traditional crafts. Most are open to the public and free to attend."
  },
  {
    icon: "music_note",
    title: "Performance",
    desc: "Traditional and classical Chinese music performed at public events and community banquets, for audiences ranging from small gatherings to crowds of 2,500."
  },
  {
    icon: "volunteer_activism",
    title: "Community",
    desc: "From preparing meals at Grace Centers of Hope to running cultural activity booths at public libraries, our members do real volunteer work in their communities."
  }
];

export interface StatItem {
  number: string;
  label: string;
  delay: string;
}

export const STATS: StatItem[] = [
  { number: "6200+", label: "Individuals Directly Impacted", delay: "0ms" },
  { number: "51.4k", label: "Digital Content Impacts", delay: "100ms" },
  { number: "3600+", label: "Volunteer & Service Hours", delay: "200ms" }
];

export interface PartnerItem {
  name: string;
  img: string;
}

export const PARTNERS: PartnerItem[] = [
  { name: "Eastern Market", img: IMAGES.eastern_market },
  { name: "Michigan Chinese Women's Association", img: IMAGES.michigan_women },
  { name: "Oakland Chinese Church", img: IMAGES.oakland_church },
  { name: "Association of Chinese Americans", img: IMAGES.aca_logo },
  { name: "Metro Detroit Chinese Alliance Church", img: IMAGES.mdcac_logo },
  { name: "Auburn Hills Public Library", img: IMAGES.auburn_hills_event },
];

export interface HubItem {
  title: string;
  desc: string;
  buttonText: string;
  href: string;
  isPrimary?: boolean;
  delay?: string;
  type?: "newsletter" | "blog" | "events" | "team" | "collabs" | "apply";
}

export const HUB_ITEMS: HubItem[] = [
  { title: "Newsletter", desc: "Get updates on upcoming events, new programs, and what AHC has been up to.", buttonText: "Subscribe", href: "#", delay: "0ms", type: "newsletter" },
  { title: "Blog", desc: "Essays, stories, and reflections written by our members and contributors.", buttonText: "Read Blog", href: "#", delay: "100ms", type: "blog" },
  { title: "Past Events", desc: "A look back at performances, workshops, and community programs we've hosted.", buttonText: "View Gallery", href: "#", delay: "200ms", type: "events" },
  { title: "Our Team", desc: "Meet the people who run AHC and keep everything moving.", buttonText: "Learn More", href: "#", delay: "0ms", type: "team" },
  { title: "Awards & Collabs", desc: "Our partnerships, recognitions, and the organizations we work alongside.", buttonText: "View Awards", href: "#", delay: "100ms", type: "collabs" },
  { title: "Ready to Join?", desc: "We're always looking for motivated students to get involved.", buttonText: "Apply Now", href: "#apply", isPrimary: true, delay: "200ms", type: "apply" },
];
