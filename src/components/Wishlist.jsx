// src/components/Wishlist.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWishlist(data.items);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch wishlist"
        );
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/wishlist/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWishlist(data.items);
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  return (
    <div className="wishlist-container">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="wishlist-item p-4 border rounded shadow-md"
          >
            <img
              src={item.productId.productImage[0]}
              alt={item.productId.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">
              {item.productId.name}
            </h3>
            <p className="mt-1">Price: ${item.productId.price}</p>
            <button
              onClick={() => removeFromWishlist(item._id)}
              className="text-red-500 mt-2 flex items-center"
            >
              <AiFillDelete className="mr-1" /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
