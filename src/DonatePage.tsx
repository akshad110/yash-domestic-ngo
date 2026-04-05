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
      "/img31.jpeg",
  },
  {
    tag: "Social Growth",
    title: "Blood Donation Camps",
    text: "Regular blood donation and health check camps organized with volunteers and local hospitals.",
    href: "/social-growth",
    image:
      "/img22.jpeg",
  },
  {
    tag: "Animal and Eco Care",
    title: "Rescue and Plantation Work",
    text: "Injured animal rescue support and plantation drives to protect local biodiversity and green spaces.",
    href: "/animal-eco-care",
    image:
      "/img13.jpeg"
  },
];

const donationUsage = [
  "Organize awareness camps",
  "Conduct blood donation camps",
  "Support animal rescue and treatment",
  "Plant trees and improve green areas",
];

const upiId = "yashdomesticresearch.65034783@hdfcbank";
const upiQrImage = "/Screenshot%202026-04-05%20141831.png";

function DonatePage() {
  const upiPaymentLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Yash Domestic")}&cu=INR`;

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
          <div className="donate-payment-layout">
            <Reveal className="donate-payment-card" direction="scale">
              <p className="donate-payment-label">UPI ID</p>
              <p className="donate-upi-id">{upiId}</p>
              <a className="hero-cta-primary donate-pay-btn" href={upiPaymentLink}>
                Pay Now
              </a>
              <p className="donate-payment-note">
                You can use any UPI app by entering this UPI ID manually, or scan the QR code.
              </p>
            </Reveal>
            <Reveal className="donate-qr-aside" direction="scale" delay={0.06}>
              <figure className="donate-qr-figure">
                <img src={upiQrImage} alt="UPI QR code to pay Yash Domestic" width={200} height={200} />
                <figcaption className="donate-qr-caption">Scan to pay</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>
    </div>
  );
}

export default DonatePage;