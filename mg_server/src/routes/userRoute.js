const router = require("express").Router();
const loginRequire = require("../middlewares/loginRequire");
const userController = require("../modules/users/user.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout",loginRequire, userController.logout);

module.exports = router;
