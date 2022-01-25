const express = require('express');
const { uploadController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), uploadController.upload);
router.route('/temp').post(uploadController.upload);

module.exports = router;
