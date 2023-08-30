import React, { useState, useEffect } from 'react';
import "./myreviews.css"

const MyReviews = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [sneakerDataMap, setSneakerDataMap] = useState({});
  const [editedReviewId, setEditedReviewId] = useState(null);
  const [editedRating, setEditedRating] = useState('');
  const [editedReviewText, setEditedReviewText] = useState('');

  useEffect(() => {
    if (user && user.id) {
      fetchUserReviews(user.id);
    }
  }, [user]);

  const fetchUserReviews = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5558/reviews?user_id=${userId}`,{credentials: 'include',});
      const data = await response.json();
      console.log('Fetched reviews:', data);
      
    
      const userReviews = data.filter((review) => review.user_id === userId);
      
      setReviews(userReviews);
      fetchSneakerDataForReviews(userReviews);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };
  

  const fetchSneakerDataForReviews = async (reviewsData) => {
    const sneakerIds = reviewsData.map((review) => review.sneaker_id);
    const sneakerDataPromises = sneakerIds.map((sneakerId) => fetchSneakerInfo(sneakerId));
    const sneakerDataList = await Promise.all(sneakerDataPromises);
    const sneakerDataMap = {};
    sneakerDataList.forEach((sneakerData, index) => {
      sneakerDataMap[sneakerIds[index]] = sneakerData;
    });
    setSneakerDataMap(sneakerDataMap);
  };


  const fetchSneakerInfo = async (sneakerId) => {
    try {
      const response = await fetch(`http://localhost:5558/sneakers/${sneakerId}`);
      
      if (!response.ok) {
        console.error('Error fetching sneaker information:', response.statusText);
        return null;
      }
      
      const sneakerData = await response.json();
      return sneakerData;
    } catch (error) {
      console.error('Error fetching sneaker information:', error);
      return null;
    }
  };
  

  const handleEditButtonClick = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    setEditedReviewId(reviewId);
    setEditedRating(reviewToEdit.rating);
    setEditedReviewText(reviewToEdit.review);
  };

  const handleCancelEditButtonClick = () => {
    setEditedReviewId(null);
    setEditedRating('');
    setEditedReviewText('');
  };

  const handleSubmitEditButtonClick = async () => {
    if (editedReviewId === null) {
      return;
    }

    const updatedReview = {
      id: editedReviewId,
      rating: editedRating,
      review: editedReviewText,
    };

    try {
      const response = await fetch(`http://localhost:5558/reviews/${editedReviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Failed to update review:', errorResponse);
        return;
      }

      console.log('Review updated successfully!');

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === editedReviewId ? { ...review, rating: editedRating, review: editedReviewText } : review
        )
      );

      setEditedReviewId(null);
      setEditedRating('');
      setEditedReviewText('');
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:5558/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Review deleted successfully!');
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      } else {
        console.error('Failed to delete review.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <h2>Your Reviews</h2>
      <ul className="review-list">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            const sneakerData = sneakerDataMap[review.sneaker_id];
            const isEditing = review.id === editedReviewId;

            return (
              <p key={review.id} className="review-item">
                <p>Rating: {review.rating}</p>
                <p>Review: {review.review}</p>
                {sneakerData ? (
                  <>
                    <p>Sneaker: {sneakerData.name_of_sneaker}</p>
                    <p>Category: {sneakerData.category}</p>
                    <p>Brand: {sneakerData.name_of_brand}</p>
                  </>
                ) : (
                  <p>Sneaker information not available</p>
                )}

                {isEditing ? (
                  <div>
                    <input
                      type="number"
                      placeholder="Edit Rating"
                      value={editedRating}
                      onChange={(e) => setEditedRating(e.target.value)}
                    />
                    <textarea
                      placeholder="Edit Review"
                      value={editedReviewText}
                      onChange={(e) => setEditedReviewText(e.target.value)}
                    />
                    <button onClick={handleSubmitEditButtonClick}>Submit</button>
                    <button onClick={handleCancelEditButtonClick}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditButtonClick(review.id)}>Edit</button>
                )}

                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </p>
            );
          })
        ) : (
          <p>No reviews found.</p>
        )}
      </ul>
    </div>
  );
};

export default MyReviews;