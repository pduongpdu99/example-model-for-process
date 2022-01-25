// const mongooes = require('mongoose');
const { DiemTichLuy, DanhSachThoiQuen, ThoiQuenNhom, ThoiQuenPartner, ChiTietCongViec } = require('../models');
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
  const populateThoiQuenNhom = ['idNhom'];
  const populateNhom = ['idNhom.idThanhViens'];

  // replace id -> _id
  if (filter && filter.id) {
    filter._id = filter.id;
    delete filter.id;
  }

  let limit = 10;
  let page = 1;

  // convert to number
  if (options && options.limit) limit = parseInt(options.limit, 10);
  if (options && options.page) page = parseInt(options.page, 10);

  const diem = await DiemTichLuy.aggregate([
    { $limit: limit },
    { $skip: (page - 1) * limit },
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
      },
    },
  ]);

  let idUserNeedToFind = '61ead2a089ffe326ec525cc4';

  return DanhSachThoiQuen.find({ idUser: idUserNeedToFind }).then(danhSach => {
    return ThoiQuenPartner.find({ idUser: idUserNeedToFind }).then(thoiQuenPartner => {
      return ThoiQuenNhom
        .find()
        .populate(populateThoiQuenNhom.map(function (item) {
          return getPopulate(item.trim());
        })).then(results => {
          console.log(results);
          results = results.filter(thoiquennhom => thoiquennhom.idNhom.idThanhViens.includes(idUserNeedToFind));
          results.concat(danhSach);
          results.concat(thoiQuenPartner);
          return {
            diem,
            thoiquen: results,
            length: results.length
          };
        })
    });
  }).then(results => {
    let thoiQuenList = results.thoiQuen.map(item => item.idThoiQuen);
    thoiQuenList.map(item => ChiTietCongViec.find({idThoiQuen}))
    
  });



  // .then((results) => {
  //   return User.populate(results, populuteFields.map(item => getPopulate(item.trim()))).then(results => {
  //     return {
  //       results,
  //       page,
  //       limit,
  //       totalPages: page + (results.length % page) === 0 ? 0 : 1,
  //       totalResults: results.length,
  //     };
  //   }).catch(error=>error)
  // })
  // .catch((error) => error);
};

module.exports = {
  ranking,
};
