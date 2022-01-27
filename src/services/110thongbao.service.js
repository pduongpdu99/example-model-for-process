const { ThongBao } = require('../models');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all ThongBao
 * @returns
 */
const find = async () => {
  return ThongBao.find();
};

/**
 * Create a ThongBao
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ThongBao.create(body);
};

/**
 * Update a ThongBao
 * @param {*} id
 * @param {*} body
 * @returns
 */
const findByIdAndUpdate = async (id, body) => {
  return ThongBao.findByIdAndUpdate({ _id: id }, body);
};

/**
 * Delete a ThongBao
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ThongBao.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a ThongBao by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ThongBao.findById({ _id: id });
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

  return ThongBao.find(filter)
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
