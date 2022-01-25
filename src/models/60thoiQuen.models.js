/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const thoiQuenSchema = mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    moTa: {
      type: String,
    },
    idNhacChuong: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'NhacChuong',
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
thoiQuenSchema.plugin(toJSON);
thoiQuenSchema.plugin(paginate);

/**
 * @typedef ThoiQuen
 */
const ThoiQuen = mongoose.model('ThoiQuen', thoiQuenSchema);

module.exports = ThoiQuen;
