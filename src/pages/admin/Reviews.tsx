import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type ReviewItem = {
  _id: string;
  name: string;
  message: string;
  rating: number;
  status: "pending" | "approved";
  createdAt: string;
};

function AdminReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/reviews");
      setReviews(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews().catch(() => undefined);
  }, []);

  const approveReview = async (reviewId: string) => {
    await api.patch(`/reviews/${reviewId}/approve`);
    await loadReviews();
  };

  const deleteReview = async (reviewId: string) => {
    const shouldDelete = window.confirm("Delete this review?");
    if (!shouldDelete) return;
    await api.delete(`/reviews/${reviewId}`);
    await loadReviews();
  };

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-head">
        <h2>Review Management</h2>
        <button type="button" className="admin-small-btn" onClick={() => loadReviews()}>
          Refresh
        </button>
      </div>
      {loading ? <p>Loading reviews...</p> : null}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.name}</td>
                <td>{review.message}</td>
                <td>{review.rating}/5</td>
                <td>
                  <span className={`admin-status ${review.status}`}>{review.status}</span>
                </td>
                <td className="admin-action-cell">
                  {review.status === "pending" ? (
                    <button
                      type="button"
                      className="admin-small-btn"
                      onClick={() => approveReview(review._id)}
                    >
                      Approve
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="admin-small-btn danger"
                    onClick={() => deleteReview(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminReviews;
