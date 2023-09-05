import { Types } from 'mongoose';
import Cart from './carts.model'
import { ICart } from 'types';
import BaseService from "../../helpers/BaseService";
class CartService extends BaseService<ICart> {
  static cart_instance = new CartService(Cart)
  createCart(userId: Types.ObjectId) {
    return CartService.cart_instance.create({ user_id: userId });
  }
  getCartById(userId: Types.ObjectId) {
    return CartService.cart_instance.findOne({ user_id: userId });
  }
}

export default CartService.cart_instance;
