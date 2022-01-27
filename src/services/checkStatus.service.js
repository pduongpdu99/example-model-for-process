const instadate = require('instadate');
const { ThoiQuen } = require('../models');

/**
 * Check status by id
 * @param {*} id
 * @returns
 */
const checkStatus = async (idUser, datetime) => {
  let datepart = datetime.split('T')[0];
  datepart = new Date(datepart);

  const datepart2 = instadate.addDays(datepart, 1);

  const thoiquen = await ThoiQuen.find({
    idNguoiDung: idUser,
    createdAt: { $gte: datepart, $lt: datepart2 },
  });
  // return thoiquen;
  return thoiquen.filter((item) => item.tienDo == item.nhiemVu);
};

module.exports = {
  checkStatus,
};
