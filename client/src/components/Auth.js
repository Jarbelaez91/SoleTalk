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

                return true;
            } else {

                return false;
            }
        } catch (error) {
            console.error("Error during login:", error);
 
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}
