// FileUpload.js
const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  uploaderName: String,
  fileUrl: String,
  fileType: String,
  createdAt: { type: Date, default: Date.now, expires: 86400 }, 
  
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "FileUpload" }],
createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model("FileUpload", fileUploadSchema);
