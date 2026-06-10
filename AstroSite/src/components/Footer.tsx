import React from "react";

const EXPLORE_LINKS = [
  { href: "/about", label: "About AHC" },
  { href: "/events", label: "Past Events" },
  { href: "/team", label: "Meet the Team" },
  { href: "/blog", label: "Living Heritage Blog" },
  { href: "/games", label: "Games Room" },
  { href: "/#apply", label: "Apply to Join" },
];

const HOME_ANCHORS = [
  { href: "/#about", label: "Who We Are" },
  { href: "/#story", label: "Our Story" },
  { href: "/#programs", label: "Programs" },
  { href: "/#impact", label: "Impact" },
  { href: "/#partnership", label: "Partners" },
  { href: "/#interactive", label: "Try It Yourself" },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-hero texture-grain relative text-on-primary pt-20 pb-10 px-6 md:px-12 overflow-hidden select-text">
      {/* Watermark */}
      <div
        aria-hidden="true"
        data-parallax="0.06"
        className="absolute -right-8 -bottom-16 flex leading-none pointer-events-none select-none"
      >
        <span className="text-watermark-light font-headline text-[16rem] hidden md:block">传承</span>
      </div>

      <div className="container mx-auto max-w-[1280px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-5 max-w-sm">
            <span className="font-headline text-3xl font-bold block text-white leading-tight">
              Asian Heritage Collective
            </span>
            <p className="font-body text-base text-white/70 leading-relaxed italic font-headline">
              "Heritage inspires the aspiring."
            </p>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              A Michigan 501(c)(3) nonprofit fostering youth cultural
              development through music, art, language, and community service.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://www.instagram.com/asianheritagecollective"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AHC on Instagram"
                className="liquid-glass-dark rounded-full p-3 text-white/80 hover:text-white hover:scale-110 transition-all"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.tiktok.com/@asianheritagecollective"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AHC on TikTok"
                className="liquid-glass-dark rounded-full p-3 text-white/80 hover:text-white hover:scale-110 transition-all"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-xs font-bold mb-5 uppercase tracking-[0.25em] text-secondary-fixed">
              Explore
            </h4>
            <ul className="font-body text-sm space-y-3 text-white/75">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    className="hover:text-secondary-fixed transition-colors no-underline inline-flex items-center gap-1.5 group"
                    href={l.href}
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-fixed/50 group-hover:bg-secondary-fixed transition-colors" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* On this site */}
          <div>
            <h4 className="font-body text-xs font-bold mb-5 uppercase tracking-[0.25em] text-secondary-fixed">
              Homepage
            </h4>
            <ul className="font-body text-sm space-y-3 text-white/75">
              {HOME_ANCHORS.map((l) => (
                <li key={l.href}>
                  <a
                    className="hover:text-secondary-fixed transition-colors no-underline inline-flex items-center gap-1.5 group"
                    href={l.href}
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary-fixed/50 group-hover:bg-secondary-fixed transition-colors" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-bold mb-5 uppercase tracking-[0.25em] text-secondary-fixed">
              Contact
            </h4>
            <ul className="font-body text-sm space-y-3 text-white/75">
              <li>
                <a
                  className="hover:text-secondary-fixed transition-colors underline decoration-dotted break-all"
                  href="mailto:asianheritagecollective@gmail.com"
                >
                  asianheritagecollective@gmail.com
                </a>
              </li>
              <li className="font-mono text-xs text-white/55">EIN 39-4558056</li>
              <li className="font-mono text-xs text-white/55">501(c)(3) status active</li>
              <li className="pt-2">
                <a
                  href="/#apply"
                  className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-full font-body font-bold text-[11px] uppercase tracking-wider hover:bg-primary-fixed transition-all shadow-md active:scale-95 no-underline"
                >
                  Join Us
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs text-white/50">
            © 2026 Asian Heritage Collective. All rights reserved.
          </span>
          <span className="font-body text-[11px] uppercase tracking-widest text-white/40 font-bold">
            Candid Bronze '24 · Candid Silver '26
          </span>
        </div>
      </div>
    </footer>
  );
}
