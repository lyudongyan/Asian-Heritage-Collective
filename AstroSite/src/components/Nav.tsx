import React, { useState, useEffect } from 'react';

interface NavProps {
  currentPath: string;
}

export default function Nav({ currentPath }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress((window.scrollY / totalHeight) * 100);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      setMouseActive(true);
    }
    function onLeave() { setMouseActive(false); }
    function onClick(e: MouseEvent) {
      const id = Date.now() + Math.random();
      setRipples(p => [...p, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 600);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    if (mouseActive) document.body.classList.add('mouse-active');
    else document.body.classList.remove('mouse-active');
  }, [mouseActive]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/blog', label: 'Blog' },
    { href: '/games', label: 'Games' },
  ];

  function isActive(href: string) {
    if (href === '/') return currentPath === '/' || currentPath === '';
    return currentPath.startsWith(href);
  }

  return (
    <>
      {/* Mouse spotlight overlay */}
      <div className="mouse-spotlight" />
      <div className="mouse-follower-circle" />

      {/* Scroll Progress Indicator */}
      <div className="fixed left-0 top-0 bottom-0 w-1 bg-primary/5 z-[200] pointer-events-none">
        <div
          className="w-full bg-gradient-to-b from-primary via-secondary to-tertiary rounded-r transition-all duration-75 ease-out shadow-[0_0_10px_rgba(87,0,4,0.6)]"
          style={{ height: `${scrollProgress}%` }}
        />
        <div
          className="absolute left-0 w-2 h-2 -ml-0.5 rounded-full bg-secondary shadow-[0_0_12px_#825500] transition-all duration-75 ease-out"
          style={{ top: `calc(${scrollProgress}% - 4px)` }}
        />
      </div>

      {/* Click ripples */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {ripples.map(rip => (
          <span
            key={rip.id}
            className="click-ripple"
            style={{ left: rip.x - 24, top: rip.y - 24, width: 48, height: 48 }}
          />
        ))}
      </div>

      {/* Top Nav */}
      <div className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto liquid-glass-strong rounded-full px-6 py-3 flex items-center justify-between gap-8 md:gap-12 w-full max-w-4xl shadow-md border border-white/40">
          <a
            href="/"
            className="font-headline text-sm sm:text-base md:text-xl font-bold text-primary flex items-center gap-2 shrink-0 active:scale-95 transition-all truncate max-w-[180px] sm:max-w-none no-underline"
          >
            Asian Heritage Collective
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`font-body text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 py-0.5 no-underline ${
                  isActive(href)
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex shrink-0">
            <a
              href="/#apply"
              className="px-5 py-2.5 rounded-full font-body font-semibold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-lg hover:scale-[1.03] active:scale-95 whitespace-nowrap bg-primary text-on-primary hover:bg-primary-container no-underline"
            >
              Join Us
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle Menu"
            className="md:hidden text-primary p-2 hover:bg-primary/5 rounded-full transition-colors flex items-center justify-center active:scale-90"
          >
            <span className="material-symbols-outlined text-4xl select-none">menu</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-xl flex flex-col justify-center items-center md:hidden select-none animate-fade-in">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-primary hover:bg-primary/5 p-3 rounded-full transition-colors active:scale-90 shadow-md border border-outline/20"
          >
            <span className="material-symbols-outlined text-4xl select-none">close</span>
          </button>

          <div className="mb-8 text-center">
            <div className="font-headline text-primary text-2xl font-bold">Asian Heritage Collective</div>
            <div className="font-body text-xs text-on-surface-variant uppercase tracking-widest mt-1">Heritage inspires the aspiring</div>
          </div>

          <div className="flex flex-col items-center gap-2 w-full px-8 max-w-sm">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'Detailed About' },
              { href: '/events', label: 'Past Events' },
              { href: '/team', label: 'Meet the Team' },
              { href: '/blog', label: 'Living Heritage' },
              { href: '/games', label: 'Games Room' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`w-full text-center py-4 px-6 rounded-2xl font-headline text-xl transition-all active:scale-95 border border-transparent no-underline block ${
                  isActive(href)
                    ? 'text-primary font-bold bg-primary/5 border-primary/10'
                    : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="mt-8 w-full px-8 max-w-sm">
            <a
              href="/#apply"
              className="w-full text-center bg-primary text-on-primary px-8 py-4 rounded-full font-body font-bold text-sm uppercase tracking-wider hover:bg-primary-container transition-all shadow-lg active:scale-95 no-underline block"
            >
              Join Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
