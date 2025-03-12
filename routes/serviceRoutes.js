const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// إنشاء خدمة جديدة (POST)
router.post("/", async (req, res) => {
  try {
    const { name, category, rating, price, time, usageCount } = req.body;

    const service = new Service({
      category,
      rating,
      price,
      time,
      usageCount,
    });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// جلب جميع الخدمات (GET)
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// جلب خدمة باستخدام ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تحديث خدمة (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { name, category, rating, price, time, usageCount } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, category, rating, price, time, usageCount },
      { new: true }
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// حذف خدمة (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
