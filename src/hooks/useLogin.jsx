import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/loginApi";
import toast from "react-hot-toast";

const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await loginApi(credentials);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id); // Store userId
      localStorage.setItem("username", data.username); // Optional
      localStorage.setItem("email", data.email); // Optional
      localStorage.setItem("mobile", data.mobile); // Optional
      localStorage.setItem("role", data.role); // Optional
      localStorage.setItem("profilePic", data.profilePic); // Optional

      // window.location.reload(); // Reload the page after login
      window.location.replace(window.location.href);
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Login failed");
    },
  });

  return mutation;
};

export default useLogin;
