import { Types } from 'mongoose';
import Cart from './carts.model'
import { ICart } from 'types';
import BaseService from "../../helpers/BaseService";
class CartService extends BaseService<ICart> {
  static cart_instance = new BaseService(Cart)
  static async createCart(userId: Types.ObjectId) {
    const cart: ICart | any = await this.cart_instance.create({ user_id: userId });
    return cart || false;
  }
  static async getCartById(userId: Types.ObjectId) {
    const cart: ICart = await Cart.findOne({ user_id: userId });
    return cart || false;
  }
}

export default CartService;
