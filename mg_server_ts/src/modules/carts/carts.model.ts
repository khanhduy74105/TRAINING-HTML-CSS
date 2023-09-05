import mongoose from "mongoose";
import { ICart } from "types";

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

export default mongoose.model<ICart>("cart", Cart);
