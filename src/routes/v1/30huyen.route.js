const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { huyenValidation } = require('../../validations');
const { huyenController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), huyenController.find)
  .post(auth(), huyenController.create)
  .put(auth(), huyenController.updateHuyen);

router.route('/paginate').get(auth(), huyenController.paginate);

router
  .route('/:id')
  .get(auth(), huyenController.findById)
  // .put(auth(), validate(huyenValidation.updateDeviceToken), huyenController.updateDeviceToken)
  .patch(auth(), validate(huyenValidation.findByIdAndUpdate), huyenController.updateHuyen)
  .delete(auth(), validate(huyenValidation.findByIdAndDelete), huyenController.findByIdAndDelete);

module.exports = router;
