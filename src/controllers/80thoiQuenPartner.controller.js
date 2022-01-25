const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { thoiQuenPartnerService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await thoiQuenPartnerService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const account = await thoiQuenPartnerService.create(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * Update ThoiQuenPartner
 */
const updateThoiQuenPartner = catchAsync(async (req, res) => {
  const thoiQuenPartner = await thoiQuenPartnerService.updateThoiQuenPartnerById(req.body.id, req.body);
  res.send(thoiQuenPartner);
});

/**
 * find By Id And Update
 */
const updateDeviceToken = catchAsync(async (req, res) => {
  const account = await thoiQuenPartnerService.updateDeviceToken(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const account = await thoiQuenPartnerService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const account = await thoiQuenPartnerService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['idThoiQuenPartner', 'idRole', 'idOptionalRole', 'status', 'month', 'year']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  // Query by month and year
  if (req.query.month != null && req.query.year != null) {
    filter.$expr = {
      $or: [
        {
          $and: [
            { $eq: [{ $month: '$created_at' }, Number(req.query.month)] },
            { $eq: [{ $year: '$created_at' }, Number(req.query.year)] },
          ],
        },
      ],
    };
  }

  delete filter.month;
  delete filter.year;

  const result = await thoiQuenPartnerService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  updateThoiQuenPartner,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
};
