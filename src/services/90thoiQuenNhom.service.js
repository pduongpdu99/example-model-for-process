/* eslint-disable */
const httpStatus = require('http-status');
const { ThoiQuenNhom } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all thoiQuenNhom
 * @returns
 */
const find = async () => {
  return ThoiQuenNhom.find();
};

/**
 * Create a thoiQuenNhom
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ThoiQuenNhom.create(body);
};

/**
 * Update thoiQuenNhom by id
 * @param {ObjectId} thoiQuenNhomId
 * @param {Object} updateBody
 * @returns {Promise<ThoiQuenNhom>}
 */
const updateThoiQuenNhomById = async (thoiQuenNhomId, updateBody) => {
  const thoiQuenNhom = await findById(thoiQuenNhomId);
  if (!thoiQuenNhom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ThoiQuenNhom not found');
  }
  Object.assign(thoiQuenNhom, updateBody);
  await thoiQuenNhom.save();
  return thoiQuenNhom;
};

/**
 * Update a thoiQuenNhom
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const thoiQuenNhom = await ThoiQuenNhom.findById(id);
  thoiQuenNhom.deviceToken = body['deviceToken'];
  return ThoiQuenNhom.findByIdAndUpdate({ _id: id }, thoiQuenNhom);
};

/**
 * Delete a thoiQuenNhom
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ThoiQuenNhom.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a thoiQuenNhom by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ThoiQuenNhom.findById(id);
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

  return ThoiQuenNhom.find(filter).populate(populuteFields.map(item => {
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
  updateThoiQuenNhomById,
};
