const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { thoiQuenMacDinhService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await thoiQuenMacDinhService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const thongbao = await thoiQuenMacDinhService.create(req.body);
  res.status(httpStatus.CREATED).send(thongbao);
});

/**
 * find By Id And Update
 */
const findByIdAndUpdate = catchAsync(async (req, res) => {
  const thongbao = await thoiQuenMacDinhService.findByIdAndUpdate(req.body.id, req.body);

  res.status(httpStatus.CREATED).send(thongbao);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const thongbao = await thoiQuenMacDinhService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(thongbao);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const thongbao = await thoiQuenMacDinhService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(thongbao);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await thoiQuenMacDinhService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  findById,
  paginate,
};
