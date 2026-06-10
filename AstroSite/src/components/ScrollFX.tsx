import { useEffect } from "react";

/**
 * Global scroll-motion engine, mounted once (via Nav) on every page.
 *
 * 1. Reveals `.split-words` headlines (word-by-word masked rise).
 * 2. Parallax for `[data-parallax="<speed>"]` decorative layers
 *    (watermarks, glow blobs, background images).
 * 3. Scroll-scrub hero exit for `[data-scrub]` / `[data-scrub-video]`.
 *
 * Everything is disabled for prefers-reduced-motion users.
 */
export default function ScrollFX() {
  // Word-reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    const t = window.setTimeout(() => {
      document.querySelectorAll(".split-words").forEach((el) => obs.observe(el));
    }, 150);
    return () => {
      window.clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  // Parallax + hero scrub, one rAF pipeline
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let ticking = false;

    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;

      // Parallax layers — anchored to their untransformed parent,
      // so measurements never feed back into themselves.
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const s = parseFloat(el.dataset.parallax || "0");
        const anchor = (el.offsetParent as HTMLElement | null) ?? el.parentElement;
        if (!anchor || !s) return;
        const r = anchor.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const off = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(off * s).toFixed(1)}px, 0)`;
      });

      // Hero scrub — camera pull-back as the hero leaves the viewport
      const y = window.scrollY;
      if (y < vh * 1.5) {
        const p = Math.min(1, Math.max(0, y / (vh * 0.9)));
        document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
          el.style.opacity = `${(1 - p * 0.85).toFixed(3)}`;
          el.style.transformOrigin = "50% 25%";
          el.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(3)})`;
        });
        document.querySelectorAll<HTMLElement>("[data-scrub-video]").forEach((el) => {
          el.style.opacity = `${(0.3 * (1 - p * 0.85)).toFixed(3)}`;
          el.style.transform = `scale(${(1 + p * 0.08).toFixed(3)})`;
        });
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(frame);
      }
    };

    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
