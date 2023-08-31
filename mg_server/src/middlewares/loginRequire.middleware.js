const jwt = require("jsonwebtoken");
const constants = require("../constants");
const CartService = require("../modules/carts/carts.service");
const loginRequire = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(constants.HTTP_UNAUTHORIZED)
      .json({ msg: "Login first", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVITE_KEY);
    if (!decoded) {
      return res
        .status(constants.HTTP_UNAUTHORIZED)
        .json({ msg: "UNAUTHORIZED" });
    }
    // const cartService = new CartService();
    // const cart = await cartService.getCartById(decoded.user_id);
    req.user_id = decoded.user_id;
    // req.cart_id = cart._id
    next();
  } catch (error) {
    return res
      .status(constants.HTTP_INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal error" });
  }
};

module.exports = loginRequire;
