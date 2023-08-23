const readDb = require("../utils/readDb");
class Product {
  async getAll() {
    const products = [];
    const jsonData = await readDb();
    const productsData = jsonData.products;
    products.push(...productsData);
    return products;
  }

  async getById(id) {
    const jsonData = await readDb();
    const productsData = jsonData.products;
    return productsData.find((item) => item.id === id) || {};
  }
}
module.exports = Product;
