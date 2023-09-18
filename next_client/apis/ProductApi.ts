import myFetch from "@/utils/myFetch";

class ProductApi {
  static getProducts = () => myFetch("products", "GET");
};
export default ProductApi;
