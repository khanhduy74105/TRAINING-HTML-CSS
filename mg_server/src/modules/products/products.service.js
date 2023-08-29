const { default: mongoose } = require("mongoose");
const ProductsModel = require("./products.model");

class ProductService {
  async getProducts({ page = 1, limit = 6 }) {
    const products = await ProductsModel
      .find()
      .limit(page * limit)
      .skip((page - 1) * limit);
    return { msg: "Success get products", success: true, data: products };
  }

  async getProductById(id) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      return { msg: "Product Id is invalid", success: false };
    }
    const product = await ProductsModel.findById(id);
    return { msg: "Success get product by id", success: true, data: product };
  }
}

module.exports = ProductService;
