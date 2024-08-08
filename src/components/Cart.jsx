// src/components/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, isLoading, error, handleRemoveFromCart, handleUpdateQuantity, handleCheckout } = useCart();

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching cart</div>;
  if (!cart.items.length) return <div className="text-center text-gray-500">Your cart is empty.</div>;

  const totalAmount = cart.items.reduce(
    (total, item) => total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckoutClick = async () => {
    const orderId = await handleCheckout();
    if (orderId) {
      navigate(`/order/${orderId}`);
    }
  };

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
          onClick={handleCheckoutClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
