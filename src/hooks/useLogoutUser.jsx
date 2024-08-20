import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogoutUser = () => {
  const navigate = useNavigate();

  return useMutation(
    async () => {
      await axiosInstance.post("/auth/logout");
    },
    {
      onSuccess: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("redirectPath"); // Clear redirect path on logout
        toast.success("Logged out successfully!");
        navigate("/login"); // Redirect to login page
      },
      onError: () => {
        toast.error("Failed to log out. Please try again.");
      },
    }
  );
};

export default useLogoutUser;
