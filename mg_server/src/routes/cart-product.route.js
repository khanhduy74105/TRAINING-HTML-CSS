const router = require("express").Router();
const loginRequire = require("../middlewares/loginRequire.middleware");
const verifyCart = require("../middlewares/verifyCart.middleware");
const cartProductsController = require("../modules/cart-products/cart-products.controller");

router.get("/my", loginRequire, cartProductsController.getCartItem);
router.post("/", loginRequire, cartProductsController.addToCart);

router.put(
  "/",
  loginRequire,
  verifyCart,
  cartProductsController.updateItemCart
);
router.delete(
  "/",
  loginRequire,
  verifyCart,
  cartProductsController.deleteItemCart
);
module.exports = router;
