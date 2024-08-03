// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Error fetching cart");
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCart(response.data);
      toast.success("Cart updated");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Error updating cart");
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCart(response.data);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Error removing item from cart");
    }
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cart.items.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={item.productId.productImage[0]}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                  <p className="text-gray-600">${item.productId.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded-md"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
