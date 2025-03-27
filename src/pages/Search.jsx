import React, { useState, useEffect } from "react";
import axios from "axios";
import placeholderImage from "../assets/photose/image.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../css/Search.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcity, setSubcity] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subcityOpen, setSubcityOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);
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

  // List of Addis Ababa subcities
  const subcities = [
    "Addis Ketema",
    "Akaky Kaliti",
    "Arada",
    "Bole",
    "Gullele",
    "Kirkos",
    "Kolfe Keranio",
    "Lideta",
    "Nifas Silk-Lafto",
    "Yeka",
    "Lemi Kura",
  ];

  // Fetch items from the backend
  const fetchItems = async () => {
    setLoading(true); // Start loading
    try {
      const url = "https://n-lostfound.onrender.com/api/items/search";
      const params = { search, category, sort };

      // Add subcity to params only if it's not empty
      if (subcity.length > 0) {
        params.subcity = subcity.join(","); // Convert array to comma-separated string
      }

      console.log(
        "Fetching items from:",
        `${url}?${new URLSearchParams(params).toString()}`
      );

      const response = await axios.get(url, { params });
      console.log("API Response:", response.data); // Log the response

      // Extract the `items` array from the response
      const itemsData = Array.isArray(response.data.items)
        ? response.data.items
        : [];
      setItems(itemsData);
    } catch (err) {
      console.error("Failed to fetch items", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search, category, subcity, sort]);

  // Log the items state after it's updated
  useEffect(() => {
    console.log("Items state updated:", items);
  }, [items]);

  return (
    <div className="search-termm">
      <div className="displayy">
        <div className="filterr">
          <div className="search-inputt">
            {/* Search by Name */}
            <input
              type="text"
              placeholder="Search Your lost item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <h4>You can filter here</h4>

          {/* Filter by Category */}
          <div className="filter-groupp">
            <h5
              onClick={() => setCategoryOpen(!categoryOpen)}
              style={{ cursor: "pointer" }}
            >
              Category {categoryOpen ? "▾" : "▸"}
            </h5>
            {categoryOpen && (
              <div>
                {[
                  "Electronics",
                  "Jewelry",
                  "Documents",
                  "Clothing",
                  "Accessories",
                  "Keys",
                ].map((cat) => (
                  <div key={cat}>
                    {" "}
                    {/* Wrap each label in a <div> */}
                    <label>
                      <input
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
                        onChange={(e) => {
                          setCategory((prev) =>
                            e.target.checked
                              ? [...prev, cat]
                              : prev.filter((c) => c !== cat)
                          );
                        }}
                      />
                      {cat}
                    </label>
                    <br /> {/* Add break line after each checkbox */}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter by Subcity */}
          <div className="filter-groupp">
            <h5
              onClick={() => setSubcityOpen(!subcityOpen)}
              style={{ cursor: "pointer" }}
            >
              Subcity {subcityOpen ? "▾" : "▸"}
            </h5>
            {subcityOpen && (
              <div>
                {subcities.map((sub) => (
                  <div key={sub}>
                    {" "}
                    {/* Wrap each label in a <div> */}
                    <label>
                      <input
                        type="checkbox"
                        value={sub}
                        checked={subcity.includes(sub)}
                        onChange={(e) => {
                          setSubcity((prev) =>
                            e.target.checked
                              ? [...prev, sub]
                              : prev.filter((s) => s !== sub)
                          );
                        }}
                      />
                      {sub}
                    </label>
                    <br /> {/* Add a break line after each checkbox */}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="filter-groupp">
            <h5
              onClick={() => setSortOpen(!sortOpen)}
              style={{ cursor: "pointer" }}
            >
              Sort By {sortOpen ? "▾" : "▸"}
            </h5>
            {sortOpen && (
              <div>
                {[
                  { value: "itemName", label: "Name (A-Z)" },
                  { value: "dateLostorFound", label: "Date (Newest First)" },
                  { value: "mostRecent", label: "Most Recent Reports" },
                  { value: "dateOldest", label: "Date (Oldest First)" },
                ].map((option) => (
                  <label key={option.value}>
                    <br />
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sort === option.value}
                      onChange={(e) => setSort(e.target.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Display Items */}
        <div className="search-listt">
          {loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p>No items found.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="search-itemm">
                {/* Display the image */}
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
                  className="search-item-imagee"
                  onError={(e) => {
                    e.target.src = placeholderImage; // Fallback to placeholder image
                  }}
                />

                {/* Display item details */}
                <h4>Item: {item.itemName}</h4>
                <p>Location: {item.location}</p>
                <p>
                  Date {item.status === "lost" ? "Lost" : "Found"}:{" "}
                  {new Date(item.dateLostorFound).toLocaleDateString("en-GB")}
                </p>
                <div className="serach-item-actionss">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewItem(item);
                    }}
                    className="view-itemm"
                  >
                    View Lost Item
                  </Link>
                  <Link
                    to="#"
                    onClick={() => alertOwner(item.contactEmail)}
                    className="alert-ownerr"
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
  );
};

export default ItemList;
