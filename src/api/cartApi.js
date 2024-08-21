import axiosInstance from "./axiosInstance"; 

export const fetchCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

export const removeFromCart = async (itemId) => {
  await axiosInstance.delete(`/cart/${itemId}`);
};

export const updateCartQuantity = async (items) => {
  await axiosInstance.put("/cart", { items });
};

export const checkout = async (checkoutData) => {
  const response = await axiosInstance.post("/orders", checkoutData);
  return response.data;
};
