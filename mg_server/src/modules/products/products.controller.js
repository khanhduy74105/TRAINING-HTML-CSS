const ProductService = require("./products.service");
const constants = require("../../constants");
const { failedResponse } = require("../../helpers/ErrorsHandlers");
const { default: mongoose } = require("mongoose");
class ProductController {
  async getProducts(req, res) {
    try {
      const query = req.query;
      const { page, limit } = query;
      const products = await ProductService.getProducts({ page, limit });
      return res.status(constants.HTTP_OK).json({
        success: true,
        msg: "Get products success",
        products: products,
      });
    } catch (error) {
      return res
        .status(constants.HTTP_INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error when getProducts"));
    }
  }
  async getDetailProduct(req, res) {
    try {
      const params = req.params;
      const { product_id } = params;
      const isValidId = mongoose.Types.ObjectId.isValid(product_id);

      if (!isValidId) {
        return res
          .status(constants.HTTP_INTERNAL_SERVER_ERROR)
          .json(failedResponse("ID invalid in getProduct by id"));
      }

      const productData = await ProductService.getProductById(product_id);
      if (productData) {
        return res.status(constants.HTTP_OK).json({
          success: true,
          msg: "get product by id success",
          data: productData,
        });
      }

      return res
        .status(constants.HTTP_BAD_REQUEST)
        .json(failedResponse("Failed in getProduct by id"));
    } catch (error) {
      return res
        .status(constants.HTTP_INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error when getProduct by id"));
    }
  }
}

module.exports = new ProductController();
