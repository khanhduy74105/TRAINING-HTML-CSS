const router = require("express").Router();
const loginRequire = require("../middlewares/loginRequire.middleware");
const userController = require("../modules/users/users.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", loginRequire, userController.logout);
router.get("/me", loginRequire, userController.getUserInfo);

module.exports = router;
