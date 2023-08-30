import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ onLogout}) {
  return (
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
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default NavBar;
