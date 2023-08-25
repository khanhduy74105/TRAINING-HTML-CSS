const Cart = require("./cart.model");
class service {
  async createCart(userId) {
    const cart = await Cart.create({ user_id: userId });
    return cart || false;
  }
}

module.exports = service;
