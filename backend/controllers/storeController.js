const Store = require("../models/Store");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const generateQRCode = require("../utils/generateQRCode");
const jwt = require("jsonwebtoken");

// Register store
const registerStore = async (req, res) => {
  const { name, location, email, password } = req.body;

  const exists = await Store.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  let logoUrl = "";
  if (req.file) {
    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "store_logos" },
          (err, result) => (result ? resolve(result) : reject(err))
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    const result = await streamUpload(req.file.buffer);
    logoUrl = result.secure_url;
  }

  const store = await Store.create({ name, location, email, password, logoUrl });

  const qrCodeUrl = await generateQRCode(`${process.env.FRONTEND_URL}/store/${store._id}`);
  store.qrCodeUrl = qrCodeUrl;
  await store.save();

  const token = jwt.sign({ id: store._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ store, token });
};

// Login store
const loginStore = async (req, res) => {
  const { email, password } = req.body;
  const store = await Store.findOne({ email });
  if (store && (await store.matchPassword(password))) {
    const token = jwt.sign({ id: store._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ store, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// Get all stores (for homepage)
const getAllStores = async (req, res) => {
  const stores = await Store.find().select("name location logoUrl qrCodeUrl");
  res.json(stores);
};

// Get store by ID
const getStoreById = async (req, res) => {
  const store = await Store.findById(req.params.id).select("-password");
  if (!store) return res.status(404).json({ message: "Store not found" });
  res.json(store);
};


module.exports = { registerStore, loginStore, getAllStores, getStoreById };
