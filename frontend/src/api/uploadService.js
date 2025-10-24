import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const uploadFile = (storeId, formData) =>
  axios.post(`${API}/uploads/${storeId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getStoreUploads = (storeId, token) =>
  axios.get(`${API}/uploads/files/${storeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFile = (fileId, token) =>
  axios.delete(`${API}/uploads/files/${fileId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
