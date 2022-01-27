/* eslint-disable */
const httpStatus = require('http-status');
const { ThoiQuenCoSan } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all ThoiQuenCoSan
 * @returns
 */
const find = async () => {
  return ThoiQuenCoSan.find();
};

/**
 * Create a ThoiQuenCoSan
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ThoiQuenCoSan.create(body);
};

/**
 * Update ThoiQuenCoSan by id
 * @param {ObjectId} ThoiQuenCoSanId
 * @param {Object} updateBody
 * @returns {Promise<ThoiQuenCoSan>}
 */
const updateThoiQuenCoSanById = async (ThoiQuenCoSanId, updateBody) => {
  const ThoiQuenCoSan = await findById(ThoiQuenCoSanId);
  if (!ThoiQuenCoSan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ThoiQuenCoSan not found');
  }
  Object.assign(ThoiQuenCoSan, updateBody);
  await ThoiQuenCoSan.save();
  return ThoiQuenCoSan;
};

/**
 * Update a ThoiQuenCoSan
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const ThoiQuenCoSan = await ThoiQuenCoSan.findById(id);
  ThoiQuenCoSan.deviceToken = body['deviceToken'];
  return ThoiQuenCoSan.findByIdAndUpdate({ _id: id }, ThoiQuenCoSan);
};

/**
 * Delete a ThoiQuenCoSan
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ThoiQuenCoSan.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a ThoiQuenCoSan by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ThoiQuenCoSan.findById(id);
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

  return ThoiQuenCoSan.find(filter).populate(populuteFields.map(item => {
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
  updateThoiQuenCoSanById,
};
