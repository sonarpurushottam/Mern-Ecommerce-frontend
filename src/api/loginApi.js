// src/api/loginApi.js
import axiosInstance from "./axiosInstance";

export const loginApi = (credentials) => {
  return axiosInstance.post("/users/login", credentials);
};
