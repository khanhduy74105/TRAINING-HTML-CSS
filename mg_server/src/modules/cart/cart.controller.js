const CartService = require("./cart.service");
class CartController {
  async createCart(req, res) {
    const body = req.body;
    const { user_id } = body;
    const cartService = new CartService();
    const respone = cartService.createCart(user_id);
    return res.json(respone);
  }
}

