import React from "react";
import "../css/Review.css";

function Review({ className }) {
  return (
    <section className={`review-section ${className}`}>
      <div className="review-container">
        <div className="review-item d-flex">
          <div className="review-icon">
            <img src="landing/influceicon.png" alt="Influencer Icon" />
          </div>
          <div className="flex-decoration-column">
            <h2 className="review-number">10.000 +</h2>
            <p className="review-label">Influencer</p>
          </div>
        </div>
        <div className="review-item">
          <div className="review-icon">
            <img src="landing/brandIcon.png" alt="Brands Icon" />
          </div>
          <div className="flex-decoration-column">
            <h2 className="review-number">5.000 +</h2>
            <p className="review-label">Brands</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Review;