const express = require("express");
const router = express.Router();
const { boomHandler } = require("../middlewares/errorMiddleware");

const { authUser, registerUser } = require("../controllers/userControllers");

router.route("/login").post(authUser, boomHandler);
router.route("/register").post(registerUser, boomHandler);

module.exports = router;
