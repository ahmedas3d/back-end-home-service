const express = require("express");
const router = express.Router();
const Order = require("../../models/order");
const auth = require("../middleware/auth");

// إنشاء طلب جديد
router.post("/", auth, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.user._id,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// الحصول على جميع طلبات المستخدم
router.get("/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("service")
      .populate("provider");
    res.send(orders);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
