import React, { useState } from "react";

function SignUp({ handleSignUp }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [formError, setFormError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "location") {
            setLocation(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5558/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, location }),
            });

            if (response.ok) {
          
                handleSignUp(username);
                setUsername("");
                setPassword("");
                setLocation("");
            } else {
                console.error("Registration failed");
                console.log("Response status:", response.status);
                const responseData = await response.json();
                if (responseData.message === 'Username already exists') {
                    setFormError("Username is already taken. Please choose a different username.");
                } else {
                    setFormError("Registration failed. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setFormError("An error occurred. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {formError && <p>{formError}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={username} onChange={handleInputChange} />
                <input type="text" name="location" placeholder="City" value={location} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={handleInputChange} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
