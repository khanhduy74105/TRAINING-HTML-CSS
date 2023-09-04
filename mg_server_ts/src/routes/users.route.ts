import { Router } from "express";
import UsersController from '../modules/users/users.controller'
import loginRequire from "../middlewares/loginRequire.middleware";
const router = Router()

router.post('/register', UsersController.register)
router.post('/login', UsersController.login)
router.get('/me', loginRequire, UsersController.getUserInfo)
router.post('/logout', UsersController.logout)


export default router