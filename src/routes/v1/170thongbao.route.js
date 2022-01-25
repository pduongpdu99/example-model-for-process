const express = require('express');
const { thongBaoController } = require('../../controllers');
const { thongBaoValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), thongBaoController.find)
  .post(auth(), validate(thongBaoValidation.create), thongBaoController.create)
  .put(auth(), validate(thongBaoValidation.findByIdAndUpdate), thongBaoController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(thongBaoController.paginate), thongBaoController.paginate);

router
  .route('/:id')
  .get(auth(), validate(thongBaoValidation.findById), thongBaoController.findById)
  .delete(auth(), validate(thongBaoValidation.findByIdAndDelete), thongBaoController.findByIdAndDelete);

module.exports = router;
