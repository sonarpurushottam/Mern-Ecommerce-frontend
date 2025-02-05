import { useState, useEffect } from "react";
import { useUserProfile, useUpdateUserProfile } from "../hooks/useUser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { FaUserCircle, FaFileUpload, FaSpinner } from "react-icons/fa";

const UserProfile = () => {
  const { data, error, isLoading } = useUserProfile();
  const mutation = useUpdateUserProfile();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    profilePic: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const updatedFormData = new FormData();
    updatedFormData.append("username", formData.username);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("mobile", formData.mobile);
    updatedFormData.append("password", formData.password);
    if (file) updatedFormData.append("profilePic", file);

    try {
      await mutation.mutateAsync(updatedFormData);
      queryClient.invalidateQueries(["userProfile"]);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <div className="text-center py-4 text-white">Loading...</div>;
  if (error) {
    toast.error("Error fetching data");
    return <div className="text-center py-4 text-white">Error fetching data</div>;
  }

  return (
    <motion.div
      className="p-8 sm:p-10 bg-gradient-to-br from-black via-gray-900 to-gray-800 shadow-2xl rounded-2xl max-w-lg mx-auto text-white border border-gray-700/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-extrabold text-center mb-6 text-white/90 tracking-wider uppercase">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          {formData.profilePic ? (
            <motion.img
              src={formData.profilePic}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-cyan-500 shadow-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <FaUserCircle className="text-cyan-400 text-8xl" />
          )}
          <label className="mt-4 flex items-center gap-3 cursor-pointer bg-cyan-600/70 px-5 py-3 rounded-lg hover:bg-cyan-500 transition text-white/90 font-semibold shadow-md">
            <FaFileUpload />
            <span>Upload Profile Picture</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {["username", "email", "mobile"].map((field) => (
          <div key={field}>
            <label className="block text-white/80 mb-2 capitalize tracking-wide font-medium">{field}:</label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-400 hover:border-cyan-400 transition"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        <motion.button
          type="submit"
          className="w-full px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-transform transform hover:scale-105 flex items-center justify-center shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : "Update Profile"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UserProfile;
