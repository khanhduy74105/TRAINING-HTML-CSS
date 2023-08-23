const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "db.json");
const readDb = require("../utils/readDb");
class Cart {
  getCart() {
    const jsonData = readDb();
    const cart = jsonData.your_cart;
    return cart;
  }

  addCartItem(id) {
    const jsonData = readDb();
    const currentItem = jsonData.your_cart.find((current) => current.id === id);
    if (!currentItem) {
      jsonData.your_cart.push({ id: id, quantity: 1 });
      const updateData = JSON.stringify(jsonData);
      fs.writeFileSync(filePath, updateData, "utf8");
      return { success: true, message: "Create Success" };
    }

    jsonData.your_cart = jsonData.your_cart.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );

    const updateData = JSON.stringify(jsonData);
    fs.writeFileSync(filePath, updateData, "utf8");
    return { success: true, message: "Update successfully" };
  }

  updateCartItem(item) {
    const jsonData = readDb();
    jsonData.your_cart = jsonData.your_cart.map((product) =>
      product.id === item.id ? item : product
    );
    const updateData = JSON.stringify(jsonData);
    fs.writeFileSync(filePath, updateData, "utf8");
    return { success: true, message: "Updated successfully" };
  }
  deleteCartItem(id) {
    const jsonData = readDb();
    jsonData.your_cart = jsonData.your_cart
      .map((product) => (product.id === id ? null : product))
      .filter((item) => item !== null);
    const updateData = JSON.stringify(jsonData);
    fs.writeFileSync(filePath, updateData, "utf8");
    return { success: true, message: "Deleted successfully" };
  }
}
module.exports = new Cart();
