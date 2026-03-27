import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { api } from "./lib/api";

type Review = {
  _id: string;
  name: string;
  message: string;
  rating: number;
};

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const loadApprovedReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/reviews");
      setReviews(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovedReviews().catch(() => undefined);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("dropReview") !== "1") return;

    setIsReviewModalOpen(true);
    query.delete("dropReview");
    navigate(
      { pathname: location.pathname, search: query.toString() ? `?${query.toString()}` : "" },
      { replace: true },
    );
  }, [location.pathname, location.search, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitMessage("");

    await api.post("/reviews", { name, message, rating });
    setName("");
    setMessage("");
    setRating(5);
    setSubmitMessage("Thanks! Your review was submitted for admin approval.");
    setTimeout(() => setIsReviewModalOpen(false), 900);
  };

  return (
    <div className="page-shell reviews-page-shell">
      <SiteHeader />
      <main className="medical-hub-page reviews-page">
        <Reveal>
          <section className="reviews-hero">
          <p className="reviews-kicker">Testimonials</p>
          <h1>Thousands of supporters share the love.</h1>
          <p>
            Real stories from community members, volunteers, donors, and program
            partners who have experienced our impact.
          </p>
          </section>
        </Reveal>

        <section className="reviews-grid" aria-label="Community reviews">
          {loading ? <p>Loading approved reviews...</p> : null}
          {!loading && reviews.length === 0 ? (
            <p className="review-empty-state">No approved reviews yet.</p>
          ) : null}
          {reviews.map((item, index) => (
            <Reveal key={`${item.name}-${index}`} delay={0.03 * (index % 8)}>
              <article className={`review-card ${item.rating >= 4 ? "highlight" : ""}`}>
                <span className="review-quote-mark" aria-hidden="true">
                  “
                </span>
                <p className="review-quote">{item.message}</p>
                <p className="review-author">{item.name}</p>
                <p className="review-meta">{item.rating}/5 stars</p>
              </article>
            </Reveal>
          ))}
        </section>

        <Reveal>
          <section className="review-footer-cta-wrap">
            <button
              type="button"
              className="review-open-modal-btn"
              onClick={() => setIsReviewModalOpen(true)}
            >
              Drop a Review
            </button>
          </section>
        </Reveal>
      </main>
      <div className="about-footer-flow">
        <SiteFooter />
      </div>

      {isReviewModalOpen ? (
        <div
          className="review-modal-overlay"
          role="button"
          tabIndex={0}
          onClick={() => setIsReviewModalOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsReviewModalOpen(false);
            }
          }}
        >
          <section
            className="review-submit-card review-submit-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="review-modal-head">
              <h2>Share Your Experience</h2>
              <button
                type="button"
                className="review-modal-close-btn"
                onClick={() => setIsReviewModalOpen(false)}
                aria-label="Close review form"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="review-submit-form">
              <input
                placeholder="Your Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <textarea
                placeholder="Write your review"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
              <div className="review-submit-footer">
                <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
                <button type="submit">Submit Review</button>
              </div>
            </form>
            {submitMessage ? <p className="review-submit-note">{submitMessage}</p> : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default ReviewsPage;
