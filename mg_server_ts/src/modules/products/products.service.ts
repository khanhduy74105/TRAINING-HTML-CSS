import BaseService from "../../helpers/BaseService";
import { ProductDTO } from "./dto/ProductDTO";
import ProductsModel from "./products.model";
import { IProduct } from "types";
class ProductService extends BaseService<IProduct> {
  static instance = new ProductService(ProductsModel)

  getProducts({ page = 1, limit = 6 }: ProductDTO) {
    const products = ProductService.instance.find({})
      .limit(page * limit)
      .skip((page - 1) * limit);
    return products;
  }

  getProductById(id) {
    const product = ProductService.instance.findOneById(id);
    return product;
  }
}

export default ProductService.instance;
