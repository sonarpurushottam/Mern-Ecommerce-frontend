import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import axiosInstance from "../api/axiosInstance";

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
    } catch (error) {
      console.error("Failed to add address", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutClick = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      const orderId = await handleCheckout(selectedAddress);
      if (orderId) {
        await clearCart(); // Clear the cart after successful checkout
        navigate(`/orders`);
      }
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Address Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Address</h2>
        <select
          value={selectedAddress}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select an address</option>
          {addresses.map((address) => (
            <option key={address._id} value={address._id}>
              {address.street}, {address.city}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowAddAddressForm(!showAddAddressForm)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          {showAddAddressForm ? "Cancel" : "Add New Address"}
        </button>
      </div>

      {/* Add New Address Form */}
      {showAddAddressForm && (
        <form
          onSubmit={handleAddAddressSubmit}
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
              onChange={handleAddAddressChange}
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
              onChange={handleAddAddressChange}
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
              onChange={handleAddAddressChange}
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
              onChange={handleAddAddressChange}
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
              onChange={handleAddAddressChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isDefault">
              Set as Default
            </label>
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={newAddress.isDefault}
              onChange={handleAddAddressChange}
              className="mr-2 leading-tight"
            />
          </div> */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Address"}
            </button>
          </div>
        </form>
      )}

      {/* Cart Items */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
        <ul>
          {cart.items.map((item) => (
            <li key={item._id} className="mb-4">
              <div>{item.productId?.name || "Product Name"}</div>
              <div>Price: ₹{item.productId?.price || 0}</div>
              <div>Quantity: {item.quantity || 0}</div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleCheckoutClick}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
