import mongoose from "mongoose";
import { ICartProduct } from "types";

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

export default mongoose.model<ICartProduct>("cart-products", CartProductsModel);
