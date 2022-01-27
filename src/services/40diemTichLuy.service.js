/* eslint-disable */
const httpStatus = require('http-status');
const { DiemTichLuy, ThoiQuen, User } = require('../models');
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
 * Thống kê cột
 * @param {*} idTaiKhoan 
 * @param {*} scope 
 * @returns 
 */
const thongKeCot = async (idTaiKhoan, scope) => {
  let formats = ["%Y", "%Y-%m", "%Y-%m-%d", "%Y-%m-%d", "%Y-%m-%d", "%Y-%m"];
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

    // xử lý load thói quen các ngày trong tuần hiện tại
    if (scope == 4) {
      // khởi tạo trường poluldate
      let populate = ["thoiquens"];

      let current = new Date().toISOString().split("T")[0];
      let week = getWeekDuration(current);
      week = week.map(date => {
        let obj = dataFilterByTaiKhoan.find(item => item._id.date.toString() === date.toString());
        return obj ? obj : {};
      });
      return ThoiQuen.populate(week, populate.map(item => getPopulate(item.trim())));
    }

    // xử lý load thói quen ngày hôm này
    if (scope == 5) {
      // khởi tạo trường poluldate
      let populate = ["thoiquens"];

      let current = new Date().toISOString().split("T")[0];
      let obj = dataFilterByTaiKhoan.find(item => item._id.date.toString() === current.toString());

      obj = obj ? obj : { "_id": { "user": idTaiKhoan, "date": current }, "total": 0, "thoiquens": [] };
      return ThoiQuen.populate(obj, populate.map(item => getPopulate(item.trim())));
    }

    // xử lý load thói quen tháng hiện tại
    if (scope == 6) {
      // khởi tạo trường poluldate
      let populate = ["thoiquens"];

      let current = new Date().toISOString().split("T")[0].slice(0, 7).toString();
      let obj = dataFilterByTaiKhoan.find(item => item._id.date.toString() === current.toString());
      obj = obj ? obj : { "_id": { "user": idTaiKhoan, "date": current }, "total": 0, "thoiquens": [] };
      return ThoiQuen.populate(obj, populate.map(item => getPopulate(item.trim())));
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
 * load tổng điểm người dùng theo tháng
 * @returns
 */
const loadDiemNguoiDungTheoThang = async (idTinh, thang) => {
  return User.find({ idTinh: idTinh }).then(users => {
    let userids = users.map(user => user.id);
    return DiemTichLuy.aggregate([
      {
        $group: {
          _id: {
            user: '$idUser',
          },
          dataset: {
            $push: {
              id: '$idThoiQuen',
              month: { $dateToString: { format: "%m", date: "$createdAt", } },
              diem: '$diem',
            }
          },
        },
      },
    ]).then(results => {
      results = results.filter(result => userids.find(item => item.toString() === result._id.user.toString()))
      results = results.map(result => {
        if (thang !== "0") {
          thang = parseInt(thang);
          result.dataset = result.dataset.filter(item => {
            let month1 = item.month.toString();
            let month2 = thang < 10 ? "0" + thang : thang.toString();
            return month1 === month2;
          });
        }

        result.sum = result.dataset.reduce(function (sum, current) {
          return sum + current.diem;
        }, 0);
        return result;
      });
      return results;
    })
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

  let limit = 10;
  let page = 1;

  // convert to number
  if (options.limit && options) limit = parseInt(options.limit, 10);
  if (options.page && options) page = parseInt(options.page, 10);

  let results = await User.find(filter);
  let length = results.length;
  let totalResults = results.length;
  let totalPages = (length / limit) - parseInt(length / limit) != 0 ? parseInt(length / limit) + 1 : parseInt(length / limit);
  if (limit >= length) totalPages = 1;

  return User.find(filter).populate(populuteFields.map(item => {
    return getPopulate(item.trim());
  })).limit(limit).skip((page - 1) * limit)
    .then(results => {
      return {
        results,
        page,
        limit,
        totalPages,
        totalResults
      }
    });
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
  loadDiemNguoiDungTheoThang,
};
