const express = require('express');
const multer = require('multer');
const { nhacChuongController } = require('../../controllers');
const { nhacChuongValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/public/audio/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), nhacChuongController.find)
  .post(auth(), upload.single('baiNhac'), nhacChuongController.uploadFile)
  // .post(auth(), validate(nhacChuongValidation.create), nhacChuongController.create)
  .put(auth(), validate(nhacChuongValidation.findByIdAndUpdate), nhacChuongController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(nhacChuongController.paginate), nhacChuongController.paginate);

router
  .route('/:id')
  .get(auth(), validate(nhacChuongValidation.findById), nhacChuongController.findById)
  .delete(auth(), validate(nhacChuongValidation.findByIdAndDelete), nhacChuongController.findByIdAndDelete);

module.exports = router;
