import axios from "./axiosInstance";

const registerStore = async (formData) => {
  // formData is FormData with logo file
  const res = await axios.post("/api/store/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const loginStore = async (credentials) => {
  const res = await axios.post("/api/store/login", credentials);
  return res.data;
};

const getAllStores = async () => {
  const res = await axios.get("/api/store");
  return res.data;
};

const getStoreById = async (id) => {
  const res = await axios.get(`/api/store/${id}`);
  return res.data;
};

export default { registerStore, loginStore, getAllStores, getStoreById };
