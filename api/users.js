const mongoose = require("mongoose");
const User = require("../models/User");

// الاتصال بـ MongoDB يتم عند كل استدعاء للدالة
module.exports = async (req, res) => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (req.method === "GET") {
      // جلب جميع المستخدمين
      const users = await User.find();
      res.status(200).json(users);
    } else if (req.method === "POST") {
      // إنشاء مستخدم جديد
      const { name, email, country, phoneNumber, image } = req.body;
      const user = new User({ name, email, country, phoneNumber, image });
      await user.save();
      res.status(201).json(user);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
