import React, { useEffect, useRef, useState } from "react";

/* ── Eyebrow: editorial section label ─────────────────────── */
export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={`eyebrow ${light ? "eyebrow-light" : ""} ${className}`}>
      {children}
    </span>
  );
}

/* ── Lightbox: full-screen image viewer ───────────────────── */
export function Lightbox({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [src, onClose]);

  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/85 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
    >
      <div
        className="relative flex items-center justify-center w-full h-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Expanded view"
          className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl border-4 border-white/20 object-contain animate-pop-in"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition-all z-10"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>
    </div>
  );
}

/* ── SplitWords: masked word-by-word headline reveal ──────── */
function splitNode(node: React.ReactNode, c: { i: number }): React.ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, k) =>
      part.trim() === "" ? (
        part
      ) : (
        <span key={`${c.i}-${k}`} className="w-mask">
          <span
            className="w-inner"
            style={{ transitionDelay: `${Math.min(c.i++ * 50, 800)}ms` }}
          >
            {part}
          </span>
        </span>
      )
    );
  }
  if (Array.isArray(node)) {
    return node.map((n, k) => (
      <React.Fragment key={k}>{splitNode(n, c)}</React.Fragment>
    ));
  }
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<any>;
    return React.cloneElement(el, undefined, splitNode(el.props.children, c));
  }
  return node;
}

export function SplitWords({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const counter = { i: 0 };
  return (
    <span className={`split-words ${className}`}>
      {splitNode(children, counter)}
    </span>
  );
}

/* ── CountUp: animated stat number that starts when visible ── */
export function CountUp({
  value,
  suffix = "",
  decimals = 0,
  duration = 1800,
  className = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  const formatted = Number(display.toFixed(decimals)).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
