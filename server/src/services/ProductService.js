const ProductModel = require("../models/ProductModel");
class ProductService {
  getAll() {
    return ProductModel.getAll();
  }
  getProductById(id) {
    return ProductModel.getById(id);
  }
}

module.exports = new ProductService();
