const ProductRoute = require("./ProductRoutes");
const CartRoute = require("./CartRoute");

const Route = (app) => {
  app.use("/api/products", ProductRoute);
  app.use("/api/your_cart", CartRoute);
};

module.exports = Route;
