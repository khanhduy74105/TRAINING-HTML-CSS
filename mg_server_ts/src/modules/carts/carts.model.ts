import mongoose from "mongoose";

const Cart = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("cart", Cart);
