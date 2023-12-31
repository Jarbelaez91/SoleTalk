import React, { useState } from 'react';

const ReviewForm = () => {
  const [nameOfShoe, setNameOfShoe] = useState('');
  const [nameOfBrand, setNameOfBrand] = useState('');
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);

  const handleNameOfShoeChange = (event) => {
    setNameOfShoe(event.target.value);
  };

  const handleNameOfBrandChange = (event) => {
    setNameOfBrand(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseFloat(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nameOfShoe || !nameOfBrand || !category || !comments || rating === 0) {
      alert('Please fill in all fields and select a rating.');
      return;
    }

    const reviewData = {
      nameOfShoe,
      nameOfBrand,
      category,
      comments,
      rating,
    };

    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {

        console.log('Review submitted successfully!');

      } else {
        console.error('Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name of Shoe:</label>
          <input type="text" value={nameOfShoe} onChange={handleNameOfShoeChange} required />
        </div>
        <div>
          <label>Name of Brand:</label>
          <input type="text" value={nameOfBrand} onChange={handleNameOfBrandChange} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={handleCategoryChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
