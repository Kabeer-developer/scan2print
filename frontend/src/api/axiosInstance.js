import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,
});

// attach token if exists
axiosInstance.interceptors.request.use((config) => {
  const raw = localStorage.getItem("storeInfo");
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
  }
  return config;
});

export default axiosInstance;
