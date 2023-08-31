const constants = require("../../constants");
const UserService = require("./users.service");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("./utils");

class UserController {
  async register(req, res) {
    try {
      const body = req.body;
      const { username, password } = body;
      if (!username || !password) {
        return res.status(constants.HTTP_BAD_REQUEST).json({
          success: false,
          msg: "Missing field",
        });
      }

      const existedUser = await UserService.checkUserExisted(username);
      if (existedUser) {
        return res.status(constants.HTTP_BAD_REQUEST).json({
          success: false,
          msg: "Username existed",
        });
      }

      const salt = await bcrypt.genSalt(constants.SALT_LENGTH);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = await UserService.createUser({
        username: username,
        password: hashedPassword,
      });

      if (createdUser) {
        const access_token = generateAccessToken(createdUser);
        res.cookie("access_token", access_token, {
          httpOnly: true,
          secure: true,
          domain: "localhost",
          path: "/",
          sameSite: "None",
        });

        return res.status(constants.HTTP_OK).json({
          success: true,
          msg: "Created user!",
          data: {
            username: createdUser.username,
            userId: createdUser._id,
            role: createdUser.role,
          },
        });
      }
      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Create failed",
        data: null,
      });
    } catch (error) {
      return res.status(constants.HTTP_INTERNAL_SERVER_ERROR).json({
        msg: "HTTP_INTERNAL_SERVER_ERROR",
        success: false,
      });
    }
  }

  async login(req, res) {
    try {
      const body = req.body;
      const { username, password } = body;
      if (!username || !password) {
        return res.status(constants.HTTP_BAD_REQUEST).json({
          success: false,
          msg: "Missing field",
        });
      }

      const access_token = await UserService.loginUser({ username, password });

      if (access_token) {
        res.cookie("access_token", access_token, {
          httpOnly: true,
          secure: true,
          domain: "localhost",
          path: "/",
          sameSite: "None",
        });
        return res.status(constants.HTTP_OK).json({
          success: true,
          msg: "Login success!",
        });
      }

      return res.status(constants.HTTP_BAD_REQUEST).json({
        success: false,
        msg: "Login Failed!",
      });
    } catch (error) {
      return res.status(constants.HTTP_INTERNAL_SERVER_ERROR).json({
        msg: "HTTP_INTERNAL_SERVER_ERROR",
        success: false,
      });
    }
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
    const userInfo = await UserService.getUserInfo(user_id);

    if (!userInfo) {
      return res.status(constants.HTTP_BAD_REQUEST).json({
        msg: "Failed get user info",
        success: false,
      });
    } else {
      return res.status(constants.HTTP_OK).json({
        msg: "Success get user info",
        success: true,
        data: {
          userId: userInfo._id,
          username: userInfo.username,
          role: userInfo.role,
        },
      });
    }
  }
}

module.exports = new UserController();
