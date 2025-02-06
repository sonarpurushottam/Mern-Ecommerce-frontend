import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { FaEdit, FaTrash } from "react-icons/fa"; // Using React Icons
import ConfirmationModal from "./ConfirmationModal"; // Updated Modal

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data } = await axiosInstance.get("/addresses");
      setAddresses(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch addresses");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        // Update address
        await axiosInstance.put(`/addresses/${editingId}`, newAddress);
        toast.success("Address updated successfully!");
      } else {
        // Add new address
        await axiosInstance.post("/addresses", newAddress);
        toast.success("Address added successfully!");
      }
      setNewAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      });
      setEditing(false);
      setEditingId(null);
      setShowForm(false); // Close the form after submit
      fetchAddresses(); // Refresh the address list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setNewAddress({
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setEditing(true);
    setEditingId(address._id);
    setShowForm(true); // Open the form for editing
  };

  const handleDeleteClick = (id) => {
    setAddressToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete) return;
    try {
      await axiosInstance.delete(`/addresses/${addressToDelete}`);
      toast.success("Address deleted successfully!");
      fetchAddresses(); // Refresh the address list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete address");
    } finally {
      setIsModalOpen(false);
      setAddressToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setAddressToDelete(null);
  };

  // Cancel button handler to reset form and close
  const handleCancelForm = () => {
    setShowForm(false);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false,
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-8 text-white">
      <Toaster />

      <h1 className="text-4xl font-bold mb-6">Manage Addresses</h1>

      {/* Add/Edit Address Form Button */}
      <div className="mb-8 w-full flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditing(false);
            setNewAddress({
              street: "",
              city: "",
              state: "",
              postalCode: "",
              country: "",
              isDefault: false,
            });
            setShowForm(true); // Show the form
          }}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700"
        >
          Add New Address
        </motion.button>
      </div>

      {/* Address Form (Modal) */}
      <div
        className={`w-full max-w-lg p-6 rounded-lg shadow-lg ${
          showForm ? "block" : "hidden"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {["street", "city", "state", "postalCode", "country"].map((field) => (
            <div key={field}>
              <label className="text-sm font-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={newAddress[field]}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-600 p-3 rounded-lg mt-2 text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editing
                ? "Update Address"
                : "Add Address"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleCancelForm}
              className="bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>

      {/* Address List */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((address) => (
          <motion.div
            key={address._id}
            className="bg-gray-800 p-6 rounded-lg shadow-xl hover:bg-gray-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 className="text-xl font-semibold mb-3">{address.street}</h3>
            <p>{`${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}</p>
            <div className="flex justify-between items-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(address)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-yellow-600"
              >
                <FaEdit className="w-5 h-5 mr-2" />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDeleteClick(address._id)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-red-700"
              >
                <FaTrash className="w-5 h-5 mr-2" />
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <div
        className={`fixed inset-0 flex justify-center items-center z-50 ${
          isModalOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="bg-gray-800 bg-opacity-70 w-full h-full absolute top-0 left-0"
          onClick={handleCancelDelete}
        ></div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 z-10">
          <h2 className="text-xl font-semibold mb-4 text-center text-white">
            Delete Address
          </h2>
          <p className="text-white text-center mb-6">
            Are you sure you want to delete this address? This action cannot be
            undone.
          </p>
          <div className="flex justify-around">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700"
            >
              Yes, Delete
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancelDelete}
              className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
