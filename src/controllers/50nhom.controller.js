const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { nhomService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await nhomService.find();
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const account = await nhomService.create(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * thêm thành viên vào nhóm
 * @param idNhom id nhóm
 * @param idThanhVien id thành viên
 * @returns
 */
const themThanhVienVaoNhom = catchAsync(async (req, res) => {
  const { idNhom } = req.params;
  const idNguoiDungs = req.body.idNguoiDungs;

  const nhom = await nhomService.themThanhVienVaoNhom(idNhom, idNguoiDungs);
  res.send(nhom);
});

/**
 * Update Nhom
 */
const updateNhom = catchAsync(async (req, res) => {
  const nhom = await nhomService.updateNhomById(req.body.id, req.body);
  res.send(nhom);
});

/**
 * find By Id And Update
 */
const updateDeviceToken = catchAsync(async (req, res) => {
  const account = await nhomService.updateDeviceToken(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const account = await nhomService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const account = await nhomService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['idNhom', 'idRole', 'idOptionalRole', 'status', 'month', 'year']);
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

  const result = await nhomService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  updateNhom,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,

  // additional
  themThanhVienVaoNhom,
};
