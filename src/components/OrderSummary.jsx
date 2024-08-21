import { motion } from "framer-motion";
import { formatDate } from "../utils/formatDate";

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
      className="p-6 bg-white rounded-lg shadow-md mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium">Total Orders</h4>
          <p className="text-xl font-bold">{totalOrders}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium">Pending</h4>
          <p className="text-xl font-bold">{statusCounts["Pending"] || 0}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium">Processing</h4>
          <p className="text-xl font-bold">{statusCounts["Processing"] || 0}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium">Shipped</h4>
          <p className="text-xl font-bold">{statusCounts["Shipped"] || 0}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium">Delivered</h4>
          <p className="text-xl font-bold">{statusCounts["Delivered"] || 0}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium">Cancelled</h4>
          <p className="text-xl font-bold">{statusCounts["Cancelled"] || 0}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium">Total Spent</h4>
          <p className="text-xl font-bold">₹{totalSpent.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-sm col-span-full">
          <h4 className="text-lg font-medium">Most Recent Order Date</h4>
          <p className="text-xl font-bold">{latestOrderDate}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
