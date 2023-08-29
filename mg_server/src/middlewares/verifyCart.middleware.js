const CartService = require("../modules/cart/cart.service");
const CartProductService = require("../modules/cart-products/cart-products.service");
const constants = require("../constants");
const verifyCart = async (req, res, next) => {
  try {
    const { cart_product_id } = req.body;
    const cartService = new CartService();
    const cartProductService = new CartProductService();
    const cart = await cartService.getCartById(req.user_id);
    const cart_product_item = await cartProductService.findOneById(
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
  } catch (error) {
    return res.status(constants.HTTP_INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal error verifycart",
    });
  }
};

module.exports = verifyCart;
