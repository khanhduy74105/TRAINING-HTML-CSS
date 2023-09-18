import myFetch from "@/utils/myFetch";

class CartProductsApi {
  static addProduct = (product_id: string) =>
    myFetch("cart-products", "POST", {
      product_id: product_id,
    });
  static getCartProducts = async () => {
    const response = await myFetch("cart-products/my", "GET");
    const items = response.data.map((current: any) => ({
      item: current.product_id,
      amount: current.quantity,
      _id: current._id,
    }));
    return items;
  };
  static updateCartProduct = (_id: string, amount: number) =>
    myFetch("cart-products", "PUT", {
      cart_product_id: _id,
      quantity: amount,
    });
  static deleteCartProduct = (id: string) =>
    myFetch(`cart-products/${id}`, "DELETE");
}
export default CartProductsApi;
