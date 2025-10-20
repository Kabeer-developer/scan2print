import axiosInstance from "./axiosInstance";

// Create new store (for store owner)
export const createStore = async (storeData) => {
  const res = await axiosInstance.post("/store/create", storeData);
  return res.data;
};

// Get store by ID (used when customer scans QR)
export const getStoreById = async (storeId) => {
  const res = await axiosInstance.get(`/store/${storeId}`);
  return res.data;
};

// Get files uploaded to this store
export const getStoreFiles = async (storeId) => {
  const res = await axiosInstance.get(`/store/${storeId}/files`);
  return res.data;
};

// Delete a specific file from store dashboard
export const deleteStoreFile = async (storeId, fileId) => {
  const res = await axiosInstance.delete(`/store/${storeId}/files/${fileId}`);
  return res.data;
};
