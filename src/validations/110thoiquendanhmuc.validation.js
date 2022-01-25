const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    idDanhMucDeXuat: Joi.string().custom(objectId).required(),
    ten: Joi.string().optional().required(),
    mota: Joi.string().optional(),
    daTao: Joi.boolean().optional(),
    hoanThanh: Joi.boolean().optional(),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    idDanhMucDeXuat: Joi.string().custom(objectId).required(),
    ten: Joi.string().optional().required(),
    mota: Joi.string().optional(),
    daTao: Joi.boolean().optional(),
    hoanThanh: Joi.boolean().optional(),
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
    ten: Joi.string().optional().required(),
    mota: Joi.string().optional(),
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
