import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import myimage from "../assets/photose/sad.png";
import TipInfo from "../components/TipInfo";
import React from "react";
import ViewRecentItems from "../components/ViewRecentItems.jsx";
import Report from "../components/Report.jsx";
import { toast } from "react-toastify";
import HowWeWork from "../components/HowWeWork.jsx";

const Home = () => {
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
      navigate("/user/login"); // Redirect to Sign-In page
    } else {
      navigate("/items/submit", { state: { submissionType: type } });
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <div className="hero-title">
            <h1>
              Your lost belongings <br /> deserve a way back home. <br />
              let’s make it happen!
            </h1>
          </div>
          <div className="report-btns">
            <div>
              <button onClick={() => handleButtonClick("Lost")}>
                Submit Lost Item
              </button>
            </div>
            <div>
              <button onClick={() => handleButtonClick("Found")}>
                Submit Found Item
              </button>
            </div>
          </div>
        </div>
        <div className="image">
          <img src={myimage} alt="" />
        </div>
      </div>

      <div>
        <HowWeWork />
      </div>
      <div>
        <TipInfo />
        {/* <SearchAndFilter /> */}
      </div>
      <ViewRecentItems />
      <Report />
    </div>
  );
};

export default Home;
