import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type SiteHeaderProps = {
  activeHome?: boolean;
};

function SiteHeader({ activeHome: _activeHome = false }: SiteHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsAboutInView(false);
      return;
    }

    const checkSection = () => {
      const aboutSection = document.getElementById("about-us");
      if (!aboutSection) {
        setIsAboutInView(false);
        return;
      }

      const triggerOffset = 90;
      const sectionTop = aboutSection.getBoundingClientRect().top;
      setIsAboutInView(sectionTop <= triggerOffset);
    };

    checkSection();
    window.addEventListener("scroll", checkSection, { passive: true });
    window.addEventListener("resize", checkSection);

    return () => {
      window.removeEventListener("scroll", checkSection);
      window.removeEventListener("resize", checkSection);
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const isAboutActive =
    location.pathname === "/" &&
    (location.hash.toLowerCase() === "#about-us" || isAboutInView);
  const isHomeActive = location.pathname === "/" && !isAboutActive;
  const isOurPillarsActive = [
    "/medical-hub",
    "/social-growth",
    "/animal-eco-care",
  ].includes(location.pathname);
  const isGetInvolvedActive = ["/donate", "/join-us"].includes(location.pathname);
  const isNetworkActive = ["/branches", "/reviews"].includes(location.pathname);

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === "/" && !location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="brand-logo" aria-label="Site logo">
        <img
          src="/logoimg.jpeg"
          alt="Yash Domestic Research Centre"
          className="brand-logo-image"
        />
      </div>
      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((previous) => !previous)}
      >
        {isMobileMenuOpen ? "x" : "☰"}
      </button>

      <nav className="navbar desktop-navbar" aria-label="Main navigation">
        <Link
          className={`nav-link ${isHomeActive ? "active" : ""}`}
          to="/"
          onClick={handleHomeClick}
        >
          HOME
        </Link>

        <div className="nav-item">
          <button
            className={`nav-link nav-trigger ${isOurPillarsActive ? "active" : ""}`}
            type="button"
          >
            OUR PILLARS <span className="arrow">v</span>
          </button>
          <div className="dropdown-menu">
            <Link to="/medical-hub">Medical Hub</Link>
            <Link to="/social-growth">Social Growth</Link>
            <Link to="/animal-eco-care">Animal &amp; Eco Care</Link>
          </div>
        </div>

        <div className="nav-item">
          <button
            className={`nav-link nav-trigger ${isGetInvolvedActive ? "active" : ""}`}
            type="button"
          >
            GET INVOLVED <span className="arrow">v</span>
          </button>
          <div className="dropdown-menu">
            <Link to="/donate">Donate</Link>
            <Link to="/join-us">Join Us</Link>
          </div>
        </div>

        <div className="nav-item">
          <button
            className={`nav-link nav-trigger ${isNetworkActive ? "active" : ""}`}
            type="button"
          >
            NETWORK <span className="arrow">v</span>
          </button>
          <div className="dropdown-menu">
            <Link to="/branches">Branches</Link>
            <Link to="/reviews">Reviews</Link>
          </div>
        </div>

        <Link
          className={`nav-link ${isAboutActive ? "active" : ""}`}
          to={{ pathname: "/", hash: "#about-us" }}
        >
          ABOUT US
        </Link>
      </nav>

      <nav
        className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <Link className="mobile-nav-link" to="/" onClick={handleHomeClick}>
          Home
        </Link>
        <Link
          className="mobile-nav-link"
          to={{ pathname: "/", hash: "#about-us" }}
          onClick={handleMobileNavClick}
        >
          About Us
        </Link>
        <Link className="mobile-nav-link" to="/medical-hub" onClick={handleMobileNavClick}>
          Medical Hub
        </Link>
        <Link className="mobile-nav-link" to="/social-growth" onClick={handleMobileNavClick}>
          Social Growth
        </Link>
        <Link className="mobile-nav-link" to="/animal-eco-care" onClick={handleMobileNavClick}>
          Animal &amp; Eco Care
        </Link>
        <Link className="mobile-nav-link" to="/donate" onClick={handleMobileNavClick}>
          Donate
        </Link>
        <Link className="mobile-nav-link" to="/join-us" onClick={handleMobileNavClick}>
          Join Us
        </Link>
        <Link className="mobile-nav-link" to="/branches" onClick={handleMobileNavClick}>
          Branches
        </Link>
        <Link className="mobile-nav-link" to="/reviews" onClick={handleMobileNavClick}>
          Reviews
        </Link>
      </nav>
    </header>
  );
}

export default SiteHeader;
