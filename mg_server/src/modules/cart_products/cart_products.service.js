const Cart_Products = require("./cart_products.model");
class service {
  async getCartItems({ cart_id }) {
    const cartItems = await Cart_Products.find({ cart_id });
    return { success: true, msg: "success", data: cartItems };
  }

  async addToCart({ product_id, cart_id }) {
    const exitedItem = await Cart_Products.findOne({ product_id, cart_id });
    if (exitedItem) {
      const updatedItem = await this.updateCartItem({
        product_id,
        cart_id,
        quantity: exitedItem.quantity + 1,
      });

      return updatedItem;
    }

    const item = await Cart_Products.create({
      product_id,
      cart_id,
      quantity: 1,
    });

    return { success: true, msg: "success", data: item };
  }

  async updateCartItem({ product_id, cart_id, quantity }) {
    const updatedItem = await Cart_Products.findOneAndUpdate(
      { product_id, cart_id },
      {
        quantity: quantity,
      },
      { new: true }
    );
    return { success: true, msg: "success", data: updatedItem };
  }

  async deleteCartItem({ product_id, cart_id }) {
    const deleted = await Cart_Products.findOneAndDelete(
      {
        product_id,
        cart_id,
      },
      { new: true }
    );
    return { success: true, msg: "success", data: deleted };
  }
}

module.exports = service;
