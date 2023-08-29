const ProductService = require("./products.service");
const constants = require("../../constants");
class ProductController {
  async getProducts(req, res) {
    const productService = new ProductService();
    const query = req.query;
    const { page, limit } = query;
    const response = await productService.getProducts({ page, limit });
    if (response.success) {
      return res.status(constants.HTTP_OK).json({ ...response });
    }

    return res.status(constants.HTTP_BAD_REQUEST).json({});
  }
  async getDetailProduct(req, res) {
    const productService = new ProductService();
    const params = req.params;
    const { product_id } = params;
    const response = await productService.getProductById(product_id);
    if (response.success) {
      return res.status(constants.HTTP_OK).json({ ...response });
    }

    return res.status(constants.HTTP_BAD_REQUEST).json({ ...response });
  }
}

module.exports = new ProductController();
