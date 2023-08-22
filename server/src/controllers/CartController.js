const CartService = require("../services/CartService");

class CartController {
  getCart(req, res) {
    return res.json(CartService.getCart());
  }

  addToCart(req, res) {
    const { id } = req.body;

    return res.json(CartService.addCartItem(id));
  }

  updateCartItem(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    return res.json(
      CartService.updateCartItem({ id, quantity: parseInt(quantity) })
    );
  }

  deleteCartItem(req, res) {
    const { id } = req.params;
    return res.json(CartService.deleteCartItem(id));
  }
}

module.exports = new CartController();
