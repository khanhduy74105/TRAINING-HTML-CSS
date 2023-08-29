require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDatabase;
