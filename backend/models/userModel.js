const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    rol: {
      type: String,
      required: true,
    },
    terms_accepted: {
      type: Boolean,
      default: false,
    },
    newsletter_accepted: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
