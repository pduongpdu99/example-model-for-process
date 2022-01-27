const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { checkStatusService } = require('../services');

/**
 * checkStatus
 */
const checkStatus = catchAsync(async (req, res) => {
  const timestamp = req.params.timestamp;

  let datetime = new Date(parseInt(timestamp.toString())).toISOString();

  const status = await checkStatusService.checkStatus(req.params.id, datetime);
  res.status(httpStatus.CREATED).send(status);
});

module.exports = {
  checkStatus,
};
