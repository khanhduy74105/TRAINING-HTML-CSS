const CartProductService = require("./cart-products.service");
const CartService = require("../carts/carts.service");
const constants = require("../../constants");
const { default: mongoose } = require("mongoose");
const { failedResponse } = require("../../helpers/ErrorsHandlers");
class CartProductController {
  async addToCart(req, res) {
    try {
      const { product_id } = req.body;
      const { user_id } = req;

      if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return res.status(constants.HTTP_BAD_REQUEST).json({
          success: false,
          msg: "Invalid product id or cart id",
        });
      }

      const userCart = await CartService.getCartById(user_id);

      const existedCartItem =
        await CartProductService.checkExistedCartProductItem({
          cart_id: userCart._id,
          product_id,
        });

      if (existedCartItem) {
        const updatedCartItem = await CartProductService.updateCartItem(
          existedCartItem._id,
          { quantity: existedCartItem.quantity + 1 }
        );

        return updatedCartItem
          ? res.status(constants.HTTP_OK).json({
              success: true,
              msg: "Updated!",
              data: updatedCartItem,
            })
          : res.status(constants.HTTP_INTERNAL_SERVER_ERROR).json({
              success: false,
              msg: "Updated failed!",
              data: null,
            });
      } else {
        const createdCartItem = await CartProductService.addToCart({
          product_id,
          cart_id: userCart._id,
        });
        return createdCartItem
          ? res.status(constants.HTTP_CREATED).json({
              success: true,
              msg: "Created item!",
              data: createdCartItem,
            })
          : res.status(constants.HTTP_INTERNAL_SERVER_ERROR).json({
              success: true,
              msg: "Created item failed!",
              data: null,
            });
      }
    } catch (error) {
      return res
        .status(constants.HTTP_INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error"));
    }
  }

  async updateItemCart(req, res) {
    try {
      const { cart_product_id, quantity } = req.body;
      if (!mongoose.Types.ObjectId.isValid(cart_product_id)) {
        return res.status(constants.HTTP_BAD_REQUEST).json({
          success: false,
          msg: "Invalid cart_product_id or cart id",
        });
      }
      const updatedItem = await CartProductService.updateCartItem(
        cart_product_id,
        {
          quantity: parseInt(quantity),
        }
      );
      return res.status(constants.HTTP_OK).json({
        success: true,
        msg: "updated success",
        data: updatedItem,
      });
    } catch (error) {
      return res
        .status(constants.HTTP_INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error"));
    }
  }

  async deleteItemCart(req, res) {
    try {
      const { cart_product_id } = req.params;
      console.log(cart_product_id);
      if (!mongoose.Types.ObjectId.isValid(cart_product_id)) {
        return res.status(constants.HTTP_BAD_REQUEST).json({
          success: false,
          msg: "Invalid cart_product_id",
        });
      }
      const deleted = await CartProductService.deleteCartItem(cart_product_id);
      return res.status(constants.HTTP_OK).json({
        success: true,
        msg: "deleted success",
        data: deleted,
      });
    } catch (error) {
      return res
        .status(constants.HTTP_INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error"));
    }
  }

  async getCartItem(req, res) {
    const { user_id } = req;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Invalid userId",
      });
    }
    const cart = await CartService.getCartById(user_id);

    const respone = await CartProductService.getCartItems({
      cart_id: cart._id,
    });

    return res.json(respone);
  }
}

module.exports = new CartProductController();
