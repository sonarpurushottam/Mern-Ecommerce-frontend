// src/hooks/useOrder.js
import { useState, useEffect } from "react";
import { fetchOrder } from "../api/orderApi"; 
import { toast } from "react-hot-toast";

const useOrder = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const data = await fetchOrder(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Error fetching order");
        toast.error("Error fetching order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  return { order, loading, error };
};

export default useOrder;
