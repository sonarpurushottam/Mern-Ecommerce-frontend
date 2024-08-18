import { useState } from "react";
import { useAllOrders } from "../hooks/useOrders"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate"; // Adjust the path as needed
import OrderSummary from "./OrderSummary"; // Adjust the path as needed
import { motion } from "framer-motion";

const OrderList = () => {
  const { data: orders = [], isLoading, error } = useAllOrders();
  const [sortOption, setSortOption] = useState("date");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (option) => setSortOption(option);

  const handleFilter = (event) => setFilterStatus(event.target.value);

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const filteredOrders = (orders || [])
    .filter(
      (order) =>
        order._id.includes(searchQuery) ||
        order.items.some((item) =>
          item.productId.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .filter((order) => filterStatus === "" || order.status === filterStatus)
    .sort((a, b) => {
      if (sortOption === "date")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "amount") return b.totalAmount - a.totalAmount;
      if (sortOption === "status") return a.status.localeCompare(b.status);
    });

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.h2
        className="text-3xl font-semibold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Order History
      </motion.h2>

      <OrderSummary orders={filteredOrders} />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-3 rounded-lg flex-1"
        />
        <select
          onChange={handleFilter}
          value={filterStatus}
          className="border p-3 rounded-lg flex-1"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          onChange={(e) => handleSort(e.target.value)}
          value={sortOption}
          className="border p-3 rounded-lg flex-1"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <motion.table
        className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr className="bg-gray-200 text-left text-sm font-semibold">
            <th className="p-4">Order ID</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Total Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-100 transition-colors duration-300"
            >
              <td className="p-4">
                <Link
                  to={`/orders/${order._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {order._id}
                </Link>
              </td>
              <td className="p-4">{formatDate(order.createdAt)}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 text-white rounded-full text-xs ${
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
              </td>
              <td className="p-4">${order.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default OrderList;
