const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const unauthorized = (res) => {
  return res.status(401).json({ message: "Not authorized, token failed" });
};

const bearerCondition = (req) => {
  return (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith("Bearer")
  );
};
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, "VsvrgG7HSh872LaZHDRXWbN0tP6");
  } catch (err) {
    return false;
  }
};

const addUser = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (bearerCondition(req)) {
      token = req.headers.authorization.split(" ")[1];
      if (token && token !== "null") {
        const result = verifyJWT(token);
        if (result) {
          req.user = await User.findById(result.id).select("-password");
        } else {
          return jwt_expired(res);
        }
      }
    }
    next();
  } catch (err) {
    SentryEvent("error", err, "addUser");
    next(err);
  }
});

const protect = asyncHandler(async (req, res, next) => {
  if (bearerCondition(req)) addUser(req, res, next);
  else return unauthorized(res, "Not authorized, no token");
});

module.exports = { protect };
