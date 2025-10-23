const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const storeRoutes = require("./routes/storeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/store", storeRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
