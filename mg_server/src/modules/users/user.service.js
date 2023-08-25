const User = require("./user.model");
const Cart = require("../cart/cart.model");
const { comparePassword, generateAccessToken } = require("./utils");
class Service {
  async createUser(userData) {
    const currentUser = await User.findOne({ username: userData.username });
    if (currentUser) {
      return { msg: "Username existed", success: false };
    }

    const user = await User.create(userData);
    if (user) {
      const cart = await Cart.create({ user_id: user.id });
      user.cart = cart._id;
      await user.save();
      const createdUser = await User.findOne({
        username: userData.username,
      }).exec();
      const access_token = generateAccessToken(createdUser);

      return {
        msg: "Created user",
        user: {
          username: createdUser.username,
          cart: createdUser.cart,
          role: createdUser.role,
        },
        success: true,
        access_token: access_token,
      };
    }
    return { msg: "Created failed", success: false };
  }
  async getUser(userData) {
    const currentUser = await User.findOne({ username: userData.username });
    if (!currentUser) {
      return { msg: "Do not find this user", success: false };
    }

    const isValid = await comparePassword(
      userData.password,
      currentUser.password
    );
    if (!isValid) {
      return { msg: "Password wrong", success: false };
    }

    const access_token = generateAccessToken(currentUser);
    return {
      msg: "login success",
      success: true,
      access_token: access_token,
      user: {
        username: currentUser.username,
        cart: currentUser.cart,
        role: currentUser.role,
      },
    };
  }
}

module.exports = Service;
