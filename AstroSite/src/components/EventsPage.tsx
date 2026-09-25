import React, { useEffect, useRef, useState } from "react";
import { PAST_EVENTS } from "../data/pastEvents";

const images = import.meta.glob<{ default: { src: string } }>("../assets/images/*", { eager: true });

function imageFor(filename: string): string {
  if (/^https?:\/\//.test(filename)) return filename;
  return images[`../assets/images/${filename}`]?.default?.src ?? "";
}

export default function EventsPage() {
  const pathWrapRef = useRef<HTMLDivElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<{ d: string; width: number; height: number } | null>(null);

  useEffect(() => {
    const wrap = pathWrapRef.current;
    if (!wrap) return;

    const buildPath = () => {
      const wrapRect = wrap.getBoundingClientRect();
      const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-event-node]"));
      if (nodes.length < 2 || !wrapRect.width) return;

      const points = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - wrapRect.left,
          y: rect.top + rect.height / 2 - wrapRect.top,
        };
      });

      const centerX = wrapRect.width / 2;
      const twirl = Math.min(138, wrapRect.width * .13);
      let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

      points.slice(1).forEach((point, index) => {
        const previous = points[index];
        const gap = point.y - previous.y;
        const midY = previous.y + gap / 2;
        const direction = index % 2 === 0 ? 1 : -1;

        d += ` C ${previous.x.toFixed(1)},${(previous.y + gap * .23).toFixed(1)} ${(centerX - direction * twirl).toFixed(1)},${(midY - gap * .13).toFixed(1)} ${centerX.toFixed(1)},${(midY - 36).toFixed(1)}`;
        d += ` C ${(centerX + direction * twirl).toFixed(1)},${(midY - 104).toFixed(1)} ${(centerX + direction * twirl).toFixed(1)},${(midY + 82).toFixed(1)} ${centerX.toFixed(1)},${(midY + 62).toFixed(1)}`;
        d += ` C ${(centerX - direction * twirl * .62).toFixed(1)},${(midY + 45).toFixed(1)} ${(centerX - direction * twirl * .52).toFixed(1)},${(midY - 22).toFixed(1)} ${centerX.toFixed(1)},${(midY - 4).toFixed(1)}`;
        d += ` C ${(centerX + direction * twirl * .7).toFixed(1)},${(midY + gap * .13).toFixed(1)} ${point.x.toFixed(1)},${(point.y - gap * .23).toFixed(1)} ${point.x.toFixed(1)},${point.y.toFixed(1)}`;
      });

      setGeometry({ d, width: wrapRect.width, height: wrapRect.height });
    };

    buildPath();
    const resizeObserver = new ResizeObserver(buildPath);
    resizeObserver.observe(wrap);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const wrap = pathWrapRef.current;
    const path = activePathRef.current;
    if (!wrap || !path || !geometry) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const wrapRect = wrap.getBoundingClientRect();
      const viewport = innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport * .68 - wrapRect.top) / Math.max(1, wrapRect.height - viewport * .18)));
      path.style.strokeDashoffset = matchMedia("(prefers-reduced-motion: reduce)").matches ? "0" : `${length * (1 - progress)}`;

      wrap.querySelectorAll<HTMLElement>("[data-event-stop]").forEach((stop) => {
        const rect = stop.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const focus = Math.max(0, Math.min(1, 1 - Math.abs(center - viewport * .5) / (viewport * .72)));
        stop.style.setProperty("--event-focus", focus.toFixed(3));
        stop.style.setProperty("--event-scale", (.91 + focus * .09).toFixed(3));
        stop.style.setProperty("--event-hover-scale", (.94 + focus * .09).toFixed(3));
        stop.style.setProperty("--event-opacity", (.64 + focus * .36).toFixed(3));
        stop.style.setProperty("--event-brightness", (.78 + focus * .22).toFixed(3));
        stop.style.setProperty("--event-saturation", (.82 + focus * .2).toFixed(3));
        stop.style.setProperty("--event-lift", `${((1 - focus) * 20).toFixed(1)}px`);
        stop.style.setProperty("--node-scale", (.76 + focus * .24).toFixed(3));
        stop.classList.toggle("is-current", focus > .68);
      });
    };

    const requestPaint = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    addEventListener("scroll", requestPaint, { passive: true });
    addEventListener("resize", requestPaint, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", requestPaint);
      removeEventListener("resize", requestPaint);
    };
  }, [geometry]);

  return (
    <main className="page-shell events-page">
      <header className="page-hero page-width events-intro">
        <p className="section-label">Along the way</p>
        <h1>Events</h1>
        <p>Follow the path through performances, workshops, tutoring, and community service across Michigan.</p>
      </header>

      <section className="page-width event-roadmap" ref={pathWrapRef}>
        {geometry && (
          <svg className="event-roadmap-path" width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
            <defs>
              <linearGradient id="event-path-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f7d892" />
                <stop offset=".48" stopColor="#c43b45" />
                <stop offset="1" stopColor="#78121a" />
              </linearGradient>
              <filter id="event-path-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className="event-path-base" d={geometry.d} />
            <path className="event-path-spark" d={geometry.d} />
            <path ref={activePathRef} className="event-path-active" d={geometry.d} />
          </svg>
        )}

        {PAST_EVENTS.map((event, index) => (
          <div className={`event-stop ${index % 2 ? "is-right" : "is-left"}`} data-event-stop key={event.id}>
            <span className="event-path-node" data-event-node><i /></span>
            <a
              className={`event-card event-path-card ${event.cardImageFile?.startsWith("http") ? "event-card-logo" : ""}`}
              href={`/events/${event.id}`}
              style={{ backgroundImage: `url(${imageFor(event.cardImageFile ?? event.imageFile)})` }}
            >
              <span className="event-order">{String(index + 1).padStart(2, "0")}</span>
              <div className="event-card-shade" />
              <div className="event-card-copy">
                <h2>{event.title}</h2>
                <div className="event-card-details">
                  <div className="tile-meta"><span>{event.date}</span><span>{event.location}</span></div>
                  <p>{event.desc}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}
