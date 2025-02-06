import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../hooks/useCart";
import { motion } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, isLoading, error, handleRemoveFromCart, handleUpdateQuantity } =
    useCart();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Error fetching cart
      </div>
    );

  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
        Your cart is empty.
      </div>
    );

  const totalAmount = cart.items.reduce(
    (total, item) =>
      total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        Your Shopping Cart
      </h2>
      <ul className="space-y-6">
        {cart.items.map((item) => (
          <motion.li
            key={item._id}
            className="flex items-center justify-between p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-6 w-1/2">
              <div className="h-28 w-28 flex-shrink-0 rounded-xl border-2 border-gray-700 bg-gray-900 flex items-center justify-center overflow-hidden">
                <img
                  className="h-auto w-auto max-h-full max-w-full object-contain"
                  src={
                    item.productId?.productImage?.[0] ||
                    "/default_image_url.png"
                  }
                  alt={item.productId?.name || "Product Image"}
                  onError={(e) => {
                    e.target.src = "/default_image_url.png";
                  }}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-100">
                  {item.productId?.name || "Product Name"}
                </h3>
                <p className="text-gray-400">
                  Price: ₹{item.productId?.price || 0}
                </p>
                <p className="text-gray-400">
                  Subtotal: ₹
                  {(item.productId?.price * (item.quantity || 0)).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  handleUpdateQuantity(item._id, (item.quantity || 1) - 1)
                }
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="text-lg font-semibold text-gray-100">
                {item.quantity || 0}
              </span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item._id, (item.quantity || 1) + 1)
                }
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="p-2 text-red-400 hover:text-red-500 hover:bg-red-900 rounded-lg transition-all duration-200"
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-8 border-t border-gray-700 pt-6">
        <p className="text-2xl font-bold text-gray-100">
          Total: ₹{totalAmount.toFixed(2)}
        </p>
        <motion.button
          onClick={handleCheckoutClick}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Cart;
