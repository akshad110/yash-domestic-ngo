import { useEffect, useState } from "react";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import SlideInLeft from "./components/SlideInLeft";
import Reveal from "./components/Reveal";
import ScrollCarousel from "./components/ScrollCarousel";
import EventAnnouncements from "./components/EventAnnouncements";

const donationImpactItems = [
  "Free medical camps",
  "Slum healthcare visits",
  "Medicine distribution",
  "Diagnostic tests",
];

const clinicalBenefits = [
  {
    title: "Free Consultation",
    description: "Doctor consultation and diagnosis",
    caption: "Compassion-led diagnosis support",
    image:
      "/29.png",
  },
  {
    title: "Medicine Distribution",
    description: "Essential medicines provided free",
    caption: "Essential care delivered consistently",
    image:
      "/img7.jpeg",
  },
  {
    title: "Health Awareness",
    description: "Education about hygiene and prevention",
    caption: "Prevention-first community education",
    image:
      "/img6.jpeg",
  },
];

const impactGallery = [
  "/27.png",
  "/29.png",
  "/31.png",
  "/39.png",
  "/62.png",
  "/63.png",
  "/33.png",
  "/img15.jpeg",
];

const treatmentGallery = [
  {
    src: "/img8.jpeg",
    alt: "Doctors reviewing patient diagnostics on screen",
  },
  {
    src: "/img9.jpeg",
    alt: "Modern treatment room and diagnostic equipment",
  },
  {
    src: "/img10.jpeg",
    alt: "Doctor consulting a patient during treatment",
  },
  {
    src: "/img11.jpeg",
    alt: "Medical staff preparing treatment support",
  },
  {
    src: "/img12.jpeg",
    alt: "Nurse assisting patient care workflow",
  },
  {
    src: "https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&w=1200&q=80",
    alt: "Care team discussing ongoing diagnosis and follow-up",
  },
];

function MedicalHubPage() {
  const [selectedImpactImage, setSelectedImpactImage] = useState<string | null>(null);
  const activeImpactSlide = 0;

  useEffect(() => {
    if (!selectedImpactImage) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImpactImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [selectedImpactImage]);

  const getImpactSlideDistance = (index: number) => {
    const totalSlides = impactGallery.length;
    const rawDistance = index - activeImpactSlide;
    const wrappedDistance = ((rawDistance % totalSlides) + totalSlides) % totalSlides;

    if (wrappedDistance > totalSlides / 2) {
      return wrappedDistance - totalSlides;
    }

    return wrappedDistance;
  };

  const getImpactSlideStyle = (index: number) => {
    const distance = getImpactSlideDistance(index);
    const absoluteDistance = Math.abs(distance);
    const translateX = distance * 130;
    const rotateY = -distance * 12;
    const scale = Math.max(0.56, 1 - absoluteDistance * 0.09);
    const opacity = Math.max(0.22, 1 - absoluteDistance * 0.13);
    const zIndex = 30 - absoluteDistance;

    return {
      transform: `translateX(calc(-50% + ${translateX}px)) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="medical-hub-page medical-hub-main-page">
        <Reveal>
          <section className="medical-hub-intro">
          <p className="medical-hub-kicker">Medical Hub</p>
          <h1>Fee Donation Impact</h1>
          <div className="medical-hub-intro-story">
            <p>
              Every contribution is converted into direct care for families who cannot
              afford treatment. Our teams use donations to run camps, deliver
              medicines, and support timely diagnosis in underserved areas.
            </p>
            <p>
              With transparent allocation and regular field follow-up, each donation
              creates measurable health outcomes and long-term community trust.
            </p>
            <div className="medical-hub-intro-metrics" aria-label="Program highlights">
              <span>24+ health camps monthly</span>
              <span>1000+ patients served</span>
              <span>100% donation-to-care focus</span>
            </div>
          </div>
          </section>
        </Reveal>

        <section className="medical-hub-section">
          <header className="medical-hub-section-head">
            <SlideInLeft delay={0.05}>
              <p>Helping donations reach the needy</p>
            </SlideInLeft>
          </header>

          <Reveal>
            <div className="impact-3d-slider" aria-label="Donation impact image slider">
              {impactGallery.map((image, index) => (
                <article
                  className="impact-3d-slide clickable"
                  style={getImpactSlideStyle(index)}
                  key={image}
                  onClick={() => setSelectedImpactImage(image)}
                >
                  <img src={image} alt={`Donation impact visual ${index + 1}`} />
                </article>
              ))}
            </div>
          </Reveal>

          <div className="medical-hub-what-we-do">
            <SlideInLeft delay={0.1}>
              <h3 className="medical-hub-what-we-do-title">What We Do</h3>
            </SlideInLeft>

            <div className="medical-hub-bullet-list" role="list">
              {donationImpactItems.map((item, index) => (
                <SlideInLeft
                  className="medical-hub-bullet-item"
                  delay={0.18 + index * 0.12}
                  duration={0.95}
                  key={item}
                >
                  {item}
                </SlideInLeft>
              ))}
            </div>
          </div>

        </section>

        <section className="medical-hub-section clinical-benefits-style">
          <div className="impact-pillars-head">
            <p className="impact-pillars-kicker">Clinical Benefits</p>
            <h2>Three care services. One healing promise.</h2>
            <p>
              We provide consultation, medicine support, and preventive health
              awareness to improve day-to-day wellbeing.
            </p>
          </div>

          <div className="floating-mission-cards clinical-benefits-cards">
            {clinicalBenefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={0.08 * index}>
                <article
                  className="mission-card clinical-benefit-mission-card"
                  style={{
                    backgroundImage: `linear-gradient(150deg, rgba(8, 26, 20, 0.8), rgba(8, 26, 20, 0.62)), url(${benefit.image})`,
                  }}
                >
                  <div className="mission-card-content">
                    <span className="mission-tag">Clinical Care</span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                  <p className="medical-hub-card-caption">{benefit.caption}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <EventAnnouncements
          title="Medical Hub Announcements"
          domain="medical-hub"
          limit={3}
          className="medical-hub-section"
        />

        <Reveal>
          <section className="medical-hub-section">
          <header className="medical-hub-section-head">
            <h2>Treating Patients</h2>
          </header>

          <ScrollCarousel images={treatmentGallery} className="mt-2" />

          <ol className="patient-steps-list">
            <li>Patient registration</li>
            <li>Diagnosis</li>
            <li>Treatment</li>
            <li>Follow-up</li>
          </ol>
          </section>
        </Reveal>
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>

      {selectedImpactImage ? (
        <div
          className="impact-image-modal-overlay"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedImpactImage(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSelectedImpactImage(null);
            }
          }}
        >
          <section
            className="impact-image-modal-card"
            onClick={(event) => event.stopPropagation()}
            aria-label="Selected donation impact image"
          >
            <button
              type="button"
              className="impact-image-modal-close"
              onClick={() => setSelectedImpactImage(null)}
              aria-label="Close image preview"
            >
              ×
            </button>
            <img src={selectedImpactImage} alt="Donation impact enlarged preview" />
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default MedicalHubPage;
