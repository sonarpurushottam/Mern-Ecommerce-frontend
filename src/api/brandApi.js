// src/api/brandApi.js

import axiosInstance from "./axiosInstance";

// Fetch brands by category
export const fetchBrandsByCategory = async (categoryId) => {
  try {
    const { data } = await axiosInstance.get(
      `/brands/getByCategory/${categoryId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching brands by category:", error);
    throw error;
  }
};
