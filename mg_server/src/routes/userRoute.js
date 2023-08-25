const router = require("express").Router();
const userController = require("../modules/users/user.controller");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
