import { config } from 'dotenv'
config()
import express, { Application } from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import ConnectDB from './config/db';
import Route from './routes/index'
const app: Application = express()
const PORT: number = parseInt(process.env.PORT) || 5000


async function main() {
    await ConnectDB.connect()

    app.use(cors({
        origin: true,
        credentials: true
    }))
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    Route(app)

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}


main()