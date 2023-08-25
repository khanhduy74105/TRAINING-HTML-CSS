const Service = require("./cart_products.service");
const constants = require("../../constants");
const { default: mongoose } = require("mongoose");
class controller {
  async addToCart(req, res) {
    const service = new Service();
    const { cart_id } = req;
    const { product_id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(cart_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid product id or cart id",
      });
    }

    const respone = await service.addToCart({
      cart_id,
      product_id,
    });
    if (respone.success) {
      return res.status(constants.HTTP_OK).json(respone);
    }
    return res.status(constants.HTTP_BAD_REQUEST).json(respone);
  }

  async updateItemCart(req, res) {
    const service = new Service();
    const { cart_id } = req;
    const { product_id } = req.params;
    const { quantity } = req.body;
    if (
      !mongoose.Types.ObjectId.isValid(cart_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid product id or cart id",
      });
    }
    const respone = await service.updateCartItem({
      cart_id,
      product_id,
      quantity: parseInt(quantity),
    });
    return res.json(respone);
  }

  async deleteItemCart(req, res) {
    const service = new Service();
    const { cart_id } = req;
    const { product_id } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(cart_id) ||
      !mongoose.Types.ObjectId.isValid(product_id)
    ) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid product id or cart id",
      });
    }
    const respone = await service.deleteCartItem({
      cart_id,
      product_id,
    });
    return res.json(respone);
  }

  async getCartItem(req, res) {
    const service = new Service();
    const { cart_id } = req;
    if (!mongoose.Types.ObjectId.isValid(cart_id)) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid product id or cart id",
      });
    }

    const respone = await service.getCartItems({
      cart_id,
    });
    return res.json(respone);
  }
}

module.exports = new controller();
