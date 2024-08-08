import axiosInstance from "./axiosInstance";

// Fetch products by brand
export const fetchProductsByBrand = async (brandId) => {
  const { data } = await axiosInstance.get(`/products/brand/${brandId}`);
  return data;
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId) => {
  const { data } = await axiosInstance.get(`/products/category/${categoryId}`);
  return data;
};

// Fetch product by ID
export const fetchProductById = async (productId) => {
  const { data } = await axiosInstance.get(`/products/${productId}`);
  return data.product;
};
