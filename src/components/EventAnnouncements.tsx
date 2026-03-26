import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { api } from "../lib/api";

type DomainScope = "all" | "medical-hub" | "social-growth" | "animal-eco-care";

type EventItem = {
  _id: string;
  title: string;
  description: string;
  domain: DomainScope;
  eventType: string;
  eventDate: string;
};

type EventAnnouncementsProps = {
  title?: string;
  domain?: Exclude<DomainScope, "all">;
  limit?: number;
  className?: string;
};

function EventAnnouncements({
  title = "Upcoming Announcements",
  domain,
  limit = 4,
  className = "",
}: EventAnnouncementsProps) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const response = await api.get("/events", {
          params: domain ? { domain } : undefined,
        });
        const scopedEvents = domain
          ? (response.data as EventItem[]).filter((eventItem) => eventItem.domain === domain)
          : (response.data as EventItem[]);
        const nextEvents = scopedEvents.slice(0, limit);
        setEvents(nextEvents);
      } finally {
        setLoading(false);
      }
    }

    loadEvents().catch(() => undefined);
  }, [domain, limit]);

  if (!loading && events.length === 0) {
    return null;
  }

  return (
    <section className={`event-announcement-section ${className}`}>
      <Reveal>
        <div className="event-announcement-head">
          <p className="event-kicker">Announcements</p>
          <h2>{title}</h2>
        </div>
      </Reveal>

      {loading ? <p className="event-empty">Loading events...</p> : null}

      <div className="event-grid">
        {events.map((eventItem, index) => (
          <Reveal key={eventItem._id} delay={0.05 * (index % 6)}>
            <article className="event-card interactive">
              <p className="event-badge">{eventItem.eventType}</p>
              <h3>{eventItem.title}</h3>
              <p>{eventItem.description}</p>
              <small>
                {new Date(eventItem.eventDate).toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </small>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default EventAnnouncements;
