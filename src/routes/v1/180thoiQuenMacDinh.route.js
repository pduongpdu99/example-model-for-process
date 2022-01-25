const express = require('express');
const { thoiQuenMacDinhController } = require('../../controllers');
const { thoiQuenMacDinhValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), thoiQuenMacDinhController.find)
  .post(auth(), validate(thoiQuenMacDinhValidation.create), thoiQuenMacDinhController.create)
  .put(auth(), validate(thoiQuenMacDinhValidation.findByIdAndUpdate), thoiQuenMacDinhController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(thoiQuenMacDinhController.paginate), thoiQuenMacDinhController.paginate);

router
  .route('/:id')
  .get(auth(), validate(thoiQuenMacDinhValidation.findById), thoiQuenMacDinhController.findById)
  .delete(auth(), validate(thoiQuenMacDinhValidation.findByIdAndDelete), thoiQuenMacDinhController.findByIdAndDelete);

module.exports = router;
