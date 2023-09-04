import { Request } from "express";
import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId,
    username: string,
    role: string,
    cart: Types.ObjectId,
}

export interface ICart {
    _id: Types.ObjectId,
    user_id: Types.ObjectId,
}

export interface ICartProduct {
    _id?: Types.ObjectId,
    cart_id?: Types.ObjectId,
    quantity?: number,
    product_id?: Types.ObjectId,
}
export interface ReqBodyLogined extends Request {
    user_id: Types.ObjectId
}