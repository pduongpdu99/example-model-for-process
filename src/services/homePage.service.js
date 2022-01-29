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
  const start = (page - 1) * limit;
  const end = start + limit;

  // Điểm tích lũy group by theo idUser và thời gian theo yyyy-mm
  const results = await DiemTichLuy.aggregate(
    [
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
          thoiquens: { $addToSet: '$idThoiQuen' },
        },
      },
    ],
    function (err, res) {
      if (err) return err;
      return res.sort(function (a, b) {
        return parseFloat(a.total) - parseFloat(b.total);
      });
    }
  );

  // người dùng đã tính điểm tích lũy
  const userIds = results.map((item) => item._id.user);

  // populate và tính số lượng và phần trăm thói quen đã hoàn thành
  let info = await ThoiQuen.populate(
    results,
    ['thoiquens'].map((item) => getPopulate(item.trim()))
  )
    .then((res) => {
      return res.map((result) => {
        // chỉ lấy các habit đã hoàn thành
        const habitProgSuccess = result.thoiquens.filter((item) => item.tienDo === item.nhiemVu);

        // tính percent
        result.percent = habitProgSuccess.length / result.thoiquens.length;

        // tính số lượng thói quen đã hoàn thành
        result.successNums = habitProgSuccess.length;
        return result;
      });
    })
    .catch((error) => error);

  // load người dùng không tồn tại
  const users = await User.find({}).then((res) =>
    res.filter((result) => userIds.map((id) => id.toString()).includes(result.id.toString()) === false)
  );

  // mapping info of users zero point
  info = info.concat(
    users.map((user) => {
      return {
        _id: {
          user: user.id,
        },
        total: 0,
        thoiquens: [],
        percent: 1,
        successNums: 1,
      };
    })
  );

  // custom paginate
  return {
    results: info.slice(start, end),
    page,
    limit,
    totalPages: parseInt(info.length / limit, 10) + (info.length % limit === 0 ? 0 : 1),
    totalResults: info.length,
  };
};

module.exports = {
  ranking,
};
