import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={location.pathname === "/" ? "nav-link active" : "nav-link"}
      >
        Game Library
      </Link>
      <Link
        to="/games"
        className={
          location.pathname === "/games" ? "nav-link active" : "nav-link"
        }
      >
        Games
      </Link>
      <Link
        to="/customers"
        className={
          location.pathname === "/customers" ? "nav-link active" : "nav-link"
        }
      >
        Customers
      </Link>
    </nav>
  );
};

export default NavBar;
