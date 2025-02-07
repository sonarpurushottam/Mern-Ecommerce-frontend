import { useState } from "react";
import { useAllOrders } from "../hooks/useOrders";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import OrderSummary from "./OrderSummary";
import { motion } from "framer-motion";
import { FaMoon, FaSearch, FaSlidersH } from "react-icons/fa";

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

  if (isLoading)
    return <p className="text-white text-center">Loading orders...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center">
        Error loading orders: {error.message}
      </p>
    );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <motion.h2
        className="text-4xl font-bold mb-6 text-center text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Order History
      </motion.h2>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          onChange={handleFilter}
          value={filterStatus}
          className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
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
          className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <motion.table
        className="min-w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-4">Order ID</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Total Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {filteredOrders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-700 transition duration-300"
            >
              <td className="p-4">
                <Link
                  to={`/orders/${order._id}`}
                  className="text-blue-400 hover:underline"
                >
                  {order._id}
                </Link>
              </td>
              <td className="p-4">{formatDate(order.createdAt)}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white font-semibold ${
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
              <td className="p-4">₹{order.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </motion.table>
      <OrderSummary orders={filteredOrders} />
    </div>
  );
};

export default OrderList;
