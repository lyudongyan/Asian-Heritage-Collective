ASIAN HERITAGE COLLECTIVE — REPOSITORY & ORGANIZATION GUIDE
=============================================================

This file is for Claude (or any other AI agent) working in this folder. It
explains what's in this repository and gives full background on the
nonprofit so you have context for any task — writing copy, updating the
site, drafting communications, etc.

IMPORTANT: This file intentionally avoids time-sensitive statements (e.g.
"there are currently N events" or "as of [date]"). Lists below (events,
blog posts, team members, milestones) will be updated periodically by the
user as new content is added — read the actual data files for the current,
up-to-date contents rather than assuming this document's examples are
exhaustive or current.


PART 1 — WHAT'S IN THIS FOLDER
=============================================================

This folder contains the source code for the AHC website, built with
Astro + React + Tailwind CSS, deployed as a static site (Cloudflare Pages)
at https://asianheritagecollective.org.

Folder layout:

AstroSite/
  astro.config.mjs        — Astro config (site URL, integrations, static output)
  package.json            — npm scripts (dev / build / preview) and dependencies
  DEPLOY_INSTRUCTIONS.md   — non-technical, step-by-step guide for the site owner
                              to copy assets, install Node, build, and deploy
  dist/                   — production build output (generated, gitignored)
  public/                 — static files served as-is (e.g. robots.txt)

  src/
    pages/                — Astro page routes
      index.astro          — Homepage
      about.astro          — About page (mission, founding story, milestones)
      team.astro           — Team page
      events.astro         — Past events listing
      events/[id].astro     — Individual event detail pages
      blog.astro           — Blog index
      blog/[slug].astro     — Individual blog post pages
      games.astro          — "Games Room" interactive cultural minigames page

    layouts/
      Layout.astro          — Shared HTML shell (head, nav, footer wrapper)

    components/             — React components used across pages
      Nav.tsx                — Site navigation bar
      Footer.tsx             — Site footer (contact info, social links, sitemap)
      Hero.tsx               — Homepage hero section
      About.tsx              — Homepage "Who We Are" section
      Story.tsx              — Homepage mission statement + founding story section
      WhatWeDo.tsx           — Homepage programs + impact stats section
      Transparency.tsx       — Homepage accountability/transparency seals section
      Partnership.tsx        — Homepage partner organizations marquee
      Hub.tsx                — Homepage interactive cultural feature (guzheng, calligraphy, proverbs)
      HomeApp.tsx            — Assembles all homepage sections; also contains the
                                "Apply to Join" form, newsletter signup, testimonials,
                                fact ribbon, and section navigation rail
      AboutPage.tsx          — Full About page (mission clause breakdown, three pillars,
                                milestone roadmap/timeline)
      TeamPage.tsx           — Full Team page (member bios, grouped by role)
      EventsPage.tsx         — Past events page
      BlogPage.tsx           — Blog index/listing page
      MinigamesPage.tsx      — Games Room minigames (Mooncake Maker, Lantern Riddles,
                                Guzheng Recorder, Tea Brewmaster)
      ScrollFX.tsx           — Scroll-based animation/parallax effects
      ui.tsx                 — Shared small UI components (Eyebrow, Lightbox,
                                SplitWords, CountUp, etc.)

    data.ts                 — Central data file: image imports/registry, PROGRAMS,
                                STATS / STATS_NUMERIC, PARTNERS, MILESTONES
    data/
      pastEvents.ts          — Array of past events (id, title, date, location,
                                description, images)
      blogPosts.ts           — Array of blog posts (slug, title, date, author,
                                excerpt, full content, tag, image)

    assets/
      images/                — All site images (event photos, team headshots,
                                logos, blog illustrations, etc.)
      videos/                — Background video used in the homepage hero

    styles/
      global.css             — Global styles / Tailwind setup

HOW CONTENT GETS UPDATED:
- New past events → add an entry to src/data/pastEvents.ts (and add any new
  images to src/assets/images/, then reference them in data.ts's IMAGES map
  if used elsewhere).
- New blog posts → add an entry to src/data/blogPosts.ts.
- New/updated team members → edit the MASTER_TEAM array (and GROUPS array)
  in src/components/TeamPage.tsx.
- New milestones (organizational timeline) → MILESTONES array in src/data.ts.
- Programs, stats, and partner logos → also in src/data.ts (PROGRAMS,
  STATS_NUMERIC, PARTNERS).
- The "Apply to Join" form and newsletter signup both submit to Formspree
  (form ID embedded in HomeApp.tsx).


PART 2 — ABOUT THE ORGANIZATION
=============================================================

NAME: Asian Heritage Collective (AHC)
TYPE: Michigan-based 501(c)(3) nonprofit organization
EIN: 39-4558056
FOUNDED: October 2023, in Michigan, by Lyudong Yan — originally as a small
  traditional Chinese music ensemble.
TAGLINE / MOTTO: "Heritage inspires the aspiring."
WEBSITE: https://asianheritagecollective.org
EMAIL: asianheritagecollective@gmail.com
SOCIAL MEDIA: Instagram (@asianheritagecollective), TikTok (@asianheritagecollective)

WHAT AHC DOES (SUMMARY)
AHC runs cultural programs for Asian (primarily Chinese-American/Asian-American)
youth in Michigan, centered on the idea that cultural education works best
when it's hands-on and participatory rather than passive. Members perform
traditional music for real public audiences, teach and take language
lessons, lead arts/craft workshops open to the public, and do community
service. All programs are free to participants and are run by students
themselves.

ORIGIN STORY
AHC started in October 2023 when Lyudong Yan founded a small music ensemble
with a simple goal: give Asian youth in Michigan a real reason to engage
with their heritage. He had observed students losing interest in
traditional cultural education (e.g., Saturday Chinese school) because it
felt disconnected and obligatory, and wanted to build something different —
something people would actually want to participate in. What began as a
music group expanded into arts, language tutoring, and volunteer
programming as more students and community organizations got involved.

MISSION STATEMENT
"Foster youth cultural development by empowering young people to learn
about their heritage, strengthen their identity, and serve their
communities."

What each part of the mission means to AHC:
- "Foster youth cultural development" — More than knowing facts about
  heritage: actively participating, building real skills, and gaining
  enough familiarity with one's heritage to actually do something with it.
- "empowering young people" — Giving students real activities, real
  responsibilities, and real opportunities to contribute. Emphasis on doing,
  not observing.
- "learn about their heritage" — Concrete activities: language tutoring,
  calligraphy, traditional music, history presentations.
- "strengthen their identity" — For many second-generation students,
  cultural identity is complicated. AHC wants students to leave more
  grounded in who they are.
- "serve their communities" — Members bring what they've learned back
  through performances, volunteer work, and public programming. Learning
  and giving back are treated as connected, not separate.

THE THREE PILLARS (from the About page)
1. Identity — Cultivating cultural identity through traditional music,
   calligraphy, origami, painting, and Chinese language tutoring, and giving
   students opportunities to present that knowledge publicly (performances
   for audiences of thousands, public calligraphy sessions, presentations on
   Asian history/culture at schools and libraries).
2. Service — Community service as a natural extension of cultural learning:
   preparing meals for those in need (e.g., Grace Centers of Hope), running
   craft/cultural booths at public libraries, bringing music and art
   programming to community organizations across Michigan.
3. Access — Bringing centuries-old art forms to real audiences in real
   places (e.g., performances at Detroit Eastern Market for crowds of
   thousands), making traditional culture accessible and enjoyable to people
   who might not otherwise encounter it — including AHC's own members.

PROGRAMS (the four main program areas)
1. Education — Chinese language tutoring from elementary level through HSK
   Level 4, plus AP Chinese exam prep. Every tutor has scored a 5/5 on the
   exam they teach.
2. Arts — Workshops in calligraphy, painting, origami, and traditional
   crafts. Most are open to the public and free.
3. Performance — Traditional and classical Chinese music performed at
   public events and community banquets, for audiences ranging from small
   gatherings to thousands of people.
4. Community — Real volunteer work: preparing meals at Grace Centers of
   Hope, running cultural activity booths at public libraries, and other
   service in the community.

All programs are free to participants and are planned/run by students.

IMPACT STATS (illustrative figures used on the site — update as the
organization's records are updated; do not treat these as fixed forever)
- People Reached: individuals directly impacted by performances, workshops,
  and tutoring (site currently cites 6,200+).
- Service Hours: volunteer/community service hours logged by members (site
  currently cites 3,600+).
- Digital Impacts: content impressions across AHC's digital channels (site
  currently cites 51.4k).
- Largest live audience to date: ~2,500 people (Detroit Eastern Market
  performance).

TRANSPARENCY / ACCOUNTABILITY
AHC emphasizes operating transparently: programs are free to participants,
finances are publicly documented, and the organization holds Candid
transparency seals (earned a Bronze seal in its founding year, later
upgraded to a Silver "Seal of Transparency"). Registered as a 501(c)(3)
nonprofit, EIN 39-4558056.

PARTNER ORGANIZATIONS
AHC works with local Michigan organizations to bring cultural programming to
more people, including:
- Eastern Market (Detroit)
- Michigan Chinese Women's Association
- Oakland Chinese Church
- Association of Chinese Americans
- Metro Detroit Chinese Alliance Church
- Auburn Hills Public Library

PAST EVENTS (see src/data/pastEvents.ts for the authoritative, current list —
this is a snapshot of the kinds of events AHC runs)
- Auburn Hills Public Library — API Heritage Month: origami workshop plus a
  presentation on Asian heritage history.
- Baldwin Public Library — API Heritage Month: assembled craft kits and set
  up a cultural display for visitors to take home.
- Detroit Eastern Market Performance: traditional Chinese music for a crowd
  of thousands, plus a free public calligraphy activity and a fan sale that
  raised money for the Association of Chinese Americans. One of AHC's
  largest public appearances.
- International Academy International Food Night: members contributed
  dishes and performed live music for a large audience — one of AHC's
  highest-attendance events.
- Grace Centers of Hope — Volunteer Meal Service: AHC members prepared
  hundreds of meals for homeless individuals and veterans.
- Annual Music Banquet — San Marino Club: performance for a banquet
  audience, with performers formally recognized for their contribution.
- Michigan Chinese Women's Association Annual Banquet: a children's
  sticker-making activity plus a traditional music performance (including
  pieces like the Butterfly Lovers Violin Concerto and Colorful Clouds
  Chasing the Moon) for a large banquet audience. One of AHC's first
  large-audience performances.
- Oakland Chinese Church Annual Open House: sticker-making, badminton, and a
  cultural introduction presentation; an early example of AHC's community
  programming.

BLOG ("Living Heritage Blog")
The blog (src/data/blogPosts.ts) features personal essays and explainer
pieces written by AHC members and an "AHC Editorial Team," covering topics
like: personal reflections on Chinese-school experiences and the AP Chinese
exam, family trips back to relatives' hometowns in China, and cultural
explainer pieces (e.g., why hot water is culturally significant, perceptions
of racism in homogeneous Asian societies, why food spending patterns differ
in Asian economies as wealth grows). Tags include Reflection, Personal,
Culture, Society, and Economics.

GAMES ROOM
An interactive page (src/components/MinigamesPage.tsx) with browser-based
cultural minigames: Mooncake Maker, Lantern Riddles, Guzheng Recorder, and
Tea Brewmaster. The homepage also has an interactive "Hub" section featuring
a playable guzheng (Chinese zither) and a calligraphy canvas, plus rotating
classical Chinese proverbs.

TEAM STRUCTURE
AHC is run entirely by students, organized into:
- Directors & Department Heads — set direction and run the core
  departments: Executive Director, Director of Operations, and heads of
  Music, Volunteering/Service, Arts, and Marketing.
- Creative & Media — handle writing, design, social media presence, and
  original music arrangements/composition (Social Media Manager, Digital
  Media Manager, Visual Design, Blog Writer, Music Arranger & Composer).
- Members — newer contributors, roles/titles to be assigned/updated over
  time.

(See src/components/TeamPage.tsx MASTER_TEAM array for the current roster,
individual bios, and "contribution" descriptions — this is updated as people
join, leave, or change roles.)

GETTING INVOLVED
AHC welcomes students looking to explore their heritage, parents who want to
get involved, and community members who want to contribute. Ways to get
involved highlighted on the site: perform traditional music for real
audiences, lead calligraphy/origami/craft workshops, tutor Chinese (from
elementary level through AP), and earn certified volunteer/service hours.
Applications go through a form on the homepage ("Apply to Join" /
/#apply section); general questions go to
asianheritagecollective@gmail.com. There's also a newsletter signup for
monthly updates on events, performances, and opportunities.


PART 3 — NOTES FOR AGENTS
=============================================================
- Treat src/data/pastEvents.ts, src/data/blogPosts.ts,
  src/components/TeamPage.tsx (MASTER_TEAM/GROUPS), and src/data.ts
  (MILESTONES, PROGRAMS, STATS_NUMERIC, PARTNERS) as the live, evolving
  sources of truth — this README's lists are illustrative snapshots, not
  exhaustive or current inventories.
- Don't hardcode counts (e.g., "X events," "Y team members," "Z blog posts")
  into new copy unless explicitly asked — these change over time.
- Image files referenced by data.ts/components live in
  src/assets/images/ and src/assets/videos/; new images should be added
  there and registered in the IMAGES object in data.ts if reused across
  components.
- The "dist/" folder is a generated build output — don't hand-edit it;
  edit source files under src/ and rebuild.
- Per DEPLOY_INSTRUCTIONS.md, the site owner is non-technical, so any
  instructions you write for them should be step-by-step and avoid assuming
  command-line familiarity.
