const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { thoiQuenDanhMucService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await thoiQuenDanhMucService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const thoiquendanhmuc = await thoiQuenDanhMucService.create(req.body);
  res.status(httpStatus.CREATED).send(thoiquendanhmuc);
});

/**
 * find By Id And Update
 */
const findByIdAndUpdate = catchAsync(async (req, res) => {
  const thoiquendanhmuc = await thoiQuenDanhMucService.findByIdAndUpdate(req.body.id, req.body);
  res.send(thoiquendanhmuc);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const thoiquendanhmuc = await thoiQuenDanhMucService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(thoiquendanhmuc);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const thoiquendanhmuc = await thoiQuenDanhMucService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(thoiquendanhmuc);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await thoiQuenDanhMucService.paginate(filter, options);
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
