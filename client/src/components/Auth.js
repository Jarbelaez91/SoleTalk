import React from "react";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const handleLogin = async (username, password) => {
        try {
            const response = await fetch("http://127.0.0.1:5558/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Return true to indicate successful login
                return true;
            } else {
                // Return false to indicate login failure
                return false;
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Return false on error
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}
