const CartService = require("./carts.service");
class CartController {
  async createCart(req, res) {
    try {
      const body = req.body;
      const { user_id } = body;
      const respone = CartService.createCart(user_id);
      return res.json(respone);
    } catch (error) {
      return res
        .status(constants.HTTP_INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error when createCart"));
    }
  }
}

module.exports = new CartController();
