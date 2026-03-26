import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import App from "./App";
import AnimalEcoCarePage from "./AnimalEcoCarePage.tsx";
import BranchesPage from "./BranchesPage.tsx";
import DonatePage from "./DonatePage.tsx";
import JoinUsPage from "./JoinUsPage.tsx";
import MedicalHubPage from "./MedicalHubPage.tsx";
import ReviewsPage from "./ReviewsPage.tsx";
import SocialGrowthPage from "./SocialGrowthPage.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.tsx";
import AdminBranches from "./pages/admin/Branches.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminEvents from "./pages/admin/Events.tsx";
import AdminReviews from "./pages/admin/Reviews.tsx";
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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="branches" element={<AdminBranches />} />
          <Route path="events" element={<AdminEvents />} />
        </Route>
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
