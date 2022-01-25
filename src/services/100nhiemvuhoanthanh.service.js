const { NhiemVuHoanThanh } = require('../models');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all NhiemVuHoanThanh
 * @returns
 */
const find = async () => {
  return NhiemVuHoanThanh.find();
};

/**
 * Create a NhiemVuHoanThanh
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return NhiemVuHoanThanh.create(body);
};

/**
 * Update a NhiemVuHoanThanh
 * @param {*} id
 * @param {*} body
 * @returns
 */
const findByIdAndUpdate = async (id, body) => {
  return NhiemVuHoanThanh.findByIdAndUpdate({ _id: id }, body);
};

/**
 * Delete a NhiemVuHoanThanh
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return NhiemVuHoanThanh.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a NhiemVuHoanThanh by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return NhiemVuHoanThanh.findById({ _id: id });
};

/**
 * Paginate
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const paginate = async (filter, options) => {
  const populuteFields = [];
  // replace id -> _id
  if (filter.id) {
    filter._id = filter.id;
    delete filter.id;
  }

  // convert to number
  options.limit = parseInt(options.limit, 10);
  options.page = parseInt(options.page, 10);

  return NhiemVuHoanThanh.find(filter)
    .populate(
      populuteFields.map((item) => {
        return getPopulate(item.trim());
      })
    )
    .limit(options.limit)
    .skip((options.page - 1) * options.limit)
    .then((results) => {
      return {
        results,
        page: options.page,
        limit: options.limit,
        totalPages: options.page + (results.length % options.page) === 0 ? 0 : 1,
        totalResults: results.length,
      };
    })
    .catch((error) => error);
};

module.exports = {
  find,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  findById,
  paginate,
};
