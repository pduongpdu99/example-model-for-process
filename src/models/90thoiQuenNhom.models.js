/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const thoiQuenNhomSchema = mongoose.Schema(
  {
    idNhom: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Nhom',
      required: true,
    },
    idThoiQuen: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ThoiQuen',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thoiQuenNhomSchema.plugin(toJSON);
thoiQuenNhomSchema.plugin(paginate);

/**
 * @typedef ThoiQuenNhom
 */
const ThoiQuenNhom = mongoose.model('ThoiQuenNhom', thoiQuenNhomSchema);

module.exports = ThoiQuenNhom;
