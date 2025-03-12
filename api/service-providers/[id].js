const mongoose = require("mongoose");
const ServiceProvider = require("../../models/serviceProvider");

module.exports = async (req, res) => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { id } = req.query; // Vercel يضع المعاملات الديناميكية في req.query

    if (req.method === "GET") {
      // جلب مقدم خدمة باستخدام ID
      const serviceProvider = await ServiceProvider.findById(id);
      if (!serviceProvider)
        return res.status(404).json({ message: "Service Provider not found" });
      res.status(200).json(serviceProvider);
    } else if (req.method === "PUT") {
      // تحديث مقدم خدمة
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

      const serviceProvider = await ServiceProvider.findByIdAndUpdate(
        id,
        {
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
        },
        { new: true }
      );
      if (!serviceProvider)
        return res.status(404).json({ message: "Service Provider not found" });
      res.status(200).json(serviceProvider);
    } else if (req.method === "DELETE") {
      // حذف مقدم خدمة
      const serviceProvider = await ServiceProvider.findByIdAndDelete(id);
      if (!serviceProvider)
        return res.status(404).json({ message: "Service Provider not found" });
      res.status(200).json({ message: "Service Provider deleted" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
