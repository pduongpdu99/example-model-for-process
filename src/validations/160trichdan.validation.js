const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    idNguoiDung: Joi.string().optional(),
    idDanhSachHinhAnh: Joi.string().optional(),
    hinhAnh: Joi.string().optional(),
    noiDungTrichDan: Joi.string().optional(),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    idNguoiDung: Joi.string().optional(),
    idDanhSachHinhAnh: Joi.string().optional(),
    hinhAnh: Joi.string().optional(),
    noiDungTrichDan: Joi.string().optional(),
  }),
};

const findByIdAndDelete = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const paginate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    idNguoiDung: Joi.string().optional(),
    idDanhSachHinhAnh: Joi.string().optional(),
    hinhAnh: Joi.string().optional(),
    noiDungTrichDan: Joi.string().optional(),
  }),
};

const findById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const findByDateStartToDateEnd = {
  query: Joi.object().keys({
    dateStart: Joi.string().optional(),
    dateEnd: Joi.string().optional(),
  }),
};

module.exports = {
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  paginate,
  findById,
  findByDateStartToDateEnd,
};
