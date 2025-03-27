import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/ShowItem.css";
import BackButton from "../components/BackButton";

const ShowItemDetail = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const [item, setItem] = useState(null); // State to store the item details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch item details from the API
    const token = localStorage.getItem("token");
    axios
      .get(`https://n-lostfound.onrender.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      })
      .then((res) => {
        setItem(res.data); // Set the item data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching item:", err);
        setError("Failed to load item details"); // Set error message
        setLoading(false); // Stop loading
      });
  }, [id]); // Re-run effect if `id` changes

  // Display loading state
  if (loading) return <p>Loading...</p>;

  // Display error state
  if (error) return <p>{error}</p>;

  // Display if no item is found
  if (!item) return <p>Item not found</p>;

  // Render the item details
  return (
    <div className="whole-container">
      <BackButton />
      <div className="header-title">
        <h2 className="title">
          {" "}
          {item.status === "lost" ? "Lost " : "Found "}
          Item Details
        </h2>
        <p className="subtitle">{item.itemName}</p>
      </div>

      <div className="details-table">
        <div className="item-form">
          <div className="top-info">
            <div className="item-detail">
              <h4 className="label">
                Item {item.status === "lost" ? "Lost " : " Found"}
              </h4>
              <p>{item.itemName}</p>
            </div>
            <div className="item-detail">
              <h4 className="label">Category</h4>
              <p>{item.category}</p>
            </div>
            <div className="item-detail">
              <h4 className="label">Brand</h4>
              <p>{item.brand}</p>
            </div>
            <div className="item-detail">
              <h4 className="label">Primary Color</h4>
              <p>{item.primaryColor}</p>
            </div>
            <div className="item-detail">
              <h4 className="label">Secondary Color</h4>
              <p>{item.secondaryColor}</p>
            </div>
          </div>
          <div className="middle-info">
            <div className="item-detail">
              <h4 className="label">
                Date {item.status === "lost" ? "Lost " : "Found"}{" "}
              </h4>
              <p>{item.dateLostorFound}</p>
            </div>
            {item.status === "lost" && (
              <div className="item-detail">
                <h4 className="label">
                  Time {item.status === "lost" ? "Lost " : " Found"}{" "}
                </h4>
                <p>{item.timeLostorFound}</p>
              </div>
            )}
            <div className="item-detail">
              <h4 className="label">
                Where {item.status === "lost" ? " Lost " : " Found"}
              </h4>
              <p>{item.whereLostorFound}</p>
            </div>
            <div className="item-detail">
              <h4 className="label">Subcity </h4>
              <p>{item.subcity}</p>
            </div>
            <div className="item-detail">
              <h4 className="label">
                Location {item.status === "lost" ? " Lost " : " Found"}
              </h4>
              <p>{item.location}</p>
            </div>
            <div className="item-detail">
              <h4 className="label">Zip Code </h4>
              <p>{item.zipcode}</p>
            </div>
            {item.status === "lost" && (
              <div className="item-detail">
                <h4 className="label">Additional Information</h4>
                <p>{item.additionalInfo}</p>
              </div>
            )}
          </div>
          <div className="item-detail-image">
            <h4 className="label">Image</h4>
            {/* Use the <img> tag to render the image */}
            <img
              src={`https://n-lostfound.onrender.com/${
                item.image ? item.image.replace("\\", "/") : ""
              }`}
              alt={item.itemName}
              className="item-image"
            />
          </div>
          {item.status === "lost" && (
            <div className="bottom-info">
              <div className="item-detail">
                <h4 className="label">
                  {item.status === "lost" ? " Owner Name " : "Founder Name"}
                </h4>
                <p>
                  {item.contactFirstName} {item.contactLastName}
                </p>
              </div>
              <div className="item-detail">
                <h4 className="label">
                  {" "}
                  {item.status === "lost" ? " Owner Email " : "Founder Email"}
                </h4>
                <p>{item.contactEmail}</p>
              </div>
              <div className="item-detail">
                <h4 className="label">
                  {" "}
                  {item.status === "lost"
                    ? " Owner Contact Phone "
                    : "Founder Contact Phone"}
                </h4>
                <p>{item.contactPhone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowItemDetail;
