import axiosInstance from "./axiosInstance";

export const userRegisterApi = (formData) => {
  return axiosInstance.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
