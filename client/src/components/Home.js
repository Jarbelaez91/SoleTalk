import React, { useEffect, useState } from "react";

function Home() {
    const [reviews, setReviews] = useState([]);
    const [sneakerMap, setSneakerMap] = useState({});
    const [sneakerReviewsMap, setSneakerReviewsMap] = useState({});

    useEffect(() => {
        fetch("http://127.0.0.1:5558/reviews")
            .then((response) => response.json())
            .then((data) => setReviews(data));
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

    const renderReviews = Object.entries(sneakerReviewsMap).map(([sneakerId, reviews]) => (
        <div key={sneakerId}>
            <h2>Sneaker Name: {sneakerMap[sneakerId]}</h2>
            {reviews.map((review) => (
                <div key={review.id}>
                    <p>Review: {review.review}</p>
                    <p>Rating: {review.rating}</p>
                </div>
            ))}
        </div>
    ));

    const totalReviews = reviews.length;

    return (
        <div>
            <h1>Latest Reviews:</h1>
            <div className="review-grid">{renderReviews}</div>
        </div>
    );
}

export default Home;

