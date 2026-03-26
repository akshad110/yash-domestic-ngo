import { Link } from "react-router-dom";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const pastWorkCards = [
  {
    tag: "Medical Hub",
    title: "Awareness Campaigns",
    text: "Community sessions in schools and neighborhoods focused on health, hygiene, and social awareness.",
    href: "/medical-hub",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "Social Growth",
    title: "Blood Donation Camps",
    text: "Regular blood donation and health check camps organized with volunteers and local hospitals.",
    href: "/social-growth",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80",
  },
  {
    tag: "Animal and Eco Care",
    title: "Rescue and Plantation Work",
    text: "Injured animal rescue support and plantation drives to protect local biodiversity and green spaces.",
    href: "/animal-eco-care",
    image:
      "https://images.unsplash.com/photo-1618477462146-050d2767eac4?auto=format&fit=crop&w=1400&q=80",
  },
];

const donationUsage = [
  "Organize awareness camps",
  "Conduct blood donation camps",
  "Support animal rescue and treatment",
  "Plant trees and improve green areas",
];

const upiId = "unitycommunity@upi";

function DonatePage() {
  const upiPaymentLink = `upi://pay?pa=${upiId}&pn=The%20Unity%20Community&cu=INR`;

  return (
    <div className="page-shell donate-page-shell">
      <SiteHeader />
      <main className="medical-hub-page donate-page">
        <Reveal>
          <section className="medical-hub-intro donate-hero">
          <p className="medical-hub-kicker">Donate</p>
          <h1>Every Contribution Creates Real Impact</h1>
          <div className="medical-hub-intro-story">
            <p>
              Your support helps us run life-changing programs across healthcare,
              social growth, and animal-eco care.
            </p>
            <p>
              Donate securely through UPI and become part of a community that serves
              people, animals, and nature together.
            </p>
          </div>
          </section>
        </Reveal>

        <section className="medical-hub-section donate-section">
          <header className="medical-hub-section-head">
            <h2>Our Past Work</h2>
          </header>
          <div className="floating-mission-cards donate-work-cards" aria-label="Past work highlights">
            {pastWorkCards.map((item, index) => (
              <Reveal key={item.title} delay={0.07 * index}>
                <Link
                  className="mission-card-link"
                  to={item.href}
                  aria-label={`Explore ${item.title}`}
                >
                  <article
                    className="mission-card"
                    style={{
                      backgroundImage: `linear-gradient(150deg, rgba(8, 26, 20, 0.8), rgba(8, 26, 20, 0.62)), url(${item.image})`,
                    }}
                  >
                    <div className="mission-card-content">
                      <span className="mission-tag">{item.tag}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                    <span className="mission-card-cta">Explore More -&gt;</span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="medical-hub-section donate-section">
          <header className="medical-hub-section-head">
            <h2>Where Your Donation Is Used</h2>
          </header>
          <ul className="donate-usage-list">
            {donationUsage.map((item, index) => (
              <Reveal key={item} delay={0.05 * index}>
                <li>{item}</li>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="medical-hub-section donate-section donate-payment-section">
          <header className="medical-hub-section-head">
            <h2>Pay via UPI</h2>
          </header>
          <Reveal className="donate-payment-card" direction="scale">
            <p className="donate-payment-label">UPI ID</p>
            <p className="donate-upi-id">{upiId}</p>
            <a className="hero-cta-primary donate-pay-btn" href={upiPaymentLink}>
              Pay Now
            </a>
            <p className="donate-payment-note">
              You can use any UPI app by entering this UPI ID manually.
            </p>
          </Reveal>
        </section>
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>
    </div>
  );
}

export default DonatePage;