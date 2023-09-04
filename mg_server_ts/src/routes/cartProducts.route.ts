import { Router } from "express";
import CartProductsController from '../modules/cart-products/cart-products.controller'
import loginRequire from "../middlewares/loginRequire.middleware";
import verifyCart from "../middlewares/verifyCart.middleware";
import { ReqBodyLogined } from "types";
const router = Router()

router.get("/my", loginRequire, CartProductsController.getCartItems);
router.post("/", loginRequire, CartProductsController.addToCart);

router.put(
    "/",
    loginRequire,
    verifyCart((req: ReqBodyLogined) => req.body.cart_product_id),
    CartProductsController.updateItemCart
);
router.delete(
    "/:cart_product_id",
    loginRequire,
    verifyCart((req: ReqBodyLogined) => req.params.cart_product_id),
    CartProductsController.deleteItemCart
);


export default router