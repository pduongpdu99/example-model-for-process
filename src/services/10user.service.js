/* eslint-disable */
const httpStatus = require('http-status');
const { User, Order, Menu, RoleDetail } = require('../models');
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

  // convert to number
  options.limit = parseInt(options.limit, 10);
  options.page = parseInt(options.page, 10);

  return User.find(filter).populate(populuteFields.map(item => {
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
  findByIdAndUpdate,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
};
