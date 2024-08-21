// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useProductsByCategory = (categoryId) => {
//   return useQuery({
//     queryKey: ["productsByCategory", categoryId],
//     queryFn: async () => {
//       if (!categoryId) throw new Error("No category ID provided");
//       const { data } = await axios.get(`http://localhost:/api/products/category/${categoryId}`);
//       return data;
//     },
//     enabled: !!categoryId,
//   });
// };
// src/hooks/useProductsByCategory.js

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useProductsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["productsByCategory", categoryId],
    queryFn: async () => {
      if (!categoryId) throw new Error("No category ID provided");
      const { data } = await axiosInstance.get(
        `/products/category/${categoryId}`
      );
      return data;
    },
    enabled: !!categoryId,
  });
};
