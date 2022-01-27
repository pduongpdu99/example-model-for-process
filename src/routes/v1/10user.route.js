const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { userControler } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), userControler.find)
  .post(auth(), userControler.create)
  .put(auth(), userControler.findByIdAndUpdate);

router.route('/paginate').get(auth(), validate(userValidation.paginate), userControler.paginate);

router.route('/username/:username').get(auth(), validate(userValidation.findByUsername), userControler.findByUsername);

router.route('/gen').get(auth(), validate(userValidation.getUsernameValid), userControler.getUsernameValid);

router.route('/count').get(auth(), userControler.getCountUsername);

router.route('/number/:number').get(auth(), userControler.findUserByNumber);

router.route('/active/:idTaiKhoan/:active').put(auth(), userControler.kichHoatTaiKhoan);

router
  .route('/dateStart-dateEnd')
  .get(auth(), validate(userValidation.findByDateStartToDateEnd), userControler.findByDateStartToDateEnd);

router
  .route('/dateStart-dateEnd')
  .get(auth(), validate(userValidation.findByDateStartToDateEndAndIdUser), userControler.findByDateStartToDateEndAndIdUser);

router
  .route('/subteam')
  .get(auth(), validate(userValidation.findInforSubordinateTeams), userControler.findInforSubordinateTeams);

router.route('/statis').get(auth(), validate(userValidation.findStatisticsOfUser), userControler.findStatisticsOfUser);

router
  .route('/:id')
  .get(auth(), validate(userValidation.findById), userControler.findById)
  // .put(auth(), validate(userValidation.updateDeviceToken), userControler.updateDeviceToken)
  .patch(auth(), validate(userValidation.findByIdAndUpdate), userControler.findByIdAndUpdate)
  .delete(auth(), validate(userValidation.findByIdAndDelete), userControler.findByIdAndDelete);

// Get permision of user
router.route('/permision', validate(userValidation.permision)).post(userControler.getPermissionOfComponent);

module.exports = router;
