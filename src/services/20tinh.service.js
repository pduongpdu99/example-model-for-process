/* eslint-disable */
const httpStatus = require('http-status');
const { Tinh } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all tinh
 * @returns
 */
const find = async () => {
  return Tinh.find();
};

/**
 * Create a tinh
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return Tinh.create(body);
};

/**
 * Update tinh by id
 * @param {ObjectId} tinhId
 * @param {Object} updateBody
 * @returns {Promise<Tinh>}
 */
const updateTinhById = async (tinhId, updateBody) => {
  const tinh = await findById(tinhId);
  if (!tinh) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tinh not found');
  }
  Object.assign(tinh, updateBody);
  await tinh.save();
  return tinh;
};

/**
 * Update a tinh
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const tinh = await Tinh.findById(id);
  tinh.deviceToken = body['deviceToken'];
  return Tinh.findByIdAndUpdate({ _id: id }, tinh);
};

/**
 * Delete a tinh
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return Tinh.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a tinh by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return Tinh.findById(id);
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

  return Tinh.find(filter).populate(populuteFields.map(item => {
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
  updateTinhById,
};
