import React, { useState } from "react";
import "./starterpage.css";

function StarterPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [location, setLocation] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

  
    try {
      const response = await fetch("http://127.0.0.1:5558/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem("loggedInUser", username);
        onLogin(username);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await fetch("http://127.0.0.1:5558/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, location }),
      });

      if (response.ok) {
        setIsSignup(false); 
      } else {
        setSignupError(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="starter-page-container">
      <h1 className="welcome-text">Welcome to SoleTalk</h1>
      {isSignup ? (
        <form onSubmit={handleSignupFormSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {signupError && <p>Username is unavailable or there was an error during signup.</p>}
          <p>Already have an account? <button onClick={() => setIsSignup(false)}>Login</button></p>
        </form>
      ) : (
        <form onSubmit={handleLoginFormSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {loginError && <p>Invalid username or password.</p>}
          <p>Don't have an account? <button onClick={() => setIsSignup(true)}>Sign Up</button></p>
        </form>
      )}
    </div>
  );
}

export default StarterPage;

