import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";
import { FaShoppingCart, FaHourglassHalf, FaSync, FaTruck, FaCheck, FaTimes, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

const OrderSummary = ({ orders }) => {
  const totalOrders = orders.length;
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  // Find the most recent order date
  const latestOrderDate =
    orders.length > 0 ? formatDate(orders[0].createdAt) : "No orders yet";

  return (
    <motion.div
      className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-md mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-4 text-white">Order Summary</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3">
          <FaShoppingCart className="text-blue-400 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Total Orders</h4>
            <p className="text-xl font-bold">{totalOrders}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3">
          <FaHourglassHalf className="text-yellow-400 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Pending</h4>
            <p className="text-xl font-bold">{statusCounts["Pending"] || 0}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3">
          <FaSync className="text-purple-400 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Processing</h4>
            <p className="text-xl font-bold">{statusCounts["Processing"] || 0}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3">
          <FaTruck className="text-blue-500 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Shipped</h4>
            <p className="text-xl font-bold">{statusCounts["Shipped"] || 0}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3">
          <FaCheck className="text-green-500 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Delivered</h4>
            <p className="text-xl font-bold">{statusCounts["Delivered"] || 0}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3">
          <FaTimes className="text-red-500 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Cancelled</h4>
            <p className="text-xl font-bold">{statusCounts["Cancelled"] || 0}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3">
          <FaMoneyBillWave className="text-green-400 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Total Spent</h4>
            <p className="text-xl font-bold">₹{totalSpent.toFixed(2)}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg shadow-sm flex items-center gap-3 col-span-full">
          <FaCalendarAlt className="text-gray-300 text-2xl" />
          <div>
            <h4 className="text-lg font-medium">Most Recent Order Date</h4>
            <p className="text-xl font-bold">{latestOrderDate}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
