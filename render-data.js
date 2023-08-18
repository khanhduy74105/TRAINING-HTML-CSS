const fs = require("fs");
const { faker } = require("@faker-js/faker");

const randomProducts = (n) => {
  const produsts = [];
  if (n <= 0) return [];
  Array.from(new Array(n)).forEach(() => {
    const _product = {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 200, max: 2000 }),
      images: [faker.image.url(400, 400), faker.image.url(400, 400)],
    };
    produsts.push(_product);
  });
  return produsts;
};

function main() {
  const products = randomProducts(12);
  const db = {
    products: products,
    your_cart: [],
    cart_subtotal: {}
  };
  fs.writeFile("./db.json", JSON.stringify(db), () => {
    console.log("Write successfully");
  });
}

main();
