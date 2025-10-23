const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const storeSchema = new mongoose.Schema({
  name: String,
  location: String,
  email: { type: String, unique: true },
  password: String,
  logoUrl: String,
  qrCodeUrl: String,
  createdAt: { type: Date, default: Date.now },
});

storeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

storeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Store", storeSchema);
