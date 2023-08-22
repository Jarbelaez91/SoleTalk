import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Auth";

function ReviewList() {
    const { loggedIn, profile } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (loggedIn && profile) {
            fetch(`http://127.0.0.1:5558/reviews?username=${profile.username}`)
                .then(response => response.json())
                .then(data => {
                    setReviews(data);
                })
                .catch(error => console.error("Error fetching reviews:", error));
        }
    }, [loggedIn, profile]);

    return (
        <div>
            <h2>Your Reviews</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review, index) => (
                        <li key={index}>
                            <p>Rating: {review.rating}</p>
                            <p>{review.text}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
}

export default ReviewList;
