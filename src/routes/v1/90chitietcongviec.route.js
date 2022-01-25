const express = require('express');
const { chiTietCongViecController } = require('../../controllers');
const { chiTietCongViecValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), chiTietCongViecController.find)
  .post(auth(), validate(chiTietCongViecValidation.create), chiTietCongViecController.create)
  .put(auth(), validate(chiTietCongViecValidation.findByIdAndUpdate), chiTietCongViecController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(chiTietCongViecController.paginate), chiTietCongViecController.paginate);

router
  .route('/:id')
  .get(auth(), validate(chiTietCongViecValidation.findById), chiTietCongViecController.findById)
  .delete(auth(), validate(chiTietCongViecValidation.findByIdAndDelete), chiTietCongViecController.findByIdAndDelete);

module.exports = router;
