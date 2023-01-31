const express = require("express");
const router = express.Router();
const fileDataModel = require("../models/fileData");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    console.log(req);
    console.log(file);
    const newFileName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];

    fileDataModel.count().then((count) => {
      cb(null, count.toString() + "." + extension);
      const fileData = new fileDataModel({
        fileId: count,
        uuid: "1",
        fileName: newFileName, //original File Name
        extension: extension,
      });

      fileData.save();
    });
  },
});
const upload = multer({ storage: storage });

router.get("/images/:fileName", function (req, res) {
  const fileId = req.params.fileName;
  fileDataModel.findOne({ fileId }).then((data) => {
    fs.readFile(
      "./images/" + data.fileId + "." + data.extension,
      function (err, data) {
        res.writeHead(200, { "Context-Type": "text/html" });
        res.end(data);
      }
    );
  });
});

router.post("/upload", upload.single("img"), (req, res) => {
  // const fileNameArray = req.file.filename.split(".");
  // const fileId = fileNameArray[0];
  res.status(200).json({ fileId: "0" });
});

module.exports = router;