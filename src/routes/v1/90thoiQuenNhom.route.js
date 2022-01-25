const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { thoiQuenNhomValidation } = require('../../validations');
const { thoiQuenNhomController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), thoiQuenNhomController.find)
  .post(auth(), thoiQuenNhomController.create)
  .put(auth(), thoiQuenNhomController.updateThoiQuenNhom);

router.route('/paginate').get(auth(), thoiQuenNhomController.paginate);

router
  .route('/:id')
  .get(auth(), thoiQuenNhomController.findById)
  // .put(auth(), validate(thoiQuenNhomValidation.updateDeviceToken), thoiQuenNhomController.updateDeviceToken)
  .patch(auth(), validate(thoiQuenNhomValidation.findByIdAndUpdate), thoiQuenNhomController.updateThoiQuenNhom)
  .delete(auth(), validate(thoiQuenNhomValidation.findByIdAndDelete), thoiQuenNhomController.findByIdAndDelete);

module.exports = router;
