const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { thoiQuenService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await thoiQuenService.find();
  res.send(result);
});

/**
 * load thói quen theo ngày
 */
const loadHabitsByTimestamp = catchAsync(async (req, res) => {
  const timestamp = req.params.timestamp;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  let datetime = new Date(parseInt(timestamp.toString())).toISOString();

  const result = await thoiQuenService.loadHabitsByTimestamp(datetime, options);
  res.send(result);
});

/**
 * load thói quen theo người dùng
 */
const loadHabitsByidNguoiDung = catchAsync(async (req, res) => {
  const idNguoiDung = req.params.idNguoiDung;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await thoiQuenService.loadHabitsByidNguoiDung(idNguoiDung, options);
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const account = await thoiQuenService.create(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * Update ThoiQuen
 */
const updateThoiQuen = catchAsync(async (req, res) => {
  const thoiQuen = await thoiQuenService.updateThoiQuenById(req.body.id, req.body);
  res.send(thoiQuen);
});

/**
 * find By Id And Update
 */
const updateDeviceToken = catchAsync(async (req, res) => {
  const account = await thoiQuenService.updateDeviceToken(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const account = await thoiQuenService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const account = await thoiQuenService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['idThoiQuen', 'idRole', 'idOptionalRole', 'status', 'month', 'year']);
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

  const result = await thoiQuenService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  updateThoiQuen,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
  loadHabitsByTimestamp,
  loadHabitsByidNguoiDung,
};
