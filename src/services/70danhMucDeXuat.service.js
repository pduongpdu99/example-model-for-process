/* eslint-disable */
const httpStatus = require('http-status');
const { DanhMucDeXuat } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all danhMucDeXuat
 * @returns
 */
const find = async () => {
  return DanhMucDeXuat.find();
};

/**
 * Create a danhMucDeXuat
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return DanhMucDeXuat.create(body);
};

/**
 * Update danhMucDeXuat by id
 * @param {ObjectId} danhMucDeXuatId
 * @param {Object} updateBody
 * @returns {Promise<DanhMucDeXuat>}
 */
const updateDanhMucDeXuatById = async (danhMucDeXuatId, updateBody) => {
  const danhMucDeXuat = await findById(danhMucDeXuatId);
  if (!danhMucDeXuat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DanhMucDeXuat not found');
  }
  Object.assign(danhMucDeXuat, updateBody);
  await danhMucDeXuat.save();
  return danhMucDeXuat;
};

/**
 * Update a danhMucDeXuat
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const danhMucDeXuat = await DanhMucDeXuat.findById(id);
  danhMucDeXuat.deviceToken = body['deviceToken'];
  return DanhMucDeXuat.findByIdAndUpdate({ _id: id }, danhMucDeXuat);
};

/**
 * Delete a danhMucDeXuat
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return DanhMucDeXuat.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a danhMucDeXuat by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return DanhMucDeXuat.findById(id);
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

  return DanhMucDeXuat.find(filter).populate(populuteFields.map(item => {
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
  updateDanhMucDeXuatById,
};
