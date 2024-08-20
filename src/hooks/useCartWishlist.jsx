import { useMutation } from "@tanstack/react-query";
import { addToCart, addToWishlist } from "../api/cartWishlistApi"; // Adjust the path as needed
import toast from "react-hot-toast";

// Custom hook to add product to cart
export const useAddToCart = () => {
  return useMutation({
    mutationFn: (productId) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      return addToCart(productId, token);
    },
    onError: () => {
      toast.error("Login First");
    },
    onSuccess: () => {
      toast.success("Product added to cart");
    },
  });
};

// Custom hook to add product to wishlist
export const useAddToWishlist = () => {
  return useMutation({
    mutationFn: (productId) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      return addToWishlist(productId, token);
    },
    onError: () => {
      toast.error("Login first");
    },
    onSuccess: () => {
      toast.success("Product added to wishlist");
    },
  });
};
