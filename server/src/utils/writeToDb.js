const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "db.json");
module.exports = (updateData) => {
  return new Promise((resolver, reject) => {
    fs.writeFile(filePath, updateData, "utf8", (err) => {
      if (err) {
        reject(err);
      }
      resolver(true);
    });
  });
};
