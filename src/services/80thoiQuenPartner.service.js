/* eslint-disable */
const httpStatus = require('http-status');
const { ThoiQuenPartner } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all thoiQuenPartner
 * @returns
 */
const find = async () => {
  return ThoiQuenPartner.find();
};

/**
 * Create a thoiQuenPartner
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ThoiQuenPartner.create(body);
};

/**
 * Update thoiQuenPartner by id
 * @param {ObjectId} thoiQuenPartnerId
 * @param {Object} updateBody
 * @returns {Promise<ThoiQuenPartner>}
 */
const updateThoiQuenPartnerById = async (thoiQuenPartnerId, updateBody) => {
  const thoiQuenPartner = await findById(thoiQuenPartnerId);
  if (!thoiQuenPartner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ThoiQuenPartner not found');
  }
  Object.assign(thoiQuenPartner, updateBody);
  await thoiQuenPartner.save();
  return thoiQuenPartner;
};

/**
 * Update a thoiQuenPartner
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const thoiQuenPartner = await ThoiQuenPartner.findById(id);
  thoiQuenPartner.deviceToken = body['deviceToken'];
  return ThoiQuenPartner.findByIdAndUpdate({ _id: id }, thoiQuenPartner);
};

/**
 * Delete a thoiQuenPartner
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ThoiQuenPartner.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a thoiQuenPartner by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ThoiQuenPartner.findById(id);
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

  return ThoiQuenPartner.find(filter).populate(populuteFields.map(item => {
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
  updateThoiQuenPartnerById,
};
