import bcrypt from 'bcrypt'
import { UserDTO } from './dto/UserDTO';
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import UserService from './users.service'
import { SALT_LENGTH } from '../../constants';
import { generateAccessToken } from './utils';
import { IUser, ReqBodyLogined } from 'types';

class UsersController {
    async register(req: Request, res: Response) {
        try {

            const body: UserDTO = req.body;
            const { username, password } = body;

            if (!username || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: "Missing field",
                });
            }
            const existedUser = await UserService.checkUserExisted(username);
            if (existedUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: "Username existed",
                });
            }

            const salt = await bcrypt.genSalt(SALT_LENGTH);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createdUser: IUser = await UserService.createUser({
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
                    sameSite: 'none',
                });

                return res.status(StatusCodes.OK).json({
                    success: true,
                    msg: "Created user!",
                    data: {
                        username: createdUser.username,
                        userId: createdUser._id,
                        role: createdUser.role,
                    },
                });
            }
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                msg: "Create failed",
                data: null,
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
                success: false,
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const body = req.body;
            const { username, password }: UserDTO = body;
            if (!username || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    msg: "Missing field",
                });
            }

            const access_token = await UserService.loginUser({ username, password });

            if (access_token) {
                res.cookie("access_token", access_token, {
                    httpOnly: true,
                    secure: false,
                    domain: "localhost",
                    path: "/",
                    sameSite: "none",
                });
                return res.status(StatusCodes.OK).json({
                    success: true, 
                    msg: "Login success!",
                });
            }

            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                msg: "Login Failed!",
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "HTTP_INTERNAL_SERVER_ERROR",
                success: false,
            });
        }
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            domain: "localhost",
            path: "/",
            sameSite: "none",
        });

        return res.status(StatusCodes.OK).json({ success: true, msg: "logout!" });
    }

    async getUserInfo(req: ReqBodyLogined, res: Response) {
        const { user_id } = req;
        const userInfo = await UserService.getUserInfo(user_id);

        if (!userInfo) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "Failed get user info",
                success: false,
            });
        } else {
            return res.status(StatusCodes.OK).json({
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
export default new UsersController()