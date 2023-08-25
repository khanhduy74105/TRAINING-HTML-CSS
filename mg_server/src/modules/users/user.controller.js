const constants = require("../../constants");
const Service = require("./user.service");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("./utils");

class controller {
  async register(req, res) {
    const service = new Service();
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

    const response = await service.createUser({
      username: username,
      password: hashedPassword,
    });

    if (response.success) {
      res.cookie("access_token", response.access_token, {
        httpOnly: true,
        secure: false,
        domain: "localhost",
        path: "/",
        // sameSite: "strict",
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
    const service = new Service();
    const body = req.body;
    const { username, password } = body;
    if (!username || !password) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Missing field",
      });
    }

    const response = await service.getUser({ username, password });
    if (response.success) {
      res.cookie("access_token", response.access_token, {
        httpOnly: true,
        secure: false,
        domain: "localhost",
        path: "/",
        // sameSite: "strict",
      });
    }

    return res.json({
      ...response,
    });
  }
}

module.exports = new controller();
