// src/api/orderApi.js
import axiosInstance from "./axiosInstance"; // Adjust the path as needed

export const fetchOrder = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};
