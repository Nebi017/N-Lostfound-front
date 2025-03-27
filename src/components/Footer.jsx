import React from "react";
import { Link,useLocation } from "react-router-dom"; // Import useLocation
import { FaSearch, FaClock } from "react-icons/fa";
import "../css/Footer.css"; // Import CSS file

const Footer = () => {
  const location = useLocation(); // useLocation hook to get the current route

  const hideFooterRoutes = ["/user/login", "/user/signup"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Lost & Found</h2>
          <p>
            Helping you reconnect with what matters. Our platform makes it easy
            to find and return lost items to their rightful owners.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/items/search">
                <FaClock className="icon-search" />
                Recently Lost
              </Link>
            </li>
            <li>
              <Link to="/items/search">
                <FaSearch className="icon-search" />
                Search
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <div>
            <h3>Contact Us</h3>
            <p>Email: support@lostfound.com</p>
            <p>Phone: +251976205277</p>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" title="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              title="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" title="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.tiktok.com" target="_blank" title="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LostFound. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
