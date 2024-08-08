import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Error fetching order");
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div className="text-center text-gray-500">Loading order...</div>;
  }

  const totalAmount = order.items.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
      <ul className="divide-y divide-gray-200">
        {order.items.map((item) => (
          <li key={item._id} className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                className="h-20 w-20 object-cover mr-4"
                src={
                  item.productId.productImage[0] || "/default_image_url.png"
                }
                alt={item.productId.name}
              />
              <div>
                <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                <p>Price: ₹{item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Subtotal: ₹
                  {(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right mt-4">
        <p className="text-lg font-semibold">Total: ₹{totalAmount.toFixed(2)}</p>
      </div>
      <div className="text-right mt-4">
        <p className="text-lg font-semibold">
          Order Status: {order.status}
        </p>
      </div>
    </div>
  );
};

export default Order;
