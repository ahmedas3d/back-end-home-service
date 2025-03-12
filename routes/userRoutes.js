const express = require("express");
const router = express.Router();
const User = require("../models/user");

// إنشاء مستخدم جديد (POST)
router.post("/", async (req, res) => {
  try {
    const { name, email, country, phoneNumber, image } = req.body;
    const user = new User({ name, email, country, phoneNumber, image });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// جلب جميع المستخدمين (GET)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// جلب مستخدم باستخدام ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تحديث مستخدم (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { name, email, country, phoneNumber, image } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, country, phoneNumber, image },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// حذف مستخدم (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
