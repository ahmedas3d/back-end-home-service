const mongoose = require("mongoose");
const User = require("../models/user");

module.exports = async (req, res) => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { id } = req.query; // Vercel يضع المعاملات الديناميكية في req.query

    if (req.method === "GET") {
      // جلب مستخدم باستخدام ID
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } else if (req.method === "PUT") {
      // تحديث مستخدم
      const { name, email, country, phoneNumber, image } = req.body;
      const user = await User.findByIdAndUpdate(
        id,
        { name, email, country, phoneNumber, image },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } else if (req.method === "DELETE") {
      // حذف مستخدم
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
