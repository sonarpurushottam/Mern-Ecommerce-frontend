import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllOrders,
  fetchOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../api/orderApi'; 

// Fetch all orders
export const useAllOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrders,
    onError: (error) => {
      console.error('Error fetching orders:', error);
    },
  });
};

// Fetch a single order by ID
export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId),
    onError: (error) => {
      console.error('Error fetching order:', error);
    },
    enabled: !!orderId, // Only fetch if orderId is provided
  });
};

// Create a new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']); // Invalidate queries to refetch orders
    },
    onError: (error) => {
      console.error('Error creating order:', error);
    },
  });
};

// Update an order's status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']); // Invalidate queries to refetch orders
    },
    onError: (error) => {
      console.error('Error updating order status:', error);
    },
  });
};

// Delete an order
export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteOrder,
      onSuccess: () => {
        queryClient.invalidateQueries(['orders']); // Adjust query key if necessary
      },
      onError: (error) => {
        console.error('Error deleting order:', error);
      },
    });
  };
