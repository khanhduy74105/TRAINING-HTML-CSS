const router = require("express").Router();
const productController = require("../modules/products/products.controller");

router.get("/", productController.getProducts);
router.get("/:product_id", productController.getDetailProduct);

module.exports = router;
