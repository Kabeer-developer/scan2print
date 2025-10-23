import axios from "./axiosInstance";

export const uploadFile = (storeId, formData) =>
  axios.post(`/upload/${storeId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getStoreUploads = (storeId) =>
  axios.get(`/upload/files/${storeId}`);

export const deleteUploadFile = (fileId) =>
  axios.delete(`/upload/files/${fileId}`);
