import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth";

function Login({ onLoginSuccess, notifyLogin }) {
    const { handleLogin, loggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username && password) {
            const success = await handleLogin(username, password);

            if (success) {
                setLoginSuccess(true);
                setErrorMessage("");
                onLoginSuccess();  
                notifyLogin(true); 
            } else {
                setErrorMessage("Invalid username or password.");
            }
        } else {
            setErrorMessage("Please enter a username and password.");
        }
    };

    return (
        <div>
            {!loggedIn && !loginSuccess ? (
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
                </div>
            ) : null}
        </div>
    );
}

export default Login;
