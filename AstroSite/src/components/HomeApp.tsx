import React, { useState, useEffect, useRef } from 'react';
import { IMAGES, MARQUEE_FACTS } from '../data';
import { Eyebrow, SplitWords } from './ui';
import Hero from './Hero';
import About from './About';
import Story from './Story';
import WhatWeDo from './WhatWeDo';
import Transparency from './Transparency';
import Partnership from './Partnership';
import Hub from './Hub';
import Footer from './Footer';

/* ── Marquee fact ribbon (velocity-reactive) ──────────────── */
function FactRibbon() {
  const loop = [...MARQUEE_FACTS, ...MARQUEE_FACTS];
  const trackRef = useRef<HTMLDivElement>(null);

  // Cruises on its own; accelerates with scroll velocity, then eases back
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0;
    let vel = 0;
    let lastY = window.scrollY;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      vel = vel * 0.9 + (y - lastY) * 0.1;
      lastY = y;
      x -= 0.55 + Math.min(Math.abs(vel) * 0.22, 5);
      const half = el.scrollWidth / 2;
      if (half > 0 && -x >= half) x += half;
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-primary border-y border-white/10 py-4 overflow-hidden relative z-10">
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {loop.map((fact, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-on-primary/90 whitespace-nowrap px-6">
              {fact}
            </span>
            <span className="text-secondary-container text-base select-none" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */
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
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[active];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMAGES.large_crowd_performance} alt="" data-parallax="0.05" className="w-full h-full object-cover object-center opacity-25 scale-125" aria-hidden="true" />
        <div className="absolute inset-0 bg-surface/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
          {/* Left: heading + controls */}
          <div className="scroll-reveal-left">
            <Eyebrow className="mb-6">Community Voices</Eyebrow>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-[1.1] mb-6">
              <SplitWords>
                What the community <em className="italic">says back</em>.
              </SplitWords>
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed mb-10 max-w-md">
              From churches to classrooms to community associations — the
              people we show up for, in their own words.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous testimonial"
                className="liquid-glass rounded-full p-3 text-primary hover:bg-white/80 transition-all active:scale-90"
              >
                <span className="material-symbols-outlined text-xl block">arrow_back</span>
              </button>
              <button
                onClick={() => setActive(a => (a + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="bg-primary text-on-primary rounded-full p-3 hover:bg-primary-container transition-all active:scale-90 shadow-md"
              >
                <span className="material-symbols-outlined text-xl block">arrow_forward</span>
              </button>
              <div className="flex gap-2 ml-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === active ? 'w-7 h-2 bg-primary' : 'w-2 h-2 bg-primary/25 hover:bg-primary/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: quote card */}
          <div className="scroll-reveal-right">
            <div key={active} className="liquid-glass-strong rounded-3xl p-8 md:p-12 shadow-xl animate-fade-in relative">
              <span
                aria-hidden="true"
                className="font-headline text-[7rem] text-primary/10 absolute -top-4 left-6 leading-none select-none"
              >
                "
              </span>
              <p className="font-headline text-lg md:text-2xl text-on-surface leading-relaxed mb-8 relative italic">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-headline text-sm font-bold border-2 border-white/50 shadow-inner`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-headline font-bold text-primary text-base">{t.name}</div>
                  <div className="font-body text-xs text-on-surface-variant uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Apply Form ───────────────────────────────────────────── */
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

  const inputClass = 'w-full border border-outline/30 rounded-xl px-4 py-3 font-body text-sm text-on-surface bg-white/80 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50';

  return (
    <div>
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

/* ── Apply section (split layout) ─────────────────────────── */
function ApplySection() {
  return (
    <section className="bg-about py-28 relative overflow-hidden" id="apply">
      <span
        aria-hidden="true"
        data-parallax="0.12"
        className="text-watermark font-headline text-[14rem] absolute -top-8 -left-6 leading-none pointer-events-none hidden xl:block"
      >
        07
      </span>
      <div className="container mx-auto px-6 md:px-12 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
          <div className="lg:sticky lg:top-32 scroll-reveal-left">
            <Eyebrow className="mb-6">07 · Join Us</Eyebrow>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-[1.1] mb-6">
              <SplitWords>
                Come build something <em className="italic">with us</em>.
              </SplitWords>
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-8">
              Whether you're a student looking to explore your heritage, a
              parent wanting to get involved, or a community member eager to
              contribute — we'd love to hear from you.
            </p>
            <ul className="space-y-4">
              {[
                { icon: 'music_note', text: 'Perform traditional music for real audiences' },
                { icon: 'brush', text: 'Lead calligraphy, origami, and craft workshops' },
                { icon: 'school', text: 'Tutor Chinese, from elementary level to AP' },
                { icon: 'volunteer_activism', text: 'Earn certified volunteer & service hours' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-4">
                  <span className="bg-primary/10 rounded-full p-2.5 text-primary shrink-0">
                    <span className="material-symbols-outlined text-lg block select-none">{item.icon}</span>
                  </span>
                  <span className="font-body text-sm md:text-base text-on-surface-variant">{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-on-surface-variant/80 mt-8">
              Questions first? Write to{' '}
              <a href="mailto:asianheritagecollective@gmail.com" className="text-primary font-bold underline decoration-dotted">
                asianheritagecollective@gmail.com
              </a>
            </p>
          </div>

          <div className="liquid-glass-strong rounded-3xl p-8 md:p-10 shadow-xl border border-primary/10 scroll-reveal-right">
            <ApplyForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter Bar ───────────────────────────────────────── */
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
    <section className="bg-primary py-12 border-t border-white/10">
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

/* ── Section dot rail (right edge) ────────────────────────── */
const RAIL_SECTIONS = [
  { id: 'about', label: 'Who We Are' },
  { id: 'story', label: 'Our Story' },
  { id: 'programs', label: 'Programs' },
  { id: 'transparency', label: 'Accountability' },
  { id: 'partnership', label: 'Partners' },
  { id: 'interactive', label: 'Try It Yourself' },
  { id: 'apply', label: 'Join Us' },
];

function SectionRail({ activeSection }: { activeSection: string }) {
  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[150] hidden lg:flex flex-col gap-3.5"
    >
      {RAIL_SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center justify-end"
          aria-label={`Jump to ${s.label}`}
        >
          <span className="absolute right-6 liquid-glass-strong text-primary font-body text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-md">
            {s.label}
          </span>
          <span
            className={`rounded-full transition-all duration-300 border ${
              activeSection === s.id
                ? 'w-3 h-3 bg-primary border-primary shadow-[0_0_8px_rgba(87,0,4,0.5)]'
                : 'w-2.5 h-2.5 bg-primary/15 border-primary/30 group-hover:bg-primary/40'
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

/* ── Main HomeApp ─────────────────────────────────────────── */
export default function HomeApp() {
  const [activeSection, setActiveSection] = useState('');
  const isLockActive = useRef(false);

  // Section intersection observer
  useEffect(() => {
    const ids = RAIL_SECTIONS.map(s => s.id);
    const observers = ids.map(id => {
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
      <SectionRail activeSection={activeSection} />

      <Hero />
      <FactRibbon />
      <About />
      <Story />
      <WhatWeDo />
      <Transparency />
      <Partnership />
      <Testimonials />
      <Hub />
      <ApplySection />
      <NewsletterBar />
      <Footer />
    </main>
  );
}
