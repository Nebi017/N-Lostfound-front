import React, { useState } from "react";
import axios from "axios";
import "../css/ContsctForm.css";
import { useSnackbar } from "notistack";
import { FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        `https://n-lostfound.onrender.com/api/contact`,
        formData
      );

      if (response.status === 201) {
        setResponseMessage("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          message: "",
        });
        enqueueSnackbar(
          response.data.message || "Your Messsage submitted successfully!",
          {
            variant: "success",
          }
        );
      } else {
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponseMessage(
        "Failed to send message. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wholee">
      <h1>Get in Touch with Us</h1>
      <p>
        We’re here to answer any questions and assist you
        in any way possible.
      </p>
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-icon">
            <div className="iconn-back">
              <FaEnvelope className="iconn" />
            </div>
            <div>
              <h3>Email</h3>
              <p>Wedizere123@gmail.com</p>
            </div>
          </div>
          <div className="contact-icon">
            <div className="iconn-back">
              <FaHome className="iconn" />{" "}
            </div>
            <div>
              <h3>Address</h3>
              <p>Addis Ababa,Ethiopia</p>
            </div>
          </div>
          <div className="contact-icon">
            <div className="iconn-back">
              <FaPhoneAlt className="iconn" />
            </div>

            <div>
              <h3>Phone</h3>
              <p>+251976205277</p>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="flex">
            <label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input"
              />
              <span>First Name</span>
            </label>

            <label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />
              <span>Last Name</span>
            </label>
          </div>

          <label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />
            <span>Email</span>
          </label>

          <label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="input"
            />
            <span>Contact Number</span>
          </label>

          <label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="3"
              className="input01"
            ></textarea>
            <span>Message</span>
          </label>

          <button className="fancy" type="submit" disabled={loading}>
            <span className="top-key"></span>
            <span className="text">{loading ? "Sending..." : "Submit"}</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>

          {responseMessage && (
            <p className="response-message">{responseMessage}</p>
          )}
        </form>
      </div>
      {/* <Report /> */}
    </div>
  );
};

export default ContactForm;
