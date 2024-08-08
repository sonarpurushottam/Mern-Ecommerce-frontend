// src/components/Wishlist.jsx
import React from "react";
import useWishlist from "../hooks/useWishlist";
import { AiFillDelete } from "react-icons/ai";

const Wishlist = () => {
  const { wishlist, loading, error, handleRemoveFromWishlist } = useWishlist();

  if (loading) {
    return <div className="text-center text-gray-500">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="text-center text-gray-500">Your wishlist is empty.</div>
    );
  }

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
              src={item.productId.productImage[0] || "/default_image_url.png"}
              alt={item.productId.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-2">
              {item.productId.name}
            </h3>
            <p className="mt-1">Price: ₹{item.productId.price}</p>
            <button
              onClick={() => handleRemoveFromWishlist(item._id)}
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
