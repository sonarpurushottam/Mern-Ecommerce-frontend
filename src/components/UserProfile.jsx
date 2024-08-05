import React, { useState, useEffect } from "react";
import { useUserProfile, useUpdateUserProfile } from "../hooks/useUser"; // Adjust the path if necessary
import toast from "react-hot-toast";

const UserProfile = () => {
  const { data, error, isLoading } = useUserProfile();
  const mutation = useUpdateUserProfile();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    profilePic: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  // Update formData when data changes
  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username || "",
        email: data.email || "",
        mobile: data.mobile || "",
        profilePic: data.profilePic || "",
        password: "", // Password should not be populated from the server
      });
    }
  }, [data]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle password visibility
  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append("username", formData.username);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("mobile", formData.mobile);
    updatedFormData.append("password", formData.password);
    if (file) updatedFormData.append("profilePic", file);

    try {
      await mutation.mutateAsync(updatedFormData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    toast.error("Error fetching data");
    return <div>Error fetching data</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
          {formData.profilePic ? (
            <img
              src={formData.profilePic}
              alt="Profile"
              className="mt-2 w-24 h-24 object-cover rounded-full border"
            />
          ) : (
            <div className="mt-2 text-gray-500">
              No profile picture available
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="mt-1 text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
