/* eslint-disable */
const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');
/**
 * Find all user
 * @returns
 */
const find = async () => {
  return User.find();
};

/**
 * Tìm kiếm người dùng theo số điện thoại
 * @returns
 */
const findUserByNumber = async (numberPhone) => {
  return User.find({ soDienThoai: numberPhone.toString() }).then(results => {
    if (results.length > 0) {
      return results[0];
    }
    return {};
  });
};

/**
 * Kích hoạt tài khoản
 * @returns
 */
const kichHoatTaiKhoan = async (idTaiKhoan, isActive) => {
  return findByIdAndUpdate(idTaiKhoan.toString(), { activation: isActive });
};

/**
 * Create a user
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return User.create(body);
};

/**
 * Update a user
 * @param {*} id
 * @param {*} body
 * @returns
 */
const findByIdAndUpdate = async (id, body) => {
  return User.findByIdAndUpdate({ _id: id }, body);
};

/**
 * Update a user
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const user = await User.findById(id);
  user.deviceToken = body['deviceToken'];
  return User.findByIdAndUpdate({ _id: id }, user);
};

/**
 * Delete a user
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return User.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a user by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return User.findById(id);
};

/**
 * Paginate
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const paginate = async (filter, options) => {
  let populuteFields = [
    'idTinh',
    'idHuyen',
    'idPartner',
    'idDanhSachHinhAnh',
    'banBes idTinh',
    'banBes idHuyen',
  ];

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
  findByIdAndUpdate,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,

  // additional
  findUserByNumber,
  kichHoatTaiKhoan,
};
