const express = require("express");
const apiRouter = express.Router();
const userRoute = require("./users.route");
const productRoute = require("./products.route");
const cartProductsRoute = require("./cart-products.route");

const Route = (app) => {
  apiRouter.use("/users", userRoute);
  apiRouter.use("/products", productRoute);
  apiRouter.use("/cart-products", cartProductsRoute);


  app.use("/api", apiRouter);
};

module.exports = Route;
