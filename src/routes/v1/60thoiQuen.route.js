const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { thoiQuenValidation } = require('../../validations');
const { thoiQuenController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), thoiQuenController.find)
  .post(auth(), thoiQuenController.create)
  .put(auth(), thoiQuenController.updateThoiQuen);

router.route('/paginate').get(auth(), thoiQuenController.paginate);

router
  .route('/:id')
  .get(auth(), thoiQuenController.findById)
  // .put(auth(), validate(thoiQuenValidation.updateDeviceToken), thoiQuenController.updateDeviceToken)
  .patch(auth(), validate(thoiQuenValidation.findByIdAndUpdate), thoiQuenController.updateThoiQuen)
  .delete(auth(), validate(thoiQuenValidation.findByIdAndDelete), thoiQuenController.findByIdAndDelete);

module.exports = router;
