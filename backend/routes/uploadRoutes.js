// uploadRoutes.js
const express = require("express");
const multer = require("multer");
const {
  uploadFile,
  getStoreUploads,
  deleteFile,
} = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload files to a store
router.post("/:storeId",  upload.single("file"), uploadFile);

// List all files for a store
router.get("/files/:storeId", protect, getStoreUploads);

// Delete file manually
router.delete("/files/:fileId", protect, deleteFile);

module.exports = router;
