import React, { useState, useEffect, useContext } from "react";
import FormModal from './FormModal';
import NewReviewForm from './NewReviewForm';
import { AuthContext } from './Auth'; // Assuming you have an AuthContext to manage authentication
import SignUp from './SignUp';
import Login from './Login';

function MyReviews({ handleSignUp }) {
    const { loggedIn, profile, handleLogin } = useContext(AuthContext); // Access loggedIn and profile from the context
    const [reviews, setReviews] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [isSignUpMode, setIsSignUpMode] = useState(false); // State for controlling Sign Up mode
    const totalReviews = reviews.length;

    useEffect(() => {
        if (loggedIn) {
            fetch("http://127.0.0.1:5558/reviews")
                .then(response => response.json())
                .then(data => {
                    const filteredReviews = data.filter(review => review.username === name);
                    setReviews(filteredReviews);
                })
                .catch(error => console.error("Error fetching reviews:", error));
        }
    }, [loggedIn, name]);

    const handleOpenReviewModal = () => {
        setOpenModal(true);
    };

    useEffect(() => {
        if (profile) {
            setName(profile.name);
        }
    }, [profile]);

    const handleToggleSignUpMode = () => {
        setIsSignUpMode(!isSignUpMode); // Toggle Sign Up mode
    };

    const handleSignUpSuccess = (username) => {
        setName(username);
        setIsSignUpMode(false);
    };

    return (
        <div>
            {loggedIn ? (
                <div>
                    <div className="profile-card">
                        <h2 className="profile">Profile</h2>
                        <p className="subheading">Name: {name}</p>
                        <p className="subheading">Total Reviews: {totalReviews}</p>
                    </div>
                    <div className="button-div">
                        <button onClick={handleOpenReviewModal} className="button-main" >Write Review</button>
                        <FormModal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                        >
                            <NewReviewForm onClose={() => setOpenModal(false)} />
                        </FormModal>
                    </div>
                    <div className="reviews-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <p className="review-text">{review.text}</p>
                                <p className="review-rating">Rating: {review.rating}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    {isSignUpMode ? (
                        <>
                            <SignUp handleSignUp={handleSignUpSuccess} />
                            <p>Already have an account? <button onClick={handleToggleSignUpMode}>Login</button></p>
                        </>
                    ) : (
                        <>
                            <Login handleLogin={handleLogin} />
                            <p>Don't have an account? <button onClick={handleToggleSignUpMode}>Sign Up</button></p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default MyReviews;

