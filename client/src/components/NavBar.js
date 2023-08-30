import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar({ onLogout }) {
  return (
    <div className="nav-box">
      <div className="nav-header">
        <header className="main">SoleTalk</header>
        <div className="navbar">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/upcomingreleases">
            Upcoming Releases
          </NavLink>
          <NavLink className="nav-link" to="/sneakertips">
            Sneaker Tips
          </NavLink>
          <NavLink className="nav-link" to="/my-reviews">
            My Reviews
          </NavLink>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
