/* eslint-disable */
const httpStatus = require('http-status');
const { Nhom, User } = require('../models');
const { userService } = require('./index');
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
 * thêm thanh niên vô nhó
 * @param {*} body
 * @returns
 */
const themThanhVienVaoNhom = async (idNhom, idNguoiDungs) => {
  return User.find({
    '_id': {
      $in: idNguoiDungs
    }
  }).then(async users => {
    let results = [];
    for (const user of users) {
      if (!user.idNhoms.includes(idNhom)) {
        user.idNhoms.push(idNhom);
      }
      await User.findOneAndUpdate({ _id: user.id }, { $set: { idNhoms: user.idNhoms } }, {});
      results.push(user);
    }

    return results;
  });
}


// /**
//  * thêm danh sách thành viên
//  * @param {*} body
//  * @returns
//  */
// const themThanhVienVaoNhom = async (idNhom, idNguoiDungs) => {
//   return User.findById(idNguoiDung.toString()).then((user) => {
//     let nhomsOfUser = user.idNhoms.map((item) => item.toString());
//     if (!nhomsOfUser.includes(idNhom.toString())) {
//       user.idNhoms.push(idNhom);
//     }

//     return User.updateOne({ _id: idNguoiDung, idNhoms: user.idNhoms })
//       .then((user) => user)
//       .catch((error) => error);
//   });
// };

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

  return Nhom.find(filter)
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
  updateNhomById,

  // additional
  themThanhVienVaoNhom,
};

// thêm danh sách thành viên cho một nhóm
