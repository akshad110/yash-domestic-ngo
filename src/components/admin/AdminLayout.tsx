import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
  const todayLabel = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
            <p className="admin-topbar-user">admin@gmail.com</p>
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
