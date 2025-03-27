import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import "../css/DeleteItem.css"
const DeleteItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    const token = localStorage.getItem("token");

    axios
      .delete(`https://n-lostfound.onrender.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/items/user-items");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="delete-page">
        <BackButton />
        <div className="delete">
            <div className="delete-item">
                <h5 className="delete-title">
                  Are You Sure You Want to delete this Item?
                </h5>
                <button className="delete-button" onClick={handleDeleteBook}>
                  Yes, Delete it
                </button>
              </div>
        </div>
        </div>
      </div>
    
  );
};

export default DeleteItem;
