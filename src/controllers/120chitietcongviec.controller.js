const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { chiTietCongViecService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await chiTietCongViecService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const chitietcongviec = await chiTietCongViecService.create(req.body);
  res.status(httpStatus.CREATED).send(chitietcongviec);
});

/**
 * find By Id And Update
 */
const findByIdAndUpdate = catchAsync(async (req, res) => {
  const chitietcongviec = await chiTietCongViecService.findByIdAndUpdate(req.body.id, req.body);

  res.status(httpStatus.CREATED).send(chitietcongviec);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const chitietcongviec = await chiTietCongViecService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(chitietcongviec);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const chitietcongviec = await chiTietCongViecService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(chitietcongviec);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await chiTietCongViecService.paginate(filter, options);
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
