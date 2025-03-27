import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/EditItem.css";
const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    brand: "",
    primaryColor: "",
    secondaryColor: "",
    dateLostorFound: "",
    timeLostorFound: "",
    additionalInfo: "",
    whereLostorFound: "",
    location: "",
    zipcode: "",
    contactFirstName: "",
    contactLastName: "",
    contactPhone: "",
    contactEmail: "",
    subcity: "",
  });

  const submissionType =
    (location?.state && location.state.submissionType) || "Lost";

  // Fetch item data on component mount
  useEffect(() => {
    axios
      .get(`https://n-lostfound.onrender.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const formattedDate = response.data.dateLostorFound
          ? response.data.dateLostorFound.split("T")[0] // Extract YYYY-MM-DD
          : "";

        setFormData({
          ...response.data,
          dateLostorFound: formattedDate, // Use the formatted date
        });
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
        alert("An error happened. Please check the console.");
      });
  }, [id, token]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://n-lostfound.onrender.com/api/items/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Item updated successfully!");
        navigate("/items/user-items");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        alert("An error occurred while updating the item. Please try again.");
      });
  };
  return (
    <div className="edit-Item">
      <form id="itemForm" onSubmit={handleSubmit}>
        <div className="top-form">
          <div>
            <div className="form-group">
              <label htmlFor="itemName">
                {submissionType === "Lost"
                  ? "What was lost *"
                  : "What was found *"}
              </label>{" "}
              <br />
              <p>(document, laptop, Smartphone, Wallet, etc.) ( required).</p>
              <input
                id="itemName"
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label> <br />
              <p>
                (Clothing, Electronics, Personal Accessories etc.) (required)
              </p>
              <input
                id="category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Type of the item or brand</label> <br />
              <p>
                Enter the brand or type of the item .(Leave blank if not
                applicable).
              </p>
              <input
                id="brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="primaryColor">Primary Color *</label> <br />
              <p>
                add the color that best represents the lost property (Black,
                Red, etc.) (required)
              </p>
              <input
                id="primaryColor"
                type="text"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondaryColor">Secondary Color</label> <br />
              <p>
                Please add a color that acts as a less dominant (Leave blank if
                not applicable.)
              </p>
              <input
                id="secondaryColor"
                type="text"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="dateLostorFound">
                {submissionType === "Lost" ? "Date lost *" : "Date found *"}
              </label>
              <br />
              <p>
                Please add the approximate date of when the item was
                {submissionType === "Lost" ? " lost" : " found"}.( required)
              </p>
              <input
                id="dateLostorFound"
                type="date"
                name="dateLostorFound"
                value={formData.dateLostorFound}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeLostorFound">
                {submissionType === "Lost" ? "Time lost*" : "Time found*"}
              </label>
              <br />
              <p>
                Please add the approximate time of day the item was
                {submissionType === "Lost" ? " lost" : " found"}.( required)
              </p>
              <input
                id="timeLostorFound"
                type="time"
                name="timeLostorFound"
                value={formData.timeLostorFound}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo">Additional Info</label> <br />
              <p>
                Please provide any additional details/description of your
                {submissionType === "Lost" ? " lost " : " found "}
                property.(optional)
              </p>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="middle-form">
          <div>
            <div className="form-group">
              <label htmlFor="whereLostorFound">
                Where {submissionType === "Lost" ? "lost" : "found"}*
              </label>
              <br />
              <p>
                Please provide an approximate location of the{" "}
                {submissionType === "Lost" ? "lost" : "found"} property
                (Bar,Park etc.)(required)
              </p>
              <input
                id="whereLostorFound"
                type="text"
                name="whereLostorFound"
                value={formData.whereLostorFound}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subcity">Select Subcity</label> <br />
              <p>Please select your subcity from the list below.</p>
              <select
                id="subcity"
                name="subcity"
                value={formData.subcity}
                onChange={handleChange}
              >
                <option value="">-- Select Subcity --</option>
                <option value="addis_ketema">Addis Ketema</option>
                <option value="akaky_kaliti">Akaky Kaliti</option>
                <option value="arada">Arada</option>
                <option value="bole">Bole</option>
                <option value="gulele">Gulele</option>
                <option value="kirkos">Kirkos</option>
                <option value="kolfe_keranio">Kolfe Keranio</option>
                <option value="lideta">Lideta</option>
                <option value="nifas_silk_lafto">Nifas Silk-Lafto</option>
                <option value="yeka">Yeka</option>
                <option value="lemi_kura">Lemi Kura</option>
              </select>
            </div>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="zipcode">Zip Code</label> <br />
              <p>
                Please provide your zip code(10004, 10028, 10002,
                etc.)(optional)
              </p>
              <input
                id="zipcode"
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="location-map">
          <div className="form-group">
            <label htmlFor="location">Name of the place*</label> <br />
            <p>
              Name or location of the place(snit cafe bole,Gelani cafe bole)
              (required)
            </p>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="bottom-form">
          <div>
            <div className="form-group">
              <label htmlFor="contactFirstName">First Name *</label> <br />
              <p>
                Please enter your first name(This will appear on your
                submission).(required)
              </p>
              <input
                id="contactFirstName"
                type="text"
                name="contactFirstName"
                value={formData.contactFirstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactLastName">Last Name *</label> <br />
              <p>
                Please enter your last name(This will appear on your
                submission).(required)
              </p>
              <input
                id="contactLastName"
                type="text"
                name="contactLastName"
                value={formData.contactLastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="contactPhone">Phone Number *</label> <br />
              <p>
                Please enter the phone number to display on your
                submission.(required)
              </p>
              <input
                id="contactPhone"
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Email Address *</label> <br />
              <p>
                Please enter your email(This will appear on your
                submission).(required)
              </p>
              <input
                id="contactEmail"
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>
            <button className="bttn" type="submit">
              Save Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
