const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    idChiTietCongViec: Joi.string().optional().required(),
    ten: Joi.string().optional(),
    thoiGianThucHien: Joi.date().optional(),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    idChiTietCongViec: Joi.string().optional().required(),
    ten: Joi.string().optional(),
    thoiGianThucHien: Joi.date().optional(),
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
    idChiTietCongViec: Joi.string().optional(),
    ten: Joi.string().optional(),
    thoiGianThucHien: Joi.date().optional(),
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
