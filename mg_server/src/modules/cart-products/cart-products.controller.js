const CartProductService = require("./cart-products.service");
const CartService = require("../cart/cart.service");

const constants = require("../../constants");
const { default: mongoose } = require("mongoose");
const cartModel = require("../cart/cart.model");
class CartProductController {
  async addToCart(req, res) {
    const cartProductService = new CartProductService();
    const cartService = new CartService();
    const { product_id } = req.body;
    const { user_id } = req;
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid product id or cart id",
      });
    }

    const userCart = await cartService.getCartById(user_id);
    const respone = await cartProductService.addToCart({
      product_id,
      cart_id: userCart._id
    });
    if (respone.success) {
      return res.status(constants.HTTP_OK).json(respone);
    }
    return res.status(constants.HTTP_BAD_REQUEST).json({ respone: "ss" });
  }

  async updateItemCart(req, res) {
    const cartProductService = new CartProductService();
    const { cart_product_id, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(cart_product_id)) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid cart_product_id or cart id",
      });
    }
    const respone = await cartProductService.updateCartItem({
      cart_product_id,
      quantity: parseInt(quantity),
    });
    return res.json(respone);
  }

  async deleteItemCart(req, res) {
    const cartProductService = new CartProductService();
    const { cart_product_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(cart_product_id)) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid cart_product_id",
      });
    }
    const respone = await cartProductService.deleteCartItem(cart_product_id);
    return res.json(respone);
  }

  async getCartItem(req, res) {
    const cartProductService = new CartProductService();
    const cartService = new CartService();
    const { user_id } = req;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid userId",
      });
    }
    const cart = await cartService.getCartById(user_id);

    const respone = await cartProductService.getCartItems({
      cart_id: cart._id,
    });

    return res.json(respone);
  }
}

module.exports = new CartProductController();
