import myFetch from "@/utils/myFetch";

class ProductApi {
  static getProducts = () => myFetch("products", "GET");
  static getProductById = (_id:string) => myFetch(`products/${_id}`, "GET");
};
export default ProductApi;
