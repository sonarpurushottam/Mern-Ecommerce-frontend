import axiosInstance from "./axiosInstance";

// Add product to cart
export const addToCart = async (productId, token) => {
  await axiosInstance.post(
    "/cart",
    { productId, quantity: 1 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Add product to wishlist
export const addToWishlist = async (productId, token) => {
  await axiosInstance.post(
    "/wishlist",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
