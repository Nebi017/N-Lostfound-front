import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import useSnackbar
import "../css/ForgotAndReset.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Initialize enqueueSnackbar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://n-lostfound.onrender.com/user/forgot-password",
        { email }
      );

      // Display success message using enqueueSnackbar
      enqueueSnackbar(response.data.message, { variant: "success" });

      // Redirect to sign-in after 3 seconds
      setTimeout(() => navigate("/user/login"), 3000);
    } catch (error) {
      // Display error message using enqueueSnackbar
      enqueueSnackbar("Error sending reset email. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="forgot-page">
      <div className="auth-container">
        <h2>Forgot Password</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <p className="back-to-login">
          Remember your password? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
