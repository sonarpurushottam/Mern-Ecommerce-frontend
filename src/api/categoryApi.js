import axiosInstance from "./axiosInstance";

// Fetch all categories
export const fetchCategories = async () => {
  const { data } = await axiosInstance.get("/categories/get");
  return data;
};

// Fetch all brands by category
export const fetchBrandsByCategory = async (categoryId) => {
  const { data } = await axiosInstance.get(`/brands/getByCategory/${categoryId}`);
  return data;
};
