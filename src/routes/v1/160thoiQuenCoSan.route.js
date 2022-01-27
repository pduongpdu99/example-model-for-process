const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { thoiQuenCoSanValidation } = require('../../validations');
const { thoiQuenCoSanController } = require('../../controllers');

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
  .patch(auth(), validate(thoiQuenCoSanValidation.findByIdAndUpdate), thoiQuenCoSanController.updateThoiQuen)
  .delete(auth(), validate(thoiQuenCoSanValidation.findByIdAndDelete), thoiQuenCoSanController.findByIdAndDelete);

module.exports = router;
