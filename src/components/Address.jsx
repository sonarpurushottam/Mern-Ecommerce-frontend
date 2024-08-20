import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import ConfirmationModal from "./ConfirmationModal";

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
        await axiosInstance.put(`/addresses/${editingId}`, newAddress);
        toast.success("Address updated successfully!");
      } else {
        if (newAddress.isDefault) {
          await axiosInstance.patch("/addresses/set-default", {
            addressId: null,
          });
        }
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
      fetchAddresses();
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
      console.error(
        "Error deleting address:",
        error.response ? error.response.data : error.message
      );
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

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Manage Addresses</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="street"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={newAddress.street}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={newAddress.city}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={newAddress.state}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="postalCode"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={newAddress.postalCode}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={newAddress.country}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="isDefault"
          >
            Set as Default
          </label>
          <input
            type="checkbox"
            id="isDefault"
            name="isDefault"
            checked={newAddress.isDefault}
            onChange={handleInputChange}
            className="mr-2 leading-tight"
          />
        </div> */}
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Saving..." : editing ? "Update Address" : "Add Address"}
          </motion.button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <motion.div
            key={address._id}
            className="bg-white shadow-md rounded p-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <h2 className="text-lg font-bold mb-2">{address.street}</h2>
            <p>{`${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}</p>
            {/* <p className="mt-2">
              <strong>Default:</strong> {address.isDefault ? "Yes" : "No"}
            </p> */}
            <div className="flex mt-4">
              <button
                onClick={() => handleEdit(address)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(address._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this address?"
      />
    </div>
  );
};

export default Address;
