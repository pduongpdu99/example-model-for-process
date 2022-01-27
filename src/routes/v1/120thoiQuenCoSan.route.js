const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { thoiQuenCoSanValidation } = require('../../validations');
const { thoiQuenCoSanController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), thoiQuenCoSanController.find)
  .post(auth(), thoiQuenCoSanController.create)
  .put(auth(), thoiQuenCoSanController.updateThoiQuen);

router.route('/paginate').get(auth(), thoiQuenCoSanController.paginate);

router
  .route('/:id')
  .get(auth(), thoiQuenCoSanController.findById)
  // .put(auth(), validate(thoiQuenValidation.updateDeviceToken), thoiQuenCoSanController.updateDeviceToken)
  .patch(auth(), validate(thoiQuenCoSanValidation.findByIdAndUpdate), thoiQuenCoSanController.updateThoiQuen)
  .delete(auth(), validate(thoiQuenCoSanValidation.findByIdAndDelete), thoiQuenCoSanController.findByIdAndDelete);

module.exports = router;
