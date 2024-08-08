import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchBrandsByCategory } from "../api/categoryApi";

// Custom hook to fetch all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

// Custom hook to fetch brands by category
export const useBrandsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["brands", categoryId],
    queryFn: () => fetchBrandsByCategory(categoryId),
    enabled: !!categoryId, // Only fetch if categoryId is provided
  });
};
