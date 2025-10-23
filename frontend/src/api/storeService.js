import axios from "./axiosInstance";

export const createStore = (formData) =>
  axios.post("/store/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllStores = () => axios.get("/store");
export const getStoreById = (id) => axios.get(`/store/${id}`);
export const getStoreFiles = (id) => axios.get(`/store/${id}/files`);
export const deleteStoreFile = (storeId, fileId) =>
  axios.delete(`/store/${storeId}/files/${fileId}`);
