import { useMutation } from "@tanstack/react-query";
import { userRegisterApi } from "../api/userRegisterApi";
import toast from "react-hot-toast";

const useUserRegister = () => {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await userRegisterApi(formData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  return mutation;
};

export default useUserRegister;
