import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Report.css";
import { toast } from "react-toastify";


const Report = () => {
  const navigate = useNavigate();
  const handleButtonClick = (type) => {
    const user = localStorage.getItem("token"); // Check if user is logged in

    if (!user) {
      toast.warning("Please sign in to submit an item."); // Show toast notification
      localStorage.setItem(
        "redirectPath",
        JSON.stringify({
          path: "/items/submit",
          state: { submissionType: type },
        })
      );
      navigate("/user/login"); 
    } else {
      navigate("/items/submit", { state: { submissionType: type } });
    }
  };
  return (
    <div className="report-content">
      <div className="report-title">
        <h1>Report Your Item ?</h1>
      </div>
      <div className="report-btn">
        <div>
          <button onClick={() => handleButtonClick("Lost")}>
             I  Lost 
          </button>
        </div>
        <div>
          <button onClick={() => handleButtonClick("Found")}>
            I'VE   FOUND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
