const router = require("express").Router();
const loginRequire = require("../middlewares/loginRequire.middleware");
const verifyCart = require("../middlewares/verifyCart.middleware");
const cartProductsController = require("../modules/cart-products/cart-products.controller");

router.get("/my", loginRequire, cartProductsController.getCartItem);
router.post("/", loginRequire, cartProductsController.addToCart);

router.put(
  "/",
  loginRequire,
  verifyCart((req) => req.body.cart_product_id),
  cartProductsController.updateItemCart
);
router.delete(
  "/:cart_product_id",
  loginRequire,
  verifyCart((req) => req.params.cart_product_id),
  cartProductsController.deleteItemCart
);
module.exports = router;
