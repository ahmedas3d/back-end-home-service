const mongoose = require("mongoose");
const Order = require("../../models/order");
const User = require("../../models/user");
const ServiceProvider = require("../../models/serviceProvider");

module.exports = async (req, res) => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { id } = req.query; // Vercel يضع المعاملات في req.query

    if (req.method === "GET") {
      // جلب طلب معين
      const order = await Order.findOne({
        _id: id,
        $or: [{ user: req.user._id }, { provider: req.user._id }],
      }).populate("service provider user");

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } else if (req.method === "PATCH") {
      // تحديث حالة الطلب
      const updates = Object.keys(req.body);
      const allowedUpdates = ["status"];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).json({ message: "Invalid updates!" });
      }

      // التحقق من أن المستخدم هو مقدم الخدمة لهذا الطلب
      const provider = await ServiceProvider.findOne({ user: req.user._id });
      if (!provider) {
        return res
          .status(403)
          .json({ message: "Only service providers can update order status" });
      }

      const order = await Order.findOneAndUpdate(
        {
          _id: id,
          provider: provider._id,
        },
        req.body,
        { new: true, runValidators: true }
      );

      if (!order) {
        return res
          .status(404)
          .json({ message: "Order not found or not authorized" });
      }

      res.status(200).json(order);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    await mongoose.disconnect();
  }
};
