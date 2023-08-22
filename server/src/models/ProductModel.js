const readDb = require("../utils/readDb");
class Product {
  getAll() {
    const products = [];
    const jsonData = readDb();
    const productsData = jsonData.products;
    products.push(...productsData);
    return products;
  }

  getById(id) {
    const jsonData = readDb();
    const productsData = jsonData.products;
    return productsData.find((item) => item.id === id) || {};
  }
}

module.exports = new Product();
