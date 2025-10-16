// storeController.js
const Store = require("../models/Store");
const FileUpload = require("../models/FileUpload");

// Create a store for the logged-in owner
const createStore = async (req, res) => {
  const { name, location } = req.body;
  const store = await Store.create({
    owner: req.user._id,
    name,
    location,
    qrCodeUrl: `https://scan2print.in/store/${req.user._id}`,
  });
  res.json(store);
};

// Get store by ID (for QR redirect)
const getStoreById = async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (!store) return res.status(404).json({ message: "Store not found" });
  res.json(store);
};

// Get uploaded files for a store
const getStoreFiles = async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (!store) return res.status(404).json({ message: "Store not found" });
  const uploads = await FileUpload.find({ store: store._id });
  res.json(uploads);
};

// Delete a specific uploaded file
const deleteStoreFile = async (req, res) => {
  const { id, fileId } = req.params;
  const store = await Store.findById(id);
  if (!store) return res.status(404).json({ message: "Store not found" });

  const file = await FileUpload.findOneAndDelete({ _id: fileId, store: store._id });
  if (!file) return res.status(404).json({ message: "File not found" });

  res.json({ message: "File deleted successfully" });
};

module.exports = { createStore, getStoreById, getStoreFiles, deleteStoreFile };
