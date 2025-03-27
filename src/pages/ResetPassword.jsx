import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import useSnackbar
import "../css/ForgotAndReset.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Initialize enqueueSnackbar

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Token:", token); // Log the token being sent

    try {
      const response = await axios.post(
        `https://n-lostfound.onrender.com/user/reset-password/${token}`,
        {
          password,
        }
      );

      // Display success message using enqueueSnackbar
      enqueueSnackbar(response.data.message, { variant: "success" });

      // Redirect to sign-in after 3 seconds
      setTimeout(() => navigate("/user/login"), 3000);
    } catch (error) {
      // Display error message using enqueueSnackbar
      enqueueSnackbar("Error resetting password. Please try again.", {
        variant: "error",
      });
      console.error("Error resetting password:", error.response?.data); // Log the error response
    }
  };

  return (
    <div className="forgot-page">
      <div className="auth-container">
        <h2>Reset Password</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <p className="back-to-login">
          <Link to="/signin">Back to Sign In ?</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
