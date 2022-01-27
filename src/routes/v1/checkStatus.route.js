const express = require('express');
const { checkStatusController } = require('../../controllers');

const router = express.Router();

router.route('/:timestamp/:id').get(checkStatusController.checkStatus);

module.exports = router;
