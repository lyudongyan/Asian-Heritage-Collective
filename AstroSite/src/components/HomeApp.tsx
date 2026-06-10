import React, { useState, useEffect, useRef } from 'react';
import { IMAGES } from '../data';
import Hero from './Hero';
import About from './About';
import Story from './Story';
import WhatWeDo from './WhatWeDo';
import Transparency from './Transparency';
import Partnership from './Partnership';
import Hub from './Hub';
import Footer from './Footer';

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Brady Morishita',
    role: 'Oakland Chinese Church',
    quote:
      'The Asian Heritage Collective brought something truly special to our congregation. Watching these young people share their culture with such confidence and joy was deeply moving. Their commitment to community is exactly what we need more of.',
    initials: 'BM',
    color: 'from-amber-100 to-amber-200 text-amber-900',
  },
  {
    name: 'Mrs. Yang',
    role: 'Chinese Language Teacher',
    quote:
      'Having AHC volunteer in my classroom was a gift. The students engaged with my kids in ways I never could alone — making language learning feel exciting and meaningful. I saw children who dreaded class suddenly light up.',
    initials: 'MY',
    color: 'from-rose-100 to-rose-200 text-rose-900',
  },
  {
    name: 'Mrs. Lien',
    role: 'Chair, Michigan Chinese Women Association',
    quote:
      'AHC has been a remarkable partner for our association. Their performances at our events are always polished and heartfelt. More importantly, they represent the next generation of cultural stewardship that gives our community real hope.',
    initials: 'ML',
    color: 'from-emerald-100 to-emerald-200 text-emerald-900',
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[active];
  return (
    <section className="relative py-20 border-t border-outline-variant/20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.large_crowd_performance} alt="" className="w-full h-full object-cover object-center opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 bg-surface/70" />
      </div>
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">Community Voices</h2>
          <p className="font-body text-base text-on-surface-variant mt-3 max-w-xl mx-auto">
            Hear from the people whose lives AHC has touched.
          </p>
        </div>
        <div className="max-w-3xl mx-auto scroll-reveal">
          <div key={active} className="liquid-glass-strong rounded-3xl p-8 md:p-12 text-center shadow-sm animate-fade-in">
            <span className="material-symbols-outlined text-5xl text-primary/30 mb-4 block select-none">format_quote</span>
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8 italic">"{t.quote}"</p>
            <div className="flex items-center justify-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-headline text-sm font-bold border-2 border-white/50 shadow-inner`}>
                {t.initials}
              </div>
              <div className="text-left">
                <div className="font-headline font-bold text-primary text-base">{t.name}</div>
                <div className="font-body text-xs text-on-surface-variant uppercase tracking-wider">{t.role}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-primary/25 hover:bg-primary/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Instagram / Social Feed ───────────────────────────────────────────────────
function InstagramFeed() {
  return (
    <section className="bg-about py-20 border-t border-outline-variant/20">
      <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="text-center mb-10">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-3xl">photo_camera</span>
            Follow Along
          </h2>
          <p className="font-body text-base text-on-surface-variant mt-3">Stay connected with AHC on social media</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
          <a href="https://www.instagram.com/asianheritagecollective" target="_blank" rel="noopener noreferrer"
            className="liquid-glass-strong rounded-3xl p-8 flex flex-col items-center gap-4 hover:shadow-xl transition-all duration-300 group flex-1 text-center no-underline"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <div className="font-headline font-bold text-primary text-base">@asianheritagecollective</div>
              <div className="font-body text-xs text-on-surface-variant mt-1">Instagram</div>
            </div>
            <div className="bg-primary text-on-primary px-5 py-2 rounded-full font-body font-bold text-xs uppercase tracking-wider group-hover:bg-primary-container transition-all shadow-md">
              View on Instagram
            </div>
          </a>

          <a href="https://www.tiktok.com/@asianheritagecollective" target="_blank" rel="noopener noreferrer"
            className="liquid-glass-strong rounded-3xl p-8 flex flex-col items-center gap-4 hover:shadow-xl transition-all duration-300 group flex-1 text-center no-underline"
          >
            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
              </svg>
            </div>
            <div>
              <div className="font-headline font-bold text-primary text-base">@asianheritagecollective</div>
              <div className="font-body text-xs text-on-surface-variant mt-1">TikTok</div>
            </div>
            <div className="bg-black text-white px-5 py-2 rounded-full font-body font-bold text-xs uppercase tracking-wider group-hover:bg-neutral-800 transition-all shadow-md">
              View on TikTok
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Apply Form ────────────────────────────────────────────────────────────────
function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', age: '', role: '', interest: '', message: '', school: '', phone: '',
  });
  const FORMSPREE_ID = 'xgoqpveq';

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch { setSubmitted(true); }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <span className="material-symbols-outlined text-6xl text-primary mb-4 block">check_circle</span>
        <h3 className="font-headline text-2xl text-primary font-bold mb-2">Application Received!</h3>
        <p className="font-body text-on-surface-variant max-w-md mx-auto">
          Thank you for your interest in AHC. We'll be in touch within a few days.
        </p>
      </div>
    );
  }

  const inputClass = 'w-full border border-outline/30 rounded-xl px-4 py-3 font-body text-sm text-on-surface bg-surface-container focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Full Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} />
        </div>
        <div>
          <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Age</label>
          <input name="age" value={form.age} onChange={handleChange} placeholder="e.g. 16" className={inputClass} />
        </div>
        <div>
          <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">I am a...</label>
          <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
            <option value="">Select one</option>
            <option>Student</option>
            <option>Parent / Guardian</option>
            <option>Educator</option>
            <option>Community Member</option>
            <option>Partner / Sponsor</option>
          </select>
        </div>
        <div>
          <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">School</label>
          <input name="school" value={form.school} onChange={handleChange} placeholder="Your school or university" className={inputClass} />
        </div>
        <div>
          <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Cell Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. (123) 456-7890" className={inputClass} />
        </div>
      </div>
      <div className="mb-4">
        <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Area of Interest</label>
        <select name="interest" value={form.interest} onChange={handleChange} className={inputClass}>
          <option value="">Select one</option>
          <option>Education &amp; Language</option>
          <option>Arts &amp; Crafts</option>
          <option>Music &amp; Performance</option>
          <option>Community Service</option>
          <option>General Volunteering</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="font-body text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Tell us about yourself</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
          placeholder="What draws you to AHC? Any relevant experience?"
          className={inputClass + ' resize-none'} />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary text-on-primary py-4 rounded-full font-body font-bold text-sm uppercase tracking-wider hover:bg-primary-container transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>Submitting...</>
        ) : (
          <><span className="material-symbols-outlined text-lg">send</span>Submit Application</>
        )}
      </button>
      <p className="text-center font-body text-xs text-on-surface-variant/60 mt-3">We typically respond within 2–3 business days.</p>
    </div>
  );
}

// ── Newsletter Bar ────────────────────────────────────────────────────────────
function NewsletterBar() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('https://formspree.io/f/xgoqpveq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'Newsletter signup' }),
      });
    } catch {}
    setDone(true);
    setLoading(false);
  }

  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-6 md:px-12 max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-headline text-2xl text-on-primary font-bold">Stay in the Loop</h3>
          <p className="font-body text-sm text-on-primary/80 mt-1">Monthly updates on events, performances, and opportunities.</p>
        </div>
        {done ? (
          <div className="flex items-center gap-2 text-on-primary font-body font-bold text-sm">
            <span className="material-symbols-outlined text-xl">check_circle</span>
            You're subscribed — thank you!
          </div>
        ) : (
          <div className="flex gap-3 w-full md:w-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 md:w-64 px-4 py-3 rounded-full font-body text-sm bg-white/15 text-on-primary placeholder:text-on-primary/50 border border-white/30 focus:outline-none focus:border-white focus:bg-white/25 transition-all"
            />
            <button onClick={handleSubmit} disabled={loading}
              className="bg-on-primary text-primary px-6 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md active:scale-95 disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Home Page Sidebar (section anchors) ───────────────────────────────────────
function HomeSidebar({ activeSection }: { activeSection: string }) {
  const [hovered, setHovered] = useState(false);

  const links = [
    { hash: 'about',    label: 'About',       desc: 'Overview & Mission',      icon: 'info' },
    { hash: 'story',    label: 'Our Story',    desc: 'Historical timelines',    icon: 'history_edu' },
    { hash: 'programs', label: 'Programs',     desc: 'Arts, music & teaching',  icon: 'celebration' },
    { hash: 'impact',   label: 'Impact',       desc: 'Nonprofit transparency',  icon: 'analytics' },
    { hash: 'hub',      label: 'Get Involved', desc: 'Resource portals',        icon: 'hub' },
    { hash: 'apply',    label: 'Join Us',      desc: 'Volunteer applications',  icon: 'volunteer_activism' },
  ];

  function scrollTo(hash: string) {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    setHovered(false);
  }

  return (
    <div
      className="fixed left-0 top-1/5 z-[150] h-[540px] hidden md:flex items-center transition-all duration-300 pointer-events-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`pointer-events-auto h-full rounded-r-3xl transition-all duration-350 shadow-2xl border-r border-y border-white/40 backdrop-blur-3xl flex relative overflow-hidden ${hovered ? 'w-72 bg-[#fcf9f8]/95' : 'w-16 bg-[#fcf9f8]/80'}`}>
        {!hovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none py-4">
            <span className="material-symbols-outlined text-primary mb-3 text-2xl select-none">toc</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-lr' }}>
              ★ Landing Sections
            </div>
          </div>
        )}

        <div className={`w-full p-5 flex flex-col justify-between transition-all duration-350 select-none ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="space-y-4">
            <div className="border-b border-primary/10 pb-3">
              <span className="text-[10px] font-bold text-primary font-mono uppercase tracking-widest block">Homepage Sections</span>
              <span className="text-xs text-on-surface-variant font-medium font-body">Quick-jump anchors</span>
            </div>
            <div className="space-y-1.5">
              {links.map(pg => (
                <button
                  key={pg.hash}
                  onClick={() => scrollTo(pg.hash)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 active:scale-95 cursor-pointer ${activeSection === pg.hash ? 'bg-primary text-on-primary shadow-md animate-pop-in' : 'hover:bg-primary/5 text-on-surface hover:text-primary'}`}
                >
                  <span className="material-symbols-outlined text-lg shrink-0 select-none">{pg.icon}</span>
                  <div className="leading-tight">
                    <span className="text-xs font-bold block">{pg.label}</span>
                    <span className={`text-[9px] block font-medium ${activeSection === pg.hash ? 'text-white/70' : 'text-on-surface-variant/70'}`}>{pg.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="text-[9px] font-mono text-center text-on-surface-variant/40 mt-4">Asian Heritage Collective © 2026</div>
        </div>
      </div>
    </div>
  );
}

// ── Main HomeApp ──────────────────────────────────────────────────────────────
export default function HomeApp() {
  const [activeSection, setActiveSection] = useState('');
  const isLockActive = useRef(false);
  const lockTimeout = useRef<any>(null);

  // Navigate helper for components that still use onNavigate prop
  function handleNavigate(page: string) {
    window.location.href = page === 'home' ? '/' : `/${page}`;
  }

  // Smooth scroll handler for sidebar / footer anchor links
  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, hash: string) {
    e.preventDefault();
    const sectionName = hash.replace('#', '');
    isLockActive.current = true;
    setActiveSection(sectionName);
    if (lockTimeout.current) clearTimeout(lockTimeout.current);
    lockTimeout.current = setTimeout(() => { isLockActive.current = false; }, 900);
    document.getElementById(sectionName)?.scrollIntoView({ behavior: 'smooth' });
  }

  // Section intersection observer
  useEffect(() => {
    const sections = ['about', 'story', 'impact', 'programs', 'hub', 'apply'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && !isLockActive.current) setActiveSection(id); },
        { rootMargin: '-25% 0px -55% 0px' }
      );
      obs.observe(el);
      return { obs, el };
    });
    return () => observers.forEach(item => item && item.obs.unobserve(item.el));
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale')
        .forEach(el => obs.observe(el));
    }, 200);
    return () => { clearTimeout(timer); obs.disconnect(); };
  }, []);

  return (
    <main className="select-text relative min-h-screen">
      <HomeSidebar activeSection={activeSection} />

      <Hero onNavigate={handleNavigate} />
      <About onNavigate={handleNavigate} />
      <Story />
      <WhatWeDo onNavigate={handleNavigate} />
      <Transparency />
      <Partnership />
      <Testimonials />
      <InstagramFeed />
      <Hub onNavigate={handleNavigate} />

      {/* Apply / Contact Section */}
      <section className="bg-surface py-24" id="apply">
        <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold">Join Asian Heritage Collective</h2>
            <p className="font-body text-base text-on-surface-variant mt-4 max-w-2xl mx-auto leading-relaxed">
              Whether you're a student looking to explore your heritage, a parent wanting to get involved, or a community member eager to contribute — we'd love to hear from you.
            </p>
          </div>
          <ApplyForm />
        </div>
      </section>

      <NewsletterBar />
      <Footer onLinkClick={handleLinkClick} onNavigate={handleNavigate} />
    </main>
  );
}
