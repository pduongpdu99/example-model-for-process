/* eslint-disable */
const httpStatus = require('http-status');
const { ThoiQuen, DiemTichLuy } = require('../models');
const ApiError = require('../utils/ApiError');
const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Find all thoiQuen
 * @returns
 */
const find = async () => {
  return ThoiQuen.find();
};

/**
 * load thói quen theo ngày
 * @returns
 */
const loadHabitsByTimestamp = async (datetime, options) => {
  let datepart = datetime.split('T')[0];

  let limit = 4;
  let page = 1;

  // convert to number
  if (options && options.limit) limit = parseInt(options.limit, 10);

  if (options && options.page) page = parseInt(options.page, 10);

  // xử lý điểm bắt đầu và kết thúc để lấy từ dữ liệu
  // ví dụ từ 0 - 4: lấy các phần tử 0 1 2 3
  // ví dụ từ 1 - 5: lấy các phần tử 1 2 3 4
  let start = (page - 1) * limit;
  let end = start + limit;

  return ThoiQuen.aggregate([
    {
      $group: {
        _id: {
          time: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
        },
        thoiquens: { $addToSet: '$_id' },
      },
    },
  ])
    .then((results) => {
      let data = results.filter((item) => item._id.time === datepart);
      let result = {};
      if (data.length > 0) {
        result = data[0];
      }

      result.thoiquens = result.thoiquens.slice(start, end);
      return result;
    })
    .catch((error) => error);
};

/**
 * Create a thoiQuen
 * @param {*} body
 * @returns
 */
const create = async (body) => {
  return ThoiQuen.create(body);
};

/**
 * Update thoiQuen by id
 * @param {ObjectId} thoiQuenId
 * @param {Object} updateBody
 * @returns {Promise<ThoiQuen>}
 */
const updateThoiQuenById = async (thoiQuenId, updateBody) => {
  const thoiQuen = await findById(thoiQuenId);
  if (!thoiQuen) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ThoiQuen not found');
  }
  Object.assign(thoiQuen, updateBody);
  await thoiQuen.save();
  return thoiQuen;
};

/**
 * Update a thoiQuen
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateDeviceToken = async (id, body) => {
  const thoiQuen = await ThoiQuen.findById(id);
  thoiQuen.deviceToken = body['deviceToken'];
  return ThoiQuen.findByIdAndUpdate({ _id: id }, thoiQuen);
};

/**
 * Delete a thoiQuen
 * @param {*} ids
 * @returns
 */
const findByIdAndDelete = async (ids) => {
  return ThoiQuen.deleteMany({ _id: { $in: ids.split(',') } });
};

/**
 * Find a thoiQuen by id
 * @param {*} id
 * @returns
 */
const findById = async (id) => {
  return ThoiQuen.findById(id);
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
  if (options && options.limit) options.limit = parseInt(options.limit, 10);
  if (options && options.page) options.page = parseInt(options.page, 10);

  return ThoiQuen.find(filter)
    .populate(
      populuteFields.map((item) => {
        return getPopulate(item.trim());
      })
    )
    .limit(options.limit)
    .skip((options.page - 1) * options.limit)
    .then((results) => {
      return {
        results: results,
        page: options.page,
        limit: options.limit,
        totalPages: options.page + (results.length % options.page) === 0 ? 0 : 1,
        totalResults: results.length,
      };
    })
    .catch((error) => console.log(error));
};

module.exports = {
  find,
  create,
  updateDeviceToken,
  findByIdAndDelete,
  findById,
  paginate,
  updateThoiQuenById,
  loadHabitsByTimestamp,
};
