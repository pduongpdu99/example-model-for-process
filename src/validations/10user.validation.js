const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    idPartner: Joi.string().optional(),
    idDanhSachHinhAnh: Joi.string().optional(),
    idTinh: Joi.string().optional(),
    idHuyen: Joi.string().optional(),
    hoTen: Joi.string().optional(),
    ngaySinh: Joi.date().optional(),
    gioiTinh: Joi.number().optional(),
    soDienThoai: Joi.string().optional(),
    email: Joi.string().email(),
    hinhDaiDien: Joi.string().optional(),
    matKhau: Joi.string().optional().min(8),
    chieuCao: Joi.number().optional(),
    canNang: Joi.number().optional(),
    banBes: Joi.string().optional(),
    hinhNen: Joi.string().optional(),
    token: Joi.string().optional(),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    idPartner: Joi.string().optional(),
    idDanhSachHinhAnh: Joi.string().optional(),
    idTinh: Joi.string().optional(),
    idHuyen: Joi.string().optional(),
    hoTen: Joi.string().optional(),
    ngaySinh: Joi.date().optional(),
    gioiTinh: Joi.number().optional(),
    soDienThoai: Joi.string().optional(),
    email: Joi.string().email(),
    hinhDaiDien: Joi.string().optional(),
    matKhau: Joi.string().optional().min(8),
    chieuCao: Joi.number().optional(),
    canNang: Joi.number().optional(),
    banBes: Joi.string().optional(),
    hinhNen: Joi.string().optional(),
    token: Joi.string().optional(),
  }),
};

const findByIdAndDelete = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const paginate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const findById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const findByUsername = {
  params: Joi.object().keys({
    username: Joi.string(),
  }),
};

const findByDateStartToDateEnd = {
  query: Joi.object().keys({
    dateStart: Joi.string().optional(),
    dateEnd: Joi.string().optional(),
  }),
};

const findInforSubordinateTeams = {
  query: Joi.object().keys({
    idUser: Joi.string().custom(objectId),
  }),
};

const findStatisticsOfUser = {
  query: Joi.object().keys({
    idUser: Joi.string().custom(objectId),
  }),
};

const updateDeviceToken = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    deviceToken: Joi.string().required(),
  }),
};

module.exports = {
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  paginate,
  findById,
  findByUsername,
  findByDateStartToDateEnd,
  findInforSubordinateTeams,
  findStatisticsOfUser,
  updateDeviceToken,
};
