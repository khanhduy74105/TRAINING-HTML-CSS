import CartService from "../modules/carts/carts.service";
import CartProductService from '../modules/cart-products/cart-products.service'
import { StatusCodes } from 'http-status-codes'
import { ReqBodyLogined } from "types";
import { NextFunction, Response } from "express";
const verifyCart = (cb: Function) => {
    return async (req: ReqBodyLogined, res: Response, next: NextFunction) => {
        const cart_product_id = cb(req);
        try {
            const cart = await CartService.getCartById(req.user_id);
            const cart_product_item = await CartProductService.findOneById(
                cart_product_id
            );
            if (!cart_product_item || !cart) {
                return res
                    .status(StatusCodes.NOT_FOUND)
                    .json({ msg: "Didnt find this item or cart._id", success: false });
            }

            if (cart._id.toString() !== cart_product_item.cart_id.toString()) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    msg: "Not the same cart_id in cart",
                });
            }
            next();
        } catch (error) { }
    };
};
export default verifyCart;
