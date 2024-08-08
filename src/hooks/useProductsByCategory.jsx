import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProductsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["productsByCategory", categoryId],
    queryFn: async () => {
      if (!categoryId) throw new Error("No category ID provided");
      const { data } = await axios.get(`http://localhost:5000/api/products/category/${categoryId}`);
      return data;
    },
    enabled: !!categoryId,
  });
};
