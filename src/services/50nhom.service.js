/* eslint-disable */
const httpStatus = require('http-status');
const { Nhom } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all nhom
 * @returns
 */
const find = async () => {
  return Nhom.find();
};

/**
 * Create a nhom
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return Nhom.create(body);
};

/**
 * Update nhom by id
 * @param {ObjectId} nhomId
 * @param {Object} updateBody
 * @returns {Promise<Nhom>}
 */
const updateNhomById = async (nhomId, updateBody) => {
  const nhom = await findById(nhomId);
  if (!nhom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhom not found');
  }
  Object.assign(nhom, updateBody);
  await nhom.save();
  return nhom;
};

/**
 * Update a nhom
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const nhom = await Nhom.findById(id);
  nhom.deviceToken = body['deviceToken'];
  return Nhom.findByIdAndUpdate({ _id: id }, nhom);
};

/**
 * Delete a nhom
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return Nhom.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a nhom by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return Nhom.findById(id);
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

  return Nhom.find(filter).populate(populuteFields.map(item => {
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
  updateNhomById,
};
