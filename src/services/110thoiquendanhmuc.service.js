const { ThoiQuenDanhMuc } = require('../models');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all ThoiQuenDanhMuc
 * @returns
 */
const find = async () => {
  return ThoiQuenDanhMuc.find();
};

/**
 * Create a ThoiQuenDanhMuc
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ThoiQuenDanhMuc.create(body);
};

/**
 * Update a ThoiQuenDanhMuc
 * @param {*} id
 * @param {*} body
 * @returns
 */
const findByIdAndUpdate = async (id, body) => {
  return ThoiQuenDanhMuc.findByIdAndUpdate({ _id: id }, body);
};

/**
 * Delete a ThoiQuenDanhMuc
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ThoiQuenDanhMuc.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a ThoiQuenDanhMuc by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ThoiQuenDanhMuc.findById({ _id: id });
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

  return ThoiQuenDanhMuc.find(filter)
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
