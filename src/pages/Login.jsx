import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosInstance from "../services";
import "../css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    axiosInstance
      .post("https://n-lostfound.onrender.com/user/signin", {
        username,
        password,
      })
      .then((response) => {
        const { token, username, role } = response.data; // Get role from backend response

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("role", role); // Store role

          console.log("Logged in as:", username, "Role:", role);
          enqueueSnackbar("Login successful", { variant: "success" });

          // Check if there is a stored redirect path
          const redirectData = localStorage.getItem("redirectPath");
          if (redirectData) {
            try {
              const { path, state = {} } = JSON.parse(redirectData); // Ensure state is always an object
              localStorage.removeItem("redirectPath"); // Remove the redirect path after use
              navigate(path, { state: { ...state, username, role } });
            } catch (error) {
              console.error("Error parsing redirectData:", error);
              // If parsing fails, fallback to role-based navigation
              navigate(role === "admin" ? "/admin-dashboard" : "/", {
                state: { username, role },
              });
            }
          } else {
            // Default redirection based on role
            navigate(role === "admin" ? "/admin-dashboard" : "/", {
              state: { username, role },
            });
          }
        } else {
          enqueueSnackbar("Invalid login response", { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data?.message || "Login failed", {
          variant: "error",
        });
        console.error("Login error:", error);
      });
  };

  return (
    <div className="sign-page">
      <div className="sign-container">
        <h1 className="sign-title">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="sign-input">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username" className={username ? "active" : ""}>
              Username
            </label>
          </div>

          {/* Password Input */}
          <div className="sign-input">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className={password ? "active" : ""}>
              Password
            </label>
          </div>
          <Link className="linkk" to="/forgot-password">
            Forgot Password?
          </Link>
          <br />
          <button type="submit" className="sign-button" style={{ width: 300 }}>
            Sign In
          </button>
        </form>
        <div>
          <p className="sign-reminder">
            Don't have an account? <Link to="/user/signup">Sign up</Link>
          </p>
        </div>
      </div>

      <div className="sign-footer">
        <p>&copy; {new Date().getFullYear()} LostFound. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Login;
