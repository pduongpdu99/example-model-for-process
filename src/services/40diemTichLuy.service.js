/* eslint-disable */
const httpStatus = require('http-status');
const { DiemTichLuy, ThoiQuen } = require('../models');
const ApiError = require('../utils/ApiError');
const { sortObjects, getPopulate, getWeekDuration } = require('../utils/common_methods/common');

/**
 * Find all diemTichLuy
 * @returns
 */
const find = async () => {
  return DiemTichLuy.find();
};

/**
 * thống kê cột
 * @returns
 */
const thongKeCot = async (idTaiKhoan, scope) => {
  let formats = ["%Y-%m", "%Y-%m-%d"];
  let results = await DiemTichLuy.aggregate([
    {
      $group: {
        _id: { user: '$idUser', date: { $dateToString: { format: formats[scope - 1], date: '$createdAt', }, }, },
        total: { $sum: '$diem' },
        thoiquens: { $addToSet: '$idThoiQuen' }
      },
    },
  ]).then(results => {
    // load dữ liệu theo người dùng
    let dataFilterByTaiKhoan = results.filter(result => {
      let _idUser = result._id.user.toString();
      idTaiKhoan = idTaiKhoan.toString();
      return _idUser === idTaiKhoan;
    });

    // xử lý load theo tuần
    if (scope == 2) {
      let current = new Date().toISOString().split("T")[0];
      let week = getWeekDuration(current);
      week = week.map(date => {
        let obj = dataFilterByTaiKhoan.find(item => item._id.date.toString() === date.toString());
        return obj ? obj : null;
      });
      return week;
    }

    // load theo tháng;
    return dataFilterByTaiKhoan;
  });

  return results;
};

/**
 * thống kê theo ngày
 * @returns
 */
const thongKeTheoNgay = async (idTaiKhoan, date) => {
  return DiemTichLuy.find({
    idUser: idTaiKhoan.toString(),
    createdAt: {
      '$gte': `${date}T00:00:00.000Z`,
      '$lt': `${date}T23:59:59.999Z`
    }
  })
};

/**
 * dựa vào điểm tích lũy để tạo lịch sử
 * @returns
 */
const loadLichSuThoiQuen = async (idThoiQuen) => {
  let thoiQuenPopulate = ['_id.thoiQuen', 'thoiquens.idThoiQuen'];
  let results = await DiemTichLuy.aggregate([
    {
      $group: {
        _id: { thoiQuen: '$idThoiQuen', time: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', }, }, },
        total: { $sum: '$diem' },
        dates: { $push: { createdAt: { $dateToString: { format: "%H:%M", date: "$createdAt", } }, } }
      },
    },
  ]).then(results => {
    let dataFilterByDate = results.filter(result => {
      let _idThoiQuen = result._id.thoiQuen.toString();
      idThoiQuen = idThoiQuen.toString();
      return _idThoiQuen === idThoiQuen;
    });

    // get only once data object by id
    if (dataFilterByDate.length > 0) {
      dataFilterByDate = dataFilterByDate[0];
    }

    // sort object list by keys
    let keys = ["hour", "min"];
    dataFilterByDate.dates = sortObjects(dataFilterByDate.dates.map(item => {
      let parts = item.createdAt.split(":");
      item.hour = parseInt(parts[0]);
      item.min = parseInt(parts[1]);
      return item;
    }), keys);

    // delete keys
    dataFilterByDate.dates.map(item => keys.forEach(key => delete item[key]));

    return ThoiQuen.populate(dataFilterByDate, thoiQuenPopulate.map(item => getPopulate(item.trim())));
  });
  return results;
};

/**
 * Create a diemTichLuy
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return DiemTichLuy.create(body);
};

/**
 * Update diemTichLuy by id
 * @param {ObjectId} diemTichLuyId
 * @param {Object} updateBody
 * @returns {Promise<DiemTichLuy>}
 */
const updateDiemTichLuyById = async (diemTichLuyId, updateBody) => {
  const diemTichLuy = await findById(diemTichLuyId);
  if (!diemTichLuy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DiemTichLuy not found');
  }
  Object.assign(diemTichLuy, updateBody);
  await diemTichLuy.save();
  return diemTichLuy;
};

/**
 * Update a diemTichLuy
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const diemTichLuy = await DiemTichLuy.findById(id);
  diemTichLuy.deviceToken = body['deviceToken'];
  return DiemTichLuy.findByIdAndUpdate({ _id: id }, diemTichLuy);
};

/**
 * Delete a diemTichLuy
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return DiemTichLuy.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a diemTichLuy by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return DiemTichLuy.findById(id);
};

/**
 * Paginate
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const paginate = async (filter, options) => {
  let populuteFields = [];
  // replace id -> _id
  if (filter.id) {
    filter._id = filter.id;
    delete filter.id;
  }

  // convert to number
  options.limit = parseInt(options.limit, 10);
  options.page = parseInt(options.page, 10);

  return DiemTichLuy.find(filter).populate(populuteFields.map(item => {
    return getPopulate(item.trim());
  }))
    .limit(options.limit)
    .skip((options.page - 1) * options.limit)
    .then(results => {
      return {
        "results": results,
        "page": options.page,
        "limit": options.limit,
        "totalPages": options.page + results.length % options.page === 0 ? 0 : 1,
        "totalResults": results.length
      }
    }).catch(error => console.log(error))
};

module.exports = {
  find,
  create,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
  updateDiemTichLuyById,

  // additional
  loadLichSuThoiQuen,
  thongKeCot,
  thongKeTheoNgay,
};
