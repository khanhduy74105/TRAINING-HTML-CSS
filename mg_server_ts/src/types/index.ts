import { Request } from "express";
import { Date, Types } from "mongoose";

export interface IProduct {
    _id: Types.ObjectId,
    name: string,
    price: number,
    images: [string],
    createdAt: Date,
    updatedAt: Date
}
export interface IUser {
    _id: Types.ObjectId,
    password: string,
    username: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
}
export interface ICart {
    _id: Types.ObjectId,
    user_id: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export interface ICartProduct {
    _id?: Types.ObjectId,
    cart_id?: Types.ObjectId,
    quantity?: number,
    product_id?: Types.ObjectId,
    images: [string],
    createdAt: Date,
    updatedAt: Date
}
export interface ReqBodyLogined extends Request {
    user_id: Types.ObjectId
}