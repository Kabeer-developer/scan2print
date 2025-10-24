const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  registerStore,
  loginStore,
  getAllStores,
  getStoreById,
} = require("../controllers/storeController");
const { protect } = require("../middleware/authMiddleware");
const { deleteFile } = require("../controllers/uploadController");
const router = express.Router();

// Register store
router.post("/register", upload.single("logo"), registerStore);

// Login store
router.post("/login", loginStore);

// Get all stores (homepage)
router.get("/", getAllStores);

// Get store by ID
router.get("/:id", getStoreById);



module.exports = router;
