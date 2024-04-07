const express = require("express");
const router = express.Router();
const { boomHandler } = require("../middlewares/errorMiddleware");

const {
  createPromotion,
  getPromotions,
} = require("../controllers/companyControllers");

router.route("/createPromotion").post(createPromotion, boomHandler);
router.route("/getPromotion").get(getPromotions, boomHandler);

module.exports = router;
