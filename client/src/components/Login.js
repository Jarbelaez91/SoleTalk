import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { Redirect } from "react-router-dom"; // Import Redirect from React Router
import FormModal from './FormModal';
import NewReviewForm from './NewReviewForm';

function Login() {
    const { handleLogin, loggedIn } = useContext(AuthContext); // Get the loggedIn state from AuthContext
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username && password) {
            const success = await handleLogin(username, password);

            if (success) {
                setSuccessMessage("Logged in successfully!"); // Set success message
                setErrorMessage(""); // Clear error message
                setShowModal(true); // Show the modal after successful login
            } else {
                setErrorMessage("Invalid username or password.");
                setSuccessMessage(""); // Clear success message
            }
        } else {
            setErrorMessage("Please enter a username and password.");
            setSuccessMessage(""); // Clear success message
        }
    };

    if (loggedIn) {
        return (
            <div>
                <p>You are already logged in.</p> {/* Display a message if logged in */}
                {showModal && (
                    <FormModal
                        open={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <NewReviewForm onClose={() => setShowModal(false)} />
                    </FormModal>
                )}
            </div>
        );
    }

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>} {/* Display success message */}
        </div>
    );
}

export default Login;

