const CartModel = require("../models/CartModel");
class CartService {
  getCart() {
    return CartModel.getCart();
  }
  addCartItem(id) {
    return CartModel.addCartItem(id);
  }
  updateCartItem(item) {
    return CartModel.updateCartItem(item);
  }
  deleteCartItem(id) {
    return CartModel.deleteCartItem(id);
  }
}

module.exports = new CartService();
