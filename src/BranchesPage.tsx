import { useEffect, useMemo, useState } from "react";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { api } from "./lib/api";

type Branch = {
  _id: string;
  name: string;
  description: string;
  locationName: string;
};

function getEmbedUrl(locationName: string) {
  const query = encodeURIComponent(locationName || "Mumbai");
  return `https://maps.google.com/maps?q=${query}&z=13&output=embed`;
}

function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [activeBranchId, setActiveBranchId] = useState("");

  const activeBranch = useMemo(
    () => branches.find((branch) => branch._id === activeBranchId) ?? branches[0],
    [activeBranchId, branches],
  );

  useEffect(() => {
    async function loadBranches() {
      const response = await api.get("/branches");
      const data = response.data as Branch[];
      setBranches(data);
      if (data.length > 0) {
        setActiveBranchId(data[0]._id);
      }
    }

    loadBranches().catch(() => undefined);
  }, []);

  return (
    <div className="page-shell branches-page-shell">
      <SiteHeader />
      <main className="medical-hub-page branches-page">
        <Reveal>
          <section className="branches-hero">
          <p className="branches-kicker">Branches</p>
          <h1>Visit Our Branch Network</h1>
          <p>
            Explore our available branch network with interactive map locations and
            branch descriptions.
          </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="branches-sub-grid">
          <article className="branches-sub-list-card">
            <h2>Sub Branches</h2>
            <p>Click a branch to view details.</p>
            <div className="branches-sub-list" role="list">
              {branches.map((branch) => (
                <button
                  className={`branches-sub-item ${activeBranch?._id === branch._id ? "active" : ""}`}
                  type="button"
                  key={branch._id}
                  onClick={() => setActiveBranchId(branch._id)}
                >
                  <span>{branch.name}</span>
                  <small>{branch.locationName}</small>
                </button>
              ))}
            </div>
          </article>

          {activeBranch ? (
            <article className="branches-sub-detail-card">
              <h3>{activeBranch.name}</h3>
              <p className="branches-detail-location">
                <strong>Location:</strong> {activeBranch.locationName}
              </p>
              <p>{activeBranch.description}</p>
              <div className="branches-sub-map leaflet-map-wrap">
                <iframe
                  title={`${activeBranch.name} map`}
                  src={getEmbedUrl(activeBranch.locationName)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </article>
          ) : (
            <article className="branches-sub-detail-card">
              <h3>No branches yet</h3>
              <p>Add branches from the admin panel to see them here.</p>
            </article>
          )}
          </section>
        </Reveal>
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>
    </div>
  );
}

export default BranchesPage;
