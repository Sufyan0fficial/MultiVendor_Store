const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "Uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname?.split('.')[0]
    cb(
      null,
      fileName + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const uploads = multer({ storage: storage });

module.exports = uploads;
