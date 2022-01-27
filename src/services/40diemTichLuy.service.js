/* eslint-disable */
const httpStatus = require('http-status');
const { DiemTichLuy, ThoiQuen } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');
const { sortObjects } = require('../utils/common_methods/sort');

/**
 * Find all diemTichLuy
 * @returns
 */
const find = async () => {
  return DiemTichLuy.find();
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
        _id: {
          thoiQuen: '$idThoiQuen',
          time: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
        },
        total: { $sum: '$diem' },
        thoiquens: {
          $push: {
            idThoiQuen: '$idThoiQuen',
            createAt: {
              $dateToString: {
                format: "%H:%M",
                date: "$createdAt",
              }
            },
          }
        }
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
    dataFilterByDate.thoiquens = sortObjects(dataFilterByDate.thoiquens.map(item => {
      let parts = item.createAt.split(":");
      item.hour = parseInt(parts[0]);
      item.min = parseInt(parts[1]);
      return item;
    }), keys);

    // delete keys
    dataFilterByDate.thoiquens.map(item => keys.forEach(key => delete item[key]));


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
};
