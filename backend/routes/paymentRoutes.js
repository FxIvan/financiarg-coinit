const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { boomHandler } = require("../middlewares/errorMiddleware");
const { createPayment } = require("../controllers/paymentControllers");

router.route("/created").post(protect, createPayment, boomHandler);

module.exports = router;
