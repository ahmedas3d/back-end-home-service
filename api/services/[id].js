const mongoose = require("mongoose");
const Service = require("../../models/service");

module.exports = async (req, res) => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { id } = req.query; // Vercel يضع المعاملات الديناميكية في req.query

    if (req.method === "GET") {
      // جلب خدمة باستخدام ID
      const service = await Service.findById(id);
      if (!service)
        return res.status(404).json({ message: "Service not found" });
      res.status(200).json(service);
    } else if (req.method === "PUT") {
      // تحديث خدمة
      const { category, rating, price, time, usageCount } = req.body;
      const service = await Service.findByIdAndUpdate(
        id,
        { category, rating, price, time, usageCount },
        { new: true }
      );
      if (!service)
        return res.status(404).json({ message: "Service not found" });
      res.status(200).json(service);
    } else if (req.method === "DELETE") {
      // حذف خدمة
      const service = await Service.findByIdAndDelete(id);
      if (!service)
        return res.status(404).json({ message: "Service not found" });
      res.status(200).json({ message: "Service deleted" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
