import React from 'react';
import NewReviewForm from './NewReviewForm';

const FormModal = ({ open, onClose }) => {

  function addReview(reviewObj){
    fetch('http://localhost:3001/reviews/',{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify(reviewObj)
    })
  }
  
  
  return open?(
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='FormModalContainer'
      >
        <div className='FormModalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <h1>Your Review</h1>
          </div>
          <div>
            <NewReviewForm addReview={addReview}/>
          </div>
        </div>
      </div>
    </div>
  ):
  null;
};

export default FormModal;