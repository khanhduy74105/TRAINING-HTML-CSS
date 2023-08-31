const Cart = require("./carts.model");
class CartService {
  static async createCart(userId) {
    const cart = await Cart.create({ user_id: userId });
    return cart || false;
  }
  static async getCartById(userId) {
    const cart = await Cart.findOne({ user_id: userId });
    return cart || false;
  }
}

module.exports = CartService;
