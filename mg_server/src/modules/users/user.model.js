const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "cart",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", User);
