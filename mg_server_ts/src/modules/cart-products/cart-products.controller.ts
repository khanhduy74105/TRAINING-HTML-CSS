import { failedResponse } from "../../helpers/ErrorsHandlers";
import mongoose from "mongoose";
import { Response, Request } from "express";
import { ReqBodyLogined } from "../../types";
import CartService from '../carts/carts.service'
import { StatusCodes } from 'http-status-codes'
import CartProductService from './cart-products.service'
import { CartProductsDTO } from "./dto/CartProductsDTO";

class CartProductController {
    async addToCart(req: ReqBodyLogined, res: Response) {
        try {
            const { product_id } = req.body;
            const { user_id } = req;

            if (!mongoose.Types.ObjectId.isValid(product_id)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: "Invalid product id or cart id",
                });
            }

            const userCart = await CartService.getCartById(user_id);

            if (!userCart) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: "Invalid cart of user",
                });
            }

            const existedCartItem =
                await CartProductService.checkExistedCartProductItem({
                    cart_id: userCart._id,
                    product_id,
                });

            if (existedCartItem) {
                const updatedCartItem = await CartProductService.updateCartItem(
                    existedCartItem._id,
                    {
                        ...existedCartItem,
                        quantity: existedCartItem.quantity + 1
                    }
                );

                return updatedCartItem
                    ? res.status(StatusCodes.CREATED).json({
                        success: true,
                        msg: "Updated!",
                        data: updatedCartItem,
                    })
                    : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        msg: "Updated failed!",
                        data: null,
                    });
            } else {
                const createdCartItem = await CartProductService.addToCart({
                    product_id: product_id,
                    cart_id: userCart._id,
                });
                return createdCartItem
                    ? res.status(StatusCodes.CREATED).json({
                        success: true,
                        msg: "Created item!",
                        data: createdCartItem,
                    })
                    : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: true,
                        msg: "Created item failed!",
                        data: null,
                    });
            }
        } catch (error) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(failedResponse("Internal error"));
        }
    }

    async updateItemCart(req: Request, res: Response) {
        try {
            const { cart_product_id, quantity }: CartProductsDTO = req.body;
            if (!mongoose.Types.ObjectId.isValid(cart_product_id)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: "Invalid cart_product_id",
                });
            }
            const updatedItem = await CartProductService.updateCartItem(
                cart_product_id,
                {
                    _id: cart_product_id,
                    quantity: quantity
                }
            );
            return res.status(StatusCodes.OK).json({
                success: true,
                msg: "updated success",
                data: updatedItem,
            });
        } catch (error) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(failedResponse("Internal error"));
        }
    }

    async deleteItemCart(req: Request, res: Response) {
        try {
            const { cart_product_id }: CartProductsDTO = req.params;
            if (!mongoose.Types.ObjectId.isValid(cart_product_id)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: "Invalid cart_product_id",
                });
            }
            const deleted = await CartProductService.deleteCartItem(cart_product_id);
            return res.status(StatusCodes.OK).json({
                success: true,
                msg: "deleted success",
                data: deleted,
            });
        } catch (error) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(failedResponse("Internal error"));
        }
    }

    async getCartItems(req: ReqBodyLogined, res: Response) {
        const { user_id } = req;
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                msg: "Invalid userId",
            });
        }
        const cart = await CartService.getCartById(user_id);

        if (!cart) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                msg: "dont have cart with userId",
            });
        }
        const cartItems = await CartProductService.getCartItems({
            cart_id: cart._id,
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            msg: "oke",
            data: cartItems
        });
    }
}

export default new CartProductController();