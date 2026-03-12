import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import Reveal from "./components/Reveal";
import ScrollCarousel from "./components/ScrollCarousel";

const domesticRescueHighlights = [
  "Emergency rescue for injured domestic animals",
  "Medical treatment and recovery support",
  "Safe shelter and daily care arrangements",
];

const wildRescueCards = [
  {
    title: "Deer Rescue",
    description: "Rescue and treatment support for injured deer in sensitive zones.",
    caption: "Safe rescue with recovery-first care",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Monkey Rescue",
    description: "Rapid coordination to assist displaced or injured monkeys safely.",
    caption: "Fast response with humane handling",
    image:
      "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Bird Rescue",
    description: "Care, rehabilitation, and safe release of vulnerable birds.",
    caption: "Rehabilitate, protect, and release safely",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80",
  },
];

const domesticAnimalImages = [
  "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80",
];

const petRescueCarouselImages = [
  {
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    alt: "Innocent rescued dog receiving care",
  },
  {
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80",
    alt: "Rescued cat under treatment support",
  },
  {
    src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80",
    alt: "Rabbit rescue and rehabilitation care",
  },
  {
    src: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
    alt: "Abandoned pet receiving comfort and food",
  },
  {
    src: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=1200&q=80",
    alt: "Rescued puppy looking emotionally vulnerable",
  },
  {
    src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=80",
    alt: "Gentle cat rescue portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=80",
    alt: "Small rabbit in protective care",
  },
  {
    src: "https://images.unsplash.com/photo-1601758124096-9ff8f4b43f17?auto=format&fit=crop&w=1200&q=80",
    alt: "Innocent dog waiting for adoption",
  },
];

function AnimalEcoCarePage() {
  const domesticCarouselImages = domesticAnimalImages.map((src, index) => ({
    src,
    alt: `Domestic animal rescue visual ${index + 1}`,
  }));

  const activeDomesticSlide = 0;

  const getDomesticSlideDistance = (index: number) => {
    const totalSlides = domesticAnimalImages.length;
    const rawDistance = index - activeDomesticSlide;
    const wrappedDistance = ((rawDistance % totalSlides) + totalSlides) % totalSlides;

    if (wrappedDistance > totalSlides / 2) {
      return wrappedDistance - totalSlides;
    }

    return wrappedDistance;
  };

  const getDomesticSlideStyle = (index: number) => {
    const distance = getDomesticSlideDistance(index);
    const absoluteDistance = Math.abs(distance);
    const translateX = distance * 118;
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
      <main className="medical-hub-page animal-eco-page">
        <Reveal>
          <section className="medical-hub-intro">
          <p className="medical-hub-kicker">Animal &amp; Eco Care</p>
          <h1>Compassionate Rescue for Every Life</h1>
          <div className="medical-hub-intro-story">
            <p>
              We protect domestic animals, assist injured wildlife, and support
              abandoned pets through rescue, treatment, and rehabilitation.
            </p>
            <p>
              Our teams collaborate with communities and authorities to ensure each
              animal gets safe, timely, and humane care.
            </p>
            <div className="medical-hub-intro-metrics" aria-label="Program highlights">
              <span>300+ rescue calls handled</span>
              <span>1200+ animals supported</span>
              <span>Round-the-clock care response</span>
            </div>
          </div>
          </section>
        </Reveal>

        <section className="medical-hub-section">
          <header className="medical-hub-section-head">
            <p>Domestic Animal Rescue</p>
          </header>

          <Reveal>
            <div
              className="impact-3d-slider animal-eco-domestic-desktop-slider"
              aria-label="Domestic animal rescue visuals"
            >
              {domesticAnimalImages.map((image, index) => (
                <article className="impact-3d-slide" style={getDomesticSlideStyle(index)} key={image}>
                  <img src={image} alt={`Domestic animal rescue visual ${index + 1}`} />
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal className="animal-eco-domestic-mobile-slider">
            <ScrollCarousel images={domesticCarouselImages} className="mt-2" cardClassName="h-44" />
          </Reveal>

          <div className="medical-hub-what-we-do">
            <h3 className="medical-hub-what-we-do-title">What We Do</h3>
            <div className="medical-hub-bullet-list" role="list">
              {domesticRescueHighlights.map((item) => (
                <div className="medical-hub-bullet-item" role="listitem" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="medical-hub-section clinical-benefits-style">
          <div className="impact-pillars-head">
            <p className="impact-pillars-kicker">Wild Animal Rescue</p>
            <h2>Rapid coordination. Safe rehabilitation.</h2>
            <p>
              We work with authorities to rescue injured wildlife and release them
              safely back into nature.
            </p>
          </div>

          <div className="floating-mission-cards clinical-benefits-cards">
            {wildRescueCards.map((card, index) => (
              <Reveal key={card.title} delay={0.08 * index}>
                <article
                  className="mission-card clinical-benefit-mission-card"
                  style={{
                    backgroundImage: `linear-gradient(150deg, rgba(8, 26, 20, 0.8), rgba(8, 26, 20, 0.62)), url(${card.image})`,
                  }}
                >
                  <div className="mission-card-content">
                    <span className="mission-tag">Wildlife Care</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <p className="medical-hub-card-caption">{card.caption}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="medical-hub-section">
          <header className="medical-hub-section-head">
            <h2>Pet Rescue</h2>
          </header>

          <ScrollCarousel
            images={petRescueCarouselImages}
            className="mt-2"
            cardClassName="h-40 w-72 md:h-44 md:w-80 lg:h-48 lg:w-96"
          />

          <ol className="patient-steps-list">
            <li>Rescue intake</li>
            <li>Medical check</li>
            <li>Care and rehabilitation</li>
            <li>Adoption support</li>
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

export default AnimalEcoCarePage;
