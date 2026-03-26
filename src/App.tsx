import { useEffect, useRef, useState, type TouchEvent } from "react";
import { Link } from "react-router-dom";
import EventAnnouncements from "./components/EventAnnouncements";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const checkupImage =
  "https://img.freepik.com/free-photo/veterinarian-check-ing-puppy-s-health_23-2148728396.jpg?semt=ais_hybrid&w=740&q=80";
const doctorImage =
  "https://t4.ftcdn.net/jpg/06/44/21/33/360_F_644213335_cEte9L9Clkz5zwYtPmpgKUhfABbl66Wm.jpg";
const joinUsImages = [
  "/online-consulting.png",
  "/pet-hospital.png",
  // "https://images.pexels.com/photos/6646971/pexels-photo-6646971.jpeg?auto=compress&cs=tinysrgb&w=1400",
  // "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1400",
];

const impactCounters = [
  { label: "Lives Supported", target: 12500, suffix: "+" },
  { label: "Community Programs", target: 48, suffix: "+" },
  { label: "Animals Treated", target: 3200, suffix: "+" },
];

const missionPillars = [
  {
    tag: "Medical Hub",
    title: "Community Health Access",
    description:
      "Free checkups, awareness drives, and preventive care for families that need support the most.",
    image: "/62.png",
  },
  {
    tag: "Social Growth",
    title: "Education and Empowerment",
    description:
      "Skill programs, youth engagement, and support initiatives that unlock opportunity for every age group.",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Animal and Eco Care",
    title: "Compassion for Nature",
    description:
      "Rescue aid, treatment camps, and eco-actions that protect animals and preserve local ecosystems.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
  },
];

const aboutHighlights = [
  { value: "10+", label: "Years of grassroots service" },
  { value: "3", label: "Core impact domains" },
  { value: "24/7", label: "Community response mindset" },
];

const aboutValues = [
  {
    title: "Human-Centered Healthcare",
    description:
      "We simplify access to preventive care, checkups, and essential support for families who need it most.",
  },
  {
    title: "Sustainable Community Growth",
    description:
      "Our education and livelihood initiatives focus on long-term dignity, confidence, and opportunity.",
  },
  {
    title: "Responsible Eco-Compassion",
    description:
      "We protect animals and local ecosystems through rescue efforts, treatment support, and awareness drives.",
  },
];

const missionRouteByTag: Record<string, string> = {
  "Medical Hub": "/medical-hub",
  "Social Growth": "/social-growth",
  "Animal and Eco Care": "/animal-eco-care",
};

function App() {
  const heroRef = useRef<HTMLElement | null>(null);
  const joinTouchStartXRef = useRef<number | null>(null);
  const joinTouchEndXRef = useRef<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counterValues, setCounterValues] = useState<number[]>(
    impactCounters.map(() => 0),
  );
  const [activeJoinSlide, setActiveJoinSlide] = useState(0);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasStarted(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );

    observer.observe(heroElement);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      setCounterValues(impactCounters.map(() => 0));
      return;
    }

    const duration = 1800;
    const start = performance.now();
    let animationFrameId = 0;

    const animate = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounterValues(
        impactCounters.map((counter) => Math.round(counter.target * easedProgress)),
      );

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasStarted]);

  useEffect(() => {
    if (joinUsImages.length <= 1) return;

    const imageTimer = window.setInterval(() => {
      setActiveJoinSlide((previous) => (previous + 1) % joinUsImages.length);
    }, 5200);

    return () => window.clearInterval(imageTimer);
  }, []);

  const goToJoinSlide = (nextIndex: number) => {
    const maxIndex = joinUsImages.length - 1;
    const safeIndex = Math.max(0, Math.min(maxIndex, nextIndex));
    setActiveJoinSlide(safeIndex);
  };

  const handleJoinTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    joinTouchStartXRef.current = event.touches[0]?.clientX ?? null;
    joinTouchEndXRef.current = null;
  };

  const handleJoinTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    joinTouchEndXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleJoinTouchEnd = () => {
    const start = joinTouchStartXRef.current;
    const end = joinTouchEndXRef.current;

    joinTouchStartXRef.current = null;
    joinTouchEndXRef.current = null;

    if (start === null || end === null) return;

    const deltaX = start - end;
    const swipeThreshold = 42;

    if (Math.abs(deltaX) < swipeThreshold) return;

    if (deltaX > 0) {
      goToJoinSlide(activeJoinSlide + 1);
      return;
    }

    goToJoinSlide(activeJoinSlide - 1);
  };

  const formatCounterValue = (value: number, suffix = "") =>
    `${value.toLocaleString()}${suffix}`;

  return (
    <div className="page-shell">
      <SiteHeader activeHome />

      <main className="home-page-main">
        <section className="top-loop" aria-label="Community updates">
          
        </section>

        <section className="hero-split" id="home" ref={heroRef}>
          <div className="hero-half">
            <img src={checkupImage} alt="Doctor checking patient blood pressure" />
          </div>
          <div className="hero-half">
            <img src={doctorImage} alt="Medical specialist in consultation" />
          </div>

          <Reveal className="hero-overlay-text" direction="left" amount={0.3}>
            <h1 className="hero-banner-title">
              <span>THE UNITY COMMUNITY:</span>
              <br />
              <span>HEALING LIVES,</span>
              <br />
              <span>NURTURING ECOSYSTEMS.</span>
            </h1>
            <div className="hero-cta-group">
              <button className="hero-cta-primary" type="button">
                Explore Our Work
              </button>
              <Link className="hero-cta-secondary" to="/donate">
                Donate Now
              </Link>
            </div>
          </Reveal>

          <Reveal className="hero-impact-panel" direction="right" amount={0.25} aria-label="Impact counters">
            <p className="impact-panel-kicker">Our Impact</p>
            <h2 className="impact-panel-title">Real change, measured every day.</h2>
            <p className="impact-panel-copy">
              We track every milestone to make sure help reaches people, communities,
              and animals faster.
            </p>

            <div className="impact-counter-row">
              {impactCounters.map((counter, index) => (
                <article className="impact-counter-card" key={counter.label}>
                  <p className="impact-counter-value">
                    {formatCounterValue(counterValues[index], counter.suffix)}
                  </p>
                  <p className="impact-counter-label">{counter.label}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <p className="hero-bottom-tagline">
            Healing people. Protecting nature.
          </p>
        </section>

        <section className="bottom-loop" aria-label="Community ticker">
          <div className="bottom-loop-track">
            <span>
              HEALING LIVES | NURTURING ECOSYSTEMS | MEDICAL HUB | SOCIAL GROWTH | ANIMAL &amp; ECO CARE | GET INVOLVED TODAY
            </span>
            <span aria-hidden="true">
              HEALING LIVES | NURTURING ECOSYSTEMS | MEDICAL HUB | SOCIAL GROWTH | ANIMAL &amp; ECO CARE | GET INVOLVED TODAY
            </span>
          </div>
        </section>

        <EventAnnouncements
          title="Upcoming Community Events"
          limit={3}
          className="home-event-announcements"
        />

        <section className="impact-pillars-section" id="our-pillars">
          <Reveal className="impact-pillars-head">
            <p className="impact-pillars-kicker">What We Do</p>
            <h2>Three pillars. One shared mission.</h2>
            <p>
              We combine healthcare support, social upliftment, and animal-eco
              protection to build stronger and kinder communities.
            </p>
          </Reveal>

          <div className="floating-mission-cards" aria-label="Core impact pillars">
            {missionPillars.map((pillar, index) => {
              const route = missionRouteByTag[pillar.tag] ?? "/join-us";

              return (
                <Reveal key={pillar.title} delay={0.08 * index} direction="up">
                  <Link className="mission-card-link" to={route} aria-label={`Explore ${pillar.title}`}>
                    <article
                      className="mission-card"
                      style={{
                        backgroundImage: `linear-gradient(150deg, rgba(8, 26, 20, 0.8), rgba(8, 26, 20, 0.62)), url(${pillar.image})`,
                      }}
                    >
                      <div className="mission-card-content">
                        <span className="mission-tag">{pillar.tag}</span>
                        <h3>{pillar.title}</h3>
                        <p>{pillar.description}</p>
                      </div>
                      <span className="mission-card-cta">
                        Explore More <span aria-hidden="true">-&gt;</span>
                      </span>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="join-careers-section" id="join-us">
          <Reveal className="join-careers-media-shell" direction="left">
            <div className="join-careers-media">
              <div
                className="join-careers-media-slider"
                style={{
                  transform: `translateX(-${activeJoinSlide * 100}%)`,
                  transition: "transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onTouchStart={handleJoinTouchStart}
                onTouchMove={handleJoinTouchMove}
                onTouchEnd={handleJoinTouchEnd}
              >
                {joinUsImages.map((image, index) => (
                  <img
                    className="join-careers-media-image"
                    src={image}
                    key={`${image}-${index}`}
                    alt={`Volunteers collaborating in a community drive ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            {joinUsImages.length > 1 ? (
              <div
                className="join-careers-slider-dots"
                aria-label="Join our work image carousel"
              >
                {joinUsImages.map((_, index) => (
                  <button
                    type="button"
                    key={`join-slide-dot-${index}`}
                    className={`join-careers-slider-dot${
                      activeJoinSlide === index ? " is-active" : ""
                    }`}
                    onClick={() => goToJoinSlide(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={activeJoinSlide === index ? "true" : undefined}
                  />
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal className="join-careers-content" direction="right">
            <p className="join-careers-kicker">Get Involved</p>
            <h2>Join us to create lasting impact.</h2>
            <p>
              Our mission grows through people who care. Whether you volunteer,
              intern, or contribute your professional skills, you can help expand
              healthcare access, social development, and eco-care efforts.
            </p>
            <p id="careers">
              We are also building dedicated career pathways for program managers,
              field coordinators, medical support teams, and outreach leaders.
              Build a meaningful career while serving communities that need it most.
            </p>

            <div className="join-careers-actions">
              <Link className="join-careers-btn primary" to="/join-us">
                Join Us
              </Link>
              <Link className="join-careers-btn secondary" to="/join-us#careers">
                View Careers
              </Link>
            </div>
          </Reveal>
        </section>

        <div className="about-footer-flow">
          <section className="about-us-section" id="about-us">
            <div className="about-us-stage">
              <div className="about-us-main-grid">
                <Reveal className="about-us-media-panel" direction="left">
                  <div className="about-us-media-frame about-us-media-placeholder">
                  <img src="/25.png" alt="Yash Domestic clinic entrance" />
                  </div>
                </Reveal>

                <Reveal className="about-us-overview" direction="right">
                  <p className="about-us-kicker">Welcome to Pet Clinic</p>
                  <p className="about-us-clinic-subtitle">
                    BEST PET CLINIC IN PALANPUR, GUJARAT
                  </p>
                  <h2>The Yash Domestic Clinic</h2>
                  <p className="about-us-copy">
                    The Yash Domestic Clinic is on a mission of ensuring each pet gets
                    the best in healthcare in India. A multispecialty hospital with
                    advanced equipment, skilled doctors practicing global standards of
                    veterinary and passion for pets in the heart of each of our staff
                    members.
                  </p>
                  <p className="about-us-copy secondary about-us-strong-line">
                    Yash Domestic Clinic relocated in 2017. We are here to Redefine
                    Veterinary.
                  </p>
                  <ul className="about-us-clinic-list">
                    <li>Multi Speciality Pet Hospital</li>
                    <li>Pet Grooming Center</li>
                    <li>Pet Training Center</li>
                    <li>Pet Care Products</li>
                  </ul>
                </Reveal>
              </div>

              <Reveal>
                <section className="about-doctor-section" aria-label="Doctor profile">
                  <header className="about-doctor-head">
                    <h2>Meet Our Doctor</h2>
                    <p>SEASONED AND SKILLED STAFF</p>
                  </header>

                  <article className="about-doctor-card">
                    <div className="about-doctor-image-wrap">
                      <img src="\Dr-Ramesh-N-Ilasariya-370x358.png" alt="Dr. Ramesh N. Ilasariya" />
                    </div>
                    <div className="about-doctor-content">
                      <p className="about-doctor-kicker">PET ANIMAL DOCTOR</p>
                      <h3>Dr. RAMESH N. ILASARIYA</h3>
                      <p className="about-doctor-copy">
                        He is known as one of India&apos;s foremost veterinary practitioner.
                      </p>
                      <div className="about-doctor-social" aria-label="Doctor social links">
                        <a href="#" aria-label="Facebook">
                          f
                        </a>
                        <a href="#" aria-label="Twitter">
                          t
                        </a>
                        <a href="#" aria-label="YouTube">
                          y
                        </a>
                        <a href="#" aria-label="LinkedIn">
                          in
                        </a>
                      </div>
                      <button type="button" className="about-doctor-btn">
                        Read More
                      </button>
                    </div>
                  </article>
                </section>
              </Reveal>

              <Reveal>
                <section className="about-facilities-section" aria-label="Clinic facilities">
                  <div className="about-facilities-content">
                    <article>
                      <h3>In house Facilities</h3>
                      <p>
                        Clinic and pet shop, Veterinary dentistry, X-ray, ECG, Sonography, Pet
                        hostel for dogs and cats, Diagnostic laboratory,
                      </p>
                    </article>
                    <article>
                      <h3>Laboratory Services</h3>
                      <p>
                        We have in house lab services. We also have a tie up with vet labs in
                        the country and abroad for special check ups.
                      </p>
                    </article>
                    <article>
                      <h3>Surgeries</h3>
                      <p>
                        We perform various Routine and Advanced Surgeries at our clinic with
                        postoperative care.
                      </p>
                    </article>
                  </div>
                  <div className="about-facilities-image-wrap">
                    <img src="/26.png" alt="Yash Domestic clinic entrance" />
                  </div>
                </section>
              </Reveal>

              <div
                className="about-us-highlights"
                aria-label="Organization highlights"
              >
                {aboutHighlights.map((item, index) => (
                  <Reveal key={item.label} delay={0.05 * index}>
                    <article className="about-highlight-card">
                      <p className="about-highlight-value">{item.value}</p>
                      <p className="about-highlight-label">{item.label}</p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div
                className="about-values-grid"
                aria-label="Organization core values"
              >
                {aboutValues.map((value, index) => (
                  <Reveal key={value.title} delay={0.06 * index}>
                    <article className="about-value-card">
                      <h3>{value.title}</h3>
                      <p>{value.description}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}

export default App;
