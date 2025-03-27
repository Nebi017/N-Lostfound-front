import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "../css/backButton.css";

const BackButton = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="flex">
      <button onClick={() => navigate(-1)} className="btnn">
        <BsArrowLeft className="text-2x1" />
      </button>
    </div>
  );
};

export default BackButton;
