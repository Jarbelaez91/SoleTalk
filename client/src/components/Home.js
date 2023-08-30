import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [reviews, setReviews] = useState([]);
  const [sneakerMap, setSneakerMap] = useState({});
  const [sneakerReviewsMap, setSneakerReviewsMap] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5558/reviews")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response data:", data);
        if (Array.isArray(data)) {
          setReviews(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5558/sneakers")
      .then((response) => response.json())
      .then((data) => {
        const map = {};
        data.forEach((sneaker) => {
          map[sneaker.id] = sneaker;
        });
        setSneakerMap(map);
      })
      .catch((error) => {
        console.error("Error fetching sneakers:", error);
      });
  }, []);

  useEffect(() => {
    const sneakerReviews = {};
    reviews.forEach((review) => {
      const sneakerId = review.sneaker_id;
      if (!sneakerReviews[sneakerId]) {
        sneakerReviews[sneakerId] = [];
      }
      sneakerReviews[sneakerId].push(review);
    });
    setSneakerReviewsMap(sneakerReviews);
  }, [reviews]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="home-container">
    <div className="fixed-content">
      {loggedInUser && <h2>Welcome Back {loggedInUser}!</h2>}
      <h2>Latest Reviews</h2>
      <div className="add-review-link">
        <Link to="/add-review" className="add-review">Add New Review</Link>
      </div>
      </div>
      <div className="review-grid-container">
      <div className="review-grid">
        {Object.keys(sneakerReviewsMap).map((sneakerId) => (
          <div key={sneakerId} className="review-card">
            <div className="review-card-header">
              <h2 onClick={() => setSelectedCard(sneakerId)}>
                {sneakerMap[sneakerId]?.name_of_sneaker}
              </h2>
              <div className="review-card-rating">
                <span className="review-card-rating-stars">★★★★★</span>
                {calculateAverageRating(sneakerReviewsMap[sneakerId]).toFixed(1)} stars
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={handleCloseModal}>
              &times;
            </span>
            {/* Show sneaker details */}
            <div className="modal-sneaker-details">
              <h2>{sneakerMap[selectedCard]?.name_of_sneaker}</h2>
              <p>Category: {sneakerMap[selectedCard]?.category}</p>
              <p>Brand: {sneakerMap[selectedCard]?.brand}</p>
            </div>
            {/* Show reviews */}
            <div className="modal-reviews">
              {sneakerReviewsMap[selectedCard].map((review) => (
                <div key={review.id} className="modal-review">
                  <p>{review.review}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Username: {review.username}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Home;
