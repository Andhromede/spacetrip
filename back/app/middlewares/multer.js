const multer = require('multer');
const path = require("path");
const storage = multer.memoryStorage();


const fileTypes = (file, callback) => {
    let ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        console.log("Ceci n'est pas une image valable (PNG, JPEG ou JPG).");
        return { status: 500 };
    }
    callback(null, true);
}


module.exports = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: function (req, file, callback) {
       fileTypes(file, callback);
    },
 });