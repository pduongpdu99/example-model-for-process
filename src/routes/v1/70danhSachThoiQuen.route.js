const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { danhSachThoiQuenValidation } = require('../../validations');
const { danhSachThoiQuenController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), danhSachThoiQuenController.find)
  .post(auth(), danhSachThoiQuenController.create)
  .put(auth(), danhSachThoiQuenController.updateDanhSachThoiQuen);

router.route('/paginate').get(auth(), danhSachThoiQuenController.paginate);

router
  .route('/:id')
  .get(auth(), danhSachThoiQuenController.findById)
  // .put(auth(), validate(danhSachThoiQuenValidation.updateDeviceToken), danhSachThoiQuenController.updateDeviceToken)
  .patch(auth(), validate(danhSachThoiQuenValidation.findByIdAndUpdate), danhSachThoiQuenController.updateDanhSachThoiQuen)
  .delete(auth(), validate(danhSachThoiQuenValidation.findByIdAndDelete), danhSachThoiQuenController.findByIdAndDelete);

module.exports = router;
