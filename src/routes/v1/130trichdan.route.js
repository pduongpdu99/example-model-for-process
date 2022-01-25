const express = require('express');
const { trichDanController } = require('../../controllers');
const { trichDanValidation } = require('../../validations');
const auth = require('../../middlewares/auth');

const router = express.Router();
const validate = require('../../middlewares/validate');

router
  .route('/')
  .get(auth(), trichDanController.find)
  .post(auth(), validate(trichDanValidation.create), trichDanController.create)
  .put(auth(), validate(trichDanValidation.findByIdAndUpdate), trichDanController.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(trichDanController.paginate), trichDanController.paginate);

router
  .route('/:id')
  .get(auth(), validate(trichDanValidation.findById), trichDanController.findById)
  .delete(auth(), validate(trichDanValidation.findByIdAndDelete), trichDanController.findByIdAndDelete);

module.exports = router;
