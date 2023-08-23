const ProductModel = require("../models/ProductModel");
class ProductService {
  async getAll() {
    const Product = new ProductModel();
    return await Product.getAll();
  }
  async getProductById(id) {
    const Product = new ProductModel();
    return await Product.getById(id);
  }
}

module.exports = new ProductService();
