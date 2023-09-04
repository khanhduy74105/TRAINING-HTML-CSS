import mongoose from "mongoose";
class ConnectDB {
    static async connect() {
        try {
            await mongoose.connect(process.env.DB_MONGO_URL);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }
}

export default ConnectDB