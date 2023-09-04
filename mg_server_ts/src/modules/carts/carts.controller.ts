import CartService from './carts.service'
import { Request, Response } from 'express';
import { failedResponse } from 'helpers/ErrorsHandlers';
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

class CartController {
  async createCart(req: Request, res: Response) {
    try {
      const body = req.body;
      const { user_id } = body;
      const respone = CartService.createCart(user_id);
      return res.status(StatusCodes.OK).json(respone);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(failedResponse(ReasonPhrases.INTERNAL_SERVER_ERROR));
    }
  }
}

export default new CartController();
