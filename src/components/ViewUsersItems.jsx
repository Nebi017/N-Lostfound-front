import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/ViewuserItems.css";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import placeholderImage from "../assets/photose/image.png";

const ViewUsersItems = () => {
  const [userItems, setUserItems] = useState([]); // Stores user-submitted items
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const alertOwner = (ownerEmail) => {
    const user = localStorage.getItem("token"); // Check if user is logged in

    if (!user) {
      toast.warning("Please sign in to contact the owner."); // Show toast notification
      localStorage.setItem(
        "redirectPath",
        JSON.stringify({
          path: window.location.pathname, // Store the current page
        })
      );
      window.location.href = "/user/login"; // Redirect to Sign-In page
    } else {
      // Create the mailto link and open email client
      const mailtoLink = `mailto:${ownerEmail}`;
      window.location.href = mailtoLink;
    }
  };

  const handleViewItem = (item) => {
    const user = localStorage.getItem("token"); // Check if user is logged in

    if (!user) {
      toast.warning("Please sign in to view this item."); // Show toast notification
      localStorage.setItem(
        "redirectPath",
        JSON.stringify({
          path: `/recent-items/${item._id}`, // Save intended path
        })
      );
      navigate("/user/login"); // Redirect to login
    } else {
      navigate(`/recent-items/${item._id}`); // Navigate to item page
    }
  };

  useEffect(() => {
    const fetchUserItems = async () => {
      console.log("Token:", token); // Debugging
      if (!token) return console.log("User is not logged in");

      try {
        setLoading(true);
        const response = await axios.get(
          "https://n-lostfound.onrender.com/api/items/user-items", // Fixed URL
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
          }
        );
        console.log("Response Data:", response.data); // Debugging
        setUserItems(response.data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [token]);

  return (
    <div>
      {/* Loading State */}
      {loading && <p>Loading...</p>}
      {/* User Items List */}
      <div className="view-whole">
        <h2>Manage Your Items</h2>

        <div className="view-items-list">
          {Array.isArray(userItems) && userItems.length > 0 ? (
            userItems.map((item) => (
              <div key={item._id} className="view-item">
                <div className="image-container">
                  <img
                    src={
                      item.image
                        ? `https://n-lostfound.onrender.com/${item.image.replace(
                            /\\/g,
                            "/"
                          )}`
                        : placeholderImage
                    }
                    alt={item.itemName || "Default Item"}
                    className="view-item-image"
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }}
                  />

                  {/* Edit & Delete Icons */}
                  <Link
                    to={`/items/item/edit-item/${item._id}`} // Link to the edit page with item id
                    className="edit-item-btn"
                  >
                    <BsPencilSquare />
                  </Link>

                  <Link
                    to={`/items/delete/${item._id}`} // Link to the delete confirmation page or similar
                    className="delete-item-btn"
                  >
                    <BsTrash />
                  </Link>
                </div>
                <h4>Item: {item.itemName}</h4>
                <p>Location: {item.location}</p>
                <p>
                  Date {item.status === "lost" ? "Lost: " : "Found: "}
                  {new Date(item.dateLostorFound).toLocaleDateString("en-GB")}
                </p>

                {/* Links for actions */}
                <div className="view-item-actions">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewItem(item);
                    }}
                    className="view-item-linkk"
                  >
                    View Lost Item
                  </Link>

                  <Link
                    to="#"
                    onClick={() => alertOwner(item.contactEmail)}
                    className="alert-owner-linkk"
                  >
                    Alert the Owner
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUsersItems;
