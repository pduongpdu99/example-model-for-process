const express = require('express');
const { danhSachHinhAnhController } = require('../../controllers');
const { danhSachHinhAnhValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), danhSachHinhAnhController.find)
  .post(auth(), validate(danhSachHinhAnhValidation.create), danhSachHinhAnhController.create)
  .put(auth(), validate(danhSachHinhAnhValidation.findByIdAndUpdate), danhSachHinhAnhController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(danhSachHinhAnhController.paginate), danhSachHinhAnhController.paginate);

router
  .route('/:id')
  .get(auth(), validate(danhSachHinhAnhValidation.findById), danhSachHinhAnhController.findById)
  .delete(auth(), validate(danhSachHinhAnhValidation.findByIdAndDelete), danhSachHinhAnhController.findByIdAndDelete);

module.exports = router;
