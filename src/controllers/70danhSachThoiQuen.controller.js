const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { danhSachThoiQuenService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await danhSachThoiQuenService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const account = await danhSachThoiQuenService.create(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * Update DanhSachThoiQuen
 */
const updateDanhSachThoiQuen = catchAsync(async (req, res) => {
  const danhSachThoiQuen = await danhSachThoiQuenService.updateDanhSachThoiQuenById(req.body.id, req.body);
  res.send(danhSachThoiQuen);
});

/**
 * find By Id And Update
 */
const updateDeviceToken = catchAsync(async (req, res) => {
  const account = await danhSachThoiQuenService.updateDeviceToken(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const account = await danhSachThoiQuenService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const account = await danhSachThoiQuenService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['idDanhSachThoiQuen', 'idRole', 'idOptionalRole', 'status', 'month', 'year']);
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

  const result = await danhSachThoiQuenService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  updateDanhSachThoiQuen,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
};
