import React, { useEffect, useState } from "react";
import { IMAGES } from "../data";

const links = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Student Blogs" },
  { href: "/team", label: "Team" },
];

export default function Nav({ currentPath = "/" }: { currentPath?: string }) {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [currentPath]);

  return (
    <header className={`site-nav ${condensed ? "is-condensed" : ""}`}>
      <div className="nav-glass liquid-surface" data-glass>
        <a className="brand" href="/" aria-label="Asian Heritage Collective home">
          <img src={IMAGES.logo} alt="" />
          <span>Asian Heritage Collective</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={open ? "is-open" : ""} aria-label="Primary navigation">
          {links.map((link) => {
            const active = currentPath === link.href || currentPath.startsWith(`${link.href}/`);
            return (
              <a key={link.href} href={link.href} aria-current={active ? "page" : undefined}>
                {link.label}
              </a>
            );
          })}
          <a className="nav-join" href="/#join">Join AHC</a>
        </nav>
      </div>
    </header>
  );
}
