import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosInstance from "../services";
import"../css/Login.css"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = async (e) => {
    e.preventDefault();

    await axiosInstance
      .post(
        "https://n-lostfound.onrender.com/user/signup",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          enqueueSnackbar(
            "Sign up successful! Please check your email to verify your account.",
            { variant: "success" }
          );
          navigate("/verify-email");
        } else {
          enqueueSnackbar(response.data.message || "Signup failed.", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar("An error occurred during signup.", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="sign-page">
      <div className="sign-container">
        <h1 className="sign-title">Sign Up</h1>

        <form onSubmit={handleSignUp}>
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
          <div className="sign-input">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "97%" }}
            />
            <label htmlFor="email" className={email ? "active" : ""}>
              Email
            </label>
          </div>
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
          <button type="submit" className="sign-button" style={{ width: 300 }}>
            Sign Up
          </button>
        </form>

        <div>
          <p className="sign-reminder">
            Already have an account? <Link to="/user/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="sign-footer">
        <p>&copy; {new Date().getFullYear()} LostFound. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Signup;
