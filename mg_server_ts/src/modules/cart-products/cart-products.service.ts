import { ICartProduct } from "types";
import CartProductsModel from "./cart-products.model";
import { CartProductsDTO } from "./dto/CartProductsDTO";
import { Types } from "mongoose";

class CartProductService {

    static async checkExistedCartProductItem(cartProduct: CartProductsDTO) {
        const existedItem: ICartProduct = await CartProductsModel.findOne({
            cart_id: cartProduct.cart_id,
            product_id: cartProduct.product_id,
        });

        return existedItem || null;
    }

    static async findOneById(id: Types.ObjectId) {
        const cartItem: ICartProduct = await CartProductsModel.findOne({ _id: id });
        return cartItem
    }

    static async getCartItems({ cart_id }: CartProductsDTO) {
        const cartItems: ICartProduct[] = await CartProductsModel.find({ cart_id });
        return cartItems
    }

    static async addToCart(cartProductItem: CartProductsDTO) {
        const item = await CartProductsModel.create({ ...cartProductItem, quantity: 1 });
        return item;
    }

    static async updateCartItem(_id: Types.ObjectId, item: ICartProduct) {
        const updatedItem: ICartProduct = await CartProductsModel.findOneAndUpdate(
            { _id: _id },
            {
                quantity: item.quantity,
            },
            { new: true }
        );
        return updatedItem;
    }

    static async deleteCartItem(id: Types.ObjectId) {
        const deleted = await CartProductsModel.findOneAndDelete(
            {
                _id: id,
            },
            { new: true }
        );
        return deleted && null;
    }
}
export default CartProductService;
