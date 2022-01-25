const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { thoiQuenPartnerValidation } = require('../../validations');
const { thoiQuenPartnerController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), thoiQuenPartnerController.find)
  .post(auth(), thoiQuenPartnerController.create)
  .put(auth(), thoiQuenPartnerController.updateThoiQuenPartner);

router.route('/paginate').get(auth(), thoiQuenPartnerController.paginate);

router
  .route('/:id')
  .get(auth(), thoiQuenPartnerController.findById)
  // .put(auth(), validate(thoiQuenPartnerValidation.updateDeviceToken), thoiQuenPartnerController.updateDeviceToken)
  .patch(auth(), validate(thoiQuenPartnerValidation.findByIdAndUpdate), thoiQuenPartnerController.updateThoiQuenPartner)
  .delete(auth(), validate(thoiQuenPartnerValidation.findByIdAndDelete), thoiQuenPartnerController.findByIdAndDelete);

module.exports = router;
