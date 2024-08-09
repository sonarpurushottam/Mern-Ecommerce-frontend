import React, { useState, useEffect } from "react";
import { useUserProfile, useUpdateUserProfile } from "../hooks/useUser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username || "",
        email: data.email || "",
        mobile: data.mobile || "",
        profilePic: data.profilePic || "",
        password: "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

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

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) {
    toast.error("Error fetching data");
    return <div className="text-center py-4">Error fetching data</div>;
  }

  return (
    <motion.div
      className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center mb-4">
          <label className="block text-gray-700 mr-4">Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block text-sm text-gray-500"
          />
        </div>
        {formData.profilePic && (
          <div className="flex justify-center mb-4">
            <motion.img
              src={formData.profilePic}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border border-gray-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="mt-1 text-blue-500 hover:text-blue-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Update Profile
        </button>
      </form>
    </motion.div>
  );
};

export default UserProfile;
