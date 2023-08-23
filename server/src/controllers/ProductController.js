const ProductService = require("../services/ProductService");

class ProductController {
  async getAllProducts(req, res) {
    const data = await ProductService.getAll();
    return res.json(data);
  }
  async getProductById(req, res) {
    const { id } = req.params;
    return res.json(await ProductService.getProductById(id));
  }
}
module.exports = new ProductController();
