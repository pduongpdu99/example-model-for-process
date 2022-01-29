const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { NhacChuong } = require('../models');
const { nhacChuongService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await nhacChuongService.find();
  res.send(result);
});

/**
 * uploadFile
 */
const uploadFile = catchAsync(async (req, res) => {
  if (req.file !== undefined) {
    req.body.baiNhac = req.file.filename;
  }

  await NhacChuong.create(req.body);
  res.status(200).send('success');
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const nhachuong = await nhacChuongService.create(req.body);
  res.status(httpStatus.CREATED).send(nhachuong);
});

/**
 * find By Id And Update
 */
const findByIdAndUpdate = catchAsync(async (req, res) => {
  const nhachuong = await nhacChuongService.findByIdAndUpdate(req.body.id, req.body);

  res.status(httpStatus.CREATED).send(nhachuong);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const nhachuong = await nhacChuongService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(nhachuong);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const nhachuong = await nhacChuongService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(nhachuong);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await nhacChuongService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  findById,
  paginate,
  uploadFile,
};
