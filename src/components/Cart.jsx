import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
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

  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item._id !== itemId),
      }));

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Error removing item from cart");
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 0) return;

    try {
      const updatedItems = cart.items.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );

      await axios.put(
        "http://localhost:5000/api/cart",
        { items: updatedItems },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCart((prevCart) => ({
        ...prevCart,
        items: updatedItems.filter((item) => item.quantity > 0),
      }));

      toast.success("Cart updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating quantity");
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        { items: cart.items },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/order");
      toast.success("Checkout successful. Redirecting to order page.");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Error during checkout");
    }
  };

  if (!cart.items.length) {
    return <div className="text-center text-gray-500">Your cart is empty.</div>;
  }

  const totalAmount = cart.items.reduce(
    (total, item) =>
      total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cart.items.map((item) => (
          <li key={item._id} className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                className="h-20 w-20 object-cover mr-4"
                src={
                  item.productId?.productImage?.[0] || "/default_image_url.png"
                }
                alt={item.productId?.name || "Product Image"}
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {item.productId?.name || "Product Name"}
                </h3>
                <p>Price: ₹{item.productId?.price || 0}</p>
                <p>
                  Subtotal: ₹
                  {(item.productId?.price * (item.quantity || 0)).toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, (item.quantity || 1) - 1)
                    }
                    className="bg-gray-200 px-2 py-1 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity || 0}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, (item.quantity || 1) + 1)
                    }
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item._id)}
              className="text-red-500"
            >
              <AiOutlineDelete />
            </button>
          </li>
        ))}
      </ul>
      <div className="text-right mt-4">
        <p className="text-lg font-semibold">
          Total: ₹{totalAmount.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
