/* eslint-disable */
const httpStatus = require('http-status');
const { DanhSachThoiQuen } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all danhSachThoiQuen
 * @returns
 */
const find = async () => {
  return DanhSachThoiQuen.find();
};

/**
 * Create a danhSachThoiQuen
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return DanhSachThoiQuen.create(body);
};

/**
 * Update danhSachThoiQuen by id
 * @param {ObjectId} danhSachThoiQuenId
 * @param {Object} updateBody
 * @returns {Promise<DanhSachThoiQuen>}
 */
const updateDanhSachThoiQuenById = async (danhSachThoiQuenId, updateBody) => {
  const danhSachThoiQuen = await findById(danhSachThoiQuenId);
  if (!danhSachThoiQuen) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DanhSachThoiQuen not found');
  }
  Object.assign(danhSachThoiQuen, updateBody);
  await danhSachThoiQuen.save();
  return danhSachThoiQuen;
};

/**
 * Update a danhSachThoiQuen
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const danhSachThoiQuen = await DanhSachThoiQuen.findById(id);
  danhSachThoiQuen.deviceToken = body['deviceToken'];
  return DanhSachThoiQuen.findByIdAndUpdate({ _id: id }, danhSachThoiQuen);
};

/**
 * Delete a danhSachThoiQuen
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return DanhSachThoiQuen.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a danhSachThoiQuen by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return DanhSachThoiQuen.findById(id);
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

  return DanhSachThoiQuen.find(filter).populate(populuteFields.map(item => {
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
  updateDanhSachThoiQuenById,
};
