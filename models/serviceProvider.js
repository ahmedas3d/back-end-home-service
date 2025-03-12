const mongoose = require("mongoose");

// تعريف مخطط (Schema) لمقدم الخدمة
const serviceProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true, // رقم الهاتف مطلوب
      unique: true, // التأكد من أن رقم الهاتف فريد
    },
    experience: {
      type: Number,
      required: true, // سنوات الخبرة مطلوبة
      min: 0, // التأكد من أن الخبرة ليست سالبة
    },
    serviceArea: {
      type: String,
      required: true, // منطقة الخدمة مطلوبة
      trim: true,
    },
    workHour: {
      from: {
        type: Number,
        required: true, // ساعة البداية مطلوبة
        min: 0, // لا يمكن أن تكون أقل من 0
        max: 24, // لا يمكن أن تتجاوز 24
      },
      to: {
        type: Number,
        required: true, // ساعة النهاية مطلوبة
        min: 0,
        max: 24,
      },
    },
    servicesLicense: {
      type: String,
      required: true, // رخصة الخدمة مطلوبة
      trim: true,
      unique: true, // التأكد من أن الرخصة فريدة
    },
    certification: {
      type: String,
      required: true, // الشهادة مطلوبة
      trim: true,
    },
    image: {
      type: String,
      required: false, // صورة اختيارية
      trim: true,
    },
    specialty: {
      type: String,
      required: true, // التخصص مطلوب
      trim: true,
    },
    bio: {
      type: String,
      required: false, // السيرة الذاتية اختيارية
      trim: true,
      maxlength: 500, // تحديد الحد الأقصى للطول (اختياري)
    },
    rating: {
      type: Number,
      required: false, // التقييم اختياري
      default: 0, // قيمة افتراضية
      min: 0, // لا يمكن أن يكون أقل من 0
      max: 5, // تقييم من 0 إلى 5 (يمكنك تغييره حسب احتياجك)
    },
    skills: {
      type: [String], // قائمة من المهارات
      required: false,
      trim: true, // إزالة المسافات الزائدة من كل مهارة
    },
    orders: {
      type: Number,
      required: false, // عدد الأوامر اختياري
      default: 0, // قيمة افتراضية
      min: 0, // لا يمكن أن يكون سالبًا
    },
  },
  {
    timestamps: true, // إضافة حقول createdAt وupdatedAt تلقائيًا
  }
);

// إنشاء نموذج بناءً على المخطط
module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
