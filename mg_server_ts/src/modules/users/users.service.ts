import { ICart, IUser } from "types";
import User from "./users.model";
import { comparePassword, generateAccessToken } from "./utils";
import { UserDTO } from "./dto/UserDTO";
import { Types } from "mongoose";
import BaseService from "../../helpers/BaseService";
import CartService from "../carts/carts.service";

class UsersService {

    static user_instance = new BaseService<IUser>(User)

    static async createUser(userData: UserDTO) {

        const user = await this.user_instance.create(userData);

        if (user) {
            const cart: ICart | any = await CartService.createCart(user.id);
            user.cart = cart._id;
            await user.save();
            const createdUser: IUser = await this.user_instance.findOne({
                username: userData.username,
            });
            return createdUser;
        }

        return null;
    }

    static async loginUser(userData: UserDTO): Promise<any> {
        const currentUser: IUser & {
            password: string
        } = await this.user_instance.findOne({ username: userData.username }) as IUser & {
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
            return false;
        }

        const access_token = generateAccessToken(currentUser);
        return access_token;
    }

    static async checkUserExisted(username: String): Promise<IUser> {
        const exitedUser: IUser = await User.findOne({ username: username });
        return exitedUser;
    }

    static async getUserInfo(userId: Types.ObjectId): Promise<IUser> {
        const userInfo: IUser = await User.findById(userId);
        return userInfo
    }
}

export default UsersService