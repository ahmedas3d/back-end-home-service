const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    time: {
      from: {
        type: Number,
        required: true,
      },
      to: {
        type: Number,
        required: true,
      },
    },
    usageCount: {
      // عدد المستخدمين الذين استخدموا الخدمة
      type: Number,
      required: false,
      default: 0,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
