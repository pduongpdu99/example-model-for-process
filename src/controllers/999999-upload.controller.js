const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');

const singleUpload = uploadService.single('image');

/**
 * Call upload service
 */
const upload = catchAsync(async (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('singleUpload', err);
      res.status(httpStatus.BAD_REQUEST).send('Image Upload Error');
      return;
    }
    if (req.file !== undefined && req.file.location !== undefined && req.file.location !== null) {
      res.send({ data: req.file.location });
    } else {
      res.send({});
    }
  });
});

module.exports = {
  upload,
};
