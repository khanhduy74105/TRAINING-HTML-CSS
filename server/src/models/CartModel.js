const readDb = require("../utils/readDb");
const writeToDb = require("../utils/writeToDb");
class Cart {
  constructor(props) {
    this.id = props?.id;
    this.quantity = props?.quantity;
  }

  async findById(id) {
    const jsonData = await readDb();
    const item = jsonData.your_cart.find((item) => item.id === id);
    if (item) {
      this.id = id;
    }
    return item;
  }

  async save() {
    const jsonData = await readDb();
    const currentItem = jsonData.your_cart.find(
      (current) => current.id === this.id
    );
    if (!currentItem) {
      jsonData.your_cart.push({ id: this.id, quantity: 1 });
      const updateData = JSON.stringify(jsonData);
      return (await writeToDb(updateData)) && "Created";
    }
    
    jsonData.your_cart = jsonData.your_cart.map((product) =>
      product.id === this.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    const updateData = JSON.stringify(jsonData);
    return (await writeToDb(updateData)) && "Updated";
  }

  async update(item) {
    const jsonData = await readDb();
    jsonData.your_cart = jsonData.your_cart.map((product) =>
      product.id === this.id ? item : product
    );
    const updateData = JSON.stringify(jsonData);
    const success = await writeToDb(updateData);
    return { success, message: "update success" };
  }

  async delete() {
    const jsonData = await readDb();
    jsonData.your_cart = jsonData.your_cart
      .map((product) => (product.id === this.id ? null : product))
      .filter((item) => item !== null);
    const updateData = JSON.stringify(jsonData);
    const success = await writeToDb(updateData);
    return { success, message: "delete success" };
  }

  async getCart() {
    const jsonData = await readDb();
    const cart = jsonData.your_cart;
    return cart;
  }
}
module.exports = Cart;
