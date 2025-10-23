// storeRoutes.js
const express = require("express");

const multer = require("multer");
const upload = multer(); 
const {
  createStore,
  getStoreById,
  getStoreFiles,
  deleteStoreFile,
  getAllStores,
} = require("../controllers/storeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllStores);

// Create a store for the owner


router.post("/create", protect, upload.single("image"), createStore);

// Get store by ID (for QR redirect)
router.get("/:id", getStoreById);

// Get uploaded files for a store
router.get("/:id/files", protect, getStoreFiles);

// Delete a specific uploaded file
router.delete("/:id/files/:fileId", protect, deleteStoreFile);

module.exports = router;
