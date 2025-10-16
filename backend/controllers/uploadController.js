const streamifier = require("streamifier");
const cloudinary = require("cloudinary");
const FileUpload = require("../models/FileUpload");
const Store = require("../models/Store");

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary credentials are missing in .env");
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to a store
const uploadFile = async (req, res) => {
  const { uploaderName } = req.body;
  const storeId = req.params.storeId;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  const streamUpload = (buffer) =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: "scan2print_uploads" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

  const result = await streamUpload(file.buffer);

  const uploaded = await FileUpload.create({
    store: storeId,
    uploaderName,
    fileUrl: result.secure_url,
    fileType: file.mimetype,
    cloudinaryPublicId: result.public_id, // store public_id for deletion
  });

  res.json(uploaded);
};

// Get all files for a store
const getStoreFiles = async (req, res) => {
  const storeId = req.params.storeId;
  const store = await Store.findById(storeId);
  if (!store) return res.status(404).json({ message: "Store not found" });

  const files = await FileUpload.find({ store: storeId });
  res.json(files);
};

// Delete a file manually (also deletes from Cloudinary)
const deleteFile = async (req, res) => {
  const fileId = req.params.fileId;
  const file = await FileUpload.findById(fileId);
  if (!file) return res.status(404).json({ message: "File not found" });

  // Delete from Cloudinary
  if (file.cloudinaryPublicId) {
    await cloudinary.v2.uploader.destroy(file.cloudinaryPublicId);
  }

  // Delete from database
  await FileUpload.findByIdAndDelete(fileId);

  res.json({ message: "File deleted successfully" });
};

module.exports = { uploadFile, getStoreFiles, deleteFile };
