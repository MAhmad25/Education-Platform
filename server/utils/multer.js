const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const storage = multer.diskStorage({
      destination: (_, res, cb) => {
            cb(null, "./uploads/");
      },
      filename: (_, file, cb) => {
            console.log({ file });
            console.log("Check in multer.js in utils folder");
            crypto.randomBytes(10, (error, buff) => {
                  if (error) return;
                  const fileName = buff.toString("hex") + path.extname(file.originalname);
                  cb(null, fileName);
            });
      },
});
const upload = multer({ storage: storage });
export default upload;
