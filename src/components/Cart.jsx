import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../hooks/useCart";

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
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error fetching cart</div>;

  // Check if cart exists and has items
  if (!cart || !cart.items || cart.items.length === 0)
    return <div className="text-center text-gray-500">Your cart is empty.</div>;

  const totalAmount = cart.items.reduce(
    (total, item) =>
      total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cart.items.map((item) => (
          <li
            key={item._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 bg-white rounded-lg shadow-md mb-4"
          >
            <div className="flex items-start sm:items-center w-full">
              <img
                className="h-24 w-24 sm:h-32 sm:w-32 object-cover mr-4"
                src={
                  item.productId?.productImage?.[0] || "/default_image_url.png"
                }
                alt={item.productId?.name || "Product Image"}
              />
              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {item.productId?.name || "Product Name"}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Price: ₹{item.productId?.price || 0}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Subtotal: ₹
                  {(item.productId?.price * (item.quantity || 0)).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, (item.quantity || 1) - 1)
                    }
                    className="bg-gray-200 px-3 py-1 rounded text-sm"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity || 0}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, (item.quantity || 1) + 1)
                    }
                    className="bg-gray-200 px-3 py-1 rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                className="mt-4 sm:mt-0 text-red-500 hover:text-red-600"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right mt-6">
        <p className="text-lg sm:text-xl font-semibold">
          Total: ₹{totalAmount.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleCheckoutClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
