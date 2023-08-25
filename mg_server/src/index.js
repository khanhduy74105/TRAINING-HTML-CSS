require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Route = require("../src/routes");

mongoose
  .connect("mongodb+srv://khanhduy:khanhduy@cluster0.uljj515.mongodb.net/db")
  .then(() => {
    console.log("Connected db");
    app.use(
      cors({
        origin: true, // Cho phép tất cả các nguồn truy cập (bạn có thể điều chỉnh cho cụ thể hơn)
        credentials: true, // Cho phép truyền cookie
      })
    );
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    Route(app);

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  });
