import axiosInstance from "./axiosInstance"; // Adjust the path as needed

// Fetch all orders for the authenticated user
export const fetchAllOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

// Fetch a single order by its ID
export const fetchOrder = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};

// Fetch all orders with detailed information
export const fetchOrdersWithDetails = async () => {
  const response = await axiosInstance.get('/orders/details');
  return response.data;
};

// Create a new order
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

// Update an order's status
export const updateOrderStatus = async (orderId, status) => {
  const response = await axiosInstance.put(`/orders/${orderId}`, { status });
  return response.data;
};

// Delete an order
export const deleteOrder = async (orderId) => {
  const response = await axiosInstance.delete(`/orders/${orderId}`);
  return response.data;
};
