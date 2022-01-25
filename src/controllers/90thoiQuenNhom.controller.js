const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { thoiQuenNhomService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await thoiQuenNhomService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const account = await thoiQuenNhomService.create(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * Update ThoiQuenNhom
 */
const updateThoiQuenNhom = catchAsync(async (req, res) => {
  const thoiQuenNhom = await thoiQuenNhomService.updateThoiQuenNhomById(req.body.id, req.body);
  res.send(thoiQuenNhom);
});

/**
 * find By Id And Update
 */
const updateDeviceToken = catchAsync(async (req, res) => {
  const account = await thoiQuenNhomService.updateDeviceToken(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const account = await thoiQuenNhomService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const account = await thoiQuenNhomService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['idThoiQuenNhom', 'idRole', 'idOptionalRole', 'status', 'month', 'year']);
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

  const result = await thoiQuenNhomService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  updateThoiQuenNhom,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
};
