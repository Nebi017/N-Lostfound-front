import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import "../css/Header.css"; // Import CSS file
import UserMenu from "./UserMenu";

const Header = () => {
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically
  const location = useLocation(); // useLocation hook to get the current route

  // Check if the user is logged in (by checking if the token exists in localStorage)
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    const header = document.getElementById("header");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  // Get the current route path
  const currentPath = location.pathname;

  return (
    <header id="header">
      {/* Logo Section */}
      <div>
        <h1>
          <Link to="/">LostFound</Link>
        </h1>
      </div>

      {/* Navigation Links (Hidden on /user/signup and /user/login) */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/items/search">Search</Link>
          </li>
        </ul>
      </nav>

      <div>
        {/* Show "Sign In" button only if NOT logged in and on "/user/signup" */}
        {currentPath === "/user/signup" && (
          <button className="btn" onClick={() => navigate("/user/login")}>
            Sign In
          </button>
        )}
        {!isLoggedIn &&
          !(currentPath === "/user/login") &&
          !(currentPath === "/user/signup") && (
            <button className="btn" onClick={() => navigate("/user/login")}>
              Sign In
            </button>
          )}

        {/* Show "Sign Up" button only on "/user/login" */}
        {currentPath === "/user/login" && (
          <button className="btn" onClick={() => navigate("/user/signup")}>
            Sign Up
          </button>
        )}

        {/* Show "Log Out" button only when the user is logged in */}
        {isLoggedIn && (
          // <button className="btn" onClick={handleLogout}>
          //   Log Out
          // </button>
          <UserMenu />
        )}
      </div>
    </header>
  );
};

export default Header;
