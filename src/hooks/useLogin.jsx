// src/hooks/useLogin.jsx
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
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Login failed");
    },
  });

  return mutation;
};

export default useLogin;
