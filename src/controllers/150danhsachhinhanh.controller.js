const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { trichDanService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await trichDanService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const trichdan = await trichDanService.create(req.body);
  res.status(httpStatus.CREATED).send(trichdan);
});

/**
 * find By Id And Update
 */
const findByIdAndUpdate = catchAsync(async (req, res) => {
  const trichdan = await trichDanService.findByIdAndUpdate(req.body.id, req.body);

  res.status(httpStatus.CREATED).send(trichdan);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const trichdan = await trichDanService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(trichdan);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const trichdan = await trichDanService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(trichdan);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await trichDanService.paginate(filter, options);
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
