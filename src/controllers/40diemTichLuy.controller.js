const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { diemTichLuyService } = require('../services');

/**
 * find
 */
const find = catchAsync(async (req, res) => {
  const result = await diemTichLuyService.find();
  res.send(result);
});

/**
 * load lịch sử thói quen
 */
const loadLichSuThoiQuen = catchAsync(async (req, res) => {
  const result = await diemTichLuyService.loadLichSuThoiQuen(req.params.idThoiQuen);
  res.send(result);
});

/**
 * thông kê cột
 */
const thongKeCot = catchAsync(async (req, res) => {
  let idTaiKhoan = req.params.idTaiKhoan;

  // scope là argument alias cho ngày, tuần, tháng
  // 1 - load danh sách thói quen theo năm của tài khoản hiện tại
  // 2 - load danh sách thói quen theo tháng của tài khoản hiện tại
  // 3 - load danh sách thói quen các ngày của tài khoản hiện tại
  // 4 - load danh sách thói quen các ngày trong tuần của tài khoản hiện tại.
  // 5 - load danh sách thói quen hôm nay của tài khoản hiện tại.
  // 6 - load danh sách thói quen tháng này của tài khoản hiện tại.
  let scope = req.params.scope;

  const result = await diemTichLuyService.thongKeCot(idTaiKhoan, scope);
  res.send(result);
});

/**
 * Liệt kê dữ liệu theo người dùng và ngày được chỉ định
 */
const thongKeTheoNgay = catchAsync(async (req, res) => {
  let idTaiKhoan = req.params.idTaiKhoan;
  let date = new Date(req.params.timestamp).toISOString().split("T")[0];

  const result = await diemTichLuyService.thongKeTheoNgay(idTaiKhoan, date);
  res.send(result);
});

/**
 * create
 */
const create = catchAsync(async (req, res) => {
  const account = await diemTichLuyService.create(req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * Update DiemTichLuy
 */
const updateDiemTichLuy = catchAsync(async (req, res) => {
  const diemTichLuy = await diemTichLuyService.updateDiemTichLuyById(req.body.id, req.body);
  res.send(diemTichLuy);
});

/**
 * find By Id And Update
 */
const updateDeviceToken = catchAsync(async (req, res) => {
  const account = await diemTichLuyService.updateDeviceToken(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * find By Id And Delete
 */
const findByIdAndDelete = catchAsync(async (req, res) => {
  const account = await diemTichLuyService.findByIdAndDelete(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * findById
 */
const findById = catchAsync(async (req, res) => {
  const account = await diemTichLuyService.findById(req.params.id);
  res.status(httpStatus.CREATED).send(account);
});

/**
 * paginate
 */
const paginate = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['idDiemTichLuy', 'idRole', 'idOptionalRole', 'status', 'month', 'year']);
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

  const result = await diemTichLuyService.paginate(filter, options);
  res.send(result);
});

module.exports = {
  find,
  create,
  updateDiemTichLuy,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,

  // additional
  loadLichSuThoiQuen,
  thongKeCot,
  thongKeTheoNgay,
};
