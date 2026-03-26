import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./components/Reveal";
import ScrollCarousel from "./components/ScrollCarousel";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import EventAnnouncements from "./components/EventAnnouncements";

const educationInitiatives = [
  {
    title: "Literacy programs",
    summary: "Foundational reading and language support for children.",
    detail:
      "Community-led reading circles and remedial learning sessions help children build strong literacy confidence.",
    image:
      "https://images.unsplash.com/photo-1692269725836-fbd72e98883f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Skill development",
    summary: "Practical workshops that improve employability and self-reliance.",
    detail:
      "Hands-on sessions in communication, digital basics, and vocational exposure prepare youth for real opportunities.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Women empowerment",
    summary: "Focused support to strengthen leadership and confidence.",
    detail:
      "Mentoring and group sessions improve financial awareness, decision-making, and community participation.",
    image:
      "https://images.unsplash.com/photo-1692269725851-f5d3a3f02807?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Youth career guidance",
    summary: "Mentorship to align interests with meaningful career paths.",
    detail:
      "Career conversations and exposure activities help students choose informed paths for higher studies and jobs.",
    image:
      "https://images.unsplash.com/photo-1600792172671-1586e08cbaff?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const schoolAwarenessTopics = [
  "hygiene",
  "education importance",
  "environmental protection",
];

const environmentalImages = [
  {
    src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    alt: "Volunteers cleaning coastal waste",
  },
  {
    src: "public/rsz_pexels-pixabay-33152.jpg",
    alt: "Color coded waste management bins",
  },
  {
    src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Forest and water conservation landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80",
    alt: "Community climate awareness activity",
  },
  {
    src: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80",
    alt: "Plastic reduction awareness drive",
  },
  {
    src: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80",
    alt: "River cleanup participation by volunteers",
  },
  {
    src: "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?auto=format&fit=crop&w=1200&q=80",
    alt: "Tree care and environmental restoration",
  },
  {
    src: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=1200&q=80",
    alt: "Eco workshop on climate and conservation",
  },
];

const educationalTourImages = [
  {
    src: "https://images.unsplash.com/photo-1764072970350-2ce4f354a483?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students visiting natural and cultural sites",
  },
  {
    src: "https://images.unsplash.com/photo-1601734327474-a5be8cf68cf0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students exploring outdoor learning environments",
  },
  {
    src: "https://images.unsplash.com/photo-1513663769539-e0024fe5e097?q=80&w=1019&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Students participating in guided educational tours",
  },
];

const treePlantationImages = [
  {
    src: "https://plus.unsplash.com/premium_photo-1681140560926-ea741789469a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Community tree plantation drive with children",
  },
  {
    src: "https://images.unsplash.com/photo-1748333824265-67df5e71f98c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "People planting saplings together in a green field",
  },
  {
    src: "https://images.unsplash.com/photo-1698692019280-1c17d47085cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Volunteers caring for young planted trees",
  },
];

function SocialGrowthPage() {
  const [activeInitiative, setActiveInitiative] = useState(0);
  const [expandedInitiative, setExpandedInitiative] = useState<number | null>(null);
  const [activeTourImage, setActiveTourImage] = useState(0);
  const [activeTreeImage, setActiveTreeImage] = useState(0);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const isCounterInView = useInView(counterRef, { once: true, amount: 0.45 });
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    if (!isCounterInView) return;

    const targetCount = 1280;
    const duration = 1300;
    const startTime = performance.now();
    let animationId = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStudentsCount(Math.round(targetCount * eased));

      if (progress < 1) {
        animationId = window.requestAnimationFrame(step);
      }
    };

    animationId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationId);
  }, [isCounterInView]);

  useEffect(() => {
    educationInitiatives.forEach((initiative) => {
      const image = new Image();
      image.src = initiative.image;
    });
  }, []);

  useEffect(() => {
    const loopTimer = window.setInterval(() => {
      setActiveInitiative((prev) => (prev + 1) % educationInitiatives.length);
    }, 2800);

    return () => window.clearInterval(loopTimer);
  }, []);

  useEffect(() => {
    const tourTimer = window.setInterval(() => {
      setActiveTourImage((prev) => (prev + 1) % educationalTourImages.length);
    }, 3000);

    const treeTimer = window.setInterval(() => {
      setActiveTreeImage((prev) => (prev + 1) % treePlantationImages.length);
    }, 3200);

    return () => {
      window.clearInterval(tourTimer);
      window.clearInterval(treeTimer);
    };
  }, []);

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="medical-hub-page social-growth-page">
        <Reveal>
          <section className="medical-hub-intro">
          <p className="medical-hub-kicker">Social Growth</p>
          <h1>Education and Eco Awareness</h1>
          <div className="medical-hub-intro-story">
            <p>
              We support long-term community growth through education initiatives,
              learning exposure, and environmental action led by volunteers.
            </p>
            <p>
              Every activity is designed to build confidence, practical skills, and a
              stronger sense of responsibility toward society and nature.
            </p>
          </div>
          </section>
        </Reveal>

        <section className="medical-hub-section social-panel education-interactive-panel">
          <header className="medical-hub-section-head">
            <h2>Education Initiatives</h2>
            <p>Interactive programs designed for inclusive social upliftment.</p>
          </header>

          <div className="education-interactive-shell">
            <div className="education-cards-grid">
              {educationInitiatives.map((item, index) => (
                <Reveal key={item.title} delay={0.05 * index}>
                  <article
                    className={`education-interactive-card ${activeInitiative === index ? "active" : ""}`}
                    onMouseEnter={() => setActiveInitiative(index)}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>

                    <button
                      className="education-read-more-btn"
                      type="button"
                      onClick={() =>
                        setExpandedInitiative((prev) => (prev === index ? null : index))
                      }
                    >
                      {expandedInitiative === index ? "Show Less" : "Read More"}
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedInitiative === index ? (
                        <motion.p
                          className="education-card-detail"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35 }}
                        >
                          {item.detail}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </article>
                </Reveal>
              ))}
            </div>

            <div
              className="education-visual-stage"
              aria-label="Education initiatives image preview"
            >
              <div className="education-visual-stack">
                {educationInitiatives.map((initiative, index) => (
                  <motion.img
                    key={initiative.title}
                    className="education-visual-image"
                    src={initiative.image}
                    alt={initiative.title}
                    initial={false}
                    animate={{
                      opacity: activeInitiative === index ? 1 : 0,
                      scale: activeInitiative === index ? 1 : 1.02,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="education-counter" ref={counterRef}>
            <p className="education-counter-label">Students Enrolled</p>
            <p className="education-counter-value">{studentsCount.toLocaleString()}+</p>
          </div>
        </section>

        <Reveal>
          <section className="medical-hub-section social-panel">
          <div className="social-split-panels">
            <article className="social-info-card">
              <header className="medical-hub-section-head">
                <h2>Educational Tours</h2>
              </header>
              <div className="social-inline-carousel">
                {educationalTourImages.map((item, index) => (
                  <motion.img
                    key={item.src}
                    className="social-inline-carousel-image"
                    src={item.src}
                    alt={item.alt}
                    initial={false}
                    animate={{
                      opacity: activeTourImage === index ? 1 : 0,
                      scale: activeTourImage === index ? 1 : 1.02,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              <p className="social-section-copy">
                Students explore nature, environment, and cultural places to learn
                beyond classrooms.
              </p>
            </article>

            <article className="social-info-card">
              <header className="medical-hub-section-head">
                <h2>Tree Plantation</h2>
              </header>
              <div className="social-inline-carousel">
                {treePlantationImages.map((item, index) => (
                  <motion.img
                    key={item.src}
                    className="social-inline-carousel-image"
                    src={item.src}
                    alt={item.alt}
                    initial={false}
                    animate={{
                      opacity: activeTreeImage === index ? 1 : 0,
                      scale: activeTreeImage === index ? 1 : 1.02,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
              <p className="social-section-copy">
                We organize community plantation drives to restore greenery and protect
                nature.
              </p>
            </article>
          </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="medical-hub-section social-panel">
          <header className="medical-hub-section-head">
            <h2>Environmental Awareness</h2>
          </header>
          <ScrollCarousel images={environmentalImages} className="mt-2" />
          </section>
        </Reveal>

        <Reveal>
          <section className="medical-hub-section social-panel school-awareness-compact">
          <header className="medical-hub-section-head">
            <h2>Free Education Awareness in Schools</h2>
          </header>
          <div className="social-layout-grid reverse">
            <img
              className="social-feature-image small"
              src="public\62.png"
              alt="Volunteers conducting school awareness sessions"
            />
            <article className="social-info-card">
              <p className="social-section-copy">Our volunteers visit schools to teach:</p>
              <div className="social-topic-list compact chips" role="list">
                {schoolAwarenessTopics.map((topic) => (
                  <article key={topic} role="listitem" className="social-topic-item">
                    {topic}
                  </article>
                ))}
              </div>
            </article>
          </div>
          </section>
        </Reveal>

        <EventAnnouncements
          title="Social Growth Announcements"
          domain="social-growth"
          limit={3}
          className="medical-hub-section social-panel"
        />
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>
    </div>
  );
}

export default SocialGrowthPage;
