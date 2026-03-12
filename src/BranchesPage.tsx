import { useMemo, useState } from "react";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

type SubBranch = {
  id: string;
  name: string;
  area: string;
  location: string;
  description: string;
  services: string[];
  mapEmbedUrl: string;
};

const mainBranchServices = [
  "Open 24/7 for emergency dog rescue response and first-aid intake.",
  "Fully equipped clinic with OPD, minor OT, isolation zone, and recovery kennels.",
  "Coordinates vaccination, sterilization, and adoption drives across the city.",
];

const subBranches: SubBranch[] = [
  {
    id: "bandra",
    name: "Bandra Sub Branch",
    area: "Bandra West",
    location: "Bandra West, Mumbai",
    description:
      "Focused on rescue calls near coastal and residential zones with quick field response.",
    services: [
      "Street rescue response",
      "Basic wound treatment and transport",
      "Feeding and awareness support",
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Bandra%20West%20Mumbai&z=13&output=embed",
  },
  {
    id: "dadar",
    name: "Dadar Sub Branch",
    area: "Dadar East",
    location: "Dadar East, Mumbai",
    description:
      "Acts as a central coordination point for transfers, treatment schedules, and volunteer support.",
    services: [
      "Animal transfer coordination",
      "Community camp execution",
      "Volunteer onboarding support",
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Dadar%20East%20Mumbai&z=13&output=embed",
  },
  {
    id: "thane",
    name: "Thane Sub Branch",
    area: "Thane West",
    location: "Thane West, Mumbai",
    description:
      "Supports peri-urban rescue calls and shelter partnerships for long-term rehabilitation.",
    services: [
      "Shelter partnership management",
      "Emergency stabilization support",
      "Adoption event participation",
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Thane%20West%20Mumbai&z=13&output=embed",
  },
  {
    id: "vashi",
    name: "Vashi Sub Branch",
    area: "Vashi, Navi Mumbai",
    location: "Vashi, Navi Mumbai",
    description:
      "Handles Navi Mumbai rescue operations and outreach programs in residential communities.",
    services: [
      "Rapid rescue dispatch",
      "Field treatment and referral",
      "Local awareness and school sessions",
    ],
    mapEmbedUrl: "https://maps.google.com/maps?q=Vashi%20Navi%20Mumbai&z=13&output=embed",
  },
];

function BranchesPage() {
  const [activeBranchId, setActiveBranchId] = useState("vashi");

  const activeBranch = useMemo(
    () => subBranches.find((branch) => branch.id === activeBranchId) ?? subBranches[0],
    [activeBranchId],
  );

  return (
    <div className="page-shell branches-page-shell">
      <SiteHeader />
      <main className="medical-hub-page branches-page">
        <Reveal>
          <section className="branches-hero">
          <p className="branches-kicker">Branches</p>
          <h1>Visit Our Branch Network</h1>
          <p>
            Explore our main branch and sub branches. Select any branch below to view
            details and contact information.
          </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="branches-main-card">
          <article className="branches-main-info">
            <span className="branches-pill">Main Branch</span>
            <h2>Yash</h2>
            <p className="branches-main-subtitle">DOMESTIC CENTRE</p>
            <p>
              Our central operations hub for emergency rescue, surgery support, foster
              coordination, and volunteer management.
            </p>
            <ul>
              {mainBranchServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <p className="branches-main-location">
              <strong>Location:</strong> Andheri West, Mumbai
            </p>
          </article>
          <article className="branches-main-map">
            <iframe
              src="https://maps.google.com/maps?q=Andheri%20West%20Mumbai&z=13&output=embed"
              title="Main branch location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </article>
          </section>
        </Reveal>

        <Reveal>
          <section className="branches-sub-grid">
          <article className="branches-sub-list-card">
            <h2>Sub Branches</h2>
            <p>Click a branch to view details.</p>
            <div className="branches-sub-list" role="list">
              {subBranches.map((branch) => (
                <button
                  className={`branches-sub-item ${activeBranch.id === branch.id ? "active" : ""}`}
                  type="button"
                  key={branch.id}
                  onClick={() => setActiveBranchId(branch.id)}
                >
                  <span>{branch.name}</span>
                  <small>{branch.area}</small>
                </button>
              ))}
            </div>
          </article>

          <article className="branches-sub-detail-card">
            <h3>{activeBranch.name}</h3>
            <p className="branches-detail-location">
              <strong>Location:</strong> {activeBranch.location}
            </p>
            <p>{activeBranch.description}</p>
            <ul>
              {activeBranch.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <div className="branches-sub-map">
              <iframe
                src={activeBranch.mapEmbedUrl}
                title={`${activeBranch.name} map`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </article>
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
