const CartProductsModel = require("./cart-products.model");
class service {
  async findOneById(id) {
    const cartItems = await CartProductsModel.findOne({ _id: id });
    return { data: cartItems, success: true, msg: "Success!!" };
  }
  async getCartItems({ cart_id }) {
    const cartItems = await CartProductsModel.find({ cart_id });
    return { success: true, msg: "success", data: cartItems };
  }

  async addToCart({ product_id, cart_id }) {
    const exitedItem = await CartProductsModel.findOne({
      product_id,
      cart_id,
    });

    if (exitedItem) {
      exitedItem.quantity = exitedItem.quantity + 1;
      await exitedItem.save();
      return { success: true, msg: "success", data: exitedItem };
    }

    const item = await CartProductsModel.create({
      product_id,
      cart_id,
      quantity: 1,
    });

    return { success: true, msg: "success", data: item };
  }

  async updateCartItem(updateData) {
    const updatedItem = await CartProductsModel.findOneAndUpdate(
      { _id: updateData.cart_product_id },
      {
        quantity: updateData.quantity,
      },
      { new: true }
    );
    return { success: true, msg: "success", data: updatedItem };
  }

  async deleteCartItem(id) {
    const deleted = await CartProductsModel.findOneAndDelete(
      {
        _id: id,
      },
      { new: true }
    );
    return { success: true, msg: "success", data: deleted };
  }
}

module.exports = service;
