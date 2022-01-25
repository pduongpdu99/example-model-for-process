const express = require('express');
const auth = require('../../middlewares/auth');
const { homePageController } = require('../../controllers');

const router = express.Router();

router.route('/ranking').get(auth(), homePageController.ranking);

module.exports = router;
