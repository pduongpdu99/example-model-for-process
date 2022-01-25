const { ChiTietCongViec } = require('../models');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all ChiTietCongViec
 * @returns
 */
const find = async () => {
  return ChiTietCongViec.find();
};

/**
 * Create a ChiTietCongViec
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ChiTietCongViec.create(body);
};

/**
 * Update a ChiTietCongViec
 * @param {*} id
 * @param {*} body
 * @returns
 */
const findByIdAndUpdate = async (id, body) => {
  return ChiTietCongViec.findByIdAndUpdate({ _id: id }, body);
};

/**
 * Delete a ChiTietCongViec
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ChiTietCongViec.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a ChiTietCongViec by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ChiTietCongViec.findById({ _id: id });
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

  return ChiTietCongViec.find(filter)
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
