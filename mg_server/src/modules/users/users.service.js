const User = require("./users.model");
const Cart = require("../carts/carts.model");
const { comparePassword, generateAccessToken } = require("./utils");
class UserService {
  static async createUser(userData) {
    const user = await User.create(userData);
    if (user) {
      const cart = await Cart.create({ user_id: user.id });
      user.cart = cart._id;
      await user.save();
      const createdUser = await User.findOne({
        username: userData.username,
      }).exec();
      return createdUser;
    }
    return null;
  }

  static async loginUser(userData) {
    const currentUser = await User.findOne({ username: userData.username });
    if (!currentUser) {
      return { msg: "Do not find this user", success: false };
    }

    const isValid = await comparePassword(
      userData.password,
      currentUser.password
    );
    if (!isValid) {
      return false;
    }

    const access_token = generateAccessToken(currentUser);
    return access_token;
  }

  static async getUserInfo(userId) {
    const userInfo = await User.findById(userId);
    return userInfo
  }

  static async checkUserExisted(username) {
    const exitedUser = await User.findOne({ username: username });
    return exitedUser;
  }
}

module.exports = UserService;
