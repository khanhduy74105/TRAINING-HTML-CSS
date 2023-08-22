const express = require("express");
const app = express();
const port = 3000;
const Route = require("./routes");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
