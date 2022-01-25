/* eslint-disable */
const httpStatus = require('http-status');
const { DiemTichLuy } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all diemTichLuy
 * @returns
 */
const find = async () => {
  return DiemTichLuy.find();
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
};
