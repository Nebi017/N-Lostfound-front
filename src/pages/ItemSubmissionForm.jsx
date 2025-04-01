import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import "../css/ItemSubmissionForm.css";
import TipInfo from "../components/TipInfo";
import GoogleMapViewer from "../components/GoogleMapViewer";
import BackButton from "../components/BackButton";

const ItemSubmissionForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const submissionType = location.state?.submissionType || "Lost";
  const [imagePreview, setImagePreview] = useState(null);
  
  const initialFormData = {
    itemName: "",
    category: "",
    brand: "",
    primaryColor: "",
    secondaryColor: "",
    dateLostorFound: "",
    timeLostorFound: "",
    image: "", // Cloudinary image URL
    additionalInfo: "",
    whereLostorFound: "",
    location: "",
    zipcode: "",
    contactFirstName: "",
    contactLastName: "",
    contactPhone: "",
    contactEmail: "",
    status: submissionType.toLowerCase(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "NebiyZ"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmezexlow/image/upload", // Replace with your Cloudinary cloud name
        formData
      );

      setFormData((prevData) => ({ ...prevData, image: response.data.secure_url }));
      setImagePreview(response.data.secure_url);
    } catch (error) {
      enqueueSnackbar("Error uploading image. Please try again.", { variant: "error" });
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prevData) => ({ ...prevData, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id || decodedToken._id;
      
      const response = await axios.post(
        "https://n-lostfound.onrender.com/api/items",
        { ...formData, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      enqueueSnackbar(response.data.message || "Item submitted successfully!", { variant: "success" });
      navigate("/items/user-items");
      setFormData(initialFormData);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Error submitting item.", { variant: "error" });
    }
  };
  return (
    <>
      <div className="formm">
        <BackButton />
        <h2>
          {submissionType === "Lost" ? "Submit Lost Item" : "Submit Found Item"}
        </h2>
        <ul>
          <li>Our team carefully reviews and matches lost and found items.</li>
          <li>Get notified when a potential match is found.</li>
          <li>Join us in reuniting belongings with their owners!</li>
        </ul>
        <form onSubmit={handleSubmit} id="itemForm">
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
                  placeholder="Item Name"
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
                  placeholder="Enter Category"
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
                  placeholder="Enter Brand or Type"
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
                  placeholder="Primary Color"
                  value={formData.primaryColor}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="secondaryColor">Secondary Color</label> <br />
                <p>
                  Please add a color that acts as a less dominant (Leave blank
                  if not applicable.)
                </p>
                <input
                  id="secondaryColor"
                  type="text"
                  name="secondaryColor"
                  placeholder="Secondary Color"
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
      <label htmlFor="image">Upload Image</label> <br />
      <p>(This image will display on the Website.)(optional)</p>
      <div>
        {imagePreview ? (
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", height: "200px", display: "block" }}
            />
            <button
              onClick={handleRemoveImage}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              ✖
            </button>
          </div>
        ) : (
          <div>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <label
              htmlFor="image"
              style={{
                display: "block",
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
                border: "2px dashed black",
                maxWidth: "70%",
                height: "200px",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                padding: "10px",
              }}
            >
              <i
                className="fas fa-upload"
                style={{ position: "absolute", top: "10px", right: "10px", fontSize: "20px", color: "gray" }}
              ></i>{" "}
              Upload
            </label>
          </div>
        )}
      </div>
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
                  placeholder="Additional Info"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          {submissionType === "Lost" ? <TipInfo /> : " "}

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
                  placeholder="Enter Location"
                  value={formData.whereLostorFound}
                  onChange={handleChange} // Update formData
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
                  placeholder="Zip Code"
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
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <GoogleMapViewer />
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
                  placeholder="First Name"
                  value={formData.contactFirstName}
                  onChange={handleChange}
                  required
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
                  placeholder="Last Name"
                  value={formData.contactLastName}
                  onChange={handleChange}
                  required
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
                  placeholder="Phone Number"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
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
                  placeholder="Email Address"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="bttn">
                {submissionType === "Lost" ? "Submit Item" : "Publish Item"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItemSubmissionForm;
