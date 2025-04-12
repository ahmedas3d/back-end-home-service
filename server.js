const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const serviceProviderRoutes = require("./routes/serviceProviderRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

dotenv.config();

const app = express();

// Middleware لتحليل JSON
app.use(express.json());

// الاتصال بقاعدة البيانات MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/service-providers", serviceProviderRoutes);
app.use("/api/services", serviceRoutes);
// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
