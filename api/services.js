const mongoose = require("mongoose");
const Service = require("../models/Service");

// الاتصال بـ MongoDB يتم عند كل استدعاء للدالة
module.exports = async (req, res) => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (req.method === "GET") {
      // جلب جميع الخدمات
      const services = await Service.find();
      res.status(200).json(services);
    } else if (req.method === "POST") {
      // إنشاء خدمة جديدة
      const { category, rating, price, time, usageCount } = req.body;
      const service = new Service({
        category,
        rating,
        price,
        time,
        usageCount,
      });
      await service.save();
      res.status(201).json(service);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
