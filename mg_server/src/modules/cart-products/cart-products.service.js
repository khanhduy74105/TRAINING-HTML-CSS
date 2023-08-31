const CartProductsModel = require("./cart-products.model");
class cartProductService {
  static async checkExistedCartProductItem({ product_id, cart_id }) {
    const existedItem = await CartProductsModel.findOne({
      cart_id: cart_id,
      product_id: product_id,
    });

    return existedItem;
  }

  static async findOneById(id) {
    const cartItems = await CartProductsModel.findOne({ _id: id });
    return { data: cartItems, success: true, msg: "Success!!" };
  }
  static async getCartItems({ cart_id }) {
    const cartItems = await CartProductsModel.find({ cart_id });
    return { success: true, msg: "success", data: cartItems };
  }

  static async addToCart({ product_id, cart_id }) {
    const item = await CartProductsModel.create({
      product_id,
      cart_id,
      quantity: 1,
    });

    return item;
  }

  static async updateCartItem(_id, item) {
    const updatedItem = await CartProductsModel.findOneAndUpdate(
      { _id: _id },
      {
        quantity: item.quantity,
      },
      { new: true }
    );
    return updatedItem;
  }

  static async deleteCartItem(id) {
    const deleted = await CartProductsModel.findOneAndDelete(
      {
        _id: id,
      },
      { new: true }
    );
    return deleted && null;
  }
}

module.exports = cartProductService;
