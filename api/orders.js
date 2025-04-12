import mongoose from "mongoose";
import Order from "../../models/Order"; // تأكد من وجود هذا النموذج
import User from "../../models/User"; // لربط الطلب بالمستخدم
import Service from "../../models/Service"; // لربط الطلب بالخدمة
import ServiceProvider from "../../models/ServiceProvider"; // لربط الطلب بمقدم الخدمة

// الاتصال بقاعدة البيانات (يمكن وضعه في ملف منفصل وإعادة استخدامه)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default async function handler(req, res) {
  try {
    // الاتصال بقاعدة البيانات عند كل طلب
    await connectDB();

    if (req.method === "POST") {
      // التحقق من صحة البيانات
      const { user, service, provider, scheduledDate, address } = req.body;

      if (!user || !service || !provider || !scheduledDate || !address) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // التحقق من وجود المستخدم والخدمة ومقدم الخدمة
      const [userExists, serviceExists, providerExists] = await Promise.all([
        User.findById(user),
        Service.findById(service),
        ServiceProvider.findById(provider),
      ]);

      if (!userExists || !serviceExists || !providerExists) {
        return res
          .status(404)
          .json({ message: "User, service, or provider not found" });
      }

      // إنشاء الطلب باستخدام Mongoose Model
      const order = new Order({
        user,
        service,
        provider,
        scheduledDate: new Date(scheduledDate),
        address,
        status: "pending",
        price: serviceExists.price, // افترض أن السعر موجود في نموذج الخدمة
        ...(req.body.specialRequests && {
          specialRequests: req.body.specialRequests,
        }),
      });

      const savedOrder = await order.save();

      // تحديث المستخدم بإضافة الطلب
      await User.findByIdAndUpdate(user, { $push: { orders: savedOrder._id } });

      res.status(201).json({
        success: true,
        order: savedOrder,
      });
    } else if (req.method === "GET") {
      // جلب جميع الطلبات (يمكن تعديله حسب الحاجة)
      const orders = await Order.find()
        .populate("user", "name email")
        .populate("service", "name price")
        .populate("provider", "companyName rating");

      res.status(200).json(orders);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  } finally {
    // إغلاق الاتصال بعد كل طلب (اختياري)
    await mongoose.disconnect();
  }
}
