const CartModel = require("../models/CartModel");
class CartService {
  async getCart() {
    const cart = new CartModel();
    return await cart.getCart();
  }
  async addCartItem(id) {
    const newCartItem = new CartModel({ id: id });
    const saved = await newCartItem.save();
    return saved;
  }
  async updateCartItem(item) {
    const cartItem = new CartModel();
    const isFOund = await cartItem.findById(item.id);
    if (isFOund) {
      const updated = await cartItem.update(item);
      return updated;
    }

    return "Item not exist";
  }
  async deleteCartItem(id) {
    const cartItem = new CartModel();
    const isFound = await cartItem.findById(id);
    if (isFound) {
      const deleted = await cartItem.delete(id);
      return deleted;
    }
    return "Item not exist";
  }
}

module.exports = new CartService();
