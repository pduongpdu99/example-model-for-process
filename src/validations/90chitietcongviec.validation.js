const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    tienDo: Joi.number().optional(),
    nhiemVu: Joi.number().optional(),
    tongSoNgay: Joi.number().optional(),
    soNgayLienTuc: Joi.number().optional(),
    soNgayLienTucDaiNhat: Joi.number().optional(),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    tienDo: Joi.number().optional(),
    nhiemVu: Joi.number().optional(),
    tongSoNgay: Joi.number().optional(),
    soNgayLienTuc: Joi.number().optional(),
    soNgayLienTucDaiNhat: Joi.number().optional(),
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
    idDanhSachThoiQuen: Joi.string().optional(),
    tienDo: Joi.number().optional(),
    nhiemVu: Joi.number().optional(),
    tongSoNgay: Joi.number().optional(),
    soNgayLienTuc: Joi.number().optional(),
    soNgayLienTucDaiNhat: Joi.number().optional(),
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
