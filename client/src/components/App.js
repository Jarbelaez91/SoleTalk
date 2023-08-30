import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StarterPage from "./StarterPage";
import MainPage from "./MainPage";

function App() {
  document.title = "SoleTalk";
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("loggedInUser");
    if (storedUsername) {
      setLoggedIn(true);
      fetchUserData(storedUsername)
        .then((fetchedUser) => {
          setUser(fetchedUser);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("loggedInUser", username);
    fetchUserData(username)
      .then((fetchedUser) => {
        setUser(fetchedUser);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
    setUser(null);
  };


  const fetchUserData = async (username) => {
    try {
      const response = await fetch(`http://localhost:5558/users/${username}`, {
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  
  

  return (
    <Router> 
      <div>
      {loggedIn && user ? (
            <MainPage onLogout={handleLogout} user={{ username: user.username, id: user.id }} />
            ) : (
            <StarterPage onLogin={handleLogin} />
            )}
      </div>
    </Router>
  );
}

export default App;

