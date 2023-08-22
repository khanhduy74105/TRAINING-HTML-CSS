const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "db.json");
module.exports = () => {
  const data = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(data);
  return jsonData;
};
