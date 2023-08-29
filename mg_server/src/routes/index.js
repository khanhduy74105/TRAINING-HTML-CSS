const express = require("express");
const apiRouter = express.Router();
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const cartProductsRoute = require("./cart-product.route");

const Route = (app) => {
  apiRouter.use("/user", userRoute);
  apiRouter.use("/products", productRoute);
  apiRouter.use("/user/cart", cartProductsRoute);


  app.use("/api", apiRouter);
};

module.exports = Route;
