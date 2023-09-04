import { Types } from "mongoose"

export type CartProductsDTO = {
    cart_product_id?: Types.ObjectId,
    cart_id?: Types.ObjectId,
    product_id?: Types.ObjectId,
    quantity?: number
}