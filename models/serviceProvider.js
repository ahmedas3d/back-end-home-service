const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    serviceArea: {
      type: String,
      required: true,
    },
    workHour: {
      from: {
        type: Number,
        required: true,
      },
      to: {
        type: Number,
        required: true,
      },
    },
    servicesLicense: {
      type: String,
      required: true,
    },
    certification: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    specialty: {
      type: String,
      required: true,
    },
    bio: {
      // إضافة السيرة الذاتية
      type: String,
      required: false,
    },
    rating: {
      // إضافة التقييم
      type: Number,
      required: false,
      default: 0, // قيمة افتراضية
    },
    skills: {
      // إضافة المهارات كقائمة
      type: [String],
      required: false,
    },
    orders: {
      // إضافة عدد الأوامر (Orders)
      type: Number,
      required: false,
      default: 0, // قيمة افتراضية
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
