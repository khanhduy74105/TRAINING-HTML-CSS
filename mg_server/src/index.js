require("dotenv").config();
const express = require("express");
const connectToDB = require("./db/db.connect");
const app = express();
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Route = require("../src/routes");

async function main() {
  await connectToDB();
  app.use(
    cors({
      origin: true,
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
}

main();
