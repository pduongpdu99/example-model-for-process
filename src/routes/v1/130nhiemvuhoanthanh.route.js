const express = require('express');
const { nhiemVuHoanThanhController } = require('../../controllers');
const { nhiemVuHoanThanhValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), nhiemVuHoanThanhController.find)
  .post(auth(), validate(nhiemVuHoanThanhValidation.create), nhiemVuHoanThanhController.create)
  .put(auth(), validate(nhiemVuHoanThanhValidation.findByIdAndUpdate), nhiemVuHoanThanhController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(nhiemVuHoanThanhController.paginate), nhiemVuHoanThanhController.paginate);

router
  .route('/:id')
  .get(auth(), validate(nhiemVuHoanThanhValidation.findById), nhiemVuHoanThanhController.findById)
  .delete(auth(), validate(nhiemVuHoanThanhValidation.findByIdAndDelete), nhiemVuHoanThanhController.findByIdAndDelete);

module.exports = router;
