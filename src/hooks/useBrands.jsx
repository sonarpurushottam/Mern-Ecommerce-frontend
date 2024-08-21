
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useBrands = (categoryId) => {
  return useQuery({
    queryKey: ["brands", categoryId],
    queryFn: async () => {
      if (!categoryId) throw new Error("No category ID provided");
      const { data } = await axiosInstance.get(`/brands/getByCategory/${categoryId}`);
      return data;
    },
    enabled: !!categoryId,
  });
};