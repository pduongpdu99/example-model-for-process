const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    idNhom: Joi.string().custom(objectId).required(),
    idThoiQuen: Joi.string().custom(objectId),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    idNhom: Joi.string().custom(objectId),
    idThoiQuen: Joi.string().custom(objectId),
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
    month: Joi.string().optional(),
    year: Joi.string().optional(),
  }),
};

const findById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
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
  updateDeviceToken,
};
