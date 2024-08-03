// src/components/UserManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    profilePic: null,
  });
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle form submit for user registration or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }

    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/users/profile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("User updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("User registered successfully");
      }
      fetchUsers();
      setUser({
        username: "",
        email: "",
        password: "",
        mobile: "",
        profilePic: null,
      });
      setEditingUser(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  // Handle user editing
  const handleEdit = (user) => {
    setUser(user);
    setEditingUser(user._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {editingUser ? "Edit User" : "Register New User"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Profile Picture:</label>
          <input
            type="file"
            name="profilePic"
            onChange={handleChange}
            className="border px-2 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingUser ? "Update User" : "Register User"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">User List</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{user.username}</p>
              <p>{user.email}</p>
              <p>{user.mobile}</p>
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-16 h-16 object-cover rounded-full mt-2"
                />
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
