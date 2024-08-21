import axiosInstance from "./axiosInstance";

// Fetch wishlist items
export const fetchWishlist = async () => {
  const response = await axiosInstance.get("/wishlist");
  return response.data;
};

// Remove an item from the wishlist
export const removeFromWishlist = async (itemId) => {
  const response = await axiosInstance.delete(`/wishlist/${itemId}`);
  return response.data;
};
