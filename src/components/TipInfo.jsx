import React from "react";
import "../css/TipInfo.css";
import { useState,useEffect } from "react";

const TipInfo = () => {
  const [bulbOn, setBulbOn] = useState(true);
  // Toggle bulb on/off every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBulbOn((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="tip-info">
      <div className="info-card">
        <i
          className={`fas fa-lightbulb ${bulbOn ? "bulb-on" : "bulb-off"}`}
        ></i>
        <div className="text">
          <h3>You should know</h3>
          <p>
            If you add a photo to your report, you increase{" "}
            <span className="highlight">by more than 50%</span> your chances of
            finding your lost item.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipInfo;
