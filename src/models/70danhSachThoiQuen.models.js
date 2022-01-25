/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const danhSachThoiQuenSchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
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
danhSachThoiQuenSchema.plugin(toJSON);
danhSachThoiQuenSchema.plugin(paginate);

/**
 * @typedef DanhSachThoiQuen
 */
const DanhSachThoiQuen = mongoose.model('DanhSachThoiQuen', danhSachThoiQuenSchema);

module.exports = DanhSachThoiQuen;
