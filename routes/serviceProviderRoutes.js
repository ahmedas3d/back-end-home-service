const express = require("express");
const router = express.Router();
const ServiceProvider = require("../models/ServiceProvider");

// إنشاء مقدم خدمة جديد (POST)
router.post("/", async (req, res) => {
  try {
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
      orders, // إضافة عدد الأوامر
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// جلب جميع مقدمي الخدمة (GET)
router.get("/", async (req, res) => {
  try {
    const serviceProviders = await ServiceProvider.find();
    res.json(serviceProviders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// جلب مقدم خدمة باستخدام ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findById(req.params.id);
    if (!serviceProvider)
      return res.status(404).json({ message: "Service Provider not found" });
    res.json(serviceProvider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تحديث مقدم خدمة (PUT)
router.put("/:id", async (req, res) => {
  try {
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
      orders, // إضافة عدد الأوامر
    } = req.body;

    const serviceProvider = await ServiceProvider.findByIdAndUpdate(
      req.params.id,
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
    res.json(serviceProvider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// حذف مقدم خدمة (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findByIdAndDelete(
      req.params.id
    );
    if (!serviceProvider)
      return res.status(404).json({ message: "Service Provider not found" });
    res.json({ message: "Service Provider deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
