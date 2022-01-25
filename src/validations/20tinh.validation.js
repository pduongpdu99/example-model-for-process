const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    ten: Joi.string().optional().required(),
    vungMien: Joi.number().optional().min(1).max(3),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    ten: Joi.string().optional(),
    vungMien: Joi.number().optional().min(1).max(3),
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
