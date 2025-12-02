const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function downloadImage(url) {
  const filePath = path.join(__dirname, "../temp", Date.now() + ".jpg");

  // Download image as buffer
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });

  // Save image locally
  fs.writeFileSync(filePath, response.data);

  return filePath;
}

module.exports = downloadImage;