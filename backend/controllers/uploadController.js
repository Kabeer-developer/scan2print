const FileUpload = require("../models/FileUpload");
const Store = require("../models/Store");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

// Customer upload (supports images, PDFs, and raw files)
const uploadFile = async (req, res) => {
  try {
    const { uploaderName } = req.body;
    const storeId = req.params.storeId;

    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: "Store not found" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Determine resource_type based on mimetype
    const resourceType =
      req.file.mimetype === "application/pdf" ? "raw" : "auto";

    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "customer_uploads", resource_type: resourceType },
          (err, result) => (result ? resolve(result) : reject(err))
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await streamUpload(req.file.buffer);

    const file = await FileUpload.create({
      store: storeId,
      uploaderName,
      fileUrl: result.secure_url,
      fileType: req.file.mimetype,
      cloudinaryPublicId: result.public_id,
    });

    res.json({ message: "Uploaded successfully", file });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// List uploaded files for store dashboard
const getStoreUploads = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const files = await FileUpload.find({ store: storeId });
    res.json(files);
  } catch (error) {
    console.error("Get uploads error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a file safely from Cloudinary and DB
const deleteFile = async (req, res) => {
  try {
    const file = await FileUpload.findById(req.params.fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    if (file.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(file.cloudinaryPublicId, {
        resource_type: file.fileType === "application/pdf" ? "raw" : "auto",
      });
    }

    await FileUpload.findByIdAndDelete(req.params.fileId);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { uploadFile, getStoreUploads, deleteFile };
