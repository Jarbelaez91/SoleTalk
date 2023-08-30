import React, { useState, useEffect, useContext } from "react";
import NewReviewForm from "./NewReviewForm";
import { AuthContext } from "./AuthContext";;

function UserReviews() {
  const { user , handleLogout} = useContext(AuthContext);
  const [userReviews, setUserReviews] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility

  useEffect(() => {
    fetch("http://127.0.0.1:5558/reviews")
      .then(response => response.json())
      .then(data => setUserReviews(data));

    fetch("http://127.0.0.1:5558/sneakers")
      .then(response => response.json())
      .then(data => setSneakers(data));
  }, []);

  const currentUserId = 2; // Replace with the actual user ID

  const userReviewsToShow = userReviews.filter(review => review.user_id === currentUserId);

  return (
    <div>
      <h1>My Reviews</h1>
      {isFormOpen ? (
        <NewReviewForm onClose={() => setIsFormOpen(false)} />
      ) : (
        <button onClick={() => setIsFormOpen(true)}>Add New Review</button>
      )}
      {userReviewsToShow.length > 0 ? (
        <>
          <p>You have {userReviewsToShow.length} reviews:</p>
          <ul>
            {userReviewsToShow.map(review => {
              const sneaker = sneakers.find(sneaker => sneaker.id === review.sneaker_id);

              return (
                <li key={review.id}>
                  <p>Rating: {review.rating}</p>
                  <p>Review: {review.review}</p>
                  {sneaker && (
                    <>
                      <p>Name of Sneaker: {sneaker.name_of_sneaker}</p>
                      <p>Category: {sneaker.category}</p>
                      <p>Name of Brand: {sneaker.name_of_brand}</p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>You currently have no reviews.</p>
      )}
    </div>
  );
}

export default UserReviews;

