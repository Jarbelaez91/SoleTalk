import React, { useState, useEffect } from 'react';
import "./addreview.css"
const AddReview = ({ user }) => {
    console.log("User in AddReview:", user)
  const [nameOfShoe, setNameOfShoe] = useState('');
  const [nameOfBrand, setNameOfBrand] = useState('');
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [shoes, setShoes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [newShoeName, setNewShoeName] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedSneakerId, setSelectedSneakerId] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5558/sneakers',{credentials: 'include',})
      .then(response => response.json())
      .then(data => {
        setShoes(data);
        const uniqueBrands = [...new Set(data.map(shoe => shoe.name_of_brand))];
        const uniqueCategories = [...new Set(data.map(shoe => shoe.category))];
        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
      });
  }, []);

  const handleNameOfShoeChange = event => {
    setNameOfShoe(event.target.value);
  };

  const handleNameOfBrandChange = event => {
    setNameOfBrand(event.target.value);
    setCategory('');
    setNameOfShoe('');
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
    setNameOfShoe('');
  };

  const handleCommentsChange = event => {
    setComments(event.target.value);
  };

  const handleRatingChange = event => {
    setRating(parseFloat(event.target.value));
  };

  const handleNewShoeNameChange = event => {
    setNewShoeName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!user || !user.id) {
        console.error('User information is not available.');
        return;
      }
  
    if (!selectedSneakerId || !nameOfBrand || !category || !comments || rating === 0) {
      alert('Please fill in all fields and select a rating.');
      return;
    }
  
  
    if (selectedSneakerId === 'addNewShoe' && newShoeName) {
      const newSneakerResponse = await fetch('http://127.0.0.1:5558/sneakers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name_of_sneaker: newShoeName, name_of_brand: nameOfBrand, category }),
      });
      const newSneakerData = await newSneakerResponse.json();
      postReview(newSneakerData.id);
      console.log (newSneakerData)
    } 

    else{
      postReview(selectedSneakerId)

    }
    
    // else {
    //   const selectedSneaker = shoes.find(shoe => shoe.name_of_sneaker === nameOfShoe);
    //   if (!selectedSneaker) {
    //     alert('Please select a valid sneaker.');
    //     return;
    //   }
    //   setSelectedSneakerId(selectedSneaker.id);
    // }
    
  };

const postReview = async (sneaker_id) => {
  console.log('Rating:', rating);
  console.log('Comments:', comments);
  console.log(sneaker_id)



  
  const reviewData = {
      rating,
      review: comments,
      user_id: user.id,
      sneaker_id: sneaker_id,
  };
  console.log('Review Data:', reviewData);

  try {
    const reviewResponse = await fetch('http://127.0.0.1:5558/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reviewData),
    });

    if (reviewResponse.ok) {
      console.log('Review submitted successfully!');
      setShowForm(false);
    } else {
      console.error('Failed to submit review.');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
  }



}



  const handleEditReview = (review) => {
    setSelectedReviewId(review.id);
    setSelectedReview(review);
    setRating(review.rating);
    setComments(review.review);
    setShowForm(true);
  };

  const handleUpdateReview = async () => {
    const updatedReviewData = {
      rating,
      review: comments,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5558/reviews/${selectedReviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReviewData),
      });

      if (response.ok) {
        console.log('Review updated successfully!');
        setSelectedReview(null);
        setShowForm(false);
      } else {
        console.error('Failed to update review.');
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5558/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Review deleted successfully!');
      } else {
        console.error('Failed to delete review.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

const handleShoeId = e => {
  setSelectedSneakerId(e.target.value)
}


  return (
    <div className="add-review-container">
      {showForm ? (
        <div className="review-form">
          <h2>Leave Your Review</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name of Brand:</label>
              <select value={nameOfBrand} onChange={handleNameOfBrandChange} required>
                <option value="">Select a Brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Category:</label>
              <select value={category} onChange={handleCategoryChange} required>
                <option value="">Select a Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Name of Shoe:</label>
              <select value={selectedSneakerId} onChange={handleShoeId} required>
                <option value="">Select a Shoe</option>
                {shoes
                  .filter(shoe => shoe.name_of_brand === nameOfBrand && shoe.category === category)
                  .map(shoe => (
                    <option key={shoe.id} value={shoe.id}>
                      {shoe.name_of_sneaker}
                    </option>
                  ))}
                <option value="addNewShoe">Add New Shoe</option>
              </select>
            </div>
            {selectedSneakerId === 'addNewShoe' && (
              <div>
                <label>Add New Shoe Name:</label>
                <input
                  type="text"
                  value={newShoeName}
                  onChange={handleNewShoeNameChange}
                  required
                />
              </div>
            )}
            <div>
              <label>Rating:</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.5"
                value={rating}
                onChange={handleRatingChange}
                required
              />
            </div>
            <div>
              <label>Review:</label>
              <textarea value={comments} onChange={handleCommentsChange} required />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="review-submitted">
          <p>Review submitted successfully!</p>
          <button type="button" onClick={() => setShowForm(true)}>Write Another Review</button>
        </div>
      )}
      <h2 className="review-heading"></h2>
      <ul className="review-list">
      {user && user.reviews ? (
          user.reviews.map((review) => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
              <button onClick={() => handleEditReview(review)}>Edit</button>
              <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  );
};

export default AddReview;


