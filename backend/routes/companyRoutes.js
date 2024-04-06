const express = require("express");
const router = express.Router();
const { boomHandler } = require("../middlewares/errorMiddleware");

const { createPromotion } = require("../controllers/companyControllers");

router.route("/createPromotion").post(createPromotion, boomHandler);

module.exports = router;
