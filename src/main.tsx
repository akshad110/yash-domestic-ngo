import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import App from "./App";
import AnimalEcoCarePage from "./AnimalEcoCarePage.tsx";
import BranchesPage from "./BranchesPage.tsx";
import DonatePage from "./DonatePage.tsx";
import JoinUsPage from "./JoinUsPage.tsx";
import MedicalHubPage from "./MedicalHubPage.tsx";
import ReviewsPage from "./ReviewsPage.tsx";
import SocialGrowthPage from "./SocialGrowthPage.tsx";
import "./tailwind.css";
import "./style.css";

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    window.requestAnimationFrame(() => {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return null;
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <BrowserRouter>
      <HashScrollHandler />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/medical-hub" element={<MedicalHubPage />} />
        <Route path="/social-growth" element={<SocialGrowthPage />} />
        <Route path="/animal-eco-care" element={<AnimalEcoCarePage />} />
        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
