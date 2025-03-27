import { FaClipboardList, FaUserShield, FaHandshake } from "react-icons/fa";
import arrowImage from "../assets/photose/next.png";
import "../css/Home.css";
import React, { useEffect, useRef } from "react";


const HowWeWork = () => {
  const stepsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    // Observe each step
    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    // Cleanup observer on unmount
    return () => {
      stepsRef.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);
  return (
    <div>
      <section className="how-it-works">
        <h2>HOW WE HELP YOU</h2>
        <p className="subtitle">How it works</p>

        <div className="steps">
          <div
            className="step fade-in"
            ref={(el) => (stepsRef.current[0] = el)}
          >
            <div className="icon">
              <FaClipboardList />
            </div>
            <h3>Report a lost or found item</h3>
            <p>
              Fill the declaration and give as much detail as possible (the
              location of loss, the type of item, the description) to help the
              us identify it quickly.
            </p>
          </div>

          <div className="arrow-image">
            <div className="image">
              <img src={arrowImage} alt="" />
            </div>
          </div>

          <div
            className="step fade-in"
            ref={(el) => (stepsRef.current[1] = el)}
          >
            <div className="icon">
              <FaUserShield />
            </div>
            <h3>Prove ownership of the item</h3>
            <p>
              Once the lost item "matched," prove who you are thanks to a
              security question (ex: describe the shell of your phone, ...).
              Then, our partner who found this item will be able to validate
              that this is yours.
            </p>
          </div>

          <div className="arrow-image">
            <div className="image">
              <img src={arrowImage} alt="" />
            </div>
          </div>

          <div
            className="step fade-in"
            ref={(el) => (stepsRef.current[2] = el)}
          >
            <div className="icon">
              <FaHandshake />
            </div>
            <h3>Get it back!</h3>
            <p>
              As soon as you are authenticated, you receive the information to
              pick it up or have it delivered. Remember to communicate the
              reference's number found.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowWeWork;
