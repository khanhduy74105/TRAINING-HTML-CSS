const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const cart_productsRoute = require("./cart_productsRoute");

const Route = (app) => {
  app.use("/user", userRoute);
  app.use("/products", productRoute);
  app.use("/user/cart/my", cart_productsRoute);
};

module.exports = Route;
