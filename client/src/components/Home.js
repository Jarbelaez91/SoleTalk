import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const [reviews, setReviews] = useState([]);
    const [sneakerMap, setSneakerMap] = useState({});
    const [sneakerReviewsMap, setSneakerReviewsMap] = useState({});
    console.log("Initial reviews state:", reviews);

    useEffect(() => {
        const reviewsUrl = "http://127.0.0.1:5558/reviews";

        fetch(reviewsUrl)
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
                    map[sneaker.id] = sneaker.name_of_sneaker;
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

    const renderReviews = Object.keys(sneakerReviewsMap)
    .sort((a, b) => b - a) // Sort sneaker IDs in descending order
    .map((sneakerId) => (
      <div key={sneakerId}>
        <h2>Sneaker Name: {sneakerMap[sneakerId]}</h2>
        {sneakerReviewsMap[sneakerId].map((review) => (
          <div key={review.id}>
            <p>Review: {review.review}</p>
            <p>Rating: {review.rating}</p>
            <p>Username: {review.username}</p>
          </div>
        ))}
      </div>
    ));



    const totalReviews = reviews.length;

    return (
        <div>
          {loggedInUser && <h2>Welcome Back {loggedInUser}!</h2>}
          <h1>Latest Reviews:</h1>
          <Link to="/add-review">Add New Review</Link>
          <div className="review-grid">{renderReviews}</div>
        </div>
      );
}
export default Home;


