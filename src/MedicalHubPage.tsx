import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import SlideInLeft from "./components/SlideInLeft";
import Reveal from "./components/Reveal";
import ScrollCarousel from "./components/ScrollCarousel";

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
      "https://images.unsplash.com/photo-1666214277655-ae6f3d77bfbc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Medicine Distribution",
    description: "Essential medicines provided free",
    caption: "Essential care delivered consistently",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Health Awareness",
    description: "Education about hygiene and prevention",
    caption: "Prevention-first community education",
    image:
      "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=1200&q=80",
  },
];

const impactGallery = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=800&q=80",
];

const treatmentGallery = [
  {
    src: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80",
    alt: "Doctors reviewing patient diagnostics on screen",
  },
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern treatment room and diagnostic equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80",
    alt: "Doctor consulting a patient during treatment",
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    alt: "Medical staff preparing treatment support",
  },
  {
    src: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=1200&q=80",
    alt: "Nurse assisting patient care workflow",
  },
  {
    src: "https://images.unsplash.com/photo-1576765608622-067973a79f53?auto=format&fit=crop&w=1200&q=80",
    alt: "Care team discussing ongoing diagnosis and follow-up",
  },
];

function MedicalHubPage() {
  const activeImpactSlide = 0;

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
                <article className="impact-3d-slide" style={getImpactSlideStyle(index)} key={image}>
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
    </div>
  );
}

export default MedicalHubPage;
