import { useEffect, useState, type FormEvent } from "react";
import { api } from "../../lib/api";

type DomainScope = "medical-hub" | "social-growth" | "animal-eco-care";

type EventItem = {
  _id: string;
  title: string;
  description: string;
  domain: DomainScope;
  eventType: string;
  eventDate: string;
};

const emptyForm = {
  title: "",
  description: "",
  domain: "medical-hub" as DomainScope,
  eventType: "",
  eventDate: "",
};

function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadEvents = async () => {
    const response = await api.get("/events");
    setEvents(response.data);
  };

  useEffect(() => {
    loadEvents().catch(() => undefined);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (editingId) {
      await api.put(`/events/${editingId}`, form);
    } else {
      await api.post("/events", form);
    }

    setForm(emptyForm);
    setEditingId(null);
    await loadEvents();
  };

  const handleEdit = (item: EventItem) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      domain: item.domain,
      eventType: item.eventType,
      eventDate: item.eventDate.slice(0, 10),
    });
  };

  const handleDelete = async (eventId: string) => {
    const shouldDelete = window.confirm("Delete this event?");
    if (!shouldDelete) return;
    await api.delete(`/events/${eventId}`);
    await loadEvents();
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-head">
        <h2>Event Announcements</h2>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Event title"
          value={form.title}
          onChange={(event) => setForm((previous) => ({ ...previous, title: event.target.value }))}
          required
        />
        <textarea
          placeholder="Event description"
          value={form.description}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, description: event.target.value }))
          }
          required
        />
        <div className="admin-inline-field two-col">
          <select
            value={form.domain}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                domain: event.target.value as DomainScope,
              }))
            }
          >
            <option value="medical-hub">Medical Hub</option>
            <option value="social-growth">Social Growth</option>
            <option value="animal-eco-care">Animal and Eco Care</option>
          </select>
          <input
            placeholder="Event type (Blood Donation, Boot Camp...)"
            value={form.eventType}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, eventType: event.target.value }))
            }
            required
          />
        </div>
        <input
          type="date"
          value={form.eventDate}
          onChange={(event) => setForm((previous) => ({ ...previous, eventDate: event.target.value }))}
          required
        />
        <button type="submit" className="admin-submit-btn">
          {editingId ? "Update Event" : "Add Event"}
        </button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Domain</th>
              <th>Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((eventItem) => (
              <tr key={eventItem._id}>
                <td>{eventItem.title}</td>
                <td>{eventItem.domain}</td>
                <td>{eventItem.eventType}</td>
                <td>
                  {new Date(eventItem.eventDate).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="admin-action-cell">
                  <button type="button" className="admin-small-btn" onClick={() => handleEdit(eventItem)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-small-btn danger"
                    onClick={() => handleDelete(eventItem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminEvents;
