const constants = require("../../constants");
const UserService = require("./user.service");
const bcrypt = require("bcrypt");

class UserController {
  async register(req, res) {
    const userService = new UserService();
    const body = req.body;
    const { username, password } = body;
    if (!username || !password) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Missing field",
      });
    }

    const salt = await bcrypt.genSalt(constants.SALT_LENGTH);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = await userService.createUser({
      username: username,
      password: hashedPassword,
    });

    if (response.success) {
      res.cookie("access_token", response.access_token, {
        httpOnly: true,
        secure: true,
        domain: "localhost",
        path: "/",
        sameSite: "None",
      });
      return res.status(constants.HTTP_OK).json({
        ...response,
      });
    }

    return res.status(constants.HTTP_BAD_REQUEST).json({
      success: false,
      msg: "Create failed",
      ...response,
    });
  }

  async login(req, res) {
    const userService = new UserService();
    const body = req.body;
    const { username, password } = body;
    if (!username || !password) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Missing field",
      });
    }

    const response = await userService.getUser({ username, password });
    if (response.success) {
      res.cookie("access_token", response.access_token, {
        httpOnly: true,
        secure: true,
        domain: "localhost",
        path: "/",
        sameSite: "None",
      });
      return res.status(constants.HTTP_OK).json({
        ...response,
      });
    }

    return res.status(constants.HTTP_BAD_REQUEST).json({
      ...response,
    });
  }
  async logout(req, res) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      domain: "localhost",
      path: "/",
      sameSite: "None",
    });

    return res.json({ success: true, msg: "logout!" });
  }

  async getUserInfo(req, res) {
    const { user_id } = req;
    const userWService = new UserService();
    const userInfo = await userWService.getUserInfo(user_id);

    return res.json(userInfo);
  }
}

module.exports = new UserController();
