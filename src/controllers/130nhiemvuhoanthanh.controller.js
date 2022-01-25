const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { nhiemVuHoanThanhService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await nhiemVuHoanThanhService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const nhiemvuhoanthanh = await nhiemVuHoanThanhService.create(req.body);
  res.status(httpStatus.CREATED).send(nhiemvuhoanthanh);
});

/**
 * find By Id And Update
 */
const findByIdAndUpdate = catchAsync(async (req, res) => {
  const nhiemvuhoanthanh = await nhiemVuHoanThanhService.findByIdAndUpdate(req.body.id, req.body);

  res.status(httpStatus.CREATED).send(nhiemvuhoanthanh);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const nhiemvuhoanthanh = await nhiemVuHoanThanhService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(nhiemvuhoanthanh);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const nhiemvuhoanthanh = await nhiemVuHoanThanhService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(nhiemvuhoanthanh);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await nhiemVuHoanThanhService.paginate(filter, options);
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
