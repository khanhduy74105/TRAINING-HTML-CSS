import { ICart, IUser } from "types";
import User from "./users.model";
import { comparePassword, generateAccessToken } from "./utils";
import { Types } from "mongoose";
import BaseService from "../../helpers/BaseService";
import CartService from "../carts/carts.service";

class UsersService extends BaseService<IUser> {

    static user_instance = new UsersService(User)

    async createUser(userData: Partial<IUser>) {

        const user = await UsersService.user_instance.create(userData);

        if (user) {
            const cart: ICart | any = await CartService.createCart(user.id);
            const createdUser: IUser = await UsersService.user_instance.findOne({
                username: userData.username,
            });
            return createdUser;
        }

        return null;
    }

    async loginUser(userData: Partial<IUser>): Promise<any> {
        const currentUser: IUser & {
            password: string
        } = await UsersService.user_instance.findOne({ username: userData.username }) as IUser & {
            password: string
        };
        if (!currentUser) {
            return { msg: "Do not find this user", success: false };
        }

        const isValid = await comparePassword(
            userData.password,
            currentUser.password
        );
        if (!isValid) {
            return { msg: "Wrong password", success: false };
        }

        const access_token = generateAccessToken(currentUser);
        return { access_token, success: true, msg: 'oke' };
    }

    async checkUserExisted(username: String): Promise<IUser> {
        const exitedUser: IUser = await User.findOne({ username: username });
        return exitedUser;
    }

    async getUserInfo(userId: Types.ObjectId): Promise<IUser> {
        const userInfo: IUser = await User.findById(userId);
        return userInfo
    }
}

export default UsersService.user_instance