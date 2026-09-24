import React from "react";
import { IMAGES } from "../data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={IMAGES.logo} alt="" />
          <div>
            <strong>Asian Heritage Collective</strong>
            <p>Heritage inspires the aspiring.</p>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/about">About</a>
          <a href="/events">Events</a>
          <a href="/blog">Student Blogs</a>
          <a href="/team">Team</a>
        </nav>
        <div className="footer-contact">
          <a href="mailto:asianheritagecollective@gmail.com">asianheritagecollective@gmail.com</a>
          <p>Michigan</p>
        </div>
      </div>
    </footer>
  );
}
