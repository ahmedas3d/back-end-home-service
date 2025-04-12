const express = require("express");
const router = express.Router();
const Order = require("../../models/order");
const auth = require("../middleware/auth");

// الحصول على تفاصيل طلب معين
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      $or: [
        { user: req.user._id },
        { provider: req.user._id }, // إذا كان المستخدم مقدم خدمة
      ],
    }).populate("service provider user");

    if (!order) {
      return res.status(404).send();
    }

    res.send(order);
  } catch (error) {
    res.status(500).send();
  }
});

// تحديث حالة الطلب (لمقدمي الخدمة)
router.patch("/:id/status", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        provider: req.user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).send();
    }

    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
