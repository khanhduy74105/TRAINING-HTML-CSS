import { config } from "dotenv";
config()
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { IUser } from "types";
export const generateAccessToken = (data: IUser) => {
    const access_token = jwt.sign(
        {
            user_id: data._id,
            username: data.username,
            role: data.role || "user",
        },
        process.env.JWT_PRIVITE_KEY
    );
    return access_token || null;
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
};
