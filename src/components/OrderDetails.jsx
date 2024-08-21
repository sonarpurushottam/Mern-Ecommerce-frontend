
import { useNavigate, useParams } from "react-router-dom";
import {
  useOrder,
  useUpdateOrderStatus,
  useDeleteOrder,
} from "../hooks/useOrders";
import { toast } from "react-hot-toast";
import { formatDate } from "../utils/formatDate";
import { motion } from "framer-motion";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useOrder(id);
  const updateOrderStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();
  const navigate = useNavigate();

  const handleStatusChange = (newStatus) => {
    updateOrderStatus.mutate(
      { orderId: id, status: newStatus },
      {
        onSuccess: () => toast.success("Order status updated"),
        onError: (error) =>
          toast.error(`Error updating status: ${error.message}`),
      }
    );
  };

  const handleDeleteOrder = () => {
    deleteOrder.mutate(id, {
      onSuccess: () => {
        toast.success("Order deleted");
        navigate("/orders");
      },
      onError: (error) => toast.error(`Error deleting order: ${error.message}`),
    });
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500">Loading order details...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">
        Error loading order details: {error.message}
      </p>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-4">Order Details</h2>
        <p>
          <strong className="font-medium">Order ID:</strong> {order._id}
        </p>
        <p>
          <strong className="font-medium">Date:</strong>{" "}
          {formatDate(order.createdAt)}
        </p>
        <p>
          <strong className="font-medium">Status:</strong>
          <span
            className={`px-3 py-1 rounded-full text-white ${
              order.status === "Shipped"
                ? "bg-blue-500"
                : order.status === "Delivered"
                ? "bg-green-500"
                : order.status === "Cancelled"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p>
          <strong className="font-medium">Total Amount:</strong> ₹
          {order.totalAmount.toFixed(2)}
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Shipping Address:</h3>
          <p>
            <strong className="font-medium">Street:</strong> {order.shippingAddress.street}
          </p>
          <p>
            <strong className="font-medium">City:</strong> {order.shippingAddress.city}
          </p>
          <p>
            <strong className="font-medium">State:</strong> {order.shippingAddress.state}
          </p>
          <p>
            <strong className="font-medium">Postal Code:</strong> {order.shippingAddress.postalCode}
          </p>
          <p>
            <strong className="font-medium">Country:</strong> {order.shippingAddress.country}
          </p>
        </div>

        <h3 className="text-2xl font-semibold mt-6 mb-4">Items Purchased:</h3>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li
              key={item.productId._id}
              className="flex items-center bg-white p-4 rounded-lg shadow-sm"
            >
              <img
                src={item.productId.productImage[0]}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <p>
                  <strong className="font-medium">Product:</strong>{" "}
                  {item.productId.name}
                </p>
                <p>
                  <strong className="font-medium">Quantity:</strong>{" "}
                  {item.quantity}
                </p>
                <p>
                  <strong className="font-medium">Price:</strong> ₹
                  {item.productId.price.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleStatusChange("Cancelled")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            Cancel Order
          </button>
         
          <button
            onClick={handleDeleteOrder}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
          >
            Delete Order
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetails;
