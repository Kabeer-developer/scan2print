const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadFile, getStoreUploads, deleteFile } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Customer upload file
router.post("/:storeId", upload.single("file"), uploadFile);

// List files for store dashboard
router.get("/files/:storeId", protect, getStoreUploads);

// Delete file
router.delete("/files/:fileId", protect, deleteFile);

module.exports = router;
