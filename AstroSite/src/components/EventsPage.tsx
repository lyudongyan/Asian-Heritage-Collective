import React from "react";
import { PAST_EVENTS } from "../data/pastEvents";

const images = import.meta.glob<{ default: { src: string } }>("../assets/images/*", { eager: true });

function imageFor(filename: string): string {
  if (/^https?:\/\//.test(filename)) return filename;
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
        <div className="event-grid">
          {PAST_EVENTS.map((event) => (
            <a
              className={`event-card ${event.cardImageFile?.startsWith("http") ? "event-card-logo" : ""}`}
              href={`/events/${event.id}`}
              key={event.id}
              style={{ backgroundImage: `url(${imageFor(event.cardImageFile ?? event.imageFile)})` }}
            >
              <div className="event-card-shade" />
              <div className="event-card-copy">
                <h2>{event.title}</h2>
                <div className="event-card-details">
                  <div className="tile-meta">
                  <span>{event.date}</span>
                  <span>{event.location}</span>
                  </div>
                  <p>{event.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
