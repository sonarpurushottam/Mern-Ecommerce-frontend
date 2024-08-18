import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

const useLogoutUser = () => {
  return useMutation(
    async () => {
      await axiosInstance.post("/auth/logout");
    },
    {
      onSuccess: () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
      },
      onError: () => {
        toast.error("Failed to log out. Please try again.");
      },
    }
  );
};

export default useLogoutUser;
