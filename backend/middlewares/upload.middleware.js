const multer = require("multer");

const upload = multer({
   storage: multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, "uploads");
     },
     filename: (req, file, cb) => {
       cb(null, `${Date.now()}_${file.originalname}`);
     },
   }),
 }).single("image");
 

module.exports = upload;