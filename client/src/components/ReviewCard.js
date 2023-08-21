import React from "react";

function ReviewCard({ review, sneaker }) {
    return (
        <div>
            <p>Sneaker Name: {sneaker.name_of_sneaker}</p>
            <p>Review: {review.review}</p>
            <p>Rating: {review.rating}</p>
            
            
        </div>
    );
}

export default ReviewCard;