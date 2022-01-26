// const mongooes = require('mongoose');
const { DiemTichLuy, ThoiQuen, User } = require('../models');
const { getPopulate } = require('../utils/common_methods/populate');
// const { getPopulate } = require('../utils/common_methods/populate');

/**
 * Paginate
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const ranking = async (filter, options) => {
  // const populuteFields = ['_id.user banbes', '_id.user idHuyen', '_id.user idHuyen idTinh'];

  // replace id -> _id
  if (filter && filter.id) {
    filter._id = filter.id;
    delete filter.id;
  }

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

  // Điểm tích lũy group by theo idUser và thời gian theo yyyy-mm
  let results = await DiemTichLuy.aggregate([
    { $match: filter || {} },
    {
      $group: {
        _id: {
          user: '$idUser',
          time: {
            $dateToString: {
              format: '%Y-%m',
              date: '$createdAt',
            },
          },
        },
        total: { $sum: '$diem' },
        thoiquens: { $addToSet: '$idThoiQuen' }
      },
    },
  ], function (err, results) {
    if (err) return err;
    return results.sort(function (a, b) {
      return parseFloat(a.total) - parseFloat(b.total);
    })
  });

  // người dùng đã tính điểm tích lũy
  let userIds = results.map(item => item._id.user);

  // populate và tính số lượng và phần trăm thói quen đã hoàn thành
  let info = await ThoiQuen
    .populate(
      results,
      ['thoiquens'].map(item => getPopulate(item.trim()))
    ).then(results => {
      return results.map(result => {
        // chỉ lấy các habit đã hoàn thành
        let habitProgSuccess = result.thoiquens.filter(item => item.tienDo == item.nhiemVu);

        // tính percent
        result.percent = habitProgSuccess.length / result.thoiquens.length;

        // tính số lượng thói quen đã hoàn thành 
        result.successNums = habitProgSuccess.length;
        return result;
      });
    }).catch(error => error);

  // load người dùng không tồn tại
  let users = await User.find({}).then(results => results.filter(result => userIds.map(id => id.toString()).includes(result.id.toString()) === false));

  // mapping info of users zero point
  info = info.concat(users.map(user => {
    return {
      _id: {
        user: user.id,
      },
      total: 0,
      thoiquens: [],
      percent: 1,
      successNums: 1,
    };
  }));

  // custom paginate
  return {
    results: info.slice(start, end),
    page,
    limit,
    totalPages: parseInt(info.length / limit) + ((info.length % limit == 0) ? 0 : 1),
    totalResults: info.length,
  };
};

module.exports = {
  ranking
};
