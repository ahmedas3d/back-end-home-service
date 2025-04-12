const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    image: { type: String, required: false },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
