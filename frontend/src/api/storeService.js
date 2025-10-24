import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const registerStore = (formData) =>
  axios.post(`${API}/stores/register`, formData);

export const loginStore = (data) =>
  axios.post(`${API}/stores/login`, data);

export const getAllStores = () =>
  axios.get(`${API}/stores`);

export const getStoreById = (id) =>
  axios.get(`${API}/stores/${id}`);

export const deleteStore = (id, token) =>
  axios.delete(`${API}/stores/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
