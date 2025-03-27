import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, redirecting to login.");
        navigate("/user/login"); // Redirect if no token
        return;
      }

      try {
        const response = await axios.get(
          "https://n-lostfound.onrender.com/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);

        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/user/login");
        }

        setUsers([]); // Ensure users is always an array
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleManageUser = (userId) => {
    navigate(`/manage-user/${userId}`);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      {users.length > 0 ? (
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th className="border">No</th>
              <th className="border">Username</th>
              <th className="border">Email</th>
              <th className="border">Role</th>
              <th className="border">Last Login</th>
              <th className="border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="h-8">
                <td className="border">{index + 1}</td>
                <td className="border">{user.username}</td>
                <td className="border">{user.email}</td>
                <td className="border">{user.role}</td>
                <td className="border">
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border">
                  <button
                    className="manage-button"
                    onClick={() => handleManageUser(user._id)}
                  >
                    Manage User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
