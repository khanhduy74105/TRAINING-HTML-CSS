import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { ReqBodyLogined } from '../types'

const loginRequire = async (req: ReqBodyLogined, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: ReasonPhrases.UNAUTHORIZED, success: false });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_PRIVITE_KEY);
    if (!decoded) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: ReasonPhrases.UNAUTHORIZED, success: false });
    }
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal error" });
  }
};

export default loginRequire
