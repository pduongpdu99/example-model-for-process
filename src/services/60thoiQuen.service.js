/* eslint-disable */
const httpStatus = require('http-status');
const { ThoiQuen } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all thoiQuen
 * @returns
 */
const find = async () => {
  return ThoiQuen.find();
};

/**
 * Create a thoiQuen
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ThoiQuen.create(body);
};

/**
 * Update thoiQuen by id
 * @param {ObjectId} thoiQuenId
 * @param {Object} updateBody
 * @returns {Promise<ThoiQuen>}
 */
const updateThoiQuenById = async (thoiQuenId, updateBody) => {
  const thoiQuen = await findById(thoiQuenId);
  if (!thoiQuen) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ThoiQuen not found');
  }
  Object.assign(thoiQuen, updateBody);
  await thoiQuen.save();
  return thoiQuen;
};

/**
 * Update a thoiQuen
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const thoiQuen = await ThoiQuen.findById(id);
  thoiQuen.deviceToken = body['deviceToken'];
  return ThoiQuen.findByIdAndUpdate({ _id: id }, thoiQuen);
};

/**
 * Delete a thoiQuen
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ThoiQuen.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a thoiQuen by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ThoiQuen.findById(id);
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

  return ThoiQuen.find(filter).populate(populuteFields.map(item => {
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
  updateThoiQuenById,
};
