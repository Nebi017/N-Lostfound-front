import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserShield, FaBox } from "react-icons/fa";
import "../css/UserMenu.css";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(""); // For display
  const [role, setRole] = useState(""); // Add role state
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username and role from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role"); // Retrieve role
    console.log("Role from localStorage:", storedRole); // Log the role
    setUsername(storedUsername || "Guest");
    setRole(storedRole || ""); // Set role or default to an empty string
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role"); // Clear role on logout
    navigate("/user/login");
  };

  const handleAdminLinkClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    console.log("User role:", role); // Log the role

    if (role === "admin") {
      // If the user is an admin, redirect to the admin dashboard
      toggleMenu(); // Close the menu
      setTimeout(() => navigate("/admin-dashboard"), 100); // Delay navigation slightly
    } else {
      enqueueSnackbar("You are not allowed to access the admin panel.", {
        variant: "error", // Error notification
      });
      toggleMenu(); // Close the menu
      setTimeout(() => navigate("/"), 100); // Delay navigation slightly
    }
  };

  return (
    <div className="user-menu">
      <button className="menu-btn" onClick={toggleMenu} aria-label="User menu">
        {username.charAt(0).toUpperCase()}
      </button>

      {isOpen && (
        <div className="dropdown">
          <Link to="/items/user-items" onClick={toggleMenu}>
            <FaBox className="I-logout" /> Your Items
          </Link>

          <Link to="#" onClick={handleAdminLinkClick}>
            <FaUserShield className="I-logout" /> Admin Pannel
          </Link>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <FaSignOutAlt className="I-logout" /> Log Out
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
