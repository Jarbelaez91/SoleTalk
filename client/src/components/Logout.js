import React from "react";

function Logout({ onLogout }) {
    const handleLogoutClick = () => {
        onLogout();
    };

    return (
        <button onClick={handleLogoutClick}>Logout</button>
    );
}

export default Logout;
