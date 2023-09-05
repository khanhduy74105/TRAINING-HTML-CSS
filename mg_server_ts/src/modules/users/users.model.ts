import mongoose from "mongoose";
import { IUser } from "types";

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            default: "user",
        },
    },
    {
        timestamps: true,
    }
)
export default mongoose.model<IUser>('user', User)