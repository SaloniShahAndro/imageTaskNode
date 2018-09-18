const multer = require('multer');


/**
 * User Image upload configurations
 */
const userImageOption = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'index/assets/tmp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

const userImage = multer({
    storage: userImageOption,
    fileFilter: function (req, file, cb) {
        var mimetype = file.mimetype;
        // if(mimetype !== 'application/pdf') {
        //     return cb(new Error('Please upload valid documents'))
        // }
        cb(null, true)
    },
}).single('profilepicture');

exports.userImageUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        userImage(req, res, function (err) {
            if (err) {
                console.log('err' + err);
                reject(err);
            } else {
                // req.body.profilepicture = req.file ? req.file : "";
                req.body.profilepicture = req.file ? req.file['filename'] : "";
                resolve();
            }
        });
    });
}