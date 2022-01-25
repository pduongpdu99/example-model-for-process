const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { tinhValidation } = require('../../validations');
const { tinhController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), tinhController.find)
  .post(auth(), tinhController.create)
  .put(auth(), tinhController.updateTinh);

router.route('/paginate').get(auth(), tinhController.paginate);

router
  .route('/:id')
  .get(auth(), tinhController.findById)
  // .put(auth(), validate(tinhValidation.updateDeviceToken), tinhController.updateDeviceToken)
  // .patch(auth(), validate(tinhValidation.findByIdAndUpdate), tinhController.updateTinh)
  .delete(auth(), validate(tinhValidation.findByIdAndDelete), tinhController.findByIdAndDelete);

module.exports = router;
