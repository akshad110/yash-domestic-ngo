import { useEffect, useState, type FormEvent } from "react";
import { api } from "../../lib/api";

type Branch = {
  _id: string;
  name: string;
  description: string;
  locationName: string;
};

const emptyForm = {
  name: "",
  description: "",
  locationName: "",
};

function getGoogleEmbedUrl(locationName: string) {
  const query = encodeURIComponent(locationName || "Mumbai");
  return `https://maps.google.com/maps?q=${query}&z=13&output=embed`;
}

function AdminBranches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadBranches = async () => {
    const response = await api.get("/branches");
    setBranches(response.data);
  };

  useEffect(() => {
    loadBranches().catch(() => undefined);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      locationName: form.locationName,
    };

    if (editingId) {
      await api.put(`/branches/${editingId}`, payload);
    } else {
      await api.post("/branches", payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    await loadBranches();
  };

  const editBranch = (branch: Branch) => {
    setEditingId(branch._id);
    setForm({
      name: branch.name,
      description: branch.description,
      locationName: branch.locationName,
    });
  };

  const deleteBranch = async (branchId: string) => {
    const shouldDelete = window.confirm("Delete this branch?");
    if (!shouldDelete) return;
    await api.delete(`/branches/${branchId}`);
    await loadBranches();
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-head">
        <h2>Branch Management</h2>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Branch Name"
          value={form.name}
          onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(event) =>
            setForm((previous) => ({ ...previous, description: event.target.value }))
          }
          required
        />
        <div className="admin-inline-field">
          <input
            placeholder="Location Name"
            value={form.locationName}
            onChange={(event) =>
              setForm((previous) => ({ ...previous, locationName: event.target.value }))
            }
            required
          />
        </div>
        <button className="admin-submit-btn" type="submit">
          {editingId ? "Update Branch" : "Create Branch"}
        </button>
      </form>

      <div className="admin-branch-map">
        <iframe
          title="Branch location preview"
          src={getGoogleEmbedUrl(form.locationName)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Map</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch._id}>
                <td>{branch.name}</td>
                <td>{branch.locationName}</td>
                <td>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(branch.locationName)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Map
                  </a>
                </td>
                <td className="admin-action-cell">
                  <button type="button" className="admin-small-btn" onClick={() => editBranch(branch)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-small-btn danger"
                    onClick={() => deleteBranch(branch._id)}
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

export default AdminBranches;
