
var path = require("path");
var multer = require("multer");


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
        
		return cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));  
        
	}
});

//will be using this for uploading files
exports.fileUpload = multer({ storage: storage });