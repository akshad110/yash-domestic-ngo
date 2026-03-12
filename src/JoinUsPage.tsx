import { useEffect, useState } from "react";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const impactCards = [
  {
    tag: "Medical Hub",
    title: "Real Impact",
    description: "Hands-on work that directly improves animal lives and local communities.",
    caption: "Meaningful impact through daily service",
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "Social Growth",
    title: "Safe Work Environment",
    description: "Structured support with trained on-ground teams and practical guidance.",
    caption: "Guided teamwork with trusted support",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "Animal and Eco Care",
    title: "Community Support",
    description: "Collaborative culture with volunteers, field teams, and operations staff.",
    caption: "Strong community backing at every step",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=80",
  },
];

const updates = ["Rescue alerts", "Volunteer schedules", "Event updates"];

function JoinUsPage() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  useEffect(() => {
    if (!isJobModalOpen && !isVolunteerModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsJobModalOpen(false);
        setIsVolunteerModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isJobModalOpen, isVolunteerModalOpen]);

  return (
    <div className="page-shell join-page-shell">
      <SiteHeader />
      <main className="medical-hub-page join-page">
        <Reveal>
          <section className="join-hero-card">
          <p className="join-hero-kicker">Join Us / Careers</p>
          <h1>Join Our Mission</h1>
          <h2>Careers &amp; Volunteering</h2>
          <p>
            Apply for daily wage operations, volunteer in weekend branch activities,
            and connect instantly through our WhatsApp community.
          </p>
          <span className="join-hero-line" aria-hidden="true" />
          </section>
        </Reveal>

        <section className="floating-mission-cards join-impact-cards" aria-label="Why join us">
          {impactCards.map((item, index) => (
            <Reveal key={item.title} delay={0.07 * index}>
              <article
                className="mission-card"
                style={{
                  backgroundImage: `linear-gradient(150deg, rgba(8, 26, 20, 0.8), rgba(8, 26, 20, 0.62)), url(${item.image})`,
                }}
              >
                <div className="mission-card-content">
                  <span className="mission-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <p className="join-impact-caption">{item.caption}</p>
              </article>
            </Reveal>
          ))}
        </section>

        <section className="join-job-card" id="careers">
          <Reveal className="join-job-media" direction="left">
            <img
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80"
              alt="Rescue team member carrying an injured dog"
            />
          </Reveal>
          <Reveal className="join-job-content" direction="right">
            <span className="join-job-type">Role Type: Paid / Field Work</span>
            <h3>Daily Salary Job :-</h3>
            <p>
              Join our field operations team for daily wage work in feeding routes,
              clinic support, and shelter handling. We are looking for responsible
              people who can work with compassion and consistency.
            </p>
            <ul>
              <li>Mumbai</li>
              <li>8 hours/day</li>
              <li>Daily Wage</li>
              <li>On ground operations support</li>
            </ul>
            <button
              className="join-apply-btn"
              type="button"
              onClick={() => setIsJobModalOpen(true)}
            >
              Apply Now
            </button>
          </Reveal>
        </section>

        <section className="join-volunteer-card">
          <Reveal className="join-volunteer-content" direction="left">
            <h3>Volunteer Form</h3>
            <p>
              Help us during weekend branch activities and rescue support work.
              Whether you can assist with feeding, cleaning, transport, or awareness,
              your time can make a real difference.
            </p>
            <button
              className="join-apply-btn alt"
              type="button"
              onClick={() => setIsVolunteerModalOpen(true)}
            >
              Apply Now
            </button>
          </Reveal>
          <Reveal className="join-volunteer-media" direction="right">
            <img
              src="https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1400&q=80"
              alt="Volunteer with a rescued animal"
            />
          </Reveal>
        </section>

        <Reveal>
          <section className="join-whatsapp-card">
          <span className="join-whatsapp-kicker">Community Updates</span>
          <h3>Stay Connected on WhatsApp</h3>
          <p>
            Be connected with our rescue and operations updates through our WhatsApp
            community and volunteer coordination groups.
          </p>
          <ul>
            {updates.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="join-whatsapp-btn" type="button">
            join whatsgroup
          </button>
          </section>
        </Reveal>

        {isJobModalOpen ? (
          <div className="join-modal-overlay" onClick={() => setIsJobModalOpen(false)} role="presentation">
            <section
              className="join-modal-card"
              onClick={(event) => event.stopPropagation()}
              aria-label="Daily Salary Job Application Form"
            >
              <header className="join-modal-head">
                <h3>Daily Salary Job Application</h3>
                <button
                  className="join-modal-close"
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                >
                  Close
                </button>
              </header>
              <form className="join-modal-form" onSubmit={(event) => event.preventDefault()}>
                <input type="text" placeholder="Name" />
                <input type="tel" placeholder="Phone" />
                <input type="text" placeholder="Area" />
                <button className="join-modal-submit" type="submit">
                  Submit Application
                </button>
              </form>
            </section>
          </div>
        ) : null}

        {isVolunteerModalOpen ? (
          <div className="join-modal-overlay" onClick={() => setIsVolunteerModalOpen(false)} role="presentation">
            <section
              className="join-modal-card volunteer"
              onClick={(event) => event.stopPropagation()}
              aria-label="Volunteer Form"
            >
              <header className="join-modal-head">
                <h3>Volunteer Form</h3>
                <button
                  className="join-modal-close"
                  type="button"
                  onClick={() => setIsVolunteerModalOpen(false)}
                >
                  Close
                </button>
              </header>
              <form className="join-modal-form" onSubmit={(event) => event.preventDefault()}>
                <input type="text" placeholder="Name" />
                <input type="tel" placeholder="Phone" />
                <input type="text" placeholder="Area" />
                <input type="text" placeholder="Availability (e.g. Saturday, Sunday, Evenings)" />
                <textarea placeholder="How can you help? (Feeding, cleaning, transport, social media...)" />
                <button className="join-modal-submit volunteer" type="submit">
                  Join as Volunteer
                </button>
              </form>
            </section>
          </div>
        ) : null}
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>
    </div>
  );
}

export default JoinUsPage;
