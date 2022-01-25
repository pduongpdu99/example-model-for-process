/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const nhomSchema = mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    moTa: {
      type: String,
    },
    hinhAnh: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
nhomSchema.plugin(toJSON);
nhomSchema.plugin(paginate);

/**
 * @typedef Nhom
 */
const Nhom = mongoose.model('Nhom', nhomSchema);

module.exports = Nhom;
