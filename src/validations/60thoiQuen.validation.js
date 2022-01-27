const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    idNguoiDung: Joi.string().optional().required(),
    ten: Joi.string().optional().required(),
    moTa: Joi.string().optional(),
    idNhacChuong: Joi.string().custom(objectId),
    soLuong: Joi.number().optional(),
    donVi: Joi.number().optional(),
    ngay: Joi.array().items(Joi.date()),
    thoiGianNhacNhos: Joi.array().items(Joi.string()),
    tienDo: Joi.number().optional(),
    nhiemVu: Joi.number().optional(),
    hoanThanh: Joi.boolean().optional(),
    tongSoNgay: Joi.number().optional(),
    soNgayLienTuc: Joi.number().optional(),
    soNgayLienTucDaiNhat: Joi.number().optional(),
    daTao: Joi.boolean().optional(),
  }),
};

const findByIdAndUpdate = {
  body: Joi.object().keys({
    idNguoiDung: Joi.string().optional().required(),
    ten: Joi.string().optional(),
    moTa: Joi.string().optional(),
    idNhacChuong: Joi.string().custom(objectId),
    soLuong: Joi.number().optional(),
    donVi: Joi.number().optional(),
    ngay: Joi.array().items(Joi.date()),
    thoiGianNhacNhos: Joi.array().items(Joi.string()),
    tienDo: Joi.number().optional(),
    nhiemVu: Joi.number().optional(),
    hoanThanh: Joi.boolean().optional(),
    tongSoNgay: Joi.number().optional(),
    soNgayLienTuc: Joi.number().optional(),
    soNgayLienTucDaiNhat: Joi.number().optional(),
    daTao: Joi.boolean().optional(),
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
