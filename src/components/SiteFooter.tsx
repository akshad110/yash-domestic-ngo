import { Link } from "react-router-dom";
import Reveal from "./Reveal";

function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <Reveal>
        <div className="footer-main">
          <Reveal direction="left">
            <section className="footer-brand-col">
              <p className="footer-kicker">The Unity Community</p>
              <h2>Healing lives, nurturing ecosystems, strengthening futures.</h2>
              <p>
                We are a mission-driven initiative focused on healthcare access, social
                growth, and animal-eco care. This platform helps people discover our
                programs, track impact, and join meaningful action.
              </p>
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
              <Link to="/join-us#careers">Careers</Link>
            </section>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <section className="footer-links-col">
              <h3>Connect</h3>
              <a href="mailto:hello@unitycommunity.org">hello@unitycommunity.org</a>
              <a href="tel:+911234567890">+91 12345 67890</a>
              <div className="footer-social-links" aria-label="Social media links">
                <a href="#" aria-label="Instagram">
                  Instagram
                </a>
                <a href="#" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href="#" aria-label="YouTube">
                  YouTube
                </a>
                <a href="#" aria-label="X">
                  X
                </a>
              </div>
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
