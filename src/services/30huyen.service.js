/* eslint-disable */
const httpStatus = require('http-status');
const { Huyen } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all huyen
 * @returns
 */
const find = async () => {
  return Huyen.find();
};

/**
 * Create a huyen
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return Huyen.create(body);
};

/**
 * Update huyen by id
 * @param {ObjectId} huyenId
 * @param {Object} updateBody
 * @returns {Promise<Huyen>}
 */
const updateHuyenById = async (huyenId, updateBody) => {
  const huyen = await findById(huyenId);
  if (!huyen) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Huyen not found');
  }
  Object.assign(huyen, updateBody);
  await huyen.save();
  return huyen;
};

/**
 * Update a huyen
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const huyen = await Huyen.findById(id);
  huyen.deviceToken = body['deviceToken'];
  return Huyen.findByIdAndUpdate({ _id: id }, huyen);
};

/**
 * Delete a huyen
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return Huyen.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a huyen by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return Huyen.findById(id);
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

  return Huyen.find(filter).populate(populuteFields.map(item => {
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
  updateHuyenById,
};
