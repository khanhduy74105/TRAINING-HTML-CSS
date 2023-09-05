import { ICartProduct } from "types";
import CartProductsModel from "./cart-products.model";
import { CartProductsDTO } from "./dto/CartProductsDTO";
import { Types } from "mongoose";
import BaseService from "../../helpers/BaseService";

class CartProductService extends BaseService<ICartProduct>{

    static cartProducts_service_instance = new CartProductService(CartProductsModel)

    async checkExistedCartProductItem(cartProduct: CartProductsDTO) {
        const existedItem: ICartProduct = await CartProductService.cartProducts_service_instance.findOne({
            cart_id: cartProduct.cart_id,
            product_id: cartProduct.product_id,
        });

        return existedItem || null;
    }

    async getCartItems({ cart_id }: CartProductsDTO) {
        const cartItems: ICartProduct[] = await CartProductService.cartProducts_service_instance.find({ cart_id });
        return cartItems
    }

    async addToCart(cartProductItem: CartProductsDTO) {
        const item = await CartProductService.cartProducts_service_instance.create({ ...cartProductItem, quantity: 1 });
        return item;
    }

    async updateCartItem(_id: Types.ObjectId, item: Partial<ICartProduct>) {
        const updatedItem: ICartProduct = await CartProductService.cartProducts_service_instance.findOneAndUpdate(
            { _id: _id },
            {
                quantity: item.quantity,
            },
            { new: true }
        );
        return updatedItem;
    }

    async deleteCartItem(id: Types.ObjectId) {
        const deleted = await CartProductService.cartProducts_service_instance.findOneByIdAndDelete(
            id,
            { new: true }
        );
        return deleted && null;
    }
}
export default CartProductService.cartProducts_service_instance;
