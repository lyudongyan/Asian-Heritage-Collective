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
import johnPorkImg from "./assets/images/john_pork.webp";
// @ts-ignore
import acaLogoImg from "./assets/images/aca_logo.webp";
// @ts-ignore
import mdcacLogoImg from "./assets/images/mdcac_logo.webp";
// @ts-ignore
import lyudongYan1Img from "./assets/images/lyudong_yan_1.webp";
// @ts-ignore
import lyudongYan2Img from "./assets/images/lyudong_yan_2.webp";
// @ts-ignore
import zeyadKarichiwala1Img from "./assets/images/zeyad_karichiwala_1.webp";
// @ts-ignore
import zeyadKarichiwala2Img from "./assets/images/zeyad_karichiwala_2.webp";
// @ts-ignore
import jerryMao1Img from "./assets/images/jerry_mao_1.webp";
// @ts-ignore
import jerryMao2Img from "./assets/images/jerry_mao_2.webp";
// @ts-ignore
import joanneLien1Img from "./assets/images/joanne_lien_1.webp";
// @ts-ignore
import joanneLien2Img from "./assets/images/joanne_lien_2.webp";
// @ts-ignore
import sunnyIshihara1Img from "./assets/images/sunny_ishihara_1.webp";
// @ts-ignore
import sunnyIshihara2Img from "./assets/images/sunny_ishihara_2.webp";
// @ts-ignore
import peterWang1Img from "./assets/images/peter_wang_1.webp";
// @ts-ignore
import peterWang2Img from "./assets/images/peter_wang_2.webp";
// @ts-ignore
import yewonLee1Img from "./assets/images/yewon_lee_1.webp";
// @ts-ignore
import yewonLee2Img from "./assets/images/yewon_lee_2.webp";
// @ts-ignore
import rainaLi1Img from "./assets/images/raina_li_1.webp";
// @ts-ignore
import rainaLi2Img from "./assets/images/raina_li_2.webp";
// @ts-ignore
import leilaKarichiwala1Img from "./assets/images/leila_karichiwala_1.webp";
// @ts-ignore
import leilaKarichiwala2Img from "./assets/images/leila_karichiwala_2.webp";

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
  john_pork: johnPorkImg,
  aca_logo: acaLogoImg,
  mdcac_logo: mdcacLogoImg,
  lyudong_yan_1: lyudongYan1Img,
  lyudong_yan_2: lyudongYan2Img,
  zeyad_karichiwala_1: zeyadKarichiwala1Img,
  zeyad_karichiwala_2: zeyadKarichiwala2Img,
  jerry_mao_1: jerryMao1Img,
  jerry_mao_2: jerryMao2Img,
  joanne_lien_1: joanneLien1Img,
  joanne_lien_2: joanneLien2Img,
  sunny_ishihara_1: sunnyIshihara1Img,
  sunny_ishihara_2: sunnyIshihara2Img,
  peter_wang_1: peterWang1Img,
  peter_wang_2: peterWang2Img,
  yewon_lee_1: yewonLee1Img,
  yewon_lee_2: yewonLee2Img,
  raina_li_1: rainaLi1Img,
  raina_li_2: rainaLi2Img,
  leila_karichiwala_1: leilaKarichiwala1Img,
  leila_karichiwala_2: leilaKarichiwala2Img,
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
    desc: "Language tutoring (e.g., HSK Level 5 preparation) and curriculum development."
  },
  {
    icon: "palette",
    title: "Arts",
    desc: "Cultural art workshops including calligraphy, painting, and traditional crafts."
  },
  {
    icon: "music_note",
    title: "Performance",
    desc: "Traditional music performances, dance troupes, and public showcases."
  },
  {
    icon: "volunteer_activism",
    title: "Community",
    desc: "Community service, civic engagement, and structured volunteer opportunities."
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
  { name: "Michigan Chinese Women Association", img: IMAGES.michigan_women },
  { name: "American Chinese School", img: IMAGES.candid_bronze },
  { name: "Oakland Chinese Church", img: IMAGES.oakland_church },
  { name: "Association of Chinese Americans", img: IMAGES.aca_logo },
  { name: "Metro Detroit Chinese Alliance Church", img: IMAGES.mdcac_logo },
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
  {
    title: "Newsletter",
    desc: "Stay updated with our latest news and events.",
    buttonText: "Subscribe",
    href: "#",
    delay: "0ms",
    type: "newsletter"
  },
  {
    title: "Blog",
    desc: "Read stories from our community and insights on heritage.",
    buttonText: "Read Blog",
    href: "#",
    delay: "100ms",
    type: "blog"
  },
  {
    title: "Past Events",
    desc: "Explore galleries of our previous performances and workshops.",
    buttonText: "View Gallery",
    href: "#",
    delay: "200ms",
    type: "events"
  },
  {
    title: "Our Team",
    desc: "Meet the passionate individuals behind AHC.",
    buttonText: "Learn More",
    href: "#",
    delay: "0ms",
    type: "team"
  },
  {
    title: "Awards & Collabs",
    desc: "Discover our partnerships and recognitions.",
    buttonText: "View Awards",
    href: "#",
    delay: "100ms",
    type: "collabs"
  },
  {
    title: "Ready to Join?",
    desc: "Become part of a movement to inspire the aspiring.",
    buttonText: "Apply Now",
    href: "#apply",
    isPrimary: true,
    delay: "200ms",
    type: "apply"
  }
];
