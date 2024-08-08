import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  fetchProductsByBrand,
  fetchProductsByCategory,
  fetchProductById,
} from "../api/productApi";

// Custom hook to fetch products by brand
export const useProductsByBrand = (brandId) => {
  return useQuery({
    queryKey: ["productsByBrand", brandId],
    queryFn: async () => {
      try {
        return await fetchProductsByBrand(brandId);
      } catch (error) {
        toast.error("Error fetching products by brand");
        throw error; // Re-throw the error to be handled by react-query
      }
    },
    onError: () => {
      toast.error("Error fetching products by brand");
    }
  });
};

// Custom hook to fetch products by category
export const useProductsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["productsByCategory", categoryId],
    queryFn: async () => {
      try {
        return await fetchProductsByCategory(categoryId);
      } catch (error) {
        toast.error("Error fetching products by category");
        throw error; // Re-throw the error to be handled by react-query
      }
    },
    onError: () => {
      toast.error("Error fetching products by category");
    }
  });
};

// Custom hook to fetch product by ID
export const useProductById = (productId) => {
  return useQuery({
    queryKey: ["productById", productId],
    queryFn: async () => {
      try {
        return await fetchProductById(productId);
      } catch (error) {
        toast.error("Error fetching product details");
        throw error; // Re-throw the error to be handled by react-query
      }
    },
    onError: () => {
      toast.error("Error fetching product details");
    },
    enabled: !!productId,
  });
};
