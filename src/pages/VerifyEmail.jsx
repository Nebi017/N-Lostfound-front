import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (!token) {
        alert("Invalid or missing token.");
        navigate("/user/login");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `https://n-lostfound.onrender.com/user/verify-email?token=${token}`
        );

        // Check if the response contains the success message and handle accordingly
        if (response.data.message) {
          toast.success(
            response.data.message || "Email verified! You can now log in."
          );
         navigate("/user/login", { replace: true });
        }
      } catch (error) {
        console.error(error);

        if (error.response) {
          // Backend responded with an error (e.g., 400, 500)
          toast.error(error.response.data.message || "Verification failed");
        } else if (error.request) {
          toast.error(
            error.message || "Network error: Unable to connect to the server."
          );
        } else {
          toast.error(error.message || "An unexpected error occurred.");
        }

        navigate("/user/login"); // Redirect to login page on error
      }
    };

    verify();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
      }}
    >
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
