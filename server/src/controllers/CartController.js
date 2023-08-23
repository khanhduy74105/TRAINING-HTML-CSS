const CartService = require("../services/CartService");

class CartController {
  async getCart(req, res) {
    return res.json(await CartService.getCart());
  }

  async addToCart(req, res) {
    const { id } = req.body;
    return res.json(await CartService.addCartItem(id));
  }

  async updateCartItem(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    return res.json(
      await CartService.updateCartItem({ id, quantity: parseInt(quantity) })
    );
  }

  async deleteCartItem(req, res) {
    const { id } = req.params;
    return res.json(await CartService.deleteCartItem(id));
  }
}

module.exports = new CartController();
