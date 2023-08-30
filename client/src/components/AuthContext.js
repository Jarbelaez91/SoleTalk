import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
  
  };

  const handleSignup = async (username, password, location) => {
 
  };

  const handleLogout = () => {
 
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
