import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login"; 
import Logout from "./Logout"; 
import MyReviews from "./MyReviews"; 

function Profile() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); 

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setSelectedForm(null);
    };

    const handleSelectForm = (form) => {
        setSelectedForm(form);
    };

    const handleLoginSuccess = () => {
        setLoggedIn(true);
        setShowDropdown(false);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setShowDropdown(false);
    };

    return (
        <div className="profile-dropdown">
            <button className="profile-button" onClick={handleToggleDropdown}>
                Profile
            </button>
            {showDropdown && (
                <div className="dropdown-content">
                    {loggedIn ? (
                        <>
                            <button className="dropdown-button">
                                <MyReviews />
                            </button>
                            <button className="dropdown-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="dropdown-button" onClick={() => handleSelectForm("login")}>
                                Login
                            </button>
                            <button className="dropdown-button" onClick={() => handleSelectForm("signup")}>
                                Sign Up
                            </button>
                        </>
                    )}
                    {selectedForm === "login" && !loggedIn && (
                        <div>
                            <Login onLoginSuccess={handleLoginSuccess} notifyLogin={handleLoginSuccess} />
                        </div>
                    )}
                    {selectedForm === "signup" && !loggedIn && (
                        <div>
                            <SignUp />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
