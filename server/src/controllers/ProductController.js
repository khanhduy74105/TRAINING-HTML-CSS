const ProductService = require("../services/ProductService");

class ProductController {
  getAllProducts(req, res) {
    return res.json(ProductService.getAll());
  }

  getProductById(req, res) {
    const { id } = req.params;
    console.log(id)
    return res.json(ProductService.getProductById(id));
  }
}

module.exports = new ProductController();
