import axiosInstance from "./axiosInstance";

// Upload file to specific store (customer side)
export const uploadFile = async (storeId, formData) => {
  const res = await axiosInstance.post(`/upload/${storeId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Fetch all files for a store (admin/owner)
export const getFiles = async (storeId) => {
  const res = await axiosInstance.get(`/upload/files/${storeId}`);
  return res.data;
};

// Delete file manually (admin/owner)
export const deleteFile = async (fileId) => {
  const res = await axiosInstance.delete(`/upload/files/${fileId}`);
  return res.data;
};
