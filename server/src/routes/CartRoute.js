const express = require("express");
const CartController = require("../controllers/CartController");
const router = express.Router();

router.get("/", CartController.getCart);
router.post("/add", CartController.addToCart);
router.put("/update/:id", CartController.updateCartItem);
router.delete("/remove/:id", CartController.deleteCartItem);

module.exports = router;
