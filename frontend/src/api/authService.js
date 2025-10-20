import axiosInstance from "./axiosInstance";

export const register = async (userData) => {
  const res = await axiosInstance.post("/auth/register", userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axiosInstance.post("/auth/login", userData);
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
