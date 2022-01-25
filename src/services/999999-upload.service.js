const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

/*
 * Init config AWS S3
 * */
const s3 = new aws.S3({
  secretAccessKey: process.env.S3_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.S3_REGION,
});

/*
 * Filter ext filter
 * */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype !== 'xxx') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

/*
 * Config multer s3 storage
 * */
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
});

module.exports = upload;
