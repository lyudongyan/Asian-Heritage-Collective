import React, { useState } from "react";
import { IMAGES } from "../data";
import { BASE64_IMAGES } from "../assets/base64-images";

export default function Toolbar() {
  const [status, setStatus] = useState<"idle" | "fetching" | "packaging" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  async function generateStandaloneHtml() {
    setStatus("fetching");
    setProgress(0);
    setErrorMsg("");

    const imageEntries = Object.entries(IMAGES);
    const base64Map: Record<string, string> = {};
    let count = 0;

    const getBase64 = (key: string, url: string) => {
      if (!url) return "";
      if (typeof url === "string" && url.startsWith("data:")) {
        return url;
      }
      
      // Get filename from url (e.g., logo.webp)
      const urlFilename = url.split("/").pop()?.split("-")[0]?.split("?")[0] || "";
      
      // Match by exact url filename or matching sub-parts
      const matchKey = Object.keys(BASE64_IMAGES).find(b64Key => {
        const b64Base = b64Key.split(".")[0];
        return b64Key === urlFilename || 
               b64Base === urlFilename ||
               b64Base === key ||
               b64Base.startsWith(key) ||
               key.startsWith(b64Base) ||
               (key === "candid_bronze" && b64Key.includes("candid_bronze"));
      });

      if (matchKey && BASE64_IMAGES[matchKey]) {
        return BASE64_IMAGES[matchKey];
      }
      return url; // fallback to original path if not found (highly unlikely)
    };

    for (const [key, url] of imageEntries) {
      if (url) {
        base64Map[url] = getBase64(key, url);
      }
      count++;
      setProgress(Math.floor((count / imageEntries.length) * 95));
      // Give a tiny breath to let the UI progress bar update elegantly
      await new Promise(resolve => setTimeout(resolve, 8));
    }

    setStatus("packaging");
    setProgress(95);

    try {
      // Build the entire, beautiful standalone index page.
      const originalHtmlTemplate = `<!DOCTYPE html>
<html class="scroll-smooth text-[17px] md:text-[19px]" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Asian Heritage Collective</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "surface-tint": "#a9352f",
                        "on-tertiary": "#ffffff",
                        "on-secondary-fixed-variant": "#633f00",
                        "on-primary-fixed-variant": "#881d1b",
                        "inverse-primary": "#ffb4ab",
                        "on-surface": "#1c1b1b",
                        "secondary-container": "#fdb64b",
                        "on-primary": "#ffffff",
                        "background": "#fcf9f8",
                        "tertiary-fixed": "#ffd9e1",
                        "on-secondary": "#ffffff",
                        "on-primary-fixed": "#410002",
                        "surface-container-low": "#f6f3f2",
                        "on-primary-container": "#ff8378",
                        "secondary-fixed": "#ffddb3",
                        "inverse-surface": "#313030",
                        "inverse-on-surface": "#f3f0ef",
                        "primary-fixed": "#ffdad6",
                        "on-surface-variant": "#58413f",
                        "on-tertiary-container": "#ff7da6",
                        "primary-fixed-dim": "#ffb4ab",
                        "on-secondary-fixed": "#291800",
                        "primary-container": "#7a1212",
                        "surface-container-lowest": "#ffffff",
                        "primary": "#570004",
                        "outline": "#8b716e",
                        "tertiary": "#540026",
                        "surface-bright": "#fcf9f8",
                        "secondary-fixed-dim": "#ffb951",
                        "tertiary-fixed-dim": "#ffb1c5",
                        "surface-variant": "#e5e2e1",
                        "on-background": "#1c1b1b",
                        "surface-container": "#f0eded",
                        "on-tertiary-fixed-variant": "#8b0e45",
                        "on-error": "#ffffff",
                        "error-container": "#ffdad6",
                        "surface-dim": "#dcd9d9",
                        "on-error-container": "#93000a",
                        "surface-container-high": "#eae7e7",
                        "secondary": "#825500",
                        "tertiary-container": "#7c003b",
                        "on-tertiary-fixed": "#3f001b",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#704800",
                        "outline-variant": "#dfbfbc",
                        "surface-container-highest": "#e5e2e1",
                        "surface": "#fcf9f8"
                    },
                    borderRadius: {
                        DEFAULT: "0.25rem",
                        lg: "0.5rem",
                        xl: "0.75rem",
                        "2xl": "1rem",
                        "3xl": "1.5rem",
                        full: "9999px"
                    },
                    spacing: {
                        "stack-lg": "64px",
                        "margin-mobile": "20px",
                        "stack-sm": "8px",
                        "container-max": "1280px",
                        "margin-desktop": "80px",
                        "gutter": "24px",
                        "stack-md": "24px",
                        "section-py": "120px"
                    },
                    fontFamily: {
                        "headline-lg": ["Libre Caslon Text", "serif"],
                        "body-md": ["Manrope", "sans-serif"],
                        "headline-lg-mobile": ["Libre Caslon Text", "serif"],
                        "headline-md": ["Libre Caslon Text", "serif"],
                        "display-lg": ["Libre Caslon Text", "serif"],
                        "label-caps": ["Manrope", "sans-serif"],
                        "body-lg": ["Manrope", "sans-serif"]
                    },
                    fontSize: {
                        "headline-lg": ["56px", { lineHeight: "64px", fontWeight: "700" }],
                        "body-md": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                        "headline-lg-mobile": ["40px", { lineHeight: "48px", fontWeight: "700" }],
                        "headline-md": ["40px", { lineHeight: "48px", fontWeight: "600" }],
                        "display-lg": ["72px", { lineHeight: "80px", letterSpacing: "-0.02em", fontWeight: "700" }],
                        "label-caps": ["14px", { lineHeight: "20px", letterSpacing: "0.1em", fontWeight: "700", textTransform: "uppercase" }],
                        "body-lg": ["22px", { lineHeight: "32px", fontWeight: "400" }]
                    },
                }
            }
        }
    </script>
    <style>
        .bg-hero { background: linear-gradient(135deg, #2c0a10 0%, #150005 50%, #301700 100%); }
        .bg-about { background: linear-gradient(135deg, #fff0ee 0%, #ffdad6 100%); }
        .bg-story { background: linear-gradient(135deg, #ffdad6 0%, #ffb4ab 100%); }
        .bg-impact { background: linear-gradient(135deg, #ffb4ab 0%, #ffd9e1 100%); }
        .bg-hub { background: linear-gradient(135deg, #ffb4ab 0%, #fdb64b 100%); }
        .liquid-glass {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        .liquid-glass-strong {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.7);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04), inset 0 2px 0 rgba(255, 255, 255, 0.8);
        }
        @media (prefers-reduced-motion: no-preference) {
            .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
            .reveal.active { opacity: 1; transform: translateY(0); }
            .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
            .reveal-left.active { opacity: 1; transform: translateX(0); }
            .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
            .reveal-right.active { opacity: 1; transform: translateX(0); }
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md antialiased selection:bg-primary-container selection:text-on-primary">
<div class="fixed top-6 left-0 right-0 z-50 px-margin-mobile flex justify-center pointer-events-none">
    <nav class="pointer-events-auto liquid-glass-strong rounded-full px-6 py-3 flex items-center justify-between gap-8 md:gap-12 transition-all duration-300 w-full max-w-4xl" id="main-nav">
        <a class="font-headline-md text-[24px] font-bold text-primary flex items-center gap-2 group shrink-0" href="#">
            <span>Asian Heritage Collective</span>
        </a>
        <div class="hidden md:flex items-center gap-6">
            <a class="text-primary font-bold border-b-2 border-primary font-label-caps text-label-caps hover:text-primary-container transition-colors duration-300" href="#about">About</a>
            <a class="text-on-surface-variant font-medium font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#story">Our Story</a>
            <a class="text-on-surface-variant font-medium font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#impact">Impact</a>
            <a class="text-on-surface-variant font-medium font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#programs">Programs</a>
            <a class="text-on-surface-variant font-medium font-label-caps text-label-caps hover:text-primary transition-colors duration-300" href="#hub">Hub</a>
        </div>
        <div class="hidden md:flex shrink-0">
            <a class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-caps text-label-caps hover:bg-primary-container transition-colors shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap" href="#apply">
                Join Us
            </a>
        </div>
        <button aria-label="Toggle Menu" class="md:hidden text-primary p-1" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
            <span class="material-symbols-outlined text-3xl">menu</span>
        </button>
    </nav>
</div>

<!-- Mobile Drawer -->
<div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 md:hidden">
    <button class="absolute top-8 right-8 text-primary" onclick="document.getElementById('mobile-menu').classList.add('hidden')">
        <span class="material-symbols-outlined text-4xl">close</span>
    </button>
    <a class="text-primary font-bold text-2xl font-headline" href="#about" onclick="document.getElementById('mobile-menu').classList.add('hidden')">About</a>
    <a class="text-on-surface-variant font-medium text-2xl font-headline hover:text-primary" href="#story" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Our Story</a>
    <a class="text-on-surface-variant font-medium text-2xl font-headline hover:text-primary" href="#impact" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Impact</a>
    <a class="text-on-surface-variant font-medium text-2xl font-headline hover:text-primary" href="#programs" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Programs</a>
    <a class="text-on-surface-variant font-medium text-2xl font-headline hover:text-primary" href="#hub" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Hub</a>
    <a class="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-primary-container transition-colors shadow-md my-4" href="#apply" onclick="document.getElementById('mobile-menu').classList.add('hidden')">Join Us</a>
</div>

<main>
    <section class="bg-hero relative min-h-[100vh] flex items-center justify-center pt-32 overflow-hidden pb-20">
        <div class="absolute top-1/4 left-10 w-64 h-64 bg-white/40 rounded-full blur-3xl mix-blend-overlay"></div>
        <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-overlay"></div>
        <div class="relative z-10 container mx-auto px-margin-mobile md:px-margin-desktop text-center max-w-5xl">
            <div class="mb-8 inline-block reveal active">
                <img alt="Asian Heritage Collective Logo" class="h-48 md:h-64 object-contain mx-auto drop-shadow-2xl" src="##LOGO##"/>
            </div>
            <div class="liquid-glass-strong rounded-3xl p-8 md:p-16 max-w-4xl mx-auto transform transition-all hover:scale-[1.01] duration-500 reveal active">
                <h1 class="font-display-lg text-display-lg text-primary mb-6 text-balance">
                    Heritage inspires the aspiring
                </h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto text-pretty">
                    Foster youth cultural development by empowering young people to learn about their heritage, strengthen their identity, and serve their communities.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a class="bg-primary text-on-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-primary-container transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center" href="#apply">
                        Apply to Join
                    </a>
                    <a class="liquid-glass text-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-white/80 transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2" href="#about">
                        Explore More <span class="material-symbols-outlined text-sm">arrow_downward</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-about py-section-py relative" id="about">
        <div class="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="liquid-glass-strong rounded-3xl p-8 md:p-16 reveal-left active">
                    <h2 class="font-headline-lg text-headline-lg text-primary mb-6">Who We Are</h2>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-6">
                        We are a collective of passionate individuals dedicated to preserving and celebrating Asian heritage. Through education, community engagement, and cultural appreciation, we aim to bridge generational gaps and foster a deep sense of belonging among youth.
                    </p>
                    <p class="font-body-lg text-body-lg text-on-surface-variant">
                        Our vision is to see every young person of Asian descent proud of their roots and equipped to share their culture with the world. We believe that by understanding our past, we can build a stronger, more inclusive future.
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-4 reveal-right active">
                    <img alt="Cultural performance" class="rounded-2xl shadow-lg w-full h-64 object-cover object-center" src="##CULTURAL_PERFORMANCE##"/>
                    <img alt="Community engagement" class="rounded-2xl shadow-lg w-full h-64 object-cover object-center mt-8" src="##COMMUNITY_ENGAGEMENT##"/>
                </div>
            </div>
        </div>
    </section>

    <section class="relative py-32 flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img alt="Crowd watching performers" class="w-full h-full object-cover object-center opacity-40 mix-blend-multiply filter contrast-125" src="##CROWD_WATCHING##"/>
            <div class="absolute inset-0 bg-gradient-to-r from-primary/80 to-tertiary/60 mix-blend-multiply"></div>
        </div>
        <div class="relative z-10 container mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <div class="liquid-glass-strong rounded-3xl p-10 md:p-20 max-w-5xl mx-auto reveal !bg-white/10 !border-white/30 active">
                <span class="material-symbols-outlined text-6xl text-white/70 mb-6 block drop-shadow-md">format_quote</span>
                <h2 class="font-headline-lg text-headline-lg text-white mb-8 text-balance leading-tight drop-shadow-lg">"Foster youth cultural development by empowering young people to learn about their heritage, strengthen their identity, and serve their communities."</h2>
                <p class="font-body-lg text-white/90 uppercase tracking-widest font-bold drop-shadow-md">— AHC MISSION</p>
            </div>
        </div>
    </section>

    <section class="bg-story py-section-py relative" id="story">
        <div class="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
            <div class="flex flex-col lg:flex-row-reverse gap-12 items-center">
                <div class="lg:w-1/2 liquid-glass-strong rounded-3xl p-8 md:p-12 reveal-right active">
                    <h2 class="font-headline-lg text-headline-lg text-primary mb-6">Our Founding Story</h2>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-6">
                        Mr. Yan noticed a decline in enrollment and cultural connection at a local Chinese school. He realized that traditional rote learning methods were disengaging youth from their roots. He started the Asian Heritage Collective to make culture learning meaningful, relevant, and inspiring for the next generation.
                    </p>
                    <p class="font-body-lg text-body-lg text-on-surface-variant">
                        What began as a small group of dedicated students and parents has blossomed into a movement. By shifting the focus from memorization to active participation, AHC has transformed how young people experience their heritage, turning obligation into passion.
                    </p>
                </div>
                <div class="lg:w-1/2 relative reveal-left min-h-[500px] active">
                    <img alt="Students preparing food" class="absolute top-0 left-0 w-3/4 rounded-3xl shadow-xl border-4 border-white/50 transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10" src="##FOUNDING_STORY_LEFT##"/>
                    <img alt="Elderly viewing stand" class="absolute bottom-0 right-0 w-2/3 rounded-3xl shadow-xl border-4 border-white/50 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20" src="##ELDERLY_VIEWING##"/>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-impact py-section-py relative" id="programs">
        <div class="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
            <div class="text-center mb-16 reveal active">
                <h2 class="font-headline-lg text-headline-lg text-primary mb-4">What We Do</h2>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Making culture learning meaningful and relevant.</p>
            </div>
            <div class="flex flex-col lg:flex-row gap-12 items-center mb-16">
                <div class="lg:w-1/2 grid grid-cols-2 gap-4 reveal-left active">
                    <div class="relative w-full h-[500px]">
                        <img alt="Team Performance" class="absolute top-0 left-0 w-full h-[320px] rounded-3xl shadow-xl object-cover z-10" src="##TEAM_PERFORMANCE##"/>
                        <div class="absolute bottom-0 right-0 w-2/3 h-48 bg-white p-2 rounded-3xl shadow-2xl z-20">
                            <img alt="Cello player" class="w-full h-full rounded-2xl object-cover" src="##CELLO_PLAYER##"/>
                        </div>
                    </div>
                </div>
                <div class="lg:w-1/2 liquid-glass-strong rounded-3xl p-8 md:p-12 reveal-right active">
                    <ul class="space-y-8">
                        <li class="flex items-start gap-4">
                            <div class="bg-primary/10 p-4 rounded-full"><span class="material-symbols-outlined text-primary text-3xl">school</span></div>
                            <div>
                                <h3 class="font-headline-md text-[32px] text-primary mb-2 font-bold">Education</h3>
                                <p class="font-body-lg text-body-lg text-on-surface-variant">Language tutoring (e.g., HSK Level 5 preparation) and curriculum development.</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <div class="bg-primary/10 p-4 rounded-full"><span class="material-symbols-outlined text-primary text-3xl">palette</span></div>
                            <div>
                                <h3 class="font-headline-md text-[32px] text-primary mb-2 font-bold">Arts</h3>
                                <p class="font-body-lg text-body-lg text-on-surface-variant">Cultural art workshops including calligraphy, painting, and traditional crafts.</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <div class="bg-primary/10 p-4 rounded-full"><span class="material-symbols-outlined text-primary text-3xl">music_note</span></div>
                            <div>
                                <h3 class="font-headline-md text-[32px] text-primary mb-2 font-bold">Performance</h3>
                                <p class="font-body-lg text-body-lg text-on-surface-variant">Traditional music performances, dance troupes, and public showcases.</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <div class="bg-primary/10 p-4 rounded-full"><span class="material-symbols-outlined text-primary text-3xl">volunteer_activism</span></div>
                            <div>
                                <h3 class="font-headline-md text-[32px] text-primary mb-2 font-bold font-headline">Community</h3>
                                <p class="font-body-lg text-body-lg text-on-surface-variant">Community service, civic engagement, and structured volunteer opportunities.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="impact">
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active">
                    <div class="font-display-lg text-[64px] font-bold text-primary mb-2">6200<span class="text-primary/60">+</span></div>
                    <div class="font-label-caps text-[16px] font-bold text-on-surface-variant uppercase tracking-wider">Individuals Directly Impacted</div>
                </div>
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active" style="transition-delay: 100ms;">
                    <div class="font-display-lg text-[64px] font-bold text-primary mb-2">51.4k</div>
                    <div class="font-label-caps text-[16px] font-bold text-on-surface-variant uppercase tracking-wider">Digital Content Impacts</div>
                </div>
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active" style="transition-delay: 200ms;">
                    <div class="font-display-lg text-[64px] font-bold text-primary mb-2">3600<span class="text-primary/60">+</span></div>
                    <div class="font-label-caps text-[16px] font-bold text-on-surface-variant uppercase tracking-wider">Volunteer &amp; Service Hours</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Transparency & Honesty Section -->
    <section class="bg-surface py-20 relative border-y border-outline-variant/30">
        <div class="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
            <div class="text-center mb-12 reveal active">
                <h2 class="font-headline-lg text-headline-lg text-primary mb-4">Transparency, Integrity, &amp; Honesty</h2>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
                    Asian Heritage Collective is invested in maintaining full transparency, integrity, and honesty in how it operates.
                </p>
            </div>
            <div class="flex justify-center reveal active">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    <div class="liquid-glass-strong rounded-3xl p-8 flex flex-col items-center text-center">
                        <div class="mb-6 bg-white p-4 rounded-xl shadow-sm">
                            <img alt="Candid Bronze Seal 2024" class="h-32 object-contain" src="##CANDID_BRONZE##"/>
                        </div>
                        <h3 class="font-headline-md text-2xl text-primary font-bold mb-2">2024 Candid Bronze</h3>
                        <p class="font-body-md text-on-surface-variant">Asian Heritage Collective received the Bronze seal in its founding year, 2024.</p>
                    </div>
                    <div class="liquid-glass-strong rounded-3xl p-8 flex flex-col items-center text-center">
                        <div class="mb-6 bg-white p-4 rounded-xl shadow-sm">
                            <img alt="Candid Silver Seal 2025" class="h-32 object-contain" src="##CANDID_SILVER##"/>
                        </div>
                        <h3 class="font-headline-md text-2xl text-primary font-bold mb-2 font-headline">2025 Candid Silver</h3>
                        <p class="font-body-md text-on-surface-variant">Asian Heritage Collective now has the Silver Seal of Transparency, held since 2025.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Partnerships Section -->
    <section class="bg-about py-20 relative">
        <div class="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
            <div class="text-center mb-12 reveal active">
                <h2 class="font-headline-lg text-headline-lg text-primary mb-4">Partnerships &amp; Sponsorships</h2>
            </div>
            <div class="flex justify-center reveal active">
                <div class="flex flex-wrap justify-center items-center gap-8 max-w-5xl px-4">
                    <div class="liquid-glass rounded-2xl p-6 flex flex-col items-center gap-4 group hover:liquid-glass-strong transition-all duration-300">
                        <img alt="Eastern Market" class="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300" src="##EASTERN_MARKET##"/>
                        <span class="text-[12px] font-label-caps tracking-widest text-on-surface-variant/60 font-bold uppercase">Eastern Market</span>
                    </div>
                    <div class="liquid-glass rounded-2xl p-6 flex flex-col items-center gap-4 group hover:liquid-glass-strong transition-all duration-300 col-span-2">
                        <img alt="Michigan Chinese Women Association" class="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300" src="##MICHIGAN_WOMEN##"/>
                        <span class="text-[12px] font-label-caps tracking-widest text-on-surface-variant/60 font-bold uppercase">Michigan Chinese Women Association</span>
                    </div>
                    <div class="liquid-glass rounded-2xl p-6 flex flex-col items-center gap-4 group hover:liquid-glass-strong transition-all duration-300">
                        <img alt="American Chinese School" class="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300" src="##CANDID_BRONZE##"/>
                        <span class="text-[12px] font-label-caps tracking-widest text-on-surface-variant/60 font-bold uppercase">American Chinese School</span>
                    </div>
                    <div class="liquid-glass rounded-2xl p-6 flex flex-col items-center gap-4 group hover:liquid-glass-strong transition-all duration-300">
                        <img alt="Oakland Chinese Church" class="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300" src="##OAKLAND_CHURCH##"/>
                        <span class="text-[12px] font-label-caps tracking-widest text-on-surface-variant/60 font-bold uppercase">Oakland Chinese Church</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Engagement Hub Section -->
    <section class="bg-hub py-section-py relative" id="hub">
        <div class="container mx-auto px-margin-mobile md:px-margin-desktop max-w-[1280px]">
            <h2 class="font-headline-lg text-headline-lg text-primary mb-12 text-center reveal active">Engagement Hub</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active">
                    <h3 class="font-headline-md text-[32px] text-primary mb-4 font-bold">Newsletter</h3>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">Stay updated with our latest news and events.</p>
                    <button class="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-primary-container transition-colors shadow-md hover:shadow-lg inline-block w-full" onclick="alert('Thank you for subscribing to our newsletter!')">Subscribe</button>
                </div>
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active" style="transition-delay: 100ms;">
                    <h3 class="font-headline-md text-[32px] text-primary mb-4 font-bold">Blog</h3>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">Read stories from our community and insights on heritage.</p>
                    <button class="liquid-glass text-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-white/80 transition-colors inline-block w-full" onclick="alert('Directing you to the blog section...')">Read Blog</button>
                </div>
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active" style="transition-delay: 200ms;">
                    <h3 class="font-headline-md text-[32px] text-primary mb-4 font-bold">Past Events</h3>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">Explore galleries of our previous performances and workshops.</p>
                    <button class="liquid-glass text-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-white/80 transition-colors inline-block w-full" onclick="alert('Opening our visual gallery...')">View Gallery</button>
                </div>
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active">
                    <h3 class="font-headline-md text-[32px] text-primary mb-4 font-bold">Our Team</h3>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">Meet the passionate individuals behind AHC.</p>
                    <button class="liquid-glass text-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-white/80 transition-colors inline-block w-full" onclick="alert('Meet our volunteers/team!')">Learn More</button>
                </div>
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal active" style="transition-delay: 100ms;">
                    <h3 class="font-headline-md text-[32px] text-primary mb-4 font-bold font-headline">Awards &amp; Collabs</h3>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">Discover our partnerships and recognitions.</p>
                    <button class="liquid-glass text-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-white/80 transition-colors inline-block w-full" onclick="alert('Loading transparency details...')">View Awards</button>
                </div>
                <div class="liquid-glass-strong rounded-2xl p-10 text-center hover:-translate-y-2 transition-transform duration-300 reveal !bg-white/40 active" style="transition-delay: 200ms;">
                    <h3 class="font-headline-md text-[32px] text-primary mb-4 font-bold">Ready to Join?</h3>
                    <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">Become part of a movement to inspire the aspiring.</p>
                    <a class="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-primary-container transition-colors shadow-lg hover:shadow-xl inline-block w-full" href="#apply">Apply Now</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Simple Apply Form Section -->
    <section class="bg-surface py-20 relative" id="apply">
        <div class="container mx-auto px-margin-mobile md:px-margin-desktop max-w-3xl">
            <div class="liquid-glass-strong rounded-3xl p-8 md:p-12 reveal active">
                <h2 class="font-headline-lg text-primary text-center mb-6">Join Asian Heritage Collective</h2>
                <p class="font-body-md text-on-surface-variant text-center mb-8">Become a tutor, artist, performer, or community volunteer. Share your story with us!</p>
                
                <form onsubmit="event.preventDefault(); alert('Thank you for applying! We will reach out to you within 3 business days.'); this.reset();" class="space-y-6">
                    <div>
                        <label class="block font-label-caps text-xs font-bold text-on-surface-variant mb-2">FULL NAME</label>
                        <input type="text" required class="w-full rounded-lg border-outline/30 bg-white/70 px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" placeholder="Your Name" />
                    </div>
                    <div>
                        <label class="block font-label-caps text-xs font-bold text-on-surface-variant mb-2">EMAIL ADDRESS</label>
                        <input type="email" required class="w-full rounded-lg border-outline/30 bg-white/70 px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label class="block font-label-caps text-xs font-bold text-on-surface-variant mb-2">INTERESTS</label>
                        <select class="w-full rounded-lg border-outline/30 bg-white/70 px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition">
                            <option>Education / Language Tutoring</option>
                            <option>Arts &amp; Traditional Workshops</option>
                            <option>Music &amp; Traditional Performance</option>
                            <option>Community Volunteering &amp; Civic Engagement</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-label-caps text-xs font-bold text-on-surface-variant mb-2">HOW WOULD YOU LIKE TO CONTRIBUTE?</label>
                        <textarea required h-28 class="w-full rounded-lg border-outline/30 bg-white/70 px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" placeholder="Tell us a bit about your connection to Asian heritage..."></textarea>
                    </div>
                    
                    <button type="submit" class="w-full bg-primary text-on-primary py-4 rounded-full font-label-caps font-bold hover:bg-primary-container shadow-md transition-all">Submit Application</button>
                </form>
            </div>
        </div>
    </section>

    <footer class="bg-primary text-on-primary py-16 px-margin-mobile md:px-margin-desktop">
        <div class="container mx-auto max-w-[1280px]">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="space-y-6">
                    <span class="font-headline-md text-headline-md font-bold">Asian Heritage Collective</span>
                    <p class="font-body-md text-on-primary/80">Copyright 2024-2026 Asian Heritage Collective. All works fall under United States and international copyright laws, with writing processes documented. For queries on originality, please submit a query to our email.</p>
                </div>
                <div class="space-y-6">
                    <div>
                        <h4 class="font-label-caps text-label-caps mb-4 uppercase tracking-widest text-secondary-fixed">Contact Info</h4>
                        <ul class="font-body-md space-y-2">
                            <li>Email: <a class="hover:text-secondary-fixed transition-colors" href="mailto:asianheritagecollective@gmail.com">asianheritagecollective@gmail.com</a></li>
                            <li>EIN: 39-4558056</li>
                            <li>501(c)(3) status active</li>
                        </ul>
                    </div>
                </div>
                <div class="space-y-6">
                    <div>
                        <h4 class="font-label-caps text-label-caps mb-4 uppercase tracking-widest text-secondary-fixed">Links</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <ul class="font-body-md space-y-2">
                                <li><a class="hover:text-secondary-fixed transition-colors" href="#about">About</a></li>
                                <li><a class="hover:text-secondary-fixed transition-colors" href="#">Portfolio</a></li>
                                <li><a class="hover:text-secondary-fixed transition-colors" href="#">Team</a></li>
                            </ul>
                            <ul class="font-body-md space-y-2">
                                <li><a class="hover:text-secondary-fixed transition-colors" href="#">Contact</a></li>
                                <li><a class="hover:text-secondary-fixed transition-colors" href="#programs">Programs</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</main>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    });
</script>
</body>
</html>`;

      // Perform all Base64 replacements
      let finalizedHtml = originalHtmlTemplate;
      finalizedHtml = finalizedHtml.replaceAll("##LOGO##", base64Map[IMAGES.logo] || IMAGES.logo);
      finalizedHtml = finalizedHtml.replaceAll("##CULTURAL_PERFORMANCE##", base64Map[IMAGES.cultural_performance] || IMAGES.cultural_performance);
      finalizedHtml = finalizedHtml.replaceAll("##COMMUNITY_ENGAGEMENT##", base64Map[IMAGES.community_engagement] || IMAGES.community_engagement);
      finalizedHtml = finalizedHtml.replaceAll("##CROWD_WATCHING##", base64Map[IMAGES.crowd_watching] || IMAGES.crowd_watching);
      finalizedHtml = finalizedHtml.replaceAll("##FOUNDING_STORY_LEFT##", base64Map[IMAGES.founding_story_left] || IMAGES.founding_story_left);
      finalizedHtml = finalizedHtml.replaceAll("##ELDERLY_VIEWING##", base64Map[IMAGES.elderly_viewing] || IMAGES.elderly_viewing);
      finalizedHtml = finalizedHtml.replaceAll("##TEAM_PERFORMANCE##", base64Map[IMAGES.team_performance] || IMAGES.team_performance);
      finalizedHtml = finalizedHtml.replaceAll("##CELLO_PLAYER##", base64Map[IMAGES.cello_player] || IMAGES.cello_player);
      finalizedHtml = finalizedHtml.replaceAll("##CANDID_BRONZE##", base64Map[IMAGES.candid_bronze] || IMAGES.candid_bronze);
      finalizedHtml = finalizedHtml.replaceAll("##CANDID_SILVER##", base64Map[IMAGES.candid_silver] || IMAGES.candid_silver);
      finalizedHtml = finalizedHtml.replaceAll("##EASTERN_MARKET##", base64Map[IMAGES.eastern_market] || IMAGES.eastern_market);
      finalizedHtml = finalizedHtml.replaceAll("##MICHIGAN_WOMEN##", base64Map[IMAGES.michigan_women] || IMAGES.michigan_women);
      finalizedHtml = finalizedHtml.replaceAll("##OAKLAND_CHURCH##", base64Map[IMAGES.oakland_church] || IMAGES.oakland_church);

      // Create download trigger
      const blob = new Blob([finalizedHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asian_heritage_collective_offline.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus("success");
      setProgress(100);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "An error occurred while compiling standalone file.");
    }
  }

  return null;
}
