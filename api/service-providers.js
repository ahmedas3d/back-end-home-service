const mongoose = require("mongoose");
const ServiceProvider = require("../models/ServiceProvider");

// الاتصال بـ MongoDB يتم عند كل استدعاء للدالة
module.exports = async (req, res) => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (req.method === "GET") {
      // جلب جميع مقدمي الخدمة
      const serviceProviders = await ServiceProvider.find();
      res.status(200).json(serviceProviders);
    } else if (req.method === "POST") {
      // إنشاء مقدم خدمة جديد
      const {
        name,
        phoneNumber,
        experience,
        serviceArea,
        workHour,
        servicesLicense,
        certification,
        image,
        specialty,
        bio,
        rating,
        skills,
        orders,
      } = req.body;

      const serviceProvider = new ServiceProvider({
        name,
        phoneNumber,
        experience,
        serviceArea,
        workHour,
        servicesLicense,
        certification,
        image,
        specialty,
        bio,
        rating,
        skills,
        orders,
      });
      await serviceProvider.save();
      res.status(201).json(serviceProvider);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
