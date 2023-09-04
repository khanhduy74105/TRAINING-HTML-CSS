import { Router } from "express";
import ProductsController from '../modules/products/products.controller'
const router = Router()

router.get('/', ProductsController.getProducts)
router.get('/:product_id', ProductsController.getDetailProduct)


export default router