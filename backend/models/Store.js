// Store.js
const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  location: String,
  qrCodeUrl: String,
  originalName: String,
size: Number,
  createdAt: { type: Date, default: Date.now },
   imageUrl: String, 
});

module.exports = mongoose.model("Store", storeSchema);
