const express = require('express');
const { nhacChuongController } = require('../../controllers');
const { nhacChuongValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), nhacChuongController.find)
  .post(auth(), validate(nhacChuongValidation.create), nhacChuongController.create)
  .put(auth(), validate(nhacChuongValidation.findByIdAndUpdate), nhacChuongController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(nhacChuongController.paginate), nhacChuongController.paginate);

router
  .route('/:id')
  .get(auth(), validate(nhacChuongValidation.findById), nhacChuongController.findById)
  .delete(auth(), validate(nhacChuongValidation.findByIdAndDelete), nhacChuongController.findByIdAndDelete);

module.exports = router;
