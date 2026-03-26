import { useEffect, useState } from "react";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import Reveal from "./components/Reveal";
import ScrollCarousel from "./components/ScrollCarousel";
import EventAnnouncements from "./components/EventAnnouncements";

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
  "/pet-cat-clinic.png",
  "/pet-dog-clinic.png",
  "/pet-grooming-1.png",
  "/pet-mating-service.png",
  "/rajwadi-horse.png",
  "/sheep-clinic.png",
  "/rsz_pexels-pixabay-33152.jpg",
  "/rsz_pexels-pixabay-104827.jpg",
];

const petRescueCarouselImages = [
  {
    src: "/pet-cat-clinic.png",
    alt: "Pet cat receiving clinic support",
  },
  {
    src: "/pet-dog-clinic.png",
    alt: "Pet dog in outdoor clinic setting",
  },
  {
    src: "/pet-grooming-1.png",
    alt: "Pet grooming and care showcase",
  },
  {
    src: "/pet-mating-service.png",
    alt: "Pet mating service support",
  },
  {
    src: "/rajwadi-horse.png",
    alt: "Rajwadi horse care support",
  },
  {
    src: "/sheep-clinic.png",
    alt: "Sheep clinic treatment and care",
  },
  {
    src: "/rsz_pexels-pixabay-33152.jpg",
    alt: "Rabbit care and rescue visual",
  },
  {
    src: "/rsz_pexels-pixabay-104827.jpg",
    alt: "Cat rescue portrait visual",
  },
];

const clinicServices = [
  {
    title: "Pet Grooming",
    description:
      "Fully equipped pet grooming salon to keep them looking their best from hair cuts to teeth brushing to bathing.",
    image: "/pet-grooming-1.png",
  },
  {
    title: "Pet Training",
    description:
      "Dealing with your pup's mood swings? We will help you get for it. Looking for dog training sessions at home?",
    image: "/pet-dog-clinic.png",
  },
  {
    title: "Home Consulting",
    description:
      "Our experts available for for Home Visits. Your pet deserves only the best consultation. Book your appointment now.",
    image: "/home-consulting.png",
  },
  {
    title: "Mating Service",
    description:
      "We provide mating services for your pets.we also help you to find out the best match for your pet mating in the easiest way.",
    image: "/pet-mating-service.png",
  },
  {
    title: "Pet Hospital",
    description:
      "Leading multispecialty pet care hospital that has the best veterinary doctors focused on your pet's health and wellbeing.",
    image: "/pet-hospital.png",
  },
  {
    title: "Online Consultation",
    description:
      "80% of a pet's health issues can be solved online. Get a call with first consultation. Ask for check up if neccessory.",
    image: "/online-consulting.png",
  },
];

function AnimalEcoCarePage() {
  const [selectedDomesticImage, setSelectedDomesticImage] = useState<string | null>(null);
  const domesticCarouselImages = domesticAnimalImages.map((src, index) => ({
    src,
    alt: `Domestic animal rescue visual ${index + 1}`,
  }));

  const activeDomesticSlide = 0;

  useEffect(() => {
    if (!selectedDomesticImage) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedDomesticImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [selectedDomesticImage]);

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
                <article
                  className="impact-3d-slide clickable"
                  style={getDomesticSlideStyle(index)}
                  key={image}
                  onClick={() => setSelectedDomesticImage(image)}
                >
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

        <Reveal>
          <section className="medical-hub-section animal-services-section">
            <header className="medical-hub-section-head">
              <h2>Services</h2>
            </header>

            <div className="animal-services-grid" role="list">
              {clinicServices.map((service, index) => (
                <Reveal key={service.title} delay={0.05 * index}>
                  <article className="animal-service-card" role="listitem">
                    <img src={service.image} alt={service.title} className="animal-service-image" />
                    <div className="animal-service-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

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

        <EventAnnouncements
          title="Animal & Eco Care Announcements"
          domain="animal-eco-care"
          limit={3}
          className="medical-hub-section"
        />
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>

      {selectedDomesticImage ? (
        <div
          className="impact-image-modal-overlay"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedDomesticImage(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSelectedDomesticImage(null);
            }
          }}
        >
          <section
            className="impact-image-modal-card"
            onClick={(event) => event.stopPropagation()}
            aria-label="Selected domestic animal rescue image"
          >
            <button
              type="button"
              className="impact-image-modal-close"
              onClick={() => setSelectedDomesticImage(null)}
              aria-label="Close image preview"
            >
              ×
            </button>
            <img src={selectedDomesticImage} alt="Domestic rescue enlarged preview" />
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default AnimalEcoCarePage;
