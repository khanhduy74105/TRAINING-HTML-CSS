const Cart = require("./cart.model");
class CartService {
  async createCart(userId) {
    const cart = await Cart.create({ user_id: userId });
    return cart || false;
  }
  async getCartById(userId) {
    const cart = await Cart.findOne({ user_id: userId });
    return cart || false;
  }
}

module.exports = CartService;
