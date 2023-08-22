import React from "react";
import { NavLink } from "react-router-dom";
import ProfileDropdown from "./Profile";

function NavBar(){
    return (
        <div className="nav-header">
            <header className="main">SoleTalk</header>
            <div className="navbar">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
                <NavLink className="nav-link" to="/upcomingreleases">Upcoming Releases</NavLink>
                <NavLink className="nav-link" to="/sneakertips">Sneaker Tips</NavLink>
                <li>
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                <ProfileDropdown/>
                </li>
            </div>
        </div>
    )
}

export default NavBar