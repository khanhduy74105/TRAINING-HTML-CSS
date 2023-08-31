const CartService = require("../modules/carts/carts.service");
const CartProductService = require("../modules/cart-products/cart-products.service");
const constants = require("../constants");
const verifyCart = (cb) => {
  return async (req, res, next) => {
    const cart_product_id = cb(req);
    try {
      const cart = await CartService.getCartById(req.user_id);
      const cart_product_item = await CartProductService.findOneById(
        cart_product_id
      );
      if (!cart_product_item.data) {
        return res
          .status(constants.HTTP_NOT_FOUND)
          .json({ msg: "Didnt find this item", success: false });
      }

      if (cart._id.toString() !== cart_product_item.data.cart_id.toString()) {
        return res.status(constants.HTTP_UNAUTHORIZED).json({
          success: false,
          msg: "Not the same cart_id in cart",
        });
      }
      next();
    } catch (error) {}
  };
};
module.exports = verifyCart;
