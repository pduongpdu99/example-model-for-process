const express = require('express');
const { thoiQuenDanhMucController } = require('../../controllers');
const { thoiQuenDanhMucValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), thoiQuenDanhMucController.find)
  .post(auth(), validate(thoiQuenDanhMucValidation.create), thoiQuenDanhMucController.create)
  .put(auth(), validate(thoiQuenDanhMucValidation.findByIdAndUpdate), thoiQuenDanhMucController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(thoiQuenDanhMucController.paginate), thoiQuenDanhMucController.paginate);

router
  .route('/:id')
  .get(auth(), validate(thoiQuenDanhMucValidation.findById), thoiQuenDanhMucController.findById)
  .delete(auth(), validate(thoiQuenDanhMucValidation.findByIdAndDelete), thoiQuenDanhMucController.findByIdAndDelete);

module.exports = router;
