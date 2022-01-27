const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { diemTichLuyValidation } = require('../../validations');
const { diemTichLuyController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), diemTichLuyController.find)
  .post(auth(), diemTichLuyController.create)
  .put(auth(), diemTichLuyController.updateDiemTichLuy);

router.route('/paginate').get(auth(), diemTichLuyController.paginate);
router.route('/history/:idThoiQuen').get(auth(), diemTichLuyController.loadLichSuThoiQuen);

router
  .route('/:id')
  .get(auth(), diemTichLuyController.findById)
  // .put(auth(), validate(diemTichLuyValidation.updateDeviceToken), diemTichLuyController.updateDeviceToken)
  .patch(auth(), validate(diemTichLuyValidation.findByIdAndUpdate), diemTichLuyController.updateDiemTichLuy)
  .delete(auth(), validate(diemTichLuyValidation.findByIdAndDelete), diemTichLuyController.findByIdAndDelete);

module.exports = router;
