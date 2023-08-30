import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username && password) {
      handleLogin();
    } else {
      setErrorMessage("Please enter a username and password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for username and password */}
        <button type="submit">Log In</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;
