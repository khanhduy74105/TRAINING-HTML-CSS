const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Product = require("./modules/products/products.model");
const connectToDB = require("../src/db/db.connect");

const randomProducts = async (n) => {
  const products = [];
  if (n <= 0) return [];

  for (let i = 0; i < n; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 200, max: 2000 }),
      images: [faker.image.url(400, 400), faker.image.url(400, 400)],
    };
    products.push(product);
  }
  await Product.insertMany(products);
  console.log("Products inserted successfully");
};

async function main() {
  try {
    await connectToDB();

    await randomProducts(12);
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
