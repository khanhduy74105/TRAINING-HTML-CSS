import mongoose from "mongoose";
import { IProduct } from "types";
const Product = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("product", Product);
