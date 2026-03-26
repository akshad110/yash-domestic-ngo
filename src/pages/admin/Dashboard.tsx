import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

type DashboardStats = {
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  totalBranches: number;
  totalEvents: number;
};

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalReviews: 0,
    pendingReviews: 0,
    approvedReviews: 0,
    totalBranches: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [reviewsResponse, branchesResponse, eventsResponse] = await Promise.all([
        api.get("/admin/reviews"),
        api.get("/branches"),
        api.get("/events"),
      ]);

      const reviews = reviewsResponse.data as Array<{ status: "pending" | "approved" }>;
      const pending = reviews.filter((review) => review.status === "pending").length;
      const approved = reviews.filter((review) => review.status === "approved").length;

      setStats({
        totalReviews: reviews.length,
        pendingReviews: pending,
        approvedReviews: approved,
        totalBranches: branchesResponse.data.length,
        totalEvents: eventsResponse.data.length,
      });
    }

    loadStats().catch(() => {
      // Keep dashboard resilient if one endpoint fails.
    });
  }, []);

  const approvalRate = stats.totalReviews
    ? Math.round((stats.approvedReviews / stats.totalReviews) * 100)
    : 0;

  return (
    <section className="admin-dashboard-wrap">
      <article className="admin-welcome-panel">
        <div>
          <p className="admin-welcome-kicker">Control Center</p>
          <h2>Welcome back, Admin</h2>
          <p>
            Track reviews, manage branch coverage, and keep your public NGO pages up to date.
          </p>
        </div>
        <div className="admin-quick-links">
          <Link to="/admin/reviews">Open Reviews</Link>
          <Link to="/admin/branches">Manage Branches</Link>
          <Link to="/admin/events">Create Event</Link>
        </div>
      </article>

      <div className="admin-grid-cards">
        <article className="admin-stat-card">
          <p>Total Reviews</p>
          <h3>{stats.totalReviews}</h3>
        </article>
        <article className="admin-stat-card">
          <p>Pending Reviews</p>
          <h3>{stats.pendingReviews}</h3>
        </article>
        <article className="admin-stat-card">
          <p>Approved Reviews</p>
          <h3>{stats.approvedReviews}</h3>
        </article>
        <article className="admin-stat-card">
          <p>Total Branches</p>
          <h3>{stats.totalBranches}</h3>
        </article>
        <article className="admin-stat-card">
          <p>Active Events</p>
          <h3>{stats.totalEvents}</h3>
        </article>
      </div>

      <article className="admin-insight-card">
        <div className="admin-insight-head vertical">
          <h3>Review Approval Health</h3>
        </div>
        <div
          className="admin-circular-meter"
          aria-hidden="true"
          style={{ "--approval-rate": approvalRate } as CSSProperties}
        >
          <span>{approvalRate}%</span>
        </div>
        <p>
          {stats.pendingReviews > 0
            ? `${stats.pendingReviews} review(s) are waiting for moderation.`
            : "All submitted reviews are currently moderated."}
        </p>
      </article>
    </section>
  );
}

export default Dashboard;
