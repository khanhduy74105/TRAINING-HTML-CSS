const mongoose = require("mongoose");

const CartProductsModel = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart-products", CartProductsModel);
