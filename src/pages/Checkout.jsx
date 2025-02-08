import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";
import { FiMapPin, FiPlus, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, handleCheckout, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data } = await axiosInstance.get("/addresses");
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleAddAddressChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newAddress.isDefault) {
        await axiosInstance.patch("/addresses/set-default", {
          addressId: null,
        });
      }
      await axiosInstance.post("/addresses", newAddress);
      fetchAddresses();
      setNewAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      });
      setShowAddAddressForm(false);
      toast.success("Address added successfully!");
    } catch (error) {
      console.error("Failed to add address", error);
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutClick = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    try {
      const orderId = await handleCheckout(selectedAddress);
      if (orderId) {
        await clearCart();
        navigate(`/orders`);
        toast.success("Order placed successfully!");
      }
    } catch (error) {
      console.error("Checkout failed", error);
      toast.error("Checkout failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl shadow-2xl"
    >
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Checkout
      </h1>

      {/* Address Selection */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FiMapPin className="text-xl text-purple-400" />
          <h2 className="text-xl font-semibold">Shipping Address</h2>
        </div>

        <motion.select
          value={selectedAddress}
          onChange={handleAddressChange}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          whileHover={{ scale: 1.01 }}
        >
          <option value="">Select an address</option>
          {addresses.map((address) => (
            <option key={address._id} value={address._id}>
              {address.street}, {address.city}, {address.state} -{" "}
              {address.postalCode}
            </option>
          ))}
        </motion.select>

        <motion.button
          onClick={() => setShowAddAddressForm(!showAddAddressForm)}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <FiPlus className="text-lg" />
          {showAddAddressForm ? "Cancel" : "Add New Address"}
        </motion.button>
      </div>

      {/* Add New Address Form */}
      {showAddAddressForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleAddAddressSubmit}
          className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleAddAddressChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                City
              </label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleAddAddressChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                State
              </label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleAddAddressChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleAddAddressChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={newAddress.country}
                onChange={handleAddAddressChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            {/* <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={handleAddAddressChange}
                className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-300">
                Set as default address
              </label>
            </div> */}
          </div>
          <div className="mt-6 flex justify-end">
            <motion.button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin">🌀</span>
                  Adding...
                </>
              ) : (
                "Save Address"
              )}
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Cart Items */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.items.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-700 overflow-hidden">
                  <img
                    src={
                      item.productId?.productImage?.[0] ||
                      "/default_image_url.png"
                    }
                    alt={item.productId?.name}
                    className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{item.productId?.name}</h3>
                  <p className="text-sm text-gray-400">
                    ₹{item.productId?.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">
                ₹{(item.productId?.price * item.quantity).toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <motion.button
          onClick={handleCheckoutClick}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Confirm Order
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Checkout;
