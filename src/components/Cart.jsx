import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../hooks/useCart";
import { motion } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    isLoading,
    error,
    handleRemoveFromCart,
    handleUpdateQuantity,
  } = useCart();

  if (isLoading)
    return <div className="text-center text-gray-400 text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 text-lg">Error fetching cart</div>;

  if (!cart || !cart.items || cart.items.length === 0)
    return <div className="text-center text-gray-400 text-lg">Your cart is empty.</div>;

  const totalAmount = cart.items.reduce(
    (total, item) => total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>
      <ul className="space-y-4">
        {cart.items.map((item) => (
          <motion.li
            key={item._id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 w-1/2">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-600">
                <img
                  className="h-full w-full object-contain"
                  src={item.productId?.productImage?.[0] || "/default_image_url.png"}
                  alt={item.productId?.name || "Product Image"}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.productId?.name || "Product Name"}</h3>
                <p className="text-gray-400">Price: ₹{item.productId?.price || 0}</p>
                <p className="text-gray-400">Subtotal: ₹{(item.productId?.price * (item.quantity || 0)).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpdateQuantity(item._id, (item.quantity || 1) - 1)}
                className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity || 0}</span>
              <button
                onClick={() => handleUpdateQuantity(item._id, (item.quantity || 1) + 1)}
                className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="text-red-400 hover:text-red-500"
              >
                <AiOutlineDelete size={22} />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</p>
        <motion.button
          onClick={handleCheckoutClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Cart;
