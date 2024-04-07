const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { boomHandler } = require("../middlewares/errorMiddleware");

const {
  authUser,
  registerUser,
  getInfoUserID,
} = require("../controllers/userControllers");

router.route("/login").post(authUser, boomHandler);
router.route("/register").post(registerUser, boomHandler);

router.route("/userInfo/:id").get(protect, getInfoUserID, boomHandler);

module.exports = router;
