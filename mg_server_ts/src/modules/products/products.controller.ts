import { StatusCodes } from 'http-status-codes'
import { failedResponse } from "../../helpers/ErrorsHandlers/index";
import mongoose from "mongoose";
import { Response, Request } from 'express';
import ProductService from '../products/products.service'
import { ProductDTO } from './dto/ProductDTO';
class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const query = req.query;
      const { page, limit }: ProductDTO = query;
      const products = await ProductService.getProducts({ page, limit });
      return res.status(StatusCodes.OK).json({
        success: true,
        msg: "Get products success",
        products: products,
      });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error when getProducts"));
    }
  }
  async getDetailProduct(req: Request, res: Response) {
    try {
      const params = req.params;
      const { product_id } = params;
      const isValidId = mongoose.Types.ObjectId.isValid(product_id);

      if (!isValidId) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(failedResponse("ID invalid in getProduct by id"));
      }

      const productData = await ProductService.getProductById(product_id);
      if (productData) {
        return res.status(StatusCodes.OK).json({
          success: true,
          msg: "get product by id success",
          data: productData,
        });
      }

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(failedResponse("Failed in getProduct by id"));
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(failedResponse("Internal error when getProduct by id"));
    }
  }
}

export default new ProductController();
