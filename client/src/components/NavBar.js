import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return (
        <div className="nav-header">
            <header className="main">SoleTalk</header>
            <div className="navbar">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
                <NavLink className="nav-link" to="/myreviews">My Reviews</NavLink>
                <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
            </div>
        </div>
    )
}

export default NavBar