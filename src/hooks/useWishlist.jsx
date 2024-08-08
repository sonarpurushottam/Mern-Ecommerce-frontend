// src/hooks/useWishlist.js
import { useState, useEffect } from "react";
import { fetchWishlist, removeFromWishlist } from "../api/wishlistApi";
import { toast } from "react-hot-toast";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState({ items: [] }); // Initial state as an object with an items array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        const data = await fetchWishlist();
        setWishlist(data); // Directly set data if it contains the items array
      } catch (error) {
        setError("Failed to fetch wishlist");
        toast.error("Failed to fetch wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, []);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await removeFromWishlist(itemId);
      setWishlist((prevWishlist) => ({
        ...prevWishlist,
        items: prevWishlist.items.filter((item) => item._id !== itemId),
      }));
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return { wishlist: wishlist.items, loading, error, handleRemoveFromWishlist };
};

export default useWishlist;
