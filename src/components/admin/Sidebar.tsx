import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h6v7H4v-7Zm0-9h6v7H4V4Zm10 0h6v11h-6V4Zm0 13h6v3h-6v-3Z" />
      </svg>
    ),
  },
  {
    label: "Reviews",
    to: "/admin/reviews",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h16v11H7l-3 3V5Zm3 3v2h10V8H7Zm0 4v2h7v-2H7Z" />
      </svg>
    ),
  },
  {
    label: "Branches",
    to: "/admin/branches",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      </svg>
    ),
  },
  {
    label: "Events",
    to: "/admin/events",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm11 8H6v10h12V10ZM8 12h4v4H8v-4Z" />
      </svg>
    ),
  },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/adminlogin");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand-wrap">
        <img
          src="/logoimg.jpeg"
          alt=""
          className="admin-brand-logo-img"
          width={46}
          height={46}
        />
        <p className="admin-brand">Yash Domestic</p>
      </div>
      <nav className="admin-nav">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`admin-nav-item ${location.pathname === item.to ? "active" : ""}`}
            title={item.label}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <span className="admin-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      <button type="button" className="admin-logout-btn" onClick={handleLogout}>
        <span className="admin-nav-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M10 4H4v16h6v-2H6V6h4V4Zm4.7 4.3L13.3 9.7 15.6 12H9v2h6.6l-2.3 2.3 1.4 1.4 4.7-4.7-4.7-4.7Z" />
          </svg>
        </span>
        <span className="admin-nav-label">Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;
