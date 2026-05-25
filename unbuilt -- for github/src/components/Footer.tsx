import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-primary text-on-primary py-16 px-margin-mobile md:px-margin-desktop border-t border-white/10 select-text">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <span className="font-headline text-3xl font-bold block text-white">Asian Heritage Collective</span>
            <p className="font-body text-sm text-on-primary/80 leading-relaxed">
              Copyright 2024-2026 Asian Heritage Collective. All works fall under United States and international copyright laws, with writing processes documented. For queries on helpline or originality, please submit a query to our email.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-body text-xs font-bold mb-4 uppercase tracking-widest text-secondary-fixed">
                Contact Info
              </h4>
              <ul className="font-body text-sm space-y-2 text-on-primary/90">
                <li>
                  Email:{" "}
                  <a
                    className="hover:text-secondary-fixed transition-colors underline decoration-dotted"
                    href="mailto:asianheritagecollective@gmail.com"
                  >
                    asianheritagecollective@gmail.com
                  </a>
                </li>
                <li>EIN: 39-4558056</li>
                <li>501(c)(3) status active</li>
              </ul>
            </div>
            <div>
              <h4 className="font-body text-xs font-bold mb-4 uppercase tracking-widest text-secondary-fixed">
                Follow Us
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/asianheritagecollective"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-on-primary/90 hover:text-secondary-fixed transition-colors group"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @asianheritagecollective
                </a>
                <a
                  href="https://www.tiktok.com/@asianheritagecollective"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-on-primary/90 hover:text-secondary-fixed transition-colors group"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
                  </svg>
                  @asianheritagecollective
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-body text-xs font-bold mb-4 uppercase tracking-widest text-secondary-fixed">
                Links
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <ul className="font-body text-sm space-y-2 text-on-primary/90">
                  <li>
                    <a className="hover:text-secondary-fixed transition-colors" href="#about">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary-fixed transition-colors" href="#programs">
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary-fixed transition-colors" href="#hub">
                      Team
                    </a>
                  </li>
                </ul>
                <ul className="font-body text-sm space-y-2 text-on-primary/90">
                  <li>
                    <a className="hover:text-secondary-fixed transition-colors" href="#apply">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-secondary-fixed transition-colors" href="#programs">
                      Programs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
