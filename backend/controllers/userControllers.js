const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const Boom = require("@hapi/boom");

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw Boom.badRequest(t("error:sharedErrors.allFieldsRequired"));

    const emailSplit = email.toLowerCase();

    const userDoc = await userModel.findOne({ email: emailSplit });
    if (!userDoc) throw Boom.badRequest(t("error:sharedErrors.userNotFound"));

    const isValidPassword = (await userDoc.password) === password;

    if (!isValidPassword)
      throw Boom.badRequest(t("error:sharedErrors.passwordNotMatchLogin"));

    /* transform userDoc getter function */
    const user = userDoc.toObject();

    return res.status(200).json({
      message: "User authenticated successfully",
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, rol } = req.body;
  try {
    if (!email || !password || !confirmPassword)
      throw Boom.badRequest("Complete all fields");
    if (password !== confirmPassword)
      throw Boom.badRequest("Passwords do not match");

    const userDoc = await userModel.findOne({ email: email.toLowerCase() });
    if (userDoc) throw Boom.badRequest("User with this email already exists");

    const user = await userModel.create({
      email: email.toLowerCase(),
      password,
      rol,
    });

    return res.status(201).json({
      status: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
});

const getInfoUserID = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  try {
    const userDoc = await userModel.findById(_id);
    if (!userDoc) throw Boom.badRequest("User not found");

    const user = userDoc.toObject();

    return res.status(200).json({
      status: true,
      message: "User information",
      user,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = { authUser, registerUser, getInfoUserID };
