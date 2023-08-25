const { default: mongoose } = require("mongoose");
const productsModel = require("./products.model");

class service {
  async getProducts({ page = 1, limit = 6 }) {
    const products = await productsModel
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
    const product = await productsModel.findById(id);
    return { msg: "Success get product by id", success: true, data: product };
  }
}

module.exports = service;
