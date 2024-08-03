import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    profilePic: "",
  });
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

   // Fetch user profile data when component mounts
   useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched user data:", data); // Log data for debugging

        // Update state with the fetched data
        setUserData({
          username: data.username || "",
          email: data.email || "",
          mobile: data.mobile || "",
          password: "",
          profilePic: data.profilePic || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrorMessage("Error fetching user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("mobile", userData.mobile);
    formData.append("password", userData.password);
    if (file) {
      formData.append("profilePic", file);
    }

    try {
      await axios.put("http://localhost:5000/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccessMessage("Profile updated successfully!");
      // Reload the user data
      const { data } = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserData(data);
    } catch (error) {
      setErrorMessage("Error updating profile.");
      console.error("Error:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token"); // Remove token from local storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="">shubham</label>
            </div>
            <div>
                <label htmlFor="">shubham</label>
            </div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleFileChange} />
          {userData.profilePic && (
            <img src={userData.profilePic} alt="Profile" style={{ width: "100px", height: "100px" }} />
          )}
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
