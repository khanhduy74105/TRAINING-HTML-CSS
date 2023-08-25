const jwt = require("jsonwebtoken");
const constants = require("../constants");
const loginRequire = (req, res, next) => {
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
    req.cart_id = decoded.cart_id;
    next();
  } catch (error) {
    return res
      .status(constants.HTTP_INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal error" });
  }
};

module.exports = loginRequire;
