require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.generateAccessToken = (data) => {
  const access_token = jwt.sign(
    {
      username: data.username,
      role: data.role || "user",
      cart_id: data.cart,
    },
    process.env.JWT_PRIVITE_KEY
  );
  return access_token;
};

exports.comparePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};
