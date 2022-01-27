const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { danhMucDeXuatValidation } = require('../../validations');
const { danhMucDeXuatController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), danhMucDeXuatController.find)
  .post(auth(), danhMucDeXuatController.create)
  .put(auth(), danhMucDeXuatController.updateDanhMucDeXuat);

router.route('/paginate').get(auth(), danhMucDeXuatController.paginate);


router
  .route('/:id')
  .get(auth(), danhMucDeXuatController.findById)
  // .put(auth(), validate(danhMucDeXuatValidation.updateDeviceToken), danhMucDeXuatController.updateDeviceToken)
  .patch(auth(), validate(danhMucDeXuatValidation.findByIdAndUpdate), danhMucDeXuatController.updateDanhMucDeXuat)
  .delete(auth(), validate(danhMucDeXuatValidation.findByIdAndDelete), danhMucDeXuatController.findByIdAndDelete);

module.exports = router;
