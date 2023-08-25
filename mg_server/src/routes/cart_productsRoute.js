const router = require("express").Router();
const loginRequire = require("../middlewares/loginRequire");
const cart_productsController = require("../modules/cart_products/cart_products.controller");


router.get("/", loginRequire, cart_productsController.getCartItem);
router.post("/:product_id", loginRequire, cart_productsController.addToCart);
router.put(
  "/:product_id",
  loginRequire,
  cart_productsController.updateItemCart
);
router.delete(
  "/:product_id",
  loginRequire,
  cart_productsController.deleteItemCart
);
module.exports = router;
