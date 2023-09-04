import { ProductDTO } from "./dto/ProductDTO";
import ProductsModel from "./products.model";
class ProductService {
  static async getProducts({ page = 1, limit = 6 }: ProductDTO) {
    const products = await ProductsModel.find()
      .limit(page * limit)
      .skip((page - 1) * limit);
    return products;
  }

  static async getProductById(id) {
    const product = await ProductsModel.findById(id);
    return product;
  }
}

export default ProductService;
