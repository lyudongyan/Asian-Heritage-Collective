import React from "react";
import { PAST_EVENTS } from "../data/pastEvents";

const images = import.meta.glob<{ default: { src: string } }>("../assets/images/*", { eager: true });

function imageFor(filename: string): string {
  return images[`../assets/images/${filename}`]?.default?.src ?? "";
}

export default function EventsPage() {
  return (
    <main className="page-shell">
      <header className="page-hero page-width">
        <h1>Events</h1>
        <p>Performances, workshops, library programs, and volunteer service across Michigan.</p>
      </header>

      <section className="page-width">
        <div className="content-grid">
          {PAST_EVENTS.map((event, index) => (
            <a
              className={`content-tile reveal ${index === 0 ? "featured" : ""}`}
              href={`/events/${event.id}`}
              key={event.id}
              style={{ backgroundImage: `url(${imageFor(event.imageFile)})` }}
            >
              <div className="image-shade" />
              <div className="tile-copy liquid-surface liquid-dark" data-glass>
                <div className="tile-meta">
                  <span>{event.date}</span>
                  <span>{event.location}</span>
                  {event.imageFiles.length > 1 && <span>{event.imageFiles.length} photos</span>}
                </div>
                {index === 0 ? <h2>{event.title}</h2> : <h3>{event.title}</h3>}
                <p>{event.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
