import { ICartProduct } from "@/types";

export const userSelector = (state: any) => state.user;

export function cartProductsSelector(state: any): ICartProduct[] {
  return state.cartProducts;
}
