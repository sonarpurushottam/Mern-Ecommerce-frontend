// import { useQuery } from "@tanstack/react-query";
// import { fetchBrandsByCategory } from "../api/brandApi"; // Import the API function

// export const useBrands = (categoryId) => {
//   return useQuery({
//     queryKey: ["brands", categoryId],
//     queryFn: () => fetchBrandsByCategory(categoryId), // Use the API function
//     enabled: !!categoryId,
//   });
// };
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBrands = (categoryId) => {
  return useQuery({
    queryKey: ["brands", categoryId],
    queryFn: async () => {
      if (!categoryId) throw new Error("No category ID provided");
      const { data } = await axios.get(`http://localhost:5000/api/brands/getByCategory/${categoryId}`);
      return data;
    },
    enabled: !!categoryId,
  });
};

