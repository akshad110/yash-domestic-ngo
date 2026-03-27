import { Link } from "react-router-dom";
import Reveal from "./Reveal";

function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <Reveal>
        <div className="footer-main">
          <Reveal direction="left">
            <section className="footer-brand-col">
              {/* <img src="public\yash-dog-logo-1-e1710572557873-removebg-preview.png" alt="Yash Dogs" className="footer-brand-logo" /> */}
              <p className="footer-kicker">The Unity Community</p>
              <h2>Healing lives, nurturing ecosystems, strengthening futures.</h2>
              <p>
                We are a mission-driven initiative focused on healthcare access, social
                growth, and animal-eco care. This platform helps people discover our
                programs, track impact, and join meaningful action.
              </p>
              <Link className="footer-review-btn" to="/reviews?dropReview=1">
                Drop a Review
              </Link>
            </section>
          </Reveal>

          <Reveal direction="up" delay={0.05}>
            <section className="footer-links-col">
              <h3>Essential Links</h3>
              <a href="/#home">Home</a>
              <a href="/#our-pillars">Our Pillars</a>
              <Link to="/donate">Donate</Link>
              <Link to="/join-us">Get Involved</Link>
              <a href="/#about-us">About Us</a>
            </section>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <section className="footer-links-col">
              <h3>Programs</h3>
              <Link to="/medical-hub">Medical Hub</Link>
              <Link to="/social-growth">Social Growth</Link>
              <Link to="/animal-eco-care">Animal &amp; Eco Care</Link>
            </section>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <section className="footer-links-col">
              <h3>Connect</h3>
              <p className="footer-contact-line">Nr. Surmandir Cinema, Palanpur, GJ</p>
              <a href="tel:+919081760076">+91 9081760076</a>
              <a href="mailto:contact@yashdogs.com">contact@yashdogs.com</a>
            </section>
          </Reveal>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} The Unity Community. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Support</a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

export default SiteFooter;
