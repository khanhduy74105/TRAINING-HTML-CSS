const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "db.json");
module.exports = () => {
  return new Promise((resolver, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolver(JSON.parse(data));
    });
  });
};
