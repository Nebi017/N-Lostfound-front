import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../css/ViewRecentItems.css";
import placeholderImage from "../assets/photose/image.png";

const ViewRecentItems = () => {
  // Fix the component name
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("lost"); // Default to 'lost' items
  const [loading, setLoading] = useState(false);
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

  // Function to fetch items based on the current status (lost/found)
  const fetchItems = async (status) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://n-lostfound.onrender.com/api/items/recent-items?status=${status}`
      );

      console.log("Response status:", response.status); // Log the status
      console.log("Response headers:", response.headers); // Log the headers

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the items when the component mounts or when the status changes
  useEffect(() => {
    fetchItems(status);
  }, [status]);

  // Handle status button click
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="Recently-items">
      <div className="App">
        <h1>Recently Submitted Items!</h1>

        {/* Status Selector */}
        <div className="status-selector">
          <button
            className={`status-btn ${status === "lost" ? "active" : ""}`}
            onClick={() => handleStatusChange("lost")}
          >
            Recently Lost
          </button>
          <button
            className={`status-btn ${status === "found" ? "active" : ""}`}
            onClick={() => handleStatusChange("found")}
          >
            Recently Found
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <p>Loading...</p>}

        {/* Items List */}
        <div>
          <div className="items-list">
            {items.length === 0 ? (
              <p>No items found.</p>
            ) : (
              items.map((item) => (
                <div key={item._id} className="item">
                  {/* Display the image */}

                  <img
                    src={
                      item.image
                        ? `https://n-lostfound.onrender.com/${item.image.replace(
                            "\\",
                            "/"
                          )}` // Use uploaded image
                        : placeholderImage // Use local placeholder image (assuming it's in /public)
                    }
                    alt={item.itemName || "Default Item"}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = placeholderImage; // Fallback to placeholder image
                    }}
                  />

                  {/* Display item details */}
                  <h4>Item : {item.itemName}</h4>
                  <p>Location : {item.location}</p>
                  <p>
                    Date {item.status === "lost" ? " Lost : " : " Found : "}
                    {new Date(item.dateLostorFound).toLocaleDateString("en-GB")}
                  </p>

                  {/* Links for actions */}
                  <div className="item-actions">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewItem(item);
                      }}
                      className="view-item-link"
                    >
                      View Lost Item
                    </Link>

                    <Link
                      to="#"
                      onClick={() => alertOwner(item.contactEmail)}
                      className="alert-owner-link"
                    >
                      Alert the Owner
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecentItems; // Fix the export name
