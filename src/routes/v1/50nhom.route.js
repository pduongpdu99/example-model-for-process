const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { nhomValidation } = require('../../validations');
const { nhomController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), nhomController.find)
  .post(auth(), nhomController.create)
  .put(auth(), nhomController.updateNhom);

router.route('/paginate').get(auth(), nhomController.paginate);

router.route('/addmember/:idNhom').post(auth(), nhomController.themThanhVienVaoNhom);

router
  .route('/:id')
  .get(auth(), nhomController.findById)
  // .put(auth(), validate(nhomValidation.updateDeviceToken), nhomController.updateDeviceToken)
  .patch(auth(), validate(nhomValidation.findByIdAndUpdate), nhomController.updateNhom)
  .delete(auth(), validate(nhomValidation.findByIdAndDelete), nhomController.findByIdAndDelete);

module.exports = router;
