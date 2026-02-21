import React, { useState, useEffect } from "react";
import { loadReviews, saveReviews } from "../utils/localStorage";

export default function Reviews({ productId, productName }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    name: "Anonymous",
  });

  useEffect(() => {
    const allReviews = loadReviews();
    const productReviews = allReviews.filter(r => r.productId === productId);
    setReviews(productReviews);
  }, [productId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!newReview.comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    const review = {
      id: Date.now(),
      productId: productId,
      rating: parseInt(newReview.rating),
      comment: newReview.comment,
      name: newReview.name || "Anonymous",
      date: new Date().toLocaleDateString(),
    };

    const allReviews = loadReviews();
    allReviews.push(review);
    saveReviews(allReviews);

    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: "", name: "Anonymous" });
    setShowForm(false);
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div style={reviewsContainer}>
      <h3>Reviews & Ratings ({reviews.length})</h3>

      {reviews.length > 0 && (
        <div style={averageContainer}>
          <div style={averageResultStyle}>
            <span style={ratingNumber}>{averageRating}</span>
            <div style={starsStyle}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < Math.round(averageRating) ? "#ffc107" : "#ddd" }}>
                  ★
                </span>
              ))}
            </div>
            <p>Based on {reviews.length} review{reviews.length > 1 ? "s" : ""}</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        style={addReviewButton}
      >
        {showForm ? "Cancel" : "Add Review"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmitReview} style={formStyle}>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            style={inputStyle}
          />

          <div style={ratingSelect}>
            <label>Rating:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              style={selectStyle}
            >
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Very Poor</option>
            </select>
          </div>

          <textarea
            placeholder="Share your feedback..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            style={textareaStyle}
            rows="4"
          />

          <button type="submit" style={submitButton}>
            Submit Review
          </button>
        </form>
      )}

      <div style={reviewsList}>
        {reviews.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center" }}>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} style={reviewCard}>
              <div style={reviewHeader}>
                <strong>{review.name}</strong>
                <span style={reviewDate}>{review.date}</span>
              </div>
              <div style={reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < review.rating ? "#ffc107" : "#ddd", fontSize: "16px" }}>
                    ★
                  </span>
                ))}
              </div>
              <p style={reviewComment}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const reviewsContainer = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#f8fbfd",
  borderRadius: "10px",
  border: "1px solid #d1e7f7",
};

const averageContainer = {
  display: "flex",
  alignItems: "center",
  marginBottm: "20px",
  padding: "15px",
  backgroundColor: "#fff",
  borderRadius: "8px",
};

const averageResultStyle = {
  textAlign: "center",
};

const ratingNumber = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#0b5ed7",
};

const starsStyle = {
  fontSize: "18px",
  marginTop: "5px",
};

const addReviewButton = {
  marginBottom: "15px",
  padding: "10px 16px",
  backgroundColor: "#0b5ed7",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "8px 12px",
  border: "1px solid #d1e7f7",
  borderRadius: "6px",
  fontSize: "14px",
};

const ratingSelect = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const selectStyle = {
  flex: 1,
  padding: "8px 12px",
  border: "1px solid #d1e7f7",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
};

const textareaStyle = {
  padding: "8px 12px",
  border: "1px solid #d1e7f7",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: "inherit",
};

const submitButton = {
  padding: "10px 16px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const reviewsList = {
  marginTop: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const reviewCard = {
  backgroundColor: "#fff",
  padding: "12px",
  borderRadius: "8px",
  borderLeft: "4px solid #0b5ed7",
};

const reviewHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
  fontSize: "14px",
};

const reviewDate = {
  color: "#999",
  fontSize: "12px",
};

const reviewRating = {
  marginBottom: "8px",
  fontSize: "14px",
};

const reviewComment = {
  margin: "0",
  color: "#555",
  lineHeight: "1.5",
  fontSize: "14px",
};
