/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const thoiQuenMacDinhSchema = mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    moTa: {
      type: String,
    },
    soLuong: {
      type: Number,
    },
    donVi: {
      type: Number,
    },
    ngay: [Date],
    thoiGianNhacNhos: [String],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thoiQuenMacDinhSchema.plugin(toJSON);
thoiQuenMacDinhSchema.plugin(paginate);

/**
 * @typedef ThoiQuenMacDinh
 */
const ThoiQuenMacDinh = mongoose.model('ThoiQuenMacDinh', thoiQuenMacDinhSchema);

module.exports = ThoiQuenMacDinh;
