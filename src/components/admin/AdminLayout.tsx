import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DEFAULT_ADMIN_DISPLAY_EMAIL = "divyar9979@gmail.com";

function AdminLayout() {
  const [adminEmail, setAdminEmail] = useState(DEFAULT_ADMIN_DISPLAY_EMAIL);
  const todayLabel = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const stored = localStorage.getItem("adminEmail");
    if (stored) setAdminEmail(stored);
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main-shell">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-kicker">Admin Panel</p>
            <h1>Yash Domestic NGO</h1>
          </div>
          <div className="admin-topbar-meta">
            <p className="admin-topbar-date">{todayLabel}</p>
            <p className="admin-topbar-user">{adminEmail}</p>
          </div>
        </header>
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
