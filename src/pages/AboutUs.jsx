import React from 'react'
import "../css/AboutUs.css";
import { useNavigate } from 'react-router-dom';
import myImage2 from "../assets/photose/sadImage3.png";
import HowWeWork from '../components/HowWeWork';
import TipInfo from '../components/TipInfo';
import Report from '../components/Report';

const AboutUs = () => {
  const navigate = useNavigate();
  function handleClick(){
    navigate("/contact")
  }
  return (
    <div className="about-us">
      <h1>You Want To Know Something About Us ?</h1>
      <div className="about-container">
        <div className="about-image">
          <img src={myImage2} alt="" />
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Welcome to LostFound, your trusted platform for reconnecting lost
            items with their rightful owners. We understand how frustrating it
            can be to lose something valuable or find an item without knowing
            where to return it. That’s why we’ve created a simple and effective
            way to report lost and found items within Addis Ababa. Our mission
            is to help people recover lost belongings quickly and efficiently by
            providing a safe, organized, and user-friendly platform. Whether
            you’ve misplaced something or discovered an item, our system makes
            it easy to report, search, and connect with the right person.
          </p>
          <h2>Why Choose Us?</h2>
          <ul>
            <li> Easy to Use – Post lost or found items in minutes</li>
            <li>Secure and Reliable – Verified user details ensure safety</li>
            <li>
              Community-Powered – Helping people connect and recover their
              belongings
            </li>
            <li>
              Fast Matching System – Our platform makes it easier to find lost
              items
            </li>
          </ul>
          <p>
            At LostFound , we believe in kindness, honesty, and helping others.
            Together, we can make a difference by bringing lost items back to
            their owners.
          </p>
          <div>
            <button className="about-button" onClick={handleClick}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Report />
      <HowWeWork />
      <TipInfo />
    </div>
  );
}

export default AboutUs